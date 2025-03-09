import React, { useState, useRef, useEffect } from 'react';
import './Hero.css';
import { scrollToSection } from '../utils/scroll';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const videoRef = useRef(null);
  
  // Cloudinary video URL
  const videoUrl = "https://res.cloudinary.com/dxenrdunh/video/upload/v1741485459/ribbon-cutting_lkwd5e.mp4";
  
  // Handle video loading and errors
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleVideoLoaded = () => {
        console.log("Video loaded successfully");
        setIsVideoLoaded(true);
      };
      
      const handleVideoError = (error) => {
        console.error("Error loading video:", error);
        setHasVideoError(true);
      };
      
      videoElement.addEventListener('loadeddata', handleVideoLoaded);
      videoElement.addEventListener('error', handleVideoError);
      
      // Clean up event listeners
      return () => {
        videoElement.removeEventListener('loadeddata', handleVideoLoaded);
        videoElement.removeEventListener('error', handleVideoError);
      };
    }
  }, []);

  // Fallback to local video if Cloudinary video fails to load
  const handleCloudinaryError = () => {
    console.log("Cloudinary video failed to load, falling back to local video");
    setHasVideoError(false); // Reset error state to try local video
  };

  return (
    <section id="home" className="hero">
      <div className={`video-background ${isVideoLoaded ? 'loaded' : ''}`}>
        {!hasVideoError ? (
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="video-element"
            onError={handleCloudinaryError}
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={`${window.location.origin}/videos/ribbon-cutting.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="video-error-message">
            <p>Unable to load video. Please check your connection or try again later.</p>
          </div>
        )}
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