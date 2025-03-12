import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/scroll';
import logo from '../assets/logo-new.svg';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check if the device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Update scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
      
      // Check if page is scrolled to add background
      setIsScrolled(currentScrollPos > 50);
      
      // Don't hide navbar when menu is open
      if (isMenuOpen) {
        setIsVisible(true);
        return;
      }
      
      // Hide/show navbar based on scroll direction
      // Only apply this behavior when we're scrolled down a bit to avoid flickering at the top
      if (currentScrollPos > 100) {
        // Determine if scrolling up or down
        const isScrollingDown = currentScrollPos > prevScrollPos;
        
        // Only change visibility if we've scrolled more than 10px to avoid flickering
        if (Math.abs(currentScrollPos - prevScrollPos) > 10) {
          setIsVisible(!isScrollingDown);
        }
      } else {
        // Always show navbar at the top of the page
        setIsVisible(true);
      }
      
      setPrevScrollPos(currentScrollPos);

      // Update active section
      const sections = ['home', 'about', 'services', 'blog', 'resources', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isMenuOpen]);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    // Always show navbar when menu is open
    if (newMenuState) {
      setIsVisible(true);
      document.addEventListener('click', closeMenuOnClickOutside);
    } else {
      document.removeEventListener('click', closeMenuOnClickOutside);
    }
  };

  const closeMenuOnClickOutside = (e) => {
    if (!e.target.closest('.navbar-container')) {
      setIsMenuOpen(false);
      document.removeEventListener('click', closeMenuOnClickOutside);
    }
  };

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
    document.removeEventListener('click', closeMenuOnClickOutside);
  };

  // Determine navbar classes
  const navbarClasses = [
    'navbar',
    isScrolled ? 'scrolled' : '',
    isVisible || isMenuOpen ? 'visible' : 'hidden'
  ].filter(Boolean).join(' ');

  // Navigation links configuration
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'resources', label: 'Resources' }
  ];

  return (
    <nav className={navbarClasses}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <img 
            src={logo} 
            alt="Clarity Impact Finance" 
            className="navbar-logo" 
            onClick={() => handleNavClick('home')} 
          />
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        {isMobile ? (
          <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
            <div className="nav-links active">
              <ul>
                {navLinks.map(link => (
                  <li key={link.id} className={activeSection === link.id ? 'active' : ''}>
                    <button onClick={() => handleNavClick(link.id)}>{link.label}</button>
                  </li>
                ))}
              </ul>
              <button 
                className="contact-btn" 
                onClick={() => handleNavClick('contact')}
              >
                Contact Us
              </button>
            </div>
          </div>
        ) : (
          <div className="navbar-menu">
            <div className="nav-links">
              <ul>
                {navLinks.map(link => (
                  <li key={link.id} className={activeSection === link.id ? 'active' : ''}>
                    <button onClick={() => handleNavClick(link.id)}>{link.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <button 
              className="contact-btn" 
              onClick={() => handleNavClick('contact')}
            >
              Contact Us
            </button>
          </div>
        )}
      </div>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
    </nav>
  );
};

export default Navbar;