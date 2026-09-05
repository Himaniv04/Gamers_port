import Link from "next/link";
import { Gamepad2, Cpu, Monitor, Zap, Trophy, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import prisma from "@/lib/db";

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

async function getFeaturedData() {
  try {
    const stations = await prisma.station.findMany({
      where: { isActive: true },
      take: 3,
    });
    const latestEvent = await prisma.post.findFirst({
      where: { category: "TOURNAMENT", isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    return { stations, latestEvent };
  } catch (error) {
    return { stations: [], latestEvent: null };
  }
}

export default async function HomePage() {
  const { stations, latestEvent } = await getFeaturedData();

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-24 border-b border-cyan-500/10">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/40 via-purple-600/40 to-pink-500/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4" /> NEXT-GEN GAMING PORTAL &amp; CAFE
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-none">
            UNLEASH YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">ULTIMATE POTENTIAL</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 font-light leading-relaxed">
            Experience ultra-low latency 240Hz gaming rigs, 4K PlayStation 5 booths, and immersive Meta Quest VR simulators. Reserve your spot in real time with instant payment verification.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/book-slot"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-display text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-black hover:from-cyan-300 hover:to-blue-500 neon-glow-cyan transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Gamepad2 className="w-5 h-5" /> Reserve A Slot Now
            </Link>
            <Link
              href="/events"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-display text-lg font-bold glass-panel text-white hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Tournaments <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED STATIONS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider">
            FEATURED <span className="text-cyan-400">GAMING RIGS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Equipped with top-tier hardware, ultra-fast fiber optics, and ergonomic Secretlab seating.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stations.length > 0 ? (
            stations.map((st) => (
              <div
                key={st.id}
                className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 space-y-6"
              >
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {st.type}
                  </span>
                  <span className="text-2xl font-extrabold font-display text-white">
                    ₹{st.hourlyRate}<span className="text-sm font-normal text-gray-400">/hr</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{st.name}</h3>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {st.specs?.map((spec, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded bg-gray-800 text-gray-300">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/book-slot?stationId=${st.id}`}
                  className="block text-center w-full py-3 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black font-bold font-display transition-all duration-200"
                >
                  Book This Station
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 glass-panel rounded-2xl text-gray-400">
              High-end gaming stations loading... Visit our slot booking page to see all availability.
            </div>
          )}
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl space-y-4">
            <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Real-Time Slot Engine</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Instant slot locking with zero double booking risks. Your slot is guaranteed once reserved.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-4">
            <div className="p-3 w-fit rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Weekly Esports Events</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Participate in Valorant, Tekken 8, EA FC 24, and Counter-Strike 2 tournaments with cash prize pools.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-4">
            <div className="p-3 w-fit rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Instant Payment Verification</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Powered by Razorpay &amp; Stripe with automated webhook confirmation and instant digital pass receipt.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
