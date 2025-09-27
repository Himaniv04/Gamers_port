import React from "react";
import background from "../assets/background.png"; // tumhari background image
import circleText from "../assets/text.png"; // tumhari circular text wali image

export default function Landing() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div className="relative flex flex-col items-center md:items-start">
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight font-['Press_Start_2P']">
            LEVEL UP YOUR GAMING WITH
            <br />
            <span className="text-[#00F7FF]">GAMER'S PORT</span>
          </h1>

          {/* Circular Text + Button */}
          <div className="relative mt-10 flex items-center justify-center">
            {/* Circular Text PNG */}
            <img
              src={circleText}
              alt="Circular Text"
              className="w-40 h-40 animate-spin-slow"
            />
            {/* Button Inside Circle */}
            <button className="absolute bg-[#00F7FF] text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-cyan-400 transition">
              Contact Us
            </button>
          </div>
        </div>

        {/* Right Section (Paragraph) */}
        <div className="text-gray-200 text-lg leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quae
            laboriosam maiores voluptatibus quos assumenda magni reiciendis
            accusantium molestias repudiandae, et id harum vel repellat minima
            ex voluptatum consequatur maxime! Odit quae vitae unde eos ipsa.
            Nostrum accusantium soluta est? Nostrum modi quae architecto culpa,
            a earum dolorum cumque, vero sapiente totam error eos praesentium
            aut fuga nesciunt adipisci commodi possimus id?
          </p>
        </div>
      </div>
    </section>
  );
}
