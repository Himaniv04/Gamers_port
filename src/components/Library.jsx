import React from "react";
import { motion } from "framer-motion";
import "../App.css";

const Library = () => {
  const items = Array(8).fill("🎮");

  return (
    <section id="hero" className="pt-6 md:pt-10 bg-gray-900 p-4 text-center">
      <h2 className="gaming-font text-2xl text-white md:text-6xl mt-8">
        OUR <span className="gaming-font text-cyan-300">COLLECTION</span>
      </h2>
      <p className=" text-gray-400 max-w-3xl mx-auto">
        Level up your gaming experience
      </p>

      {/* Scrollable container */}
      <div className="w-full py-12 overflow-hidden">
        <div className="scroll-wrapper">
          <div className="scroll-content">
            {[...items, ...items].map((item, index) => (
              <motion.div
                key={index}
                className="min-h-[20vh] min-w-[20vh] mr-10 bg-cyan-300 rounded-2xl flex items-center justify-center text-black font-bold text-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                transition={{
                  opacity: { duration: 0.4 },
                  y: { duration: 0.4 },
                  scale: { duration: 0.2 },
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>

          {/* duplicate strip for smooth loop */}
          <div className="scroll-content">
            {[...items, ...items].map((item, index) => (
              <motion.div
                key={`dup-${index}`}
                className="min-h-[20vh] min-w-[20vh] mr-10 bg-cyan-300 rounded-2xl flex items-center justify-center text-black font-bold text-3xl"
                whileHover={{ scale: 1.1 }}
                transition={{ scale: { duration: 0.2 } }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Library;
