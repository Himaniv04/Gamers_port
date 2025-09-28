import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [message, setMessage] = useState(""); // Success/Error message
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !isAgreed) {
      setMessage("Please enter email and agree to terms");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/subscribe", { email });
      setMessage(res.data);
      setEmail("");
      setIsAgreed(false);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data); // Backend error message
      } else {
        setMessage("Something went wrong! Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-blue-900/50"></div>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 247, 255, 0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-6 h-6 border border-cyan-400 rotate-45 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-8 h-8 border border-pink-400 rotate-12 animate-spin-slow"></div>
        <div className="absolute bottom-10 right-10 w-5 h-5 bg-cyan-400 transform rotate-45 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="pixel-font text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">JOIN OUR </span>
            <span className="text-[#00F7FF] drop-shadow-lg">GUILD</span>
          </h2>
          <p className="gaming-font text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Subscribe to our newsletter for exclusive promotions, tournament announcements, and gaming tips.
          </p>
        </motion.div>

        {/* Newsletter Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#00F7FF] 
                         focus:ring-2 focus:ring-[#00F7FF]/30 transition-all duration-300 gaming-font text-lg"
              required
            />
          </div>

          <motion.button
            type="submit"
            className={`px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 
                        text-white font-bold rounded-lg gaming-font text-lg shadow-lg 
                        hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 
                        focus:ring-purple-500/50 transform transition-all duration-300
                        ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Subscribe"}
          </motion.button>
        </motion.form>

        {/* Message */}
        {message && <p className="text-center text-white/80 mb-4">{message}</p>}

        {/* Checkbox Agreement */}
        <motion.div
          className="flex items-center justify-center gap-3 text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          <label className="flex items-center cursor-pointer gaming-font">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center transition-all duration-200 ${
                isAgreed ? "bg-[#00F7FF] border-[#00F7FF]" : "border-gray-500 hover:border-[#00F7FF]"
              }`}
            >
              {isAgreed && (
                <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            I agree to receive gaming news and promotional emails
          </label>
        </motion.div>

        {/* Gaming Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00F7FF] pixel-font">5K+</div>
            <div className="text-gray-400 gaming-font">Active Gamers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00F7FF] pixel-font">100+</div>
            <div className="text-gray-400 gaming-font">Tournaments</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00F7FF] pixel-font">24/7</div>
            <div className="text-gray-400 gaming-font">Gaming Support</div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Newsletter;
