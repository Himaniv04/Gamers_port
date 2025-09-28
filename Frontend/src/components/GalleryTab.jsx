// GalleryTab.jsx
import { useNavigate } from 'react-router-dom';
import GalleryNav from './GalleryNav';
const GalleryTab = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Sirf back button */}
        <GalleryNav/>

      {/* Gallery content - full screen */}
      <div className="px-4 pb-8 pt-25">
        <h1 className="gaming-font text-4xl md:text-7xl text-center mb-8">
          COMPLETE <span className="gaming-font text-[#00F7FF]">GALLERY</span>
        </h1>
        
        {/* Yahan aapka gallery grid */}
        {/* Full gallery items */}
      </div>
    </div>
  );
};

export default GalleryTab;