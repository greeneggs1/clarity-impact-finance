import React, { useState, useEffect, useMemo, useRef } from 'react';
import './Hero.css';
import { scrollToSection } from '../utils/scroll';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videosPreloaded, setVideosPreloaded] = useState([]);
  const [videoElements, setVideoElements] = useState([]);
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  
  // Use useMemo to prevent recreation of the array on each render
  const videoSources = useMemo(() => [
    // Use absolute URLs that will work on Vercel
    `${window.location.origin}/videos/ribbon-cutting.mp4`,
    `${window.location.origin}/videos/your-second-video.mp4`
  ], []);
  
  // Create and preload video elements on mount
  useEffect(() => {
    console.log("Creating and preloading video elements");
    
    // Create an array to hold the video elements
    const videos = [];
    
    // Create a video element for each source
    videoSources.forEach((src, index) => {
      // Create a new video element
      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.loop = false; // Don't loop individual videos
      
      // Set source
      video.src = src;
      
      // Force load
      video.load();
      
      // Add to array
      videos.push(video);
      
      console.log(`Created video element ${index} for ${src}`);
      
      // Try to preload by playing and immediately pausing
      setTimeout(() => {
        video.play()
          .then(() => {
            video.pause();
            video.currentTime = 0;
            console.log(`Successfully preloaded video ${index}`);
            setVideosPreloaded(prev => [...prev, index]);
          })
          .catch(e => {
            console.log(`Preload attempt for video ${index} failed (expected):`, e.message);
            // Still consider it preloaded for our purposes
            setVideosPreloaded(prev => [...prev, index]);
          });
      }, index * 1000); // Stagger preloading to avoid overwhelming the browser
    });
    
    // Save the video elements
    setVideoElements(videos);
    
    // Clean up function
    return () => {
      videos.forEach(video => {
        video.src = '';
        video.load();
      });
    };
  }, [videoSources]);
  
  // Set up the current video when it changes
  useEffect(() => {
    if (currentVideoRef.current && videoElements[currentVideoIndex]) {
      console.log(`Setting up current video (index ${currentVideoIndex})`);
      
      // Reset the video element
      currentVideoRef.current.currentTime = 0;
      currentVideoRef.current.className = 'active';
      
      // Play the video
      const playPromise = currentVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Current video playback failed:", error);
        });
      }
      
      setIsVideoLoaded(true);
    }
  }, [currentVideoIndex, videoElements]);
  
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
    }
  }, [isVideoLoaded, currentVideoIndex, isTransitioning, videoSources]);

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
    
    // Prepare both videos for transition
    if (currentVideoRef.current && nextVideoRef.current) {
      // Ensure next video is ready
      nextVideoRef.current.currentTime = 0;
      nextVideoRef.current.style.visibility = 'visible';
      
      // Apply transition classes with a slight delay to ensure proper rendering
      setTimeout(() => {
        // Start fading out current video
        currentVideoRef.current.className = 'fading-out';
        
        // Start fading in next video
        nextVideoRef.current.className = 'fading-in';
        
        // Start playing next video
        const playPromise = nextVideoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Next video playback failed:", error);
          });
        }
      }, 50);
      
      // After transition completes, update state
      setTimeout(() => {
        setCurrentVideoIndex(nextIndex);
        setIsTransitioning(false);
        
        // Swap video references for next transition
        const temp = currentVideoRef;
        currentVideoRef.current = nextVideoRef.current;
        nextVideoRef.current = temp.current;
      }, 3000);
    }
  };

  return (
    <section id="home" className="hero">
      <div className={`video-background ${isVideoLoaded ? 'loaded' : ''}`}>
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