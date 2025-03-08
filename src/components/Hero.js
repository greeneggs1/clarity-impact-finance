import React, { useState, useEffect, useMemo } from 'react';
import './Hero.css';
import { scrollToSection } from '../utils/scroll';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  // Use useMemo to prevent recreation of the array on each render
  const videoSources = useMemo(() => [
    // Use absolute URLs that will work on Vercel
    `${window.location.origin}/videos/ribbon-cutting.mp4`,
    `${window.location.origin}/videos/your-second-video.mp4`
  ], []);
  
  // Log video sources for debugging
  useEffect(() => {
    console.log("Video sources:", videoSources);
    
    // Preload videos
    videoSources.forEach(src => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';
      console.log(`Preloading video: ${src}`);
    });
  }, [videoSources]);

  const handleVideoLoad = () => {
    console.log("Video loaded");
    setIsVideoLoaded(true);
  };
  
  const handleVideoEnd = () => {
    console.log("Video ended, switching to next video");
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  return (
    <section id="home" className="hero">
      <div className={`video-background ${isVideoLoaded ? 'loaded' : ''}`}>
        <video 
          key={videoSources[currentVideoIndex]} // Key changes force React to recreate the element
          autoPlay 
          muted 
          playsInline
          loop={false}
          onLoadedData={handleVideoLoad}
          onEnded={handleVideoEnd}
          onError={(e) => console.error("Video error:", e)}
        >
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="video-overlay"></div>
      </div>
      
      <div className="hero-content">
        <h1>Empowering CDFIs to Transform Communities</h1>
        <h2>Strategic Consulting for Mission Driven Lenders</h2>
        <div className="hero-buttons">
          <button 
            className="primary-btn"
            onClick={() => scrollToSection('services')}
          >
            View Our Services
          </button>
        </div>
      </div>
      <div className="scroll-indicator">
        <p className="scroll-text">Meet Our Leadership</p>
        <span onClick={() => scrollToSection('about')}>↓</span>
      </div>
    </section>
  );
};

export default Hero; 