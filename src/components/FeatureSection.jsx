import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "ri-wifi-line",
    title: "Ultra-Fast Internet",
    description:
      "1 Gbps fiber connection with ultra-low latency for competitive gaming and streaming.",
  },
  {
    icon: "ri-computer-line",
    title: "RTX Gaming Rigs",
    description:
      "High-end PCs with RTX 4080 GPUs, i9 processors, and 240Hz monitors for the ultimate gaming experience.",
  },
  {
    icon: "ri-gamepad-line",
    title: "Premium Peripherals",
    description:
      "Professional-grade mechanical keyboards, gaming mice, and high-fidelity headsets at every station.",
  },
  {
    icon: "ri-cup-line",
    title: "Café Lounge",
    description:
      "Energizing drinks and snacks to fuel your gaming sessions, available right at your station.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-12 md:py-22 px-2 bg-gray-900 features">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          viewport={{ once: true }}
        >
          <h2 className="pixel-font text-2xl md:text-4xl mb-4 text-white">
            WHY <span className="text-[#00F7FF]">GAMER'S PORT</span>?
          </h2>
          <p className="gaming-font text-gray-400 max-w-3xl mx-auto text-sm">
            Experience gaming like never before with our premium facilities and
            cutting-edge technology.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm py-8 px-5 md:px-4 md:py-12 rounded-lg border border-gray-700 hover:border-[#00F7FF] transition-all duration-300 group will-change-transform"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-16 h-16 flex items-center justify-center text-[#00F7FF] mb-6 mx-auto bg-gray-800 rounded-full">
                <i className={`${feature.icon} ri-2x`} />
              </div>
              <h3 className="gaming-font text-lg md:text-xl text-center text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-center text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>{/* Features Grid (No Stagger) */}
    </section>
  );
};

export default FeatureSection;
