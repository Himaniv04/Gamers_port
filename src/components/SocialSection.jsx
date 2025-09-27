import React from "react";
import { FaInstagram, FaFacebookF, FaXTwitter, FaDiscord } from "react-icons/fa6";

const SocialSection = () => {
  // Social media data array
  const socialLinks = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://instagram.com/",
      className:
        "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      url: "https://facebook.com/",
      className: "bg-blue-600 text-white",
    },
    {
      name: "Twitter (X)",
      icon: <FaXTwitter />,
      url: "https://twitter.com/",
      className: "bg-black text-white",
    },
    {
      name: "Discord",
      icon: <FaDiscord />,
      url: "https://discord.gg/",
      className: "bg-indigo-600 text-white",
    },
  ];

  return (
    <section
      className="relative bg-gray-900 py-20 text-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://cdn.wallpapersafari.com/88/27/J4fbFo.gif')", // 👈 apni image ka URL yaha do
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Title */}
      <h2 className="pixel-font text-3xl md:text-5xl text-white relative z-10">
        FOLLOW OUR <span className="text-cyan-400">COMMUNITY</span>
      </h2>

      {/* Description */}
      <p className="gaming-font text-gray-300 mt-4 max-w-2xl mx-auto relative z-10">
        Stay connected with us on social media and never miss an update!
      </p>
      <p className="gaming-font text-gray-300 mt-2 max-w-2xl mx-auto relative z-10">
        From <span className="text-cyan-300">exclusive promotions</span> to{" "}
        <span className="text-purple-400">gaming tournaments</span> and{" "}
        <span className="text-pink-400">behind-the-scenes fun</span> — our
        community is waiting for you.
      </p>

      {/* Social Icons (mapped) */}
      <div className="flex justify-center gap-6 mt-10 relative z-10">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={`w-14 h-14 flex items-center justify-center rounded-full text-2xl hover:scale-110 transform transition-all shadow-lg ${social.className}`}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialSection;
