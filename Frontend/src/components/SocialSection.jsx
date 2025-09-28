import React from "react";
import { FaInstagram, FaFacebookF, FaXTwitter, FaDiscord } from "react-icons/fa6";
import hero from "../assets/hero.jpg";

const SocialSection = () => {
  const socialLinks = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://instagram.com/",
      className: "from-red-500 to-yellow-600",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      url: "https://facebook.com/",
      className: "from-blue-500 to-blue-700",
    },
    {
      name: "Twitter (X)",
      icon: <FaXTwitter />,
      url: "https://twitter.com/",
      className: "from-gray-900 to-black",
    },
    {
      name: "Discord",
      icon: <FaDiscord />,
      url: "https://discord.gg/",
      className: "from-indigo-500 to-indigo-700",
    },
  ];

  return (
    <section
      className="relative bg-gray-900 py-20 text-center overflow-hidden"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <h2 className="gaming-font text-3xl md:text-5xl text-white relative z-10">
        FOLLOW OUR <span className="gaming-font text-cyan-400">COMMUNITY</span>
      </h2>

      <p className="text-gray-300 mt-4 max-w-2xl mx-auto relative z-10">
        Stay connected with us on social media and never miss an update!
      </p>
      <p className="text-gray-300 mt-2 max-w-2xl mx-auto relative z-10">
        From <span className="text-cyan-300">exclusive promotions</span> to{" "}
        <span className="text-purple-400">gaming tournaments</span> and{" "}
        <span className="text-pink-400">behind-the-scenes fun</span> — our
        community is waiting for you.
      </p>

      <div className="flex justify-center gap-6 mt-10 relative z-10">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="group relative w-16 h-16 rounded-lg cursor-pointer transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-lg border-gray-700 bg-[#f6f6f6]/30 transition-all duration-300 group-hover:rotate-25"></span>

            <span
              className={`relative flex opacity-90 items-center justify-center w-full h-full text-2xl rounded-lg border border-gray-500/50 backdrop-blur-sm text-white bg-gradient-to-br ${social.className} group-hover:backdrop-blur-md transition-all`}
            >
              {social.icon}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialSection;
