import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ Router hooks
import logo from "../assets/logo.png";

const navItems = [
  { label: "HOME", to: "home" },
  { label: "PRICING", to: "pricing" },
  { label: "CONTACT", to: "contact" },
  { label: "GALLERY", to: "gallery" },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Scroll + navigate (same as Navbar)
  const handleScroll = (to) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(to);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(to);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-4 md:pt-12 pb-1">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 text-left">
          {/* Column 1: Brand Info */}
          <div className="flex md:flex-col md:justify-between mb-4">
            <div className="h-20 w-20 md:h-40 md:w-40 mx-auto">
              <img src={logo} alt="logo" />
            </div>
            <div className="flex space-x-4 mt-4 mx-auto">
              {[
                { icon: "google-fill", link: "https://www.facebook.com/yourpage" },
                { icon: "twitter-x-fill", link: "https://x.com/yourprofile" },
                { icon: "instagram-fill", link: "https://www.instagram.com/yourprofile" },
                { icon: "discord-fill", link: "https://discord.gg/yourinvite" },
              ].map(({ icon, link }) => (
                <a
                  key={icon}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:w-10 md:h-10 w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-[#00F7FF] hover:bg-[#00F7FF] hover:text-gray-900 transition-colors duration-300"
                >
                  <i className={`ri-${icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:ml-35 hidden md:block">
            <h3 className="gaming-font text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleScroll(item.to)}
                    className="text-gray-400 hover:text-[#00F7FF] transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="md:mt-0 mt-6 hidden md:block">
            <h4 className="gaming-font text-white text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="flex items-center justify-center text-[#00F7FF] mt-1">
                  <i className="ri-map-pin-line mr-3"></i>
                </div>
                <span className="text-gray-400">
                  123 Gaming Street, Digital City, CA 90210
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex items-center justify-center text-[#00F7FF] mt-1">
                  <i className="ri-phone-line mr-3"></i>
                </div>
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <div className="flex items-center justify-center text-[#00F7FF] mt-1">
                  <i className="ri-mail-line mr-3"></i>
                </div>
                <span className="text-gray-400">info@gamersport.com</span>
              </li>
              <li className="flex items-start">
                <div className="flex items-center justify-center text-[#00F7FF] mt-1">
                  <i className="ri-time-line mr-3"></i>
                </div>
                <span className="text-gray-400">
                  Mon–Fri: 8:00 AM - 10:00 AM <br /> Sat: 8AM - All Night <br /> Sun: Till 12PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-2 mt-2 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 Gamer's Port. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
