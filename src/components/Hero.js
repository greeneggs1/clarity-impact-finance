import React, { useState, useEffect, useMemo, useRef } from 'react';
import './Hero.css';
import { scrollToSection } from '../utils/scroll';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextVideoReady, setNextVideoReady] = useState(false);
  const [videosPreloaded, setVideosPreloaded] = useState([]);
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  
  // Use useMemo to prevent recreation of the array on each render
  const videoSources = useMemo(() => [
    // Use absolute URLs that will work on Vercel
    `${window.location.origin}/videos/ribbon-cutting.mp4`,
    `${window.location.origin}/videos/your-second-video.mp4`
  ], []);
  
  // Preload all videos immediately on component mount
  useEffect(() => {
    console.log("Preloading all videos on mount");
    
    const preloadAllVideos = async () => {
      const preloadPromises = videoSources.map((src, index) => {
        return new Promise((resolve) => {
          const video = document.createElement('video');
          video.muted = true;
          video.playsInline = true;
          video.preload = 'auto';
          
          // Track when video is loaded enough to play
          video.oncanplaythrough = () => {
            console.log(`Video ${index} preloaded: ${src}`);
            resolve(index);
          };
          
          // Set source and force load
          video.src = src;
          video.load();
          
          // Try to play and immediately pause to force buffer
          video.play().then(() => {
            video.pause();
            video.currentTime = 0;
          }).catch(e => {
            console.log(`Preload play attempt for video ${index} failed (expected):`, e.message);
          });
          
          // Set a timeout to resolve anyway after 5 seconds
          setTimeout(() => resolve(index), 5000);
        });
      });
      
      // Wait for all videos to preload
      const preloadedIndices = await Promise.all(preloadPromises);
      setVideosPreloaded(preloadedIndices);
      console.log("All videos preloaded:", preloadedIndices);
    };
    
    preloadAllVideos();
  }, [videoSources]);

  // Prepare the next video when the current one is playing
  useEffect(() => {
    if (isVideoLoaded && !isTransitioning) {
      const nextIndex = (currentVideoIndex + 1) % videoSources.length;
      console.log(`Preparing next video (index ${nextIndex}) for seamless transition`);
      
      if (nextVideoRef.current) {
        // Make sure the next video is visible but transparent
        nextVideoRef.current.className = 'inactive';
        nextVideoRef.current.style.visibility = 'visible';
        nextVideoRef.current.style.opacity = '0';
        
        // Set source and load
        nextVideoRef.current.src = videoSources[nextIndex];
        nextVideoRef.current.load();
        
        // When loaded, prepare it for instant playback
        nextVideoRef.current.onloadeddata = () => {
          console.log("Next video loaded and ready for transition");
          
          // Try to start buffering by playing and pausing
          nextVideoRef.current.play().then(() => {
            nextVideoRef.current.pause();
            nextVideoRef.current.currentTime = 0;
            setNextVideoReady(true);
          }).catch(e => {
            console.log("Next video buffer attempt failed:", e.message);
            setNextVideoReady(true); // Still mark as ready
          });
        };
      }
    }
  }, [isVideoLoaded, currentVideoIndex, isTransitioning, videoSources]);

  const handleVideoLoad = () => {
    console.log("Current video loaded");
    setIsVideoLoaded(true);
  };
  
  const handleVideoEnd = () => {
    console.log("Video ended, starting transition");
    const nextIndex = (currentVideoIndex + 1) % videoSources.length;
    
    // Start transition
    setIsTransitioning(true);
    
    // Make sure next video is ready and start playing it
    if (nextVideoRef.current) {
      // Reset to beginning
      nextVideoRef.current.currentTime = 0;
      
      // Make sure it's visible before transition starts
      nextVideoRef.current.style.visibility = 'visible';
      
      // Apply transition class after a tiny delay to ensure CSS transitions work
      setTimeout(() => {
        nextVideoRef.current.className = 'fading-in';
        
        // Start playing the next video
        const playPromise = nextVideoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Next video playback failed:", error);
          });
        }
        
        // Apply fading-out class to current video
        if (currentVideoRef.current) {
          currentVideoRef.current.className = 'fading-out';
        }
      }, 50);
      
      // After transition duration, switch to next video
      setTimeout(() => {
        setCurrentVideoIndex(nextIndex);
        setIsTransitioning(false);
        setNextVideoReady(false);
      }, 3000); // Match the CSS transition duration
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