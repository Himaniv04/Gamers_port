import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  { label: "HOME", to: "home" },
  { label: "PRICING", to: "pricing" },
  { label: "CONTACT", to: "contact" },
  { label: "GALLERY", to: "gallery" },
];

const Navbar = ({ scroll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle navigation for different buttons
  const handleNavigation = (to, label) => {
    // Close mobile menu
    setIsOpen(false);

    // If GALLERY button clicked, navigate to GalleryTab
    if (label === "GALLERY") {
      navigate('/gallery-tab');
      return;
    }

    // For other buttons, handle section scrolling
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(to);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
      return;
    }

    // If on home page, scroll to section
    if (scroll) {
      const element = document.getElementById(to);
      if (element) {
        scroll.scrollTo(element, {
          offset: -70,
          duration: 1000,
          easing: [0.25, 0, 0.35, 1],
        });
      }
    } else {
      // Fallback to native scroll
      const element = document.getElementById(to);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Hide/show navbar based on scroll (only on home page)
  useEffect(() => {
    if (!scroll || location.pathname !== '/') return;

    const onScroll = () => {
      const scrollY = scroll.scroll.instance.scroll.y;

      if (scrollY > lastScrollY.current && scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = scrollY;
    };

    scroll.on("scroll", onScroll);
    return () => scroll.off("scroll", onScroll);
  }, [scroll, location.pathname]);

  const navbarVariants = {
    hidden: { y: -120, opacity: 0 },
    visible: { y: 0, opacity: 0.95, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    visible: { opacity: 0.95, height: "auto", transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      className="fixed top-0 z-[999] flex justify-between items-center border-b bg-gray-800/80 w-full px-6 md:px-12 py-2 border-cyan-500"
      initial="visible"
      animate={visible ? "visible" : "hidden"}
      variants={navbarVariants}
    >
      {/* Logo */}
      <div className="logo text-white cursor-pointer" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" className="h-12" />
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-10 font-['Neue Montreal'] text-md font-regular">
        {navItems.map((item, index) => (
          <span key={index} className={`relative group ${index === 3 ? "ml-32" : ""}`}>
            <button
              onClick={() => handleNavigation(item.to, item.label)}
              className={`text-lg font-light transition-all duration-300 ${
                index === 3
                  ? "border border-[#00F7FF] px-6 rounded-lg text-cyan-300 hover:bg-cyan-300 hover:text-gray-900"
                  : "text-cyan-300 hover:text-white"
              }`}
            >
              {item.label}
            </button>
            {index !== 3 && (
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#00F7FF] transition-all duration-300 group-hover:w-full"></span>
            )}
          </span>
        ))}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-[#00F7FF]">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed top-[64px] left-0 w-full bg-gray-900/95 text-[#00F7FF] flex flex-col items-center gap-6 py-6 z-[998] font-['Neue Montreal'] backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.to, item.label)}
                className={`text-lg transition-all duration-300 ${
                  index === 3
                    ? "border border-[#00F7FF] px-6 py-2 rounded-lg hover:bg-cyan-300 hover:text-gray-900"
                    : "hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;