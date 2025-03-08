import React, { useState, useRef, useEffect } from 'react';
import './Hero.css';
import { scrollToSection } from '../utils/scroll';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);
  const nextVideoRef = useRef(null);
  
  // Array of video sources
  const videoSources = [
    "/videos/ribbon-cutting.mp4",
    "/videos/your-second-video.mp4" // Second video has been added to the public/videos directory
  ];

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };
  
  // Handle video end event to start the transition to the next video
  const handleVideoEnd = () => {
    setIsTransitioning(true);
    
    // Preload the next video
    const nextIndex = (currentVideoIndex + 1) % videoSources.length;
    if (nextVideoRef.current) {
      nextVideoRef.current.src = videoSources[nextIndex];
      nextVideoRef.current.load();
      
      // Start playing the next video while the current one is still visible
      nextVideoRef.current.play().catch(error => {
        console.error("Next video playback failed:", error);
      });
      
      // After a short delay to allow the next video to start playing, complete the transition
      setTimeout(() => {
        setCurrentVideoIndex(nextIndex);
        setIsTransitioning(false);
      }, 1000); // 1 second transition time
    }
  };
  
  // Update video source when currentVideoIndex changes (after transition is complete)
  useEffect(() => {
    if (videoRef.current && !isTransitioning) {
      videoRef.current.src = videoSources[currentVideoIndex];
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.error("Video playback failed:", error);
      });
    }
  }, [currentVideoIndex, isTransitioning]);

  return (
    <section id="home" className="hero">
      <div className={`video-background ${isVideoLoaded ? 'loaded' : ''}`}>
        {/* Current video */}
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          playsInline
          onLoadedData={handleVideoLoad}
          onEnded={handleVideoEnd}
          className={isTransitioning ? 'fading-out' : ''}
        >
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Next video (for crossfade) */}
        {isTransitioning && (
          <video 
            ref={nextVideoRef}
            muted 
            playsInline
            className="fading-in"
          >
            <source src={videoSources[(currentVideoIndex + 1) % videoSources.length]} type="video/mp4" />
          </video>
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