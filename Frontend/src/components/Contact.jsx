import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-800 pb-6 md:pb-12 overflow-x-hidden text-white relative px-6 md:px-20">

      {/* Header */}
      <div className="text-center mb-4 md:mb-10">
        <h2 className="gaming-font text-4xl md:text-6xl mt-10 mb-2">
          FEEL FREE TO <span className="gaming-font text-[#00F7FF]">CONTACT US</span>
        </h2>
        <p className=" text-gray-400 text-sm md:text-base mx-auto">
          Reach out and join the ultimate gaming community experience.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-10 justify-between">

        {/* Left Side */}
        <div className="space-y-4 md:space-y-1 text-gray-300 w-full md:w-1/2">

          {/* Phone */}
          <div>
            <h3 className="flex items-center text-lg md:text-2xl font-semibold text-[#00F7FF]">
              <i className="ri-phone-fill mr-2"></i>
              <span className="text-white text-sm md:text-base">+91 89234 73839</span>
            </h3>
          </div>

          {/* Email */}
          <div>
            <h3 className="flex items-center text-lg md:text-2xl font-semibold text-[#00F7FF]">
              <i className="ri-mail-fill mr-2"></i>
              <span className="text-white text-sm md:text-base mt-1">hellogamersport@gmail.com</span>
            </h3>
          </div>

          {/* Address */}
          <div>
            <h3 className="flex items-start text-lg md:text-xl font-semibold text-[#00F7FF]">
              <i className="ri-map-pin-2-fill mr-2 text-xl md:text-2xl mt-1"></i>
              <p className="text-white text-xs md:text-sm leading-relaxed mt-1">
                2nd Floor, Mathrushree Complex, Hennur Village Rd,<br /> 
                Maruthi Layout, HBR Layout 4th Block, Near Kammanahalli,<br />
                Bengaluru, Karnataka 560043
              </p>
            </h3>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-[#00F7FF]">
              <i className="ri-time-fill mr-2 text-xl md:text-2xl"></i> Opening Hours
              <ul className="mt-2 text-xs md:text-sm space-y-1 text-white">
                <li className="flex justify-between border-b border-gray-700 pb-1">
                  <span>Mon - Fri</span> <span>8 AM – 10 PM</span>
                </li>
                <li className="flex justify-between border-b border-gray-700 pb-1">
                  <span>Saturday</span> <span>8 AM – Open All Night</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span> <span>Closes 12 PM</span>
                </li>
              </ul>
            </h3>
          </div>

          {/* Social Media */}
          <div className="mt-3">
            <h3 className="flex items-center text-lg md:text-xl font-semibold text-[#00F7FF]">
              <i className="ri-share-fill mr-2"></i> Follow Us
            </h3>
            <div className="flex space-x-3 md:space-x-4 mt-4">
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
                  className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-gray-900 text-[#00F7FF] hover:bg-[#00F7FF] hover:text-gray-900 transition-colors duration-300"
                >
                  <i className={`ri-${icon} text-lg md:text-2xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Map & CTA */}
        <div className="w-full md:w-1/2 flex flex-col items-start space-y-4">

          {/* Map */}
          <div className="hidden md:block relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14680.113979327954!2d81.350919!3d21.190449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2923e9c3c05b07%3A0x65d09e2c2a6e1a3c!2sBhilai%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1694774382180!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Location Button */}
            <button className="absolute bottom-3 left-3 flex items-center gap-2 bg-gray-900 text-[#00F7FF] px-4 py-2 rounded-lg shadow-md hover:bg-[#00F7FF] hover:text-gray-900 transition">
              <i className="ri-map-pin-2-fill text-lg"></i> Location
            </button>
          </div>

          {/* Mobile Location Button */}
          <div className="md:hidden w-full flex justify-center">
            <button className="w-full bg-[#00F7FF] text-gray-900 px-4 md:px-6 py-3 rounded-lg font-semibold hover:bg-[#00d4ff] transition flex items-center justify-center">
              <i className="ri-map-pin-2-fill text-lg"></i> Location
            </button>
          </div>

          {/* Chat Button */}
          <div className="w-full">
            <button className="w-full bg-[#00F7FF] text-gray-900 px-4 md:px-6 py-3 rounded-lg font-semibold hover:bg-[#00d4ff] transition flex items-center justify-center">
              <i className="ri-chat-3-line mr-2"></i> Chat With Us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
