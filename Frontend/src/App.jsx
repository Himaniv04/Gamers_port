// App.jsx
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import FeatureSection from "./components/FeatureSection";
import SocialSection from "./components/SocialSection";
import Gallery from "./components/Gallery";
import GalleryTab from "./components/GalleryTab";
import PricingSection from "./components/PricingSection";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Newsletter from "./components/Newsletter";
import Library from "./components/Library";
import HeroMiniSection from "./components/HeroMiniSection";
import "remixicon/fonts/remixicon.css";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";


import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Route, Routes, useLocation } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const scrollRef = useRef(null);
  const [scroll, setScroll] = useState(null);
  const location = useLocation();

  //Backend
  

  useEffect(() => {
    let locoScroll;

    if (location.pathname === "/") {
      locoScroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
      });
      setScroll(locoScroll);

      ScrollTrigger.scrollerProxy(scrollRef.current, {
        scrollTop(value) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: scrollRef.current.style.transform ? "transform" : "fixed",
      });

      locoScroll.on("scroll", ScrollTrigger.update);

      const updateLoco = () => locoScroll.update();
      ScrollTrigger.addEventListener("refresh", updateLoco);
      ScrollTrigger.refresh();

      return () => {
        if (locoScroll) {
          locoScroll.destroy();
          ScrollTrigger.removeEventListener("refresh", updateLoco);
        }
      };
    } else {
      setScroll(null);
    }
  }, [location.pathname]);

  return (
    <Routes>
      {/* Home Page Route */}
      <Route
        path="/"
        element={
          <div
            ref={scrollRef}
            id="main-container"
            data-scroll-container
            className="bg-gray-900 text-white"
          >
            <Navbar scroll={scroll} />

            <section id="home" data-scroll-section>
              <Landing />
            </section>
            <section id="features" data-scroll-section>
              <FeatureSection />
            </section>
            <section id="gallery" data-scroll-section>
              <Gallery />
            </section>
            <section id="social" data-scroll-section>
              <SocialSection />
            </section>
            <section id="pricing" data-scroll-section>
              <PricingSection />
            </section>
            <section id="library" data-scroll-section>
              <Library />
            </section>
            <section id="hero-mini" data-scroll-section>
              <HeroMiniSection />
            </section>
            <section id="testimonial" data-scroll-section>
              <Testimonial />
            </section>
            <section id="contact" data-scroll-section>
              <Contact />
            </section>
            <section id="newsletter" data-scroll-section>
              <Newsletter />
            </section>
            <section id="footer" data-scroll-section>
              <Footer scroll={scroll} /> {/* ✅ Pass scroll here also */}
            </section>
          </div>
        }
      />

      {/* Gallery Tab Route */}
      <Route path="/gallery-tab" element={<GalleryTab />} />
    </Routes>
  );
};

export default App;
