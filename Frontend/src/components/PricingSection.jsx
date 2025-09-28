import React from "react";

export default function PricingSection() {
  return (
    <section className=" bg-gray-900 px-4 py-14 md:py-16">
      {/* Heading */}

      <div className="text-center mb-12">
        <h2 className="gaming-font text-4xl md:text-6xl mb-2 text-white">
          CHOOSE YOUR{" "}
          <span className="gaming-font text-[#00F7FF]">BATTLE PLAN</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-lg">
          Select the perfect gaming package that suits your needs and budget.
        </p>
      </div>

      {/* Pricing Card */}
      <div className="bg-gradient-to-b mx-auto from-[#866aff]/70 to-[#44c7ff]/70 rounded-xl border border-[#00F7FF] shadow-cyan-500 shadow-lg max-w-md w-full">
        {/* Top Strip */}
        <div className="bg-[#00F7FF] text-black font-bold text-center py-2 rounded-t-xl tracking-wider">
          PREMIUM GAMING EXPERIENCE
        </div>

        {/* Card Body */}
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            PRO GAMER PACKAGE
          </h3>
          <p className="text-4xl font-extrabold text-white">
            $20 <span className="text-lg font-normal">/hour</span>
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mt-6 text-left text-gray-200">
            <p>✔ High-End RTX Gaming PC</p>
            <p>✔ Complimentary Drinks</p>
            <p>✔ Premium Gaming Chair</p>
            <p>✔ VIP Room Access</p>
            <p>✔ Pro-Grade Peripherals</p>
            <p>✔ Priority Support</p>
          </div>

          {/* Button */}
          <button className="mt-8 bg-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-600 transition duration-300">
            Book Your Session Now
          </button>
        </div>
      </div>
    </section>
  );
}
