import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Booking from "@/models/Booking";

// Operating hours: 8 AM (08:00) to 10 PM (22:00)
const OPERATING_START_HOUR = 8;
const OPERATING_END_HOUR = 22;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date"); // Format: "YYYY-MM-DD"
    const stationId = searchParams.get("stationId");
    const duration = parseInt(searchParams.get("duration") || "1", 10);

    if (!date || !stationId) {
      return NextResponse.json(
        { error: "Date (YYYY-MM-DD) and stationId are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const now = new Date();

    // Find all active bookings (CONFIRMED or unexpired PENDING) for this station and date
    const activeBookings = await Booking.find({
      stationId,
      bookingDate: date,
      $or: [
        { status: "CONFIRMED" },
        { status: "PENDING", lockExpiresAt: { $gt: now } },
      ],
    });

    // Helper: Convert "HH:MM" string to minutes from 00:00
    const timeToMinutes = (timeStr) => {
      const [h, m] = timeStr.split(":").map(Number);
      return h * 60 + m;
    };

    // Helper: Check if slot [start, end] overlaps with any active booking
    const isSlotBooked = (slotStartStr, slotEndStr) => {
      const slotStart = timeToMinutes(slotStartStr);
      const slotEnd = timeToMinutes(slotEndStr);

      return activeBookings.some((booking) => {
        const bStart = timeToMinutes(booking.startTime);
        const bEnd = timeToMinutes(booking.endTime);
        // Overlap condition: slotStart < bEnd AND slotEnd > bStart
        return slotStart < bEnd && slotEnd > bStart;
      });
    };

    // Generate possible time slots for operating hours
    const slots = [];
    for (let hour = OPERATING_START_HOUR; hour <= OPERATING_END_HOUR - duration; hour++) {
      const startHourStr = hour.toString().padStart(2, "0") + ":00";
      const endHourStr = (hour + duration).toString().padStart(2, "0") + ":00";

      const booked = isSlotBooked(startHourStr, endHourStr);

      slots.push({
        startTime: startHourStr,
        endTime: endHourStr,
        durationHours: duration,
        isAvailable: !booked,
      });
    }

    return NextResponse.json({
      date,
      stationId,
      durationHours: duration,
      slots,
    });
  } catch (error) {
    console.error("Slot Availability Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to calculate slot availability" },
      { status: 500 }
    );
  }
}
