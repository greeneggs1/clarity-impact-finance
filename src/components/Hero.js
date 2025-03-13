import React, { useState, useRef, useEffect } from 'react';
import './Hero.css';
import { scrollToSection } from '../utils/scroll';

const Hero = () => {
  const [hasVideoError, setHasVideoError] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  
  // Video URLs - Using direct links to ensure reliability
  const videoUrls = [
    "https://res.cloudinary.com/dxenrdunh/video/upload/v1741744125/20250311_1844_Thriving_Diverse_Community_simple_compose_01jp3p2g0rfg2vxwem9vg0xxwr_tyrsec.mp4",
    "https://res.cloudinary.com/dxenrdunh/video/upload/v1741488625/hero3-community_hjbydr.mp4"
  ];
  
  // Handle video loading and errors
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleVideoError = (error) => {
        console.error("Error loading video:", error);
        setHasVideoError(true);
      };
      
      videoElement.addEventListener('error', handleVideoError);
      
      // Force video to load
      videoElement.load();
      
      // Clean up event listeners
      return () => {
        videoElement.removeEventListener('error', handleVideoError);
      };
    }
  }, [currentVideoIndex]);

  // Handle video ended event
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleVideoEnded = () => {
        // If it's the second video, go back to the first video
        if (currentVideoIndex === 1) {
          setCurrentVideoIndex(0);
        } 
        // If it's the first video, continue to the second video
        else if (currentVideoIndex === 0) {
          setCurrentVideoIndex(1);
        }
      };
      
      videoElement.addEventListener('ended', handleVideoEnded);
      
      // Clean up event listener
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnded);
      };
    }
  }, [currentVideoIndex]);

  return (
    <section id="home" className="hero">
      <div className="video-background loaded">
        {!hasVideoError ? (
          <video 
            key={currentVideoIndex} // Key changes force React to recreate the video element
            ref={videoRef}
            autoPlay 
            muted 
            playsInline
            preload="auto"
            className="video-element"
            // Only loop the first video
            loop={currentVideoIndex === 0}
          >
            <source src={videoUrls[currentVideoIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="video-fallback">
            <div className="video-error-message">
              <p>Video content is currently unavailable.</p>
            </div>
          </div>
        )}
        <div className="video-overlay"></div>
      </div>
      
      <div className="hero-content">
        <h1>Empowering CDFIs to Transform Communities</h1>
        <h2>We provide strategic consulting and innovative solutions for mission-driven lenders to maximize their impact, streamline operations, and create sustainable change in underserved communities.</h2>
        <div className="hero-buttons">
          <button 
            className="primary-btn"
            onClick={() => scrollToSection('services')}
          >
            Explore Our Services
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