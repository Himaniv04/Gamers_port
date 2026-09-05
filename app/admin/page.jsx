import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  const adminEmails = (process.env.CLERK_ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase());

  const userEmail = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();

  // If CLERK_ADMIN_EMAILS is configured, enforce strict access
  const isAuthorized = !adminEmails.length || (userEmail && adminEmails.includes(userEmail));

  if (!isAuthorized) {
    return (
      <div className="max-w-2xl mx-auto my-20 p-8 glass-panel rounded-3xl text-center space-y-4 border border-red-500/30">
        <h1 className="text-3xl font-extrabold text-red-400">ACCESS DENIED</h1>
        <p className="text-gray-300">
          Your account (<span className="text-cyan-400">{userEmail}</span>) is not listed as an authorized administrator.
        </p>
        <p className="text-xs text-gray-500 font-mono">
          Configure CLERK_ADMIN_EMAILS in .env to grant access.
        </p>
      </div>
    );
  }

  const [stations, bookings, posts, photos, operatingHours] = await Promise.all([
    prisma.station.findMany({ orderBy: [{ type: "asc" }, { name: "asc" }] }),
    prisma.booking.findMany({
      include: { station: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.post.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.gallery.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.operatingHours.findMany({ orderBy: { dayOfWeek: "asc" } }),
  ]);

  // Normalize: rename `station` relation to `stationId` field shape expected by AdminDashboardClient
  const normalizedBookings = bookings.map((b) => ({
    ...b,
    stationId: b.station,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AdminDashboardClient
        initialStations={JSON.parse(JSON.stringify(stations))}
        initialBookings={JSON.parse(JSON.stringify(normalizedBookings))}
        initialPosts={JSON.parse(JSON.stringify(posts))}
        initialPhotos={JSON.parse(JSON.stringify(photos))}
        initialHours={JSON.parse(JSON.stringify(operatingHours))}
      />
    </div>
  );
}
