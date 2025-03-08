import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/scroll';
import logo from '../assets/logo.svg';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);

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
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="Clarity Impact Finance" className="navbar-logo" onClick={() => handleNavClick('home')} />
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <button 
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            About
          </button>
          <button 
            className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
            onClick={() => handleNavClick('services')}
          >
            Services
          </button>
          <button 
            className={`nav-link ${activeSection === 'blog' ? 'active' : ''}`}
            onClick={() => handleNavClick('blog')}
          >
            Case Studies
          </button>
          <button 
            className={`nav-link ${activeSection === 'resources' ? 'active' : ''}`}
            onClick={() => handleNavClick('resources')}
          >
            Resources
          </button>
          <button 
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            Contact
          </button>
        </div>
      </div>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
    </nav>
  );
};

export default Navbar; 