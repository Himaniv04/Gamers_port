import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// Helper: Convert "HH:MM" string to total minutes
const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + (m || 0);
};

// ─────────────────────────────────────────────────────────────────────────────
// PRICING CALCULATION
//
// Base cost  = hourlyRate × durationHours          (exact, fractional)
// Extra cost = extraPlayerFee × extraPlayers × ⌈durationHours⌉  (ceil-billed)
// Total      = baseCost + extraCost
// ─────────────────────────────────────────────────────────────────────────────
function calculateTotal({ hourlyRate, durationHours, playerCount, extraPlayerFee }) {
  const duration = Number(durationHours) || 1;
  const players  = Number(playerCount) || 1;
  const fee      = Number(extraPlayerFee) || 0;

  const baseCost  = hourlyRate * duration;
  const extraPlayers = Math.max(0, players - 1);
  const extraCost = fee * extraPlayers * Math.ceil(duration);

  return Math.round((baseCost + extraCost) * 100) / 100; // round to 2dp
}

async function expireStaleBookings() {
  await prisma.booking.updateMany({
    where: { status: "PENDING", lockExpiresAt: { lt: new Date() } },
    data: { status: "EXPIRED" },
  });
}

export async function POST(req) {
  try {
    await expireStaleBookings();

    const body = await req.json();
    const {
      stationId,
      bookingDate,
      startTime,
      endTime,
      durationHours,
      playerCount,
      userName,
      userEmail,
      userPhone,
    } = body;

    if (!stationId || !bookingDate || !startTime || !endTime || !userEmail || !userName || !userPhone) {
      return NextResponse.json({ error: "Missing required booking fields" }, { status: 400 });
    }

    const station = await prisma.station.findUnique({ where: { id: Number(stationId) } });
    if (!station || !station.isActive) {
      return NextResponse.json({ error: "Gaming station is invalid or inactive" }, { status: 400 });
    }

    // Validate player count against station limits
    const players = Number(playerCount) || 1;
    if (players < station.minPlayers || players > station.maxPlayers) {
      return NextResponse.json(
        { error: `This station allows ${station.minPlayers}–${station.maxPlayers} player(s).` },
        { status: 400 }
      );
    }

    const now = new Date();
    const requestedStart = timeToMinutes(startTime);
    const requestedEnd   = timeToMinutes(endTime);

    // Check for conflicting bookings on the same date
    const existingConflicts = await prisma.booking.findMany({
      where: {
        stationId: Number(stationId),
        bookingDate,
        OR: [
          { status: "CONFIRMED" },
          { status: "PENDING", lockExpiresAt: { gt: now } },
        ],
      },
    });

    const hasOverlap = existingConflicts.some((b) => {
      const bStart = timeToMinutes(b.startTime);
      const bEnd   = timeToMinutes(b.endTime);
      return requestedStart < bEnd && requestedEnd > bStart;
    });

    if (hasOverlap) {
      return NextResponse.json(
        { error: "Selected slot is no longer available. Please select another slot." },
        { status: 409 }
      );
    }

    const lockExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10-min lock
    const duration = Number(durationHours) || 1;

    const totalAmount = calculateTotal({
      hourlyRate: station.hourlyRate,
      durationHours: duration,
      playerCount: players,
      extraPlayerFee: station.extraPlayerFee,
    });

    const pendingBooking = await prisma.booking.create({
      data: {
        stationId: Number(stationId),
        userEmail,
        userName,
        userPhone,
        bookingDate,
        startTime,
        endTime,
        durationHours: duration,
        playerCount: players,
        totalAmount,
        status: "PENDING",
        lockExpiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      bookingId: pendingBooking.id,
      lockExpiresAt: pendingBooking.lockExpiresAt,
      totalAmount: pendingBooking.totalAmount,
      stationName: station.name,
      // Return pricing breakdown for receipt display
      pricingBreakdown: {
        baseCost: Math.round(station.hourlyRate * duration * 100) / 100,
        extraPlayers: players - 1,
        extraCost: Math.round(station.extraPlayerFee * Math.max(0, players - 1) * Math.ceil(duration) * 100) / 100,
        totalAmount: pendingBooking.totalAmount,
      },
    });
  } catch (error) {
    console.error("Slot Locking Error:", error);
    return NextResponse.json({ error: error.message || "Failed to reserve slot" }, { status: 500 });
  }
}
