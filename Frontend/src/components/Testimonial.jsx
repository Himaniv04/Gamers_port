import React from "react";

const testimonials = [
  {
    name: "Aryan Sharma",
    role: "Pro Gamer",
    feedback:
      "Gamer’s Port ne meri gaming journey ko next level tak le gaya. Amazing community and great UI!",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Neha Verma",
    role: "Streamer",
    feedback:
      "Events aur tournaments bahut hi smooth rehte hain. Best platform for competitive gamers!",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Rohit Singh",
    role: "Esports Enthusiast",
    feedback:
      "Gaming news, updates aur booking system ekdum seamless hai. Must try for all gamers!",
    avatar: "https://i.pravatar.cc/100?img=20",
  },
  {
    name: "Simran Kaur",
    role: "Content Creator",
    feedback:
      "Community support aur interface dono hi outstanding hain. Gamer’s Port is 🔥!",
    avatar: "https://i.pravatar.cc/100?img=30",
  },
   {
    name: "Aryan Sharma",
    role: "Pro Gamer",
    feedback:
      "Gamer’s Port ne meri gaming journey ko next level tak le gaya. Amazing community and great UI!",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Neha Verma",
    role: "Streamer",
    feedback:
      "Events aur tournaments bahut hi smooth rehte hain. Best platform for competitive gamers!",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Rohit Singh",
    role: "Esports Enthusiast",
    feedback:
      "Gaming news, updates aur booking system ekdum seamless hai. Must try for all gamers!",
    avatar: "https://i.pravatar.cc/100?img=20",
  },
  {
    name: "Simran Kaur",
    role: "Content Creator",
    feedback:
      "Community support aur interface dono hi outstanding hain. Gamer’s Port is 🔥!",
    avatar: "https://i.pravatar.cc/100?img=30",
  },
   {
    name: "Aryan Sharma",
    role: "Pro Gamer",
    feedback:
      "Gamer’s Port ne meri gaming journey ko next level tak le gaya. Amazing community and great UI!",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Neha Verma",
    role: "Streamer",
    feedback:
      "Events aur tournaments bahut hi smooth rehte hain. Best platform for competitive gamers!",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Rohit Singh",
    role: "Esports Enthusiast",
    feedback:
      "Gaming news, updates aur booking system ekdum seamless hai. Must try for all gamers!",
    avatar: "https://i.pravatar.cc/100?img=20",
  },
  {
    name: "Simran Kaur",
    role: "Content Creator",
    feedback:
      "Community support aur interface dono hi outstanding hain. Gamer’s Port is 🔥!",
    avatar: "https://i.pravatar.cc/100?img=30",
  },
];

const TestimonialSection = () => {
  return (
    <section className=" bg-gray-800 relative">
      <div className="py-14 container mx-auto px-6">
        <div className="text-center mb-12">
        <h2 className="gaming-font text-4xl md:text-6xl mb-2 text-white">
          WHAT
          <span className="gaming-font text-[#00F7FF]"> GAMER'S SAY</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-lg">
          Select the perfect gaming package that suits your needs and budget.
        </p>
      </div>

        {/* Horizontal Scroll Container */}
        <div className="flex space-x-6 overflow-x-auto hide-scrollbar pb-4">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-gray-900/70 backdrop-blur-md border border-cyan-500 p-6 rounded-2xl shadow-lg duration-300"
            >
              <p className="text-gray-300 mb-6">{t.feedback}</p>
              <div className="flex items-center">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full border-2 border-[#00F7FF]"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[0.2vh] w-[80%] bg-gradient-to-r from-gray-800 via-cyan-500 to-gray-800 mx-auto" />
    </section>
  );
};

export default TestimonialSection;
