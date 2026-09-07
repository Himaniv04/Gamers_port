import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** "HH:00" → integer minutes. Works with extended times like "26:00" (= 1560 min). */
const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + (m || 0);
};

/** Integer hour (may be > 23) → "HH:00" string. e.g. 26 → "26:00" */
const hourToTimeStr = (h) => `${String(h).padStart(2, "0")}:00`;

/**
 * Convert an extended hour to a human-readable label.
 * @param {number}  hour           - Raw hour value (may be > 23 for overnight slots)
 * @param {boolean} showNextDay    - When false, suppresses "(Next Day)" suffix.
 *                                   Use false for continuation slots viewed from the
 *                                   customer's selected date (they ARE that day's times).
 */
const formatDisplayTime = (hour, showNextDay = true) => {
  const realHour  = hour % 24;
  const isNextDay = hour >= 24;
  const period    = realHour < 12 ? "AM" : "PM";
  const display12 = realHour % 12 === 0 ? 12 : realHour % 12;
  return `${display12}:00 ${period}${(isNextDay && showNextDay) ? " (Next Day)" : ""}`;
};

/** Get YYYY-MM-DD string for a Date offset by `daysDelta`. */
const offsetDate = (dateStr, daysDelta) => {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + daysDelta);
  return d.toISOString().split("T")[0];
};

/** Expire stale PENDING bookings (replaces MongoDB TTL index). */
async function expireStaleBookings() {
  await prisma.booking.updateMany({
    where: { status: "PENDING", lockExpiresAt: { lt: new Date() } },
    data: { status: "EXPIRED" },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/slots/available?date=YYYY-MM-DD&stationId=N&duration=1
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");       // "YYYY-MM-DD"
    const stationId = searchParams.get("stationId");
    const duration = parseInt(searchParams.get("duration") || "1", 10);

    if (!date || !stationId) {
      return NextResponse.json(
        { error: "date (YYYY-MM-DD) and stationId are required" },
        { status: 400 }
      );
    }

    await expireStaleBookings();

    // ── Determine day of week (0=Sun … 6=Sat) ────────────────────────────────
    const dateObj = new Date(date + "T00:00:00Z");
    const dayOfWeek = dateObj.getUTCDay();
    const prevDayOfWeek = (dayOfWeek + 6) % 7;

    // ── Fetch operating hours ────────────────────────────────────────────────
    const [todayHours, prevHours] = await Promise.all([
      prisma.operatingHours.findUnique({ where: { dayOfWeek } }),
      prisma.operatingHours.findUnique({ where: { dayOfWeek: prevDayOfWeek } }),
    ]);

    // ── Fallback defaults if DB not seeded yet ────────────────────────────────
    const today = todayHours ?? { openHour: 8, closeHour: 22, isOvernight: false, isClosed: false };
    const prev  = prevHours  ?? { openHour: 8, closeHour: 22, isOvernight: false, isClosed: false };

    const isPrevOvernight = prev.isOvernight && !prev.isClosed;

    // ── CLOSED: today is closed AND not a continuation of an overnight prev day ──
    if (today.isClosed && !isPrevOvernight) {
      return NextResponse.json({
        date,
        stationId,
        durationHours: duration,
        isClosed: true,
        slots: [],
        message: "Shop is closed on this day.",
      });
    }

    // ── Slot generation plan ─────────────────────────────────────────────────
    // We may need to generate two sets of slots:
    //   A) Overnight CONTINUATION from previous day (if prev is overnight)
    //      → bookingDate = date-1, times are extended (≥24)
    //   B) Today's OWN slots (if today is not closed)
    //      → bookingDate = date, normal times (or extended if today is overnight)

    const slotGroups = [];

    // ── GROUP A: Overnight continuation from previous day ────────────────────
    if (isPrevOvernight) {
      const prevDate = offsetDate(date, -1);
      // Extension runs from midnight (hour 24) to prev.closeHour (e.g. 46)
      const contStart = 24;                          // midnight in extended hours
      const contEnd   = prev.closeHour;              // e.g. 46 (10 PM next day)

      if (contEnd > contStart + duration) {
        // Fetch active bookings for the PREVIOUS day (they hold the overnight slots)
        const now = new Date();
        const prevBookings = await prisma.booking.findMany({
          where: {
            stationId: Number(stationId),
            bookingDate: prevDate,
            OR: [
              { status: "CONFIRMED" },
              { status: "PENDING", lockExpiresAt: { gt: now } },
            ],
          },
        });

        for (let h = contStart; h <= contEnd - duration; h++) {
          const startTime = hourToTimeStr(h);
          const endTime   = hourToTimeStr(h + duration);

          const slotStartMin = timeToMinutes(startTime);
          const slotEndMin   = timeToMinutes(endTime);

          const booked = prevBookings.some((b) => {
            const bStart = timeToMinutes(b.startTime);
            const bEnd   = timeToMinutes(b.endTime);
            return slotStartMin < bEnd && slotEndMin > bStart;
          });

          // Real-hour display relative to midnight
          const realStartHour = h - 24;
          const realEndHour   = h + duration - 24;

          slotGroups.push({
            startTime,   // internal extended: "24:00", "25:00", …
            endTime,
            durationHours: duration,
            isAvailable: !booked,
            bookingDate: prevDate,
            // showNextDay=false: from the customer's Sunday view these are plain Sunday times
            displayStartTime: formatDisplayTime(h, false),
            displayEndTime:   formatDisplayTime(h + duration, false),
            isOvernightContinuation: true,
          });
        }
      }
    }

    // ── GROUP B: Today's own slots ────────────────────────────────────────────
    // Skip if the previous day was overnight — that session's continuation (Group A)
    // already covers today's entire window. Generating Group B too would produce
    // duplicate slots for any overlapping hours (e.g. 8 AM–10 PM shown twice).
    if (!today.isClosed && !isPrevOvernight) {
      const now = new Date();
      const todayBookings = await prisma.booking.findMany({
        where: {
          stationId: Number(stationId),
          bookingDate: date,
          OR: [
            { status: "CONFIRMED" },
            { status: "PENDING", lockExpiresAt: { gt: now } },
          ],
        },
      });

      const ownStart = today.openHour;
      const ownEnd   = today.closeHour; // may be > 23 if today is also overnight

      for (let h = ownStart; h <= ownEnd - duration; h++) {
        const startTime = hourToTimeStr(h);
        const endTime   = hourToTimeStr(h + duration);

        const slotStartMin = timeToMinutes(startTime);
        const slotEndMin   = timeToMinutes(endTime);

        const booked = todayBookings.some((b) => {
          const bStart = timeToMinutes(b.startTime);
          const bEnd   = timeToMinutes(b.endTime);
          return slotStartMin < bEnd && slotEndMin > bStart;
        });

        slotGroups.push({
          startTime,
          endTime,
          durationHours: duration,
          isAvailable: !booked,
          bookingDate: date,
          displayStartTime: formatDisplayTime(h),
          displayEndTime:   formatDisplayTime(h + duration),
          isOvernightContinuation: false,
        });
      }
    }

    return NextResponse.json({
      date,
      stationId,
      durationHours: duration,
      isClosed: false,
      operatingHours: {
        openHour:        today.openHour,
        closeHour:       today.closeHour,
        isOvernight:     today.isOvernight,
        minBookingHours: today.minBookingHours ?? 1,
        maxBookingHours: today.maxBookingHours ?? 4,
      },
      slots: slotGroups,
    });
  } catch (error) {
    console.error("Slot Availability Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to calculate slot availability" },
      { status: 500 }
    );
  }
}
