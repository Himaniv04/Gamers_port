import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// Helper: Convert "HH:MM" string to total minutes
const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

// Helper: expire stale PENDING bookings (replaces MongoDB TTL index)
async function expireStaleBookings() {
  await prisma.booking.updateMany({
    where: {
      status: "PENDING",
      lockExpiresAt: { lt: new Date() },
    },
    data: { status: "EXPIRED" },
  });
}

export async function POST(req) {
  try {
    // Expire stale locks before checking availability
    await expireStaleBookings();

    const body = await req.json();

    const {
      stationId,
      bookingDate,
      startTime,
      endTime,
      durationHours,
      userName,
      userEmail,
      userPhone,
    } = body;

    if (
      !stationId ||
      !bookingDate ||
      !startTime ||
      !endTime ||
      !userEmail ||
      !userName ||
      !userPhone
    ) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 }
      );
    }

    const station = await prisma.station.findUnique({
      where: { id: Number(stationId) },
    });
    if (!station || !station.isActive) {
      return NextResponse.json(
        { error: "Gaming station is invalid or inactive" },
        { status: 400 }
      );
    }

    const now = new Date();
    const requestedStart = timeToMinutes(startTime);
    const requestedEnd = timeToMinutes(endTime);

    // Find any conflicting booking for same station and date
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

    const hasOverlap = existingConflicts.some((booking) => {
      const bStart = timeToMinutes(booking.startTime);
      const bEnd = timeToMinutes(booking.endTime);
      return requestedStart < bEnd && requestedEnd > bStart;
    });

    if (hasOverlap) {
      return NextResponse.json(
        { error: "Selected slot is no longer available. Please select another slot." },
        { status: 409 }
      );
    }

    // Lock slot for 10 minutes (600,000 milliseconds)
    const lockExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const duration = durationHours || 1;
    const totalAmount = station.hourlyRate * duration;

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
    });
  } catch (error) {
    console.error("Slot Locking Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to reserve slot" },
      { status: 500 }
    );
  }
}
