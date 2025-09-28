import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const GalleryNavbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const navbarVariants = {
    hidden: { y: -120, opacity: 0 },
    visible: { y: 0, opacity: 0.95, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <motion.nav
      className="fixed top-0 z-[999] flex justify-between items-center border-b bg-gray-800/80 w-full px-6 md:px-12 py-2 border-cyan-500"
      initial="visible"
      animate="visible"
      variants={navbarVariants}
    >
      {/* Logo */}
      <div className="logo text-white">
        <img src={logo} alt="Logo" className="h-12" />
      </div>

      {/* Home Button Only */}
      <div className="flex items-center">
        <button
          onClick={handleHomeClick}
          className="text-lg font-light border border-[#00F7FF] px-6 py- rounded-lg text-cyan-300 hover:bg-cyan-300 hover:text-gray-900 transition-all duration-300"
        >
          HOME
        </button>
      </div>
    </motion.nav>
  );
};

export default GalleryNavbar;