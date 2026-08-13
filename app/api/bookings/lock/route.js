import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Booking from "@/models/Booking";
import Station from "@/models/Station";

// Helper: Convert "HH:MM" string to total minutes
const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

export async function POST(req) {
  try {
    await connectToDatabase();
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

    const station = await Station.findById(stationId);
    if (!station || !station.isActive) {
      return NextResponse.json(
        { error: "Gaming station is invalid or inactive" },
        { status: 400 }
      );
    }

    const now = new Date();
    const requestedStart = timeToMinutes(startTime);
    const requestedEnd = timeToMinutes(endTime);

    // Lock condition check: Find any conflicting booking for same station and date
    const existingConflicts = await Booking.find({
      stationId,
      bookingDate,
      $or: [
        { status: "CONFIRMED" },
        { status: "PENDING", lockExpiresAt: { $gt: now } },
      ],
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

    const pendingBooking = await Booking.create({
      stationId,
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
    });

    return NextResponse.json({
      success: true,
      bookingId: pendingBooking._id,
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
