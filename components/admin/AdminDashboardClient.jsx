"use client";

import { useState } from "react";
import { Camera, Trophy, Calendar as CalendarIcon, Gamepad2, Upload, Trash2, Edit, Plus, RefreshCw, CheckCircle2, X } from "lucide-react";

export default function AdminDashboardClient({
  initialStations,
  initialBookings,
  initialPosts,
  initialPhotos,
}) {
  const [activeTab, setActiveTab] = useState("bookings"); // "bookings" | "photos" | "posts" | "stations"

  const [stations, setStations] = useState(initialStations);
  const [bookings, setBookings] = useState(initialBookings);
  const [posts, setPosts] = useState(initialPosts);
  const [photos, setPhotos] = useState(initialPhotos);

  // Upload States for Photo Gallery
  const [uploading, setUploading] = useState(false);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoCategory, setPhotoCategory] = useState("Ambience");
  const [photoFile, setPhotoFile] = useState(null);

  // Event / Post Form States
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postCategory, setPostCategory] = useState("ANNOUNCEMENT");
  const [postEventDate, setPostEventDate] = useState("");
  const [postBannerFile, setPostBannerFile] = useState(null);

  // Station Form States (Add & Update)
  const [editingStationId, setEditingStationId] = useState(null);
  const [stName, setStName] = useState("");
  const [stType, setStType] = useState("PC");
  const [stRate, setStRate] = useState("150");
  const [stSpecs, setStSpecs] = useState("RTX 4080, i9-14900K, 32GB DDR5, 240Hz OLED");
  const [stIsActive, setStIsActive] = useState(true);

  const [statusMsg, setStatusMsg] = useState("");

  // Seed Default Stations Helper
  const handleSeedStations = async () => {
    const defaultStations = [
      { name: "Pro Rig #1 - RTX 4090", type: "PC", specs: ["RTX 4090", "i9-14900K", "32GB DDR5", "240Hz OLED"], hourlyRate: 200, isActive: true },
      { name: "Pro Rig #2 - RTX 4080", type: "PC", specs: ["RTX 4080", "i7-13700K", "32GB DDR5", "240Hz OLED"], hourlyRate: 150, isActive: true },
      { name: "PS5 VIP Booth #1", type: "CONSOLE", specs: ["PlayStation 5", "55 inch 4K OLED", "DualSense Edge"], hourlyRate: 180, isActive: true },
      { name: "PS5 VIP Booth #2", type: "CONSOLE", specs: ["PlayStation 5", "55 inch 4K OLED", "DualSense Edge"], hourlyRate: 180, isActive: true },
      { name: "VR Quest 3 Simulator", type: "VR", specs: ["Meta Quest 3 512GB", "Haptic Racing Seat", "Wi-Fi 6E"], hourlyRate: 250, isActive: true },
    ];

    try {
      const res = await fetch("/api/stations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(defaultStations),
      });
      const data = await res.json();
      if (res.ok) {
        setStations(data);
        setStatusMsg("Successfully seeded default gaming stations!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ADD or UPDATE Gaming Station
  const handleAddOrUpdateStation = async (e) => {
    e.preventDefault();
    if (!stName || !stRate) {
      setStatusMsg("Station name and rate are required.");
      return;
    }

    setUploading(true);
    setStatusMsg("");

    try {
      if (editingStationId) {
        // UPDATE STATION (PUT)
        const res = await fetch("/api/stations", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingStationId,
            name: stName,
            type: stType,
            hourlyRate: stRate,
            specs: stSpecs,
            isActive: stIsActive,
          }),
        });

        const updated = await res.json();
        if (!res.ok) throw new Error(updated.error || "Failed to update station");

        setStations(stations.map((s) => (s._id === editingStationId ? updated : s)));
        setStatusMsg(`Station "${updated.name}" updated successfully!`);
        resetStationForm();
      } else {
        // ADD NEW STATION (POST)
        const res = await fetch("/api/stations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: stName,
            type: stType,
            hourlyRate: stRate,
            specs: stSpecs,
            isActive: stIsActive,
          }),
        });

        const newStation = await res.json();
        if (!res.ok) throw new Error(newStation.error || "Failed to create station");

        setStations([...stations, newStation]);
        setStatusMsg(`New station "${newStation.name}" added successfully!`);
        resetStationForm();
      }
    } catch (err) {
      setStatusMsg(`Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Populate form for Editing Station
  const handleEditClick = (station) => {
    setEditingStationId(station._id);
    setStName(station.name);
    setStType(station.type);
    setStRate(station.hourlyRate);
    setStSpecs(Array.isArray(station.specs) ? station.specs.join(", ") : "");
    setStIsActive(station.isActive !== false);
  };

  // Reset Station Form
  const resetStationForm = () => {
    setEditingStationId(null);
    setStName("");
    setStType("PC");
    setStRate("150");
    setStSpecs("");
    setStIsActive(true);
  };

  // DELETE Station
  const handleDeleteStation = async (id, name) => {
    if (!confirm(`Are you sure you want to delete station "${name}"?`)) return;

    try {
      const res = await fetch(`/api/stations?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to delete station");

      setStations(stations.filter((s) => s._id !== id));
      setStatusMsg(`Station "${name}" deleted successfully!`);
      if (editingStationId === id) resetStationForm();
    } catch (err) {
      setStatusMsg(`Delete Error: ${err.message}`);
    }
  };

  // Upload Photo to Cloudinary & Save to Gallery
  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    if (!photoFile || !photoTitle) return;

    setUploading(true);
    setStatusMsg("");

    try {
      const formData = new FormData();
      formData.append("file", photoFile);

      const upRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const upData = await upRes.json();
      if (!upRes.ok) throw new Error(upData.error || "Upload failed");

      const metaRes = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: photoTitle,
          category: photoCategory,
          imageUrl: upData.url,
          publicId: upData.publicId,
        }),
      });

      const newPhoto = await metaRes.json();
      if (metaRes.ok) {
        setPhotos([newPhoto, ...photos]);
        setPhotoTitle("");
        setPhotoFile(null);
        setStatusMsg("Photo uploaded and saved to gallery!");
      }
    } catch (err) {
      setStatusMsg(`Upload Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Delete Photo
  const handleDeletePhoto = async (id) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setPhotos(photos.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Create Post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postBannerFile || !postTitle || !postDesc) return;

    setUploading(true);
    setStatusMsg("");

    try {
      const formData = new FormData();
      formData.append("file", postBannerFile);

      const upRes = await fetch("/api/upload", { method: "POST", body: formData });
      const upData = await upRes.json();

      if (!upRes.ok) throw new Error(upData.error || "Banner upload failed");

      const postRes = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: postTitle,
          description: postDesc,
          category: postCategory,
          eventDate: postEventDate,
          bannerUrl: upData.url,
          bannerPublicId: upData.publicId,
        }),
      });

      const newPost = await postRes.json();
      if (postRes.ok) {
        setPosts([newPost, ...posts]);
        setPostTitle("");
        setPostDesc("");
        setPostBannerFile(null);
        setStatusMsg("Event / Announcement published!");
      }
    } catch (err) {
      setStatusMsg(`Post Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Delete Post
  const handleDeletePost = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white uppercase tracking-wider">
            ADMIN <span className="text-cyan-400">CONTROL CENTER</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Manage slot bookings, upload lounge gallery media, publish esports events, and configure stations.
          </p>
        </div>

        {statusMsg && (
          <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400 text-cyan-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {statusMsg}
          </div>
        )}
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-4">
        {[
          { id: "bookings", label: `Bookings (${bookings.length})`, icon: CalendarIcon },
          { id: "photos", label: `Gallery Manager (${photos.length})`, icon: Camera },
          { id: "posts", label: `Events & Posts (${posts.length})`, icon: Trophy },
          { id: "stations", label: `Stations (${stations.length})`, icon: Gamepad2 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                  : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: BOOKINGS CALENDAR GRID */}
      {activeTab === "bookings" && (
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-bold text-white">All Customer Bookings</h2>
          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 uppercase">
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Station</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Time Slot</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {bookings.map((b) => (
                    <tr key={b._id} className="hover:bg-gray-800/30">
                      <td className="py-3.5 px-4 font-sans font-medium text-white">
                        <div>{b.userName}</div>
                        <div className="text-xs text-gray-400">{b.userEmail}</div>
                      </td>
                      <td className="py-3.5 px-4 text-cyan-400">{b.stationId?.name || "Station"}</td>
                      <td className="py-3.5 px-4 text-gray-300">{b.bookingDate}</td>
                      <td className="py-3.5 px-4 text-white font-bold">{b.startTime} - {b.endTime}</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-bold">₹{b.totalAmount}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            b.status === "CONFIRMED"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : b.status === "PENDING"
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">No customer bookings found.</div>
          )}
        </div>
      )}

      {/* TAB 2: GALLERY MANAGER */}
      {activeTab === "photos" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleUploadPhoto} className="glass-panel p-6 rounded-2xl space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyan-400" /> Upload New Photo
            </h2>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Image Title</label>
              <input
                type="text"
                required
                value={photoTitle}
                onChange={(e) => setPhotoTitle(e.target.value)}
                placeholder="e.g., RTX 4090 Arena Setup"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
              <select
                value={photoCategory}
                onChange={(e) => setPhotoCategory(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm mt-1"
              >
                <option value="Rigs">Rigs</option>
                <option value="Ambience">Ambience</option>
                <option value="Consoles">Consoles</option>
                <option value="Tournaments">Tournaments</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Select File</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setPhotoFile(e.target.files[0])}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2 text-white text-xs mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold font-display hover:bg-cyan-400 transition-all"
            >
              {uploading ? "Uploading to Cloudinary..." : "Upload Photo"}
            </button>
          </form>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {photos.map((p) => (
              <div key={p._id} className="relative h-48 rounded-xl overflow-hidden glass-panel group">
                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-cyan-400">{p.category}</span>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white truncate">{p.title}</span>
                    <button
                      onClick={() => handleDeletePhoto(p._id)}
                      className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: POSTS & EVENTS */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleCreatePost} className="glass-panel p-6 rounded-2xl space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-400" /> Create Event / Post
            </h2>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Post Title</label>
              <input
                type="text"
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="e.g., Valorant 5v5 Cup"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Short Description</label>
              <textarea
                required
                rows={3}
                value={postDesc}
                onChange={(e) => setPostDesc(e.target.value)}
                placeholder="Details about prize pool, entry fee..."
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs mt-1"
                >
                  <option value="TOURNAMENT">TOURNAMENT</option>
                  <option value="OFFER">OFFER</option>
                  <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Event Date</label>
                <input
                  type="date"
                  value={postEventDate}
                  onChange={(e) => setPostEventDate(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setPostBannerFile(e.target.files[0])}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2 text-white text-xs mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold font-display hover:bg-purple-500 transition-all"
            >
              {uploading ? "Publishing..." : "Publish Post"}
            </button>
          </form>

          <div className="lg:col-span-2 space-y-4">
            {posts.map((p) => (
              <div key={p._id} className="glass-panel p-4 rounded-xl flex items-center justify-between gap-4">
                <img src={p.bannerUrl} alt={p.title} className="w-24 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <span className="text-[10px] font-mono text-purple-400 uppercase">{p.category}</span>
                  <h3 className="font-bold text-white text-base">{p.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1">{p.description}</p>
                </div>
                <button
                  onClick={() => handleDeletePost(p._id)}
                  className="p-2.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STATIONS MANAGER (FULL CRUD: ADD, UPDATE, DELETE, SEED) */}
      {activeTab === "stations" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ADD / EDIT STATION FORM */}
          <form onSubmit={handleAddOrUpdateStation} className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {editingStationId ? (
                  <>
                    <Edit className="w-5 h-5 text-cyan-400" /> Edit Station
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-cyan-400" /> Add Gaming Station
                  </>
                )}
              </h2>
              {editingStationId && (
                <button
                  type="button"
                  onClick={resetStationForm}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Station Name</label>
              <input
                type="text"
                required
                value={stName}
                onChange={(e) => setStName(e.target.value)}
                placeholder="e.g., Pro Rig #3 - RTX 4090"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Station Type</label>
                <select
                  value={stType}
                  onChange={(e) => setStType(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs mt-1"
                >
                  <option value="PC">PC Rig</option>
                  <option value="CONSOLE">Console Booth (PS5)</option>
                  <option value="VR">VR Simulator</option>
                  <option value="SIMULATOR">Racing Simulator</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Hourly Rate (₹)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={stRate}
                  onChange={(e) => setStRate(e.target.value)}
                  placeholder="150"
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">
                Hardware Specs (Comma Separated)
              </label>
              <input
                type="text"
                value={stSpecs}
                onChange={(e) => setStSpecs(e.target.value)}
                placeholder="e.g., RTX 4090, i9-14900K, 240Hz OLED"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm mt-1"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <label className="flex items-center gap-2 text-xs text-gray-300 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={stIsActive}
                  onChange={(e) => setStIsActive(e.target.checked)}
                  className="w-4 h-4 rounded bg-gray-900 border-gray-800 text-cyan-400 focus:ring-0"
                />
                Station Active for Bookings
              </label>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-3 rounded-xl font-bold font-display transition-all ${
                editingStationId
                  ? "bg-amber-500 text-black hover:bg-amber-400"
                  : "bg-cyan-500 text-black hover:bg-cyan-400"
              }`}
            >
              {uploading
                ? "Saving..."
                : editingStationId
                ? "Update Station"
                : "Add Gaming Station"}
            </button>
          </form>

          {/* STATION LIST GRID */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Configured Gaming Stations</h2>
              <button
                onClick={handleSeedStations}
                className="px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-cyan-400 font-bold font-display text-xs flex items-center gap-2 border border-cyan-500/20"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-seed Defaults
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stations.map((s) => (
                <div
                  key={s._id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                    editingStationId === s._id
                      ? "bg-cyan-950/30 border-cyan-400 neon-border-cyan"
                      : "bg-gray-900/80 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                        {s.type}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          s.isActive !== false
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {s.isActive !== false ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base">{s.name}</h3>
                    <div className="text-xs text-emerald-400 font-bold font-display">
                      ₹{s.hourlyRate}/hour
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {s.specs?.map((spec, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-800/60">
                    <button
                      onClick={() => handleEditClick(s)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStation(s._id, s.name)}
                      className="px-3 py-1.5 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
