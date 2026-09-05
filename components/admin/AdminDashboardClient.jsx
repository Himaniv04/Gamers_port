"use client";

import { useState } from "react";
import { Camera, Trophy, Calendar as CalendarIcon, Gamepad2, Upload, Trash2, Edit, Plus, RefreshCw, CheckCircle2, X, Clock } from "lucide-react";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Format closeHour for display in Hours tab
function formatHourLabel(hour) {
  const realHour = hour % 24;
  const isNextDay = hour >= 24;
  const period = realHour < 12 ? "AM" : "PM";
  const display = realHour % 12 === 0 ? 12 : realHour % 12;
  return `${display}:00 ${period}${isNextDay ? " (Next Day)" : ""}`;
}

export default function AdminDashboardClient({
  initialStations,
  initialBookings,
  initialPosts,
  initialPhotos,
  initialHours,
}) {
  const [activeTab, setActiveTab] = useState("bookings"); // "bookings" | "photos" | "posts" | "stations" | "hours"

  const [stations, setStations] = useState(initialStations);
  const [bookings, setBookings] = useState(initialBookings);
  const [posts, setPosts] = useState(initialPosts);
  const [photos, setPhotos] = useState(initialPhotos);

  // ── Operating Hours State ────────────────────────────────────────────────
  const defaultHours = Array.from({ length: 7 }, (_, i) => ({
    dayOfWeek: i,
    openHour: 8,
    closeHour: i === 6 ? 46 : 22,
    isOvernight: i === 6,
    isClosed: i === 0,
  }));
  const [hours, setHours] = useState(
    initialHours?.length === 7 ? initialHours : defaultHours
  );
  const [hoursSaving, setHoursSaving] = useState(false);
  const [hoursMsg, setHoursMsg] = useState("");

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

  // ── Hours Tab Helpers ────────────────────────────────────────────────────
  const updateDayHours = (dayOfWeek, field, value) => {
    setHours((prev) =>
      prev.map((d) => (d.dayOfWeek === dayOfWeek ? { ...d, [field]: value } : d))
    );
  };

  const handleSaveHours = async () => {
    setHoursSaving(true);
    setHoursMsg("");
    try {
      const res = await fetch("/api/admin/operating-hours", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hours),
      });
      if (res.ok) {
        const updated = await res.json();
        setHours(updated);
        setHoursMsg("Operating hours saved successfully!");
      } else {
        const data = await res.json();
        setHoursMsg(data.error || "Failed to save hours.");
      }
    } catch {
      setHoursMsg("Network error saving hours.");
    } finally {
      setHoursSaving(false);
    }
  };

  // Seed Default Stations Helper
  const handleSeedStations = async () => {
    if (!confirm("This will delete ALL existing stations and replace them with the defaults. Continue?")) return;
    try {
      const res = await fetch("/api/stations?seed=true", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "seed" }),
      });
      const data = await res.json();
      if (res.ok) {
        setStations(data);
        setStatusMsg("Successfully re-seeded default gaming stations!");
      } else {
        setStatusMsg(data.error || "Failed to re-seed stations.");
      }
    } catch {
      setStatusMsg("Error re-seeding stations.");
    }
  };

  // ADD or UPDATE Gaming Station
  const handleAddOrUpdateStation = async (e) => {
    e.preventDefault();
    if (!stName || !stRate) { setStatusMsg("Station name and rate are required."); return; }
    setUploading(true);
    setStatusMsg("");
    try {
      if (editingStationId) {
        const res = await fetch("/api/stations", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingStationId, name: stName, type: stType, hourlyRate: stRate, specs: stSpecs, isActive: stIsActive }),
        });
        const updated = await res.json();
        if (!res.ok) throw new Error(updated.error || "Failed to update station");
        setStations(stations.map((s) => (s.id === editingStationId ? updated : s)));
        setStatusMsg(`Station "${updated.name}" updated successfully!`);
        resetStationForm();
      } else {
        const res = await fetch("/api/stations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: stName, type: stType, hourlyRate: stRate, specs: stSpecs, isActive: stIsActive }),
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

  const handleEditClick = (station) => {
    setEditingStationId(station.id);
    setStName(station.name);
    setStType(station.type);
    setStRate(station.hourlyRate);
    setStSpecs(Array.isArray(station.specs) ? station.specs.join(", ") : "");
    setStIsActive(station.isActive !== false);
  };

  const resetStationForm = () => {
    setEditingStationId(null);
    setStName(""); setStType("PC"); setStRate("150"); setStSpecs(""); setStIsActive(true);
  };

  const handleDeleteStation = async (id, name) => {
    if (!confirm(`Are you sure you want to delete station "${name}"?`)) return;
    try {
      const res = await fetch(`/api/stations?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete station");
      setStations(stations.filter((s) => s.id !== id));
      setStatusMsg(`Station "${name}" deleted successfully!`);
      if (editingStationId === id) resetStationForm();
    } catch (err) {
      setStatusMsg(`Delete Error: ${err.message}`);
    }
  };

  // Upload Photo
  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    if (!photoFile || !photoTitle) return;
    setUploading(true); setStatusMsg("");
    try {
      const formData = new FormData();
      formData.append("file", photoFile);
      const upRes = await fetch("/api/upload", { method: "POST", body: formData });
      const upData = await upRes.json();
      if (!upRes.ok) throw new Error(upData.error || "Upload failed");
      const metaRes = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: photoTitle, category: photoCategory, imageUrl: upData.url, publicId: upData.publicId }),
      });
      const newPhoto = await metaRes.json();
      if (metaRes.ok) {
        setPhotos([newPhoto, ...photos]);
        setPhotoTitle(""); setPhotoFile(null);
        setStatusMsg("Photo uploaded and saved to gallery!");
      }
    } catch (err) {
      setStatusMsg(`Upload Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (id) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) setPhotos(photos.filter((p) => p.id !== id));
    } catch (err) { console.error(err); }
  };

  // Create Post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postBannerFile || !postTitle || !postDesc) return;
    setUploading(true); setStatusMsg("");
    try {
      const formData = new FormData();
      formData.append("file", postBannerFile);
      const upRes = await fetch("/api/upload", { method: "POST", body: formData });
      const upData = await upRes.json();
      if (!upRes.ok) throw new Error(upData.error || "Banner upload failed");
      const postRes = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: postTitle, description: postDesc, category: postCategory, eventDate: postEventDate, bannerUrl: upData.url, bannerPublicId: upData.publicId }),
      });
      const newPost = await postRes.json();
      if (postRes.ok) {
        setPosts([newPost, ...posts]);
        setPostTitle(""); setPostDesc(""); setPostBannerFile(null);
        setStatusMsg("Event / Announcement published!");
      }
    } catch (err) {
      setStatusMsg(`Post Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
      if (res.ok) setPosts(posts.filter((p) => p.id !== id));
    } catch (err) { console.error(err); }
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
            Manage slot bookings, gallery, events, stations, and business hours.
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
          { id: "bookings",  label: `Bookings (${bookings.length})`,    icon: CalendarIcon },
          { id: "photos",    label: `Gallery (${photos.length})`,        icon: Camera },
          { id: "posts",     label: `Events & Posts (${posts.length})`,  icon: Trophy },
          { id: "stations",  label: `Stations (${stations.length})`,     icon: Gamepad2 },
          { id: "hours",     label: "Business Hours",                    icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              id={`admin-tab-${tab.id}`}
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

      {/* ── TAB: BOOKINGS ─────────────────────────────────────────────────────── */}
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
                    <tr key={b.id} className="hover:bg-gray-800/30">
                      <td className="py-3.5 px-4 font-sans font-medium text-white">
                        <div>{b.userName}</div>
                        <div className="text-xs text-gray-400">{b.userEmail}</div>
                      </td>
                      <td className="py-3.5 px-4 text-cyan-400">{b.stationId?.name || b.station?.name || "Station"}</td>
                      <td className="py-3.5 px-4 text-gray-300">{b.bookingDate}</td>
                      <td className="py-3.5 px-4 text-white font-bold">{b.startTime} – {b.endTime}</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-bold">₹{b.totalAmount}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          b.status === "CONFIRMED"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : b.status === "PENDING"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}>
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

      {/* ── TAB: GALLERY ──────────────────────────────────────────────────────── */}
      {activeTab === "photos" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleUploadPhoto} className="glass-panel p-6 rounded-2xl space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyan-400" /> Upload New Photo
            </h2>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Image Title</label>
              <input type="text" required value={photoTitle} onChange={(e) => setPhotoTitle(e.target.value)} placeholder="e.g., RTX 4090 Arena Setup" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm mt-1" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
              <select value={photoCategory} onChange={(e) => setPhotoCategory(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm mt-1">
                <option value="Rigs">Rigs</option>
                <option value="Ambience">Ambience</option>
                <option value="Consoles">Consoles</option>
                <option value="Tournaments">Tournaments</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Select File</label>
              <input type="file" accept="image/*" required onChange={(e) => setPhotoFile(e.target.files[0])} className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2 text-white text-xs mt-1" />
            </div>
            <button type="submit" disabled={uploading} className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold font-display hover:bg-cyan-400 transition-all">
              {uploading ? "Uploading to Cloudinary..." : "Upload Photo"}
            </button>
          </form>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {photos.map((p) => (
              <div key={p.id} className="relative h-48 rounded-xl overflow-hidden glass-panel group">
                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-cyan-400">{p.category}</span>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white truncate">{p.title}</span>
                    <button onClick={() => handleDeletePhoto(p.id)} className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: POSTS & EVENTS ───────────────────────────────────────────────── */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleCreatePost} className="glass-panel p-6 rounded-2xl space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-400" /> Create Event / Post
            </h2>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Post Title</label>
              <input type="text" required value={postTitle} onChange={(e) => setPostTitle(e.target.value)} placeholder="e.g., Valorant 5v5 Cup" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm mt-1" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Short Description</label>
              <textarea required rows={3} value={postDesc} onChange={(e) => setPostDesc(e.target.value)} placeholder="Details about prize pool, entry fee..." className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
                <select value={postCategory} onChange={(e) => setPostCategory(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs mt-1">
                  <option value="TOURNAMENT">TOURNAMENT</option>
                  <option value="OFFER">OFFER</option>
                  <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Event Date</label>
                <input type="date" value={postEventDate} onChange={(e) => setPostEventDate(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs mt-1" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Banner Image</label>
              <input type="file" accept="image/*" required onChange={(e) => setPostBannerFile(e.target.files[0])} className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2 text-white text-xs mt-1" />
            </div>
            <button type="submit" disabled={uploading} className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold font-display hover:bg-purple-500 transition-all">
              {uploading ? "Publishing..." : "Publish Post"}
            </button>
          </form>

          <div className="lg:col-span-2 space-y-4">
            {posts.map((p) => (
              <div key={p.id} className="glass-panel p-4 rounded-xl flex items-center justify-between gap-4">
                <img src={p.bannerUrl} alt={p.title} className="w-24 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <span className="text-[10px] font-mono text-purple-400 uppercase">{p.category}</span>
                  <h3 className="font-bold text-white text-base">{p.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1">{p.description}</p>
                </div>
                <button onClick={() => handleDeletePost(p.id)} className="p-2.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: STATIONS ─────────────────────────────────────────────────────── */}
      {activeTab === "stations" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleAddOrUpdateStation} className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {editingStationId ? <><Edit className="w-5 h-5 text-cyan-400" /> Edit Station</> : <><Plus className="w-5 h-5 text-cyan-400" /> Add Gaming Station</>}
              </h2>
              {editingStationId && (
                <button type="button" onClick={resetStationForm} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
              )}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Station Name</label>
              <input type="text" required value={stName} onChange={(e) => setStName(e.target.value)} placeholder="e.g., Pro Rig #3 - RTX 4090" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Station Type</label>
                <select value={stType} onChange={(e) => setStType(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs mt-1">
                  <option value="PC">PC Rig</option>
                  <option value="CONSOLE">Console Booth (PS5)</option>
                  <option value="VR">VR Simulator</option>
                  <option value="SIMULATOR">Racing Simulator</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Hourly Rate (₹)</label>
                <input type="number" required min="0" value={stRate} onChange={(e) => setStRate(e.target.value)} placeholder="150" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs mt-1" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Hardware Specs (Comma Separated)</label>
              <input type="text" value={stSpecs} onChange={(e) => setStSpecs(e.target.value)} placeholder="e.g., RTX 4090, i9-14900K, 240Hz OLED" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm mt-1" />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <label className="flex items-center gap-2 text-xs text-gray-300 font-bold cursor-pointer">
                <input type="checkbox" checked={stIsActive} onChange={(e) => setStIsActive(e.target.checked)} className="w-4 h-4 rounded bg-gray-900 border-gray-800 text-cyan-400 focus:ring-0" />
                Station Active for Bookings
              </label>
            </div>
            <button type="submit" disabled={uploading} className={`w-full py-3 rounded-xl font-bold font-display transition-all ${editingStationId ? "bg-amber-500 text-black hover:bg-amber-400" : "bg-cyan-500 text-black hover:bg-cyan-400"}`}>
              {uploading ? "Saving..." : editingStationId ? "Update Station" : "Add Gaming Station"}
            </button>
          </form>

          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Configured Gaming Stations</h2>
              <button onClick={handleSeedStations} className="px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-cyan-400 font-bold font-display text-xs flex items-center gap-2 border border-cyan-500/20">
                <RefreshCw className="w-3.5 h-3.5" /> Re-seed Defaults
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stations.map((s) => (
                <div key={s.id} className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${editingStationId === s.id ? "bg-cyan-950/30 border-cyan-400" : "bg-gray-900/80 border-gray-800 hover:border-gray-700"}`}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">{s.type}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.isActive !== false ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                        {s.isActive !== false ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-base">{s.name}</h3>
                    <div className="text-xs text-emerald-400 font-bold font-display">₹{s.hourlyRate}/hour</div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {s.specs?.map((spec, i) => <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-300">{spec}</span>)}
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-800/60">
                    <button onClick={() => handleEditClick(s)} className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black font-bold text-xs flex items-center gap-1 transition-all">
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => handleDeleteStation(s.id, s.name)} className="px-3 py-1.5 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white font-bold text-xs flex items-center gap-1 transition-all">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: BUSINESS HOURS ───────────────────────────────────────────────── */}
      {activeTab === "hours" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" /> Business Hours Configuration
              </h2>
              <p className="text-gray-400 text-xs mt-1">
                Set opening &amp; closing times per day. Enable <span className="text-purple-400 font-bold">Overnight</span> for sessions that cross midnight (e.g. Saturday 8 AM → Sunday 10 PM).
              </p>
            </div>
            {hoursMsg && (
              <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400 text-cyan-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {hoursMsg}
              </div>
            )}
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 px-6 py-3 bg-gray-900/60 border-b border-gray-800 text-[11px] font-bold uppercase text-gray-400 tracking-wider">
              <div className="col-span-2">Day</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Opens At</div>
              <div className="col-span-3">Closes At</div>
              <div className="col-span-3">Overnight Session</div>
            </div>

            {/* Day Rows */}
            {hours.map((day) => {
              const isClosedDay = day.isClosed;
              return (
                <div
                  key={day.dayOfWeek}
                  className={`grid grid-cols-12 gap-2 px-6 py-4 border-b border-gray-800/50 items-center transition-colors ${
                    isClosedDay ? "opacity-60" : "hover:bg-gray-800/20"
                  }`}
                >
                  {/* Day Name */}
                  <div className="col-span-2">
                    <span className={`font-bold text-sm ${isClosedDay ? "text-gray-500" : "text-white"}`}>
                      {DAY_NAMES[day.dayOfWeek]}
                    </span>
                  </div>

                  {/* Closed Toggle */}
                  <div className="col-span-2">
                    <button
                      id={`hours-closed-toggle-${day.dayOfWeek}`}
                      onClick={() => updateDayHours(day.dayOfWeek, "isClosed", !day.isClosed)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        isClosedDay
                          ? "bg-red-500/20 border-red-500/40 text-red-400"
                          : "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                      }`}
                    >
                      {isClosedDay ? "✕ Closed" : "● Open"}
                    </button>
                  </div>

                  {/* Open Hour */}
                  <div className="col-span-2">
                    <select
                      id={`hours-open-${day.dayOfWeek}`}
                      disabled={isClosedDay}
                      value={day.openHour}
                      onChange={(e) => updateDayHours(day.dayOfWeek, "openHour", Number(e.target.value))}
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-2 py-1.5 text-white text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {Array.from({ length: 24 }, (_, h) => (
                        <option key={h} value={h}>{formatHourLabel(h)}</option>
                      ))}
                    </select>
                  </div>

                  {/* Close Hour (supports up to 47 for overnight) */}
                  <div className="col-span-3">
                    <select
                      id={`hours-close-${day.dayOfWeek}`}
                      disabled={isClosedDay}
                      value={day.closeHour}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        updateDayHours(day.dayOfWeek, "closeHour", val);
                        // Auto-enable overnight if close > 23
                        if (val > 23) updateDayHours(day.dayOfWeek, "isOvernight", true);
                        else updateDayHours(day.dayOfWeek, "isOvernight", false);
                      }}
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-2 py-1.5 text-white text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <optgroup label="Same Day">
                        {Array.from({ length: 23 }, (_, i) => i + 1).map((h) => (
                          <option key={h} value={h}>{formatHourLabel(h)}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Next Day (Overnight)">
                        {Array.from({ length: 24 }, (_, i) => i + 24).map((h) => (
                          <option key={h} value={h}>{formatHourLabel(h)}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Overnight Badge */}
                  <div className="col-span-3">
                    {day.isOvernight && !isClosedDay ? (
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-bold uppercase tracking-wide">
                          🌙 Overnight
                        </span>
                        <span className="text-gray-400 text-[10px]">
                          → {DAY_NAMES[(day.dayOfWeek + 1) % 7]} {formatHourLabel(day.closeHour)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-600 text-xs italic">
                        {isClosedDay ? "—" : "Same day close"}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Preview Banner */}
          <div className="glass-panel p-4 rounded-xl border border-gray-800 bg-gray-900/40">
            <p className="text-xs font-bold text-gray-400 uppercase mb-3">Current Schedule Preview</p>
            <div className="flex flex-wrap gap-2">
              {hours.map((day) => (
                <div key={day.dayOfWeek} className={`px-3 py-2 rounded-xl text-xs font-mono border ${
                  day.isClosed
                    ? "bg-red-950/30 border-red-800/40 text-red-400"
                    : day.isOvernight
                    ? "bg-purple-950/40 border-purple-700/40 text-purple-300"
                    : "bg-gray-800/60 border-gray-700/40 text-gray-200"
                }`}>
                  <div className="font-bold">{DAY_NAMES[day.dayOfWeek].slice(0, 3)}</div>
                  <div className="text-[10px] mt-0.5">
                    {day.isClosed
                      ? "Closed"
                      : `${formatHourLabel(day.openHour)} → ${formatHourLabel(day.closeHour)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            id="hours-save-btn"
            onClick={handleSaveHours}
            disabled={hoursSaving}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold font-display hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            {hoursSaving ? "Saving..." : "Save Business Hours"}
          </button>
        </div>
      )}
    </div>
  );
}
