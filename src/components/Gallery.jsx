import React from "react";
import { motion } from "framer-motion";
import ButtonGallery from "./ButtonGallery";
import { useNavigate } from "react-router-dom"; // ✅ Hook for navigation

const galleryItems = [
  {
    img: "https://lh3.googleusercontent.com/p/AF1QipNuW0rRszpqvXjGKSvsxvXk-4F7Iuvl2QDusbc=w141-h176-n-k-no-nu",
    alt: "Gaming Station",
    title: "Premium Gaming Stations",
    desc: "Custom-built rigs with ergonomic seating for extended gaming sessions.",
  },
  {
    img: "https://lh3.googleusercontent.com/p/AF1QipNuW0rRszpqvXjGKSvsxvXk-4F7Iuvl2QDusbc=w141-h176-n-k-no-nu",
    alt: "Tournament Area",
    title: "Tournament Arena",
    desc: "Dedicated space for competitive gaming events and local tournaments.",
  },
  {
    img: "https://lh3.googleusercontent.com/p/AF1QipNuW0rRszpqvXjGKSvsxvXk-4F7Iuvl2QDusbc=w141-h176-n-k-no-nu",
    alt: "Lounge Area",
    title: "Refreshment Zone",
    desc: "Energizing drinks and gamer-friendly snacks to keep you in the zone.",
  },
];

// Animation variants
const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Gallery = () => {
  const navigate = useNavigate(); // ✅ Navigation hook

  // Button click handler
  const handleViewGallery = () => {
    navigate("/gallery-tab"); // ✅ Open GalleryTab component
  };

  return (
    <section className="py-10 md:py-18 px-10 gradient-bg">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="text-center mb-8 md:mb-14"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="gaming-font text-2xl md:text-4xl mb-4">
            OUR <span className="text-[#00F7FF]">GAMING SPACE</span>
          </h2>
          <p className="gaming-font text-gray-300 max-w-3xl mx-auto text-sm">
            Step into the future of gaming with our state-of-the-art facilities designed for maximum immersion.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-2xl group"
              variants={itemVariant}
            >
              <img
                src={item.img}
                alt={item.alt}
                className="w-full h-64 object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 transition duration-500">
                <h3 className="gaming-font text-xl mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Gallery Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <ButtonGallery onClick={handleViewGallery}>View Gallery</ButtonGallery>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
