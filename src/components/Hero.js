import React, { useState, useRef, useEffect } from 'react';
import './Hero.css';
import { scrollToSection } from '../utils/scroll';

const Hero = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  
  // Array of video sources
  const videoSources = [
    "/videos/ribbon-cutting.mp4",
    "/videos/your-second-video.mp4" // Second video has been added to the public/videos directory
  ];

  // Initialize videos on component mount
  useEffect(() => {
    if (video1Ref.current && video2Ref.current) {
      // Set up first video
      video1Ref.current.src = videoSources[0];
      video1Ref.current.load();
      
      // Set up second video
      video2Ref.current.src = videoSources[1];
      video2Ref.current.load();
      
      // Start playing the first video
      video1Ref.current.play().catch(error => {
        console.error("Video 1 playback failed:", error);
      });
      
      // Mark initial load as complete after a short delay
      setTimeout(() => {
        setIsInitialLoad(false);
      }, 1000);
    }
  }, []);
  
  // Handle video end events
  const handleVideo1End = () => {
    console.log("Video 1 ended");
    // Make video 2 visible
    setActiveVideoIndex(1);
    
    // Start playing video 2
    if (video2Ref.current) {
      video2Ref.current.currentTime = 0; // Reset to beginning
      video2Ref.current.play().catch(error => {
        console.error("Video 2 playback failed:", error);
      });
    }
  };
  
  const handleVideo2End = () => {
    console.log("Video 2 ended");
    // Make video 1 visible
    setActiveVideoIndex(0);
    
    // Start playing video 1
    if (video1Ref.current) {
      video1Ref.current.currentTime = 0; // Reset to beginning
      video1Ref.current.play().catch(error => {
        console.error("Video 1 playback failed:", error);
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className={`video-background ${!isInitialLoad ? 'loaded' : ''}`}>
        {/* First video */}
        <video 
          ref={video1Ref}
          muted 
          playsInline
          onEnded={handleVideo1End}
          className={activeVideoIndex === 0 ? 'active' : 'inactive'}
        >
          <source type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Second video */}
        <video 
          ref={video2Ref}
          muted 
          playsInline
          onEnded={handleVideo2End}
          className={activeVideoIndex === 1 ? 'active' : 'inactive'}
        >
          <source type="video/mp4" />
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