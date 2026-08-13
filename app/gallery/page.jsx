import connectToDatabase from "@/lib/db";
import Gallery from "@/models/Gallery";
import Image from "next/image";
import { Image as ImageIcon, Camera } from "lucide-react";

export const revalidate = 30;

async function getGalleryPhotos() {
  try {
    await connectToDatabase();
    const photos = await Gallery.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(photos));
  } catch (error) {
    return [];
  }
}

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold">
          <Camera className="w-4 h-4" /> VIBE & HARDWARE GALLERY
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-wider">
          GAMING LOUNGE <span className="text-cyan-400">GALLERY</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our state-of-the-art gaming setups, tournament arenas, and lounge environment.
        </p>
      </div>

      {photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo._id}
              className="group relative h-80 rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                  {photo.category}
                </span>
                <h3 className="text-xl font-bold text-white">{photo.title}</h3>
                {photo.tags && photo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {photo.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-gray-800/80 text-gray-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-3xl space-y-4">
          <ImageIcon className="w-16 h-16 text-cyan-500/40 mx-auto" />
          <h3 className="text-2xl font-bold text-white">Gallery Photos Uploading Soon</h3>
          <p className="text-gray-400">Our admin is curating the latest photos of our lounge and tournament rigs.</p>
        </div>
      )}
    </div>
  );
}
