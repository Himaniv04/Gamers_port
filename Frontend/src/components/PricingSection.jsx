import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

// Icon map for station types
const typeConfig = {
  PC: {
    icon: "🖥️",
    color: "from-purple-600/70 to-blue-600/70",
    border: "border-purple-400",
    shadow: "shadow-purple-500",
    badge: "bg-purple-500",
  },
  CONSOLE: {
    icon: "🎮",
    color: "from-blue-600/70 to-cyan-600/70",
    border: "border-[#00F7FF]",
    shadow: "shadow-cyan-500",
    badge: "bg-cyan-500",
  },
  VR: {
    icon: "🥽",
    color: "from-pink-600/70 to-purple-600/70",
    border: "border-pink-400",
    shadow: "shadow-pink-500",
    badge: "bg-pink-500",
  },
};

const NEXT_URL = import.meta.env.VITE_NEXT_URL || "http://localhost:3000";

const StationCard = ({ station, index }) => {
  const cfg = typeConfig[station.type] || typeConfig["PC"];

  const handleBook = () => {
    window.open(`${NEXT_URL}/book-slot`, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative bg-gradient-to-b ${cfg.color} rounded-xl border ${cfg.border} ${cfg.shadow} shadow-lg flex flex-col overflow-hidden`}
    >
      {/* Top strip */}
      <div className={`${cfg.badge} text-black font-bold text-center py-2 text-sm tracking-wider`}>
        {station.type === "PC"
          ? "HIGH-END PC RIG"
          : station.type === "CONSOLE"
          ? "CONSOLE BOOTH"
          : "VR SIMULATOR"}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1 text-center">
        <div className="text-4xl mb-3">{cfg.icon}</div>
        <h3 className="text-lg font-bold text-white mb-1">{station.name}</h3>

        <p className="text-3xl font-extrabold text-white mt-2">
          ₹{station.hourlyRate}
          <span className="text-sm font-normal text-gray-300"> /hr</span>
        </p>

        {/* Specs */}
        <ul className="mt-4 space-y-1 text-left text-gray-200 text-sm flex-1">
          {station.specs.map((spec, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-[#00F7FF]">✔</span> {spec}
            </li>
          ))}
        </ul>

        {/* Book button */}
        <motion.button
          onClick={handleBook}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 w-full py-3 px-4 bg-[#00F7FF] text-gray-900 font-bold rounded-lg hover:bg-white transition duration-300 text-sm"
        >
          Book This Station
        </motion.button>
      </div>
    </motion.div>
  );
};

// Skeleton card while loading
const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-800 rounded-xl border border-gray-700 h-72"></div>
);

export default function PricingSection() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/stations");
        setStations(res.data);
      } catch (err) {
        console.error("Failed to fetch stations:", err);
        setError("Could not load stations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  return (
    <section className="bg-gray-900 px-4 py-14 md:py-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="gaming-font text-4xl md:text-6xl mb-2 text-white"
        >
          CHOOSE YOUR{" "}
          <span className="gaming-font text-[#00F7FF]">BATTLE PLAN</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-400 text-sm md:text-lg"
        >
          Select the perfect gaming station that suits your needs and budget.
        </motion.p>
      </div>

      {/* Error state */}
      {error && (
        <p className="text-center text-red-400 mb-8">{error}</p>
      )}

      {/* Station Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : stations.map((station, i) => (
              <StationCard key={station._id} station={station} index={i} />
            ))}
      </div>

      {/* CTA — book any slot */}
      {!loading && stations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Not sure which rig to pick?</p>
          <motion.button
            onClick={() =>
              window.open(`${NEXT_URL}/book-slot`, "_blank", "noopener,noreferrer")
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg gaming-font text-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            🎮 Book Your Session Now
          </motion.button>
        </motion.div>
      )}
    </section>
  );
}
