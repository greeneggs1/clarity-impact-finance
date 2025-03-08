import React, { useState, useEffect, useMemo, useRef } from 'react';
import './Hero.css';
import { scrollToSection } from '../utils/scroll';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextVideoReady, setNextVideoReady] = useState(false);
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  
  // Use useMemo to prevent recreation of the array on each render
  const videoSources = useMemo(() => [
    // Use absolute URLs that will work on Vercel
    `${window.location.origin}/videos/ribbon-cutting.mp4`,
    `${window.location.origin}/videos/your-second-video.mp4`
  ], []);
  
  // Log video sources for debugging
  useEffect(() => {
    console.log("Video sources:", videoSources);
    
    // Preload all videos immediately
    videoSources.forEach((src, index) => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';
      console.log(`Preloading video ${index}: ${src}`);
      
      // Force browser to actually download the video
      video.load();
    });
  }, [videoSources]);

  // Preload the next video when the current one starts playing
  useEffect(() => {
    if (isVideoLoaded && !isTransitioning) {
      const nextIndex = (currentVideoIndex + 1) % videoSources.length;
      console.log(`Actively preloading next video (index ${nextIndex}): ${videoSources[nextIndex]}`);
      
      if (nextVideoRef.current) {
        nextVideoRef.current.src = videoSources[nextIndex];
        nextVideoRef.current.load();
        
        // Start buffering the next video
        const preloadPromise = nextVideoRef.current.play()
          .then(() => {
            // Immediately pause after starting to buffer
            nextVideoRef.current.pause();
            nextVideoRef.current.currentTime = 0;
            console.log("Next video buffered and ready");
          })
          .catch(error => {
            // This is often expected due to autoplay restrictions
            console.log("Preload play attempt failed (expected):", error.message);
          });
      }
    }
  }, [isVideoLoaded, currentVideoIndex, isTransitioning, videoSources]);

  const handleVideoLoad = () => {
    console.log("Current video loaded");
    setIsVideoLoaded(true);
  };
  
  const handleNextVideoLoad = () => {
    console.log("Next video loaded and ready");
    setNextVideoReady(true);
  };
  
  const handleVideoEnd = () => {
    console.log("Video ended, starting transition");
    const nextIndex = (currentVideoIndex + 1) % videoSources.length;
    
    // Always set next video as ready before transition starts
    setNextVideoReady(true);
    
    // Start transition immediately
    setIsTransitioning(true);
    
    // Make sure next video is ready and start playing it
    if (nextVideoRef.current) {
      // Ensure the video is at the beginning
      nextVideoRef.current.currentTime = 0;
      
      // Play the next video immediately
      const playPromise = nextVideoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Next video playback failed:", error);
        });
      }
      
      // After transition duration, switch to next video
      setTimeout(() => {
        setCurrentVideoIndex(nextIndex);
        setIsTransitioning(false);
        setNextVideoReady(false);
      }, 2500); // Match the CSS transition duration
    }
  };

  return (
    <section id="home" className="hero">
      <div className={`video-background ${isVideoLoaded ? 'loaded' : ''}`}>
        {/* Current video */}
        <video 
          ref={currentVideoRef}
          key={`current-${videoSources[currentVideoIndex]}`}
          autoPlay 
          muted 
          playsInline
          onLoadedData={handleVideoLoad}
          onEnded={handleVideoEnd}
          className={isTransitioning ? 'fading-out' : 'active'}
          onError={(e) => console.error("Current video error:", e)}
        >
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Next video - always render but only show during transition */}
        <video 
          ref={nextVideoRef}
          key={`next-${videoSources[(currentVideoIndex + 1) % videoSources.length]}`}
          muted 
          playsInline
          className={isTransitioning ? 'fading-in' : 'inactive'}
          onLoadedData={() => {
            if (!isTransitioning) {
              console.log("Next video preloaded successfully");
            } else {
              handleNextVideoLoad();
            }
          }}
          onError={(e) => console.error("Next video error:", e)}
        >
          <source src={videoSources[(currentVideoIndex + 1) % videoSources.length]} type="video/mp4" />
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