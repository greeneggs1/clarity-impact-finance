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
  
  // Start preloading the next video when the current one is almost finished
  const handleTimeUpdate = () => {
    if (videoRef.current && !isTransitioning) {
      const timeLeft = videoRef.current.duration - videoRef.current.currentTime;
      
      // When 2 seconds are left in the current video, start the transition
      if (timeLeft <= 2 && timeLeft > 0) {
        startTransition();
      }
    }
  };
  
  // Start the transition to the next video
  const startTransition = () => {
    if (isTransitioning) return; // Prevent multiple transitions
    
    setIsTransitioning(true);
    
    // Preload and start playing the next video
    const nextIndex = (currentVideoIndex + 1) % videoSources.length;
    if (nextVideoRef.current) {
      nextVideoRef.current.src = videoSources[nextIndex];
      nextVideoRef.current.load();
      
      // Start playing the next video immediately
      nextVideoRef.current.play().catch(error => {
        console.error("Next video playback failed:", error);
      });
      
      // After a short delay, start fading out the current video
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.classList.add('fading-out');
        }
      }, 500);
      
      // After the transition completes, update the current video
      setTimeout(() => {
        setCurrentVideoIndex(nextIndex);
        setIsTransitioning(false);
      }, 1500);
    }
  };
  
  // Handle video end as a fallback (in case timeupdate doesn't trigger properly)
  const handleVideoEnd = () => {
    if (!isTransitioning) {
      startTransition();
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
          onTimeUpdate={handleTimeUpdate}
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