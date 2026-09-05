import prisma from "@/lib/db";
import { Trophy, Calendar, Sparkles, Tag } from "lucide-react";

export const revalidate = 30;

async function getEventsAndPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    return posts;
  } catch (error) {
    return [];
  }
}

export default async function EventsPage() {
  const posts = await getEventsAndPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-semibold">
          <Trophy className="w-4 h-4" /> TOURNAMENTS &amp; ANNOUNCEMENTS
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-wider">
          EVENTS &amp; <span className="text-purple-400">NEWS</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Stay updated with upcoming LAN tournaments, weekend deals, and community announcements.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="glass-panel rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-64 w-full">
                <img
                  src={post.bannerUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-600 text-white shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {post.eventDate && (
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <Calendar className="w-4 h-4" /> Event Date: {new Date(post.eventDate).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-white hover:text-purple-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {post.description}
                  </p>
                </div>

                {post.content && (
                  <div className="pt-4 border-t border-gray-800 text-xs text-gray-400">
                    {post.content}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-3xl space-y-4">
          <Trophy className="w-16 h-16 text-purple-500/40 mx-auto" />
          <h3 className="text-2xl font-bold text-white">No Upcoming Events Announced</h3>
          <p className="text-gray-400">Check back soon for upcoming esports tournaments and special offers!</p>
        </div>
      )}
    </div>
  );
}
