import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

const timeToMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
};

const hourToTimeStr = (h) => `${String(Math.floor(h)).padStart(2, "0")}:${(h % 1) * 60 === 0 ? "00" : "30"}`;

async function verifyAdmin() {
  const { userId } = await auth();
  if (!userId) return false;
  const user = await currentUser();
  const adminEmails = (process.env.CLERK_ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase());
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  return email && (adminEmails.length === 0 || adminEmails.includes(email));
}

function calcTotal({ hourlyRate, durationHours, playerCount, extraPlayerFee }) {
  const base  = hourlyRate * Number(durationHours);
  const extra = Number(extraPlayerFee) * Math.max(0, playerCount - 1) * Math.ceil(durationHours);
  return Math.round((base + extra) * 100) / 100;
}

// ─────────────────────────────────────────────────────────────────────────────
// POST: Create a manual confirmed booking (admin override, no payment needed)
// Body: { stationId, bookingDate, startHour, durationHours, playerCount?,
//         userName, userEmail, userPhone, customAmount?, forceCreate? }
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const {
      stationId, bookingDate, startHour, durationHours,
      playerCount = 1, userName, userEmail, userPhone,
      customAmount, forceCreate = false,
    } = body;

    if (!stationId || !bookingDate || startHour === undefined || !durationHours || !userName || !userEmail || !userPhone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const station = await prisma.station.findUnique({ where: { id: Number(stationId) } });
    if (!station || !station.isActive) {
      return NextResponse.json({ error: "Station not found or inactive" }, { status: 404 });
    }

    const duration  = Number(durationHours);
    const startTime = hourToTimeStr(Number(startHour));
    const endTime   = hourToTimeStr(Number(startHour) + duration);

    // Check for overlapping confirmed/locked bookings
    if (!forceCreate) {
      const now = new Date();
      const existing = await prisma.booking.findMany({
        where: {
          stationId: Number(stationId),
          bookingDate,
          OR: [
            { status: "CONFIRMED" },
            { status: "PENDING", lockExpiresAt: { gt: now } },
          ],
        },
      });

      const reqStart = timeToMinutes(startTime);
      const reqEnd   = timeToMinutes(endTime);
      const conflict = existing.find((b) => {
        const bStart = timeToMinutes(b.startTime);
        const bEnd   = timeToMinutes(b.endTime);
        return reqStart < bEnd && reqEnd > bStart;
      });

      if (conflict) {
        return NextResponse.json({
          error: "Slot conflict",
          hasConflict: true,
          conflictWith: { id: conflict.id, userName: conflict.userName, startTime: conflict.startTime, endTime: conflict.endTime },
          message: `Overlaps with ${conflict.userName}'s booking (${conflict.startTime}–${conflict.endTime}). Enable "Force Create" to override.`,
        }, { status: 409 });
      }

      // Gap validation
      const dateObj = new Date(bookingDate + "T00:00:00Z");
      const dayOfWeek = dateObj.getUTCDay();
      const todayHours = await prisma.operatingHours.findUnique({ where: { dayOfWeek } });
      const today = todayHours ?? { openHour: 8, closeHour: 22, minBookingHours: 1 };
  
      const windowStartMin = today.openHour * 60;
      const windowEndMin = today.closeHour * 60;
      const minBookingMin = (today.minBookingHours ?? 1) * 60;
  
      let maxPrevEnd = windowStartMin;
      let minNextStart = windowEndMin;
  
      for (const b of existing) {
        const bStart = timeToMinutes(b.startTime);
        const bEnd = timeToMinutes(b.endTime);
  
        if (bEnd <= reqStart && bEnd > maxPrevEnd) {
          maxPrevEnd = bEnd;
        }
        if (bStart >= reqEnd && bStart < minNextStart) {
          minNextStart = bStart;
        }
      }
  
      const gapBefore = reqStart - maxPrevEnd;
      const gapAfter = minNextStart - reqEnd;
  
      if ((gapBefore > 0 && gapBefore < minBookingMin) || (gapAfter > 0 && gapAfter < minBookingMin)) {
        return NextResponse.json({
          error: "Gap Warning",
          hasConflict: true,
          message: `Booking leaves an unbookable time gap (less than ${today.minBookingHours || 1} hr). Enable "Force Create" to override.`,
        }, { status: 409 });
      }
    }

    const players = Math.max(1, Number(playerCount));
    const total   = customAmount !== undefined && customAmount !== ""
      ? Number(customAmount)
      : calcTotal({
          hourlyRate:     station.hourlyRate,
          durationHours:  duration,
          playerCount:    players,
          extraPlayerFee: station.extraPlayerFee || 0,
        });

    const booking = await prisma.booking.create({
      data: {
        stationId:    Number(stationId),
        userEmail,
        userName,
        userPhone,
        bookingDate,
        startTime,
        endTime,
        durationHours: duration,
        playerCount:   players,
        totalAmount:   total,
        status:        "CONFIRMED",
        lockExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      },
      include: { station: true },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Manual Booking Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create booking" }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PATCH: Update booking status (admin)
// Body: { id, status } — status in [PENDING, CONFIRMED, CANCELLED, EXPIRED]
// ─────────────────────────────────────────────────────────────────────────────
export async function PATCH(req) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id, status } = await req.json();

    const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "EXPIRED"];
    if (!id || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Valid booking ID and status are required" }, { status: 400 });
    }

    const updated = await prisma.booking.update({
      where: { id: Number(id) },
      data:  { status },
      include: { station: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    console.error("Status Update Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update status" }, { status: 500 });
  }
}
