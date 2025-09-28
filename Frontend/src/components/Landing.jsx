import React from "react";
import background from "../assets/background.png"; // tumhari background image
import circleText from "../assets/text.png"; // tumhari circular text wali image

export default function Landing() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center "
    style={{ backgroundImage: `url(${background})` }}
    >
      {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-black/20"></div>

      {/* Content */}
        {/* Left Section */}
      <div className=" flex-row mt-30">
        <div className="relative flex flex-col items-center md:items-start ">
          {/* Heading */}
          <h1 className="gaming-font text-4xl md:text-7xl ml-10 md:ml-25 font-extrabold text-white leading-tight font-['Press_Start_2P']">
            LEVEL UP YOUR GAMING WITH
            <div className="gaming-font text-5xl md:text-9xl text-[#00F7FF]"> GAMER'S PORT</div>
          </h1>
            </div>
          {/* Circular Text + Button */}
         <div className="flex my-8">
            <div className=" flex justify-between items-center w-[50%] ml-45">
            <img
              src={circleText}
              alt="Circular Text"
              className="relative w-80 h-80 animate-spin-slow"
            />
            {/* Button Inside Circle */}
            <button className="absolute bg-[#00F7FF] ml-52 text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-cyan-400 transition">
              Contact Us
            </button>
        </div>

        {/* Right Section (Paragraph) */}
        <div className="text-white z-10 text-lg mt-20 leading-relaxed">
          <p>
            Gamers Port brings you ultra-fast internet, RTX-powered rigs, and pro-grade gear — the perfect space to compete, stream, or chill with friends.
          </p>
        </div>
      </div>
    </div>
    </section>
  );
}