import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

// Default schedule used when the table is empty
const DEFAULT_HOURS = [
  { dayOfWeek: 0, openHour: 8,  closeHour: 22, isOvernight: false, isClosed: true  }, // Sunday: Closed
  { dayOfWeek: 1, openHour: 8,  closeHour: 22, isOvernight: false, isClosed: false }, // Monday
  { dayOfWeek: 2, openHour: 8,  closeHour: 22, isOvernight: false, isClosed: false }, // Tuesday
  { dayOfWeek: 3, openHour: 8,  closeHour: 22, isOvernight: false, isClosed: false }, // Wednesday
  { dayOfWeek: 4, openHour: 8,  closeHour: 22, isOvernight: false, isClosed: false }, // Thursday
  { dayOfWeek: 5, openHour: 8,  closeHour: 22, isOvernight: false, isClosed: false }, // Friday
  { dayOfWeek: 6, openHour: 8,  closeHour: 46, isOvernight: true,  isClosed: false }, // Saturday (overnight → Sunday 10 PM)
];

async function verifyAdmin() {
  const { userId } = await auth();
  if (!userId) return false;
  const user = await currentUser();
  const adminEmails = (process.env.CLERK_ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase());
  const userEmail = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  return userEmail && (adminEmails.length === 0 || adminEmails.includes(userEmail));
}

// GET: Return all 7 days' operating hours (auto-seeds if empty)
export async function GET() {
  try {
    let hours = await prisma.operatingHours.findMany({
      orderBy: { dayOfWeek: "asc" },
    });

    // Auto-seed defaults if table is empty
    if (hours.length === 0) {
      await prisma.operatingHours.createMany({ data: DEFAULT_HOURS });
      hours = await prisma.operatingHours.findMany({ orderBy: { dayOfWeek: "asc" } });
    }

    return NextResponse.json(hours);
  } catch (error) {
    console.error("Operating Hours GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch operating hours" }, { status: 500 });
  }
}

// PUT: Admin updates one or more days' operating hours
// Body: array of { dayOfWeek, openHour, closeHour, isOvernight, isClosed }
export async function PUT(req) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const updates = Array.isArray(body) ? body : [body];

    const results = await Promise.all(
      updates.map(async ({ dayOfWeek, openHour, closeHour, isOvernight, isClosed }) => {
        // Validate
        if (dayOfWeek < 0 || dayOfWeek > 6) throw new Error(`Invalid dayOfWeek: ${dayOfWeek}`);
        if (!isClosed && (openHour < 0 || openHour > 23)) throw new Error("openHour must be 0–23");
        if (!isClosed && (closeHour < 1 || closeHour > 47)) throw new Error("closeHour must be 1–47");

        return prisma.operatingHours.upsert({
          where: { dayOfWeek },
          update: {
            openHour: isClosed ? 8 : Number(openHour),
            closeHour: isClosed ? 22 : Number(closeHour),
            isOvernight: Boolean(isOvernight),
            isClosed: Boolean(isClosed),
          },
          create: {
            dayOfWeek: Number(dayOfWeek),
            openHour: isClosed ? 8 : Number(openHour),
            closeHour: isClosed ? 22 : Number(closeHour),
            isOvernight: Boolean(isOvernight),
            isClosed: Boolean(isClosed),
          },
        });
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("Operating Hours PUT Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update operating hours" }, { status: 500 });
  }
}
