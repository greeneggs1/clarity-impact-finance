import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Hero.css';
import { scrollToSection } from '../utils/scroll';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const timerRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  
  // Hero images wrapped in useMemo to prevent recreation on every render
  const heroImages = useMemo(() => [
    `${window.location.origin}/images/hero1.jpg`,
    `${window.location.origin}/images/hero2.jpg`
  ], []);
  
  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = heroImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
      Promise.all(imagePromises)
        .then(() => {
          console.log("All hero images preloaded successfully");
          setIsLoaded(true);
        })
        .catch((error) => {
          console.error("Error preloading hero images:", error);
          // Still set as loaded to show at least something
          setIsLoaded(true);
        });
    };
    
    preloadImages();
  }, [heroImages]);
  
  // Set up image rotation
  useEffect(() => {
    if (!isLoaded) return;
    
    const rotateImages = () => {
      // Start transition to next image
      setIsTransitioning(true);
      
      // After transition duration, change the image
      transitionTimeoutRef.current = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 1000); // 1 second for the fade transition
    };
    
    // Start the timer for image rotation - each image displays for 5 seconds + 1 second transition
    timerRef.current = setInterval(rotateImages, 6000);
    
    // Clean up the timers on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [isLoaded, heroImages]);

  return (
    <section id="home" className="hero">
      <div className={`hero-background ${isLoaded ? 'loaded' : ''}`}>
        {/* Current image */}
        <div 
          className={`hero-image ${isTransitioning ? 'fade-out' : 'fade-in'}`}
          style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
        ></div>
        
        {/* Next image (shown during transition) */}
        <div 
          className={`hero-image next-image ${isTransitioning ? 'fade-in' : 'fade-out'}`}
          style={{ backgroundImage: `url(${heroImages[(currentImageIndex + 1) % heroImages.length]})` }}
        ></div>
        
        <div className="hero-overlay"></div>
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