import React, { useState, useEffect, useMemo, useRef } from 'react';
import './Hero.css';
import { scrollToSection } from '../utils/scroll';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoError, setVideoError] = useState(null);
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const videoRef = useRef(null);
  const fallbackImageUrl = `${window.location.origin}/images/hero-fallback.jpg`;
  
  // Use useMemo to prevent recreation of the array on each render
  const videoSources = useMemo(() => [
    // Use absolute URLs that will work on Vercel
    `${window.location.origin}/videos/ribbon-cutting.mp4`,
    `${window.location.origin}/videos/your-second-video.mp4`
  ], []);
  
  // Check if video is supported
  useEffect(() => {
    const videoTest = document.createElement('video');
    if (!videoTest.canPlayType) {
      console.log("Video not supported by browser");
      setIsVideoSupported(false);
      return;
    }
    
    const canPlayMP4 = videoTest.canPlayType('video/mp4');
    if (canPlayMP4 === '') {
      console.log("MP4 video not supported by browser");
      setIsVideoSupported(false);
    } else {
      console.log("MP4 video support level:", canPlayMP4);
    }
  }, []);
  
  // Preload videos on mount
  useEffect(() => {
    if (!isVideoSupported) return;
    
    console.log("Preloading videos");
    
    // Preload all videos
    videoSources.forEach((src, index) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.src = src;
      video.load();
      console.log(`Preloading video ${index}: ${src}`);
      
      // Add error handling for preloading
      video.onerror = (e) => {
        console.error(`Error preloading video ${index}:`, e);
        setVideoError(`Failed to preload video ${index}: ${src}`);
      };
    });
    
    // Try to directly fetch the video files
    videoSources.forEach((src, index) => {
      fetch(src, { method: 'HEAD' })
        .then(response => {
          console.log(`Video ${index} fetch response:`, response.status, response.ok);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        })
        .catch(error => {
          console.error(`Error fetching video ${index}:`, error);
          setVideoError(`Failed to fetch video ${index}: ${error.message}`);
        });
    });
    
    // Preload fallback image
    const img = new Image();
    img.src = fallbackImageUrl;
    img.onload = () => console.log("Fallback image loaded");
    img.onerror = (e) => console.error("Error loading fallback image:", e);
    
  }, [videoSources, isVideoSupported, fallbackImageUrl]);

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setIsVideoLoaded(true);
    setVideoError(null);
  };
  
  const handleVideoEnd = () => {
    if (!isVideoSupported || !videoRef.current) return;
    
    console.log("Video ended, switching to next video");
    
    // Calculate next video index
    const nextIndex = (currentVideoIndex + 1) % videoSources.length;
    console.log(`Switching from video ${currentVideoIndex} to ${nextIndex}`);
    
    try {
      // First make the video invisible
      videoRef.current.className = 'inactive';
      
      // After a short delay, change the source and make it active again
      setTimeout(() => {
        videoRef.current.src = videoSources[nextIndex];
        videoRef.current.load();
        
        // When the new video is loaded, play it and make it visible
        videoRef.current.onloadeddata = () => {
          videoRef.current.play()
            .then(() => {
              console.log(`Video ${nextIndex} playing successfully`);
              videoRef.current.className = 'active';
            })
            .catch(e => {
              console.error("Video play error:", e);
              setVideoError(`Failed to play video ${nextIndex}: ${e.message}`);
              setIsVideoSupported(false); // Fall back to image if video won't play
            });
        };
        
        // Update the current index
        setCurrentVideoIndex(nextIndex);
      }, 100);
    } catch (error) {
      console.error("Error during video transition:", error);
      setVideoError(`Error during video transition: ${error.message}`);
      setIsVideoSupported(false); // Fall back to image if video transition fails
    }
  };
  
  const handleVideoError = (e) => {
    console.error("Video error:", e);
    const videoElement = e.target;
    const errorMessage = `Video error: ${videoElement.error ? videoElement.error.message : 'Unknown error'}`;
    console.error(errorMessage);
    setVideoError(errorMessage);
    
    // After multiple errors, fall back to image
    setIsVideoSupported(false);
  };

  return (
    <section id="home" className="hero">
      <div className={`video-background ${isVideoLoaded ? 'loaded' : ''}`}>
        {isVideoSupported ? (
          // Video background
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            playsInline
            onLoadedData={handleVideoLoad}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            className="active"
          >
            <source src={videoSources[currentVideoIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Fallback image background
          <div 
            className="fallback-image active" 
            style={{ backgroundImage: `url(${fallbackImageUrl})` }}
            aria-label="Hero background image"
          ></div>
        )}
        
        <div className="video-overlay"></div>
        
        {/* Display error message if there's an issue with the video */}
        {videoError && process.env.NODE_ENV === 'development' && (
          <div className="video-error-message">
            {videoError}
          </div>
        )}
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