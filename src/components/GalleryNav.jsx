import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const GalleryNav = () => {
  return (
    <motion.nav
      className="fixed top-0 z-[999] flex justify-between items-center border-b bg-gray-800/80 w-full px-6 md:px-12 py-2 border-cyan-500"
      initial="visible"
      animate={visible ? "visible" : "hidden"}
      variants={navbarVariants}
    >
        <div className="logo text-white">
                <img src={logo} alt="Logo" className="h-12" />
        </div>
         <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-67"
        ></button>
    </motion.nav>
  )
}

export default GalleryNav