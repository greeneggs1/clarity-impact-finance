import React, { useState, useEffect, useMemo, useRef } from 'react';
import './Hero.css';
import { scrollToSection } from '../utils/scroll';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);
  const videoBackgroundRef = useRef(null);
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  
  // Use useMemo to prevent recreation of the array on each render
  const videoSources = useMemo(() => [
    // Use absolute URLs that will work on Vercel
    `${window.location.origin}/videos/ribbon-cutting.mp4`,
    `${window.location.origin}/videos/your-second-video.mp4`
  ], []);
  
  // Detect Firefox on component mount
  useEffect(() => {
    const isFF = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    setIsFirefox(isFF);
    console.log("Browser detection - Firefox:", isFF);
  }, []);
  
  // Create and preload video elements on mount
  useEffect(() => {
    console.log("Creating and preloading video elements");
    
    // Preload all videos
    videoSources.forEach((src, index) => {
      // Create a new video element for preloading
      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
      
      // Set source
      video.src = src;
      
      // Force load
      video.load();
      
      console.log(`Preloading video ${index}: ${src}`);
      
      // Try to preload by playing and immediately pausing
      setTimeout(() => {
        video.play()
          .then(() => {
            video.pause();
            video.currentTime = 0;
            console.log(`Successfully preloaded video ${index}`);
          })
          .catch(e => {
            console.log(`Preload attempt for video ${index} failed (expected):`, e.message);
          });
      }, index * 1000); // Stagger preloading to avoid overwhelming the browser
    });
    
    // Set up the initial video
    if (currentVideoRef.current) {
      currentVideoRef.current.src = videoSources[0];
      currentVideoRef.current.load();
    }
    
    // Set up the next video
    if (nextVideoRef.current) {
      nextVideoRef.current.src = videoSources[1];
      nextVideoRef.current.load();
    }
  }, [videoSources]);
  
  // Prepare the next video when the current one is playing
  useEffect(() => {
    if (isVideoLoaded && !isTransitioning && nextVideoRef.current) {
      const nextIndex = (currentVideoIndex + 1) % videoSources.length;
      console.log(`Preparing next video (index ${nextIndex}) for seamless transition`);
      
      // Make sure the next video is loaded but not visible
      nextVideoRef.current.src = videoSources[nextIndex];
      nextVideoRef.current.load();
      nextVideoRef.current.currentTime = 0;
      
      // Make it visible but transparent
      nextVideoRef.current.style.visibility = 'visible';
      nextVideoRef.current.style.opacity = '0';
      nextVideoRef.current.className = 'inactive';
      
      // Firefox-specific: try to play and pause to ensure buffering
      if (isFirefox) {
        setTimeout(() => {
          nextVideoRef.current.play()
            .then(() => {
              nextVideoRef.current.pause();
              nextVideoRef.current.currentTime = 0;
              console.log("Firefox: Next video buffered");
            })
            .catch(e => {
              console.log("Firefox: Buffer attempt failed:", e.message);
            });
        }, 1000);
      }
    }
  }, [isVideoLoaded, currentVideoIndex, isTransitioning, videoSources, isFirefox]);

  const handleVideoLoad = () => {
    console.log("Current video loaded");
    setIsVideoLoaded(true);
  };
  
  const handleVideoEnd = () => {
    console.log("Video ended, starting transition");
    const nextIndex = (currentVideoIndex + 1) % videoSources.length;
    
    // Prevent multiple transitions
    if (isTransitioning) return;
    
    // Start transition
    setIsTransitioning(true);
    
    // Add transitioning class to video background for the overlay
    if (videoBackgroundRef.current) {
      videoBackgroundRef.current.classList.add('transitioning');
    }
    
    // Prepare both videos for transition
    if (currentVideoRef.current && nextVideoRef.current) {
      // Ensure next video is ready
      nextVideoRef.current.currentTime = 0;
      nextVideoRef.current.style.visibility = 'visible';
      
      // Firefox-specific handling
      if (isFirefox) {
        // For Firefox, use a more aggressive approach
        // Start playing next video immediately
        nextVideoRef.current.play().catch(e => console.error("Firefox play error:", e));
        
        // Apply classes immediately
        currentVideoRef.current.className = 'fading-out';
        nextVideoRef.current.className = 'fading-in';
        
        // Higher starting opacity for Firefox
        nextVideoRef.current.style.opacity = '0.4';
      } else {
        // For other browsers, use the standard approach with a slight delay
        setTimeout(() => {
          // Start fading out current video
          currentVideoRef.current.className = 'fading-out';
          
          // Start fading in next video
          nextVideoRef.current.className = 'fading-in';
          
          // Start playing next video
          nextVideoRef.current.play().catch(error => {
            console.error("Next video playback failed:", error);
          });
        }, 50);
      }
      
      // After transition completes, update state
      setTimeout(() => {
        setCurrentVideoIndex(nextIndex);
        setIsTransitioning(false);
        
        // Remove transitioning class
        if (videoBackgroundRef.current) {
          videoBackgroundRef.current.classList.remove('transitioning');
        }
        
        // Reset video elements
        if (currentVideoRef.current) {
          currentVideoRef.current.className = 'active';
          currentVideoRef.current.src = videoSources[nextIndex];
          currentVideoRef.current.load();
          currentVideoRef.current.play().catch(e => console.error("Reset play error:", e));
        }
        
        if (nextVideoRef.current) {
          const upcomingIndex = (nextIndex + 1) % videoSources.length;
          nextVideoRef.current.className = 'inactive';
          nextVideoRef.current.src = videoSources[upcomingIndex];
          nextVideoRef.current.load();
        }
      }, isFirefox ? 3500 : 3000); // Slightly longer for Firefox
    }
  };

  return (
    <section id="home" className="hero">
      <div 
        ref={videoBackgroundRef}
        className={`video-background ${isVideoLoaded ? 'loaded' : ''}`}
      >
        {/* Current video */}
        <video 
          ref={currentVideoRef}
          key={`current-${currentVideoIndex}`}
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
          key={`next-${(currentVideoIndex + 1) % videoSources.length}`}
          muted 
          playsInline
          className={isTransitioning ? 'fading-in' : 'inactive'}
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