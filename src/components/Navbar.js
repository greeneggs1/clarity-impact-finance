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
      const sections = ['home', 'about', 'services', 'blog', 'thought-leadership', 'resources', 'contact'];
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
    // Close menu when clicking outside
    if (!isMenuOpen) {
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
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li className={activeSection === 'home' ? 'active' : ''}>
                <button onClick={() => handleNavClick('home')}>Home</button>
              </li>
              <li className={activeSection === 'about' ? 'active' : ''}>
                <button onClick={() => handleNavClick('about')}>About</button>
              </li>
              <li className={activeSection === 'services' ? 'active' : ''}>
                <button onClick={() => handleNavClick('services')}>Services</button>
              </li>
              <li className={activeSection === 'blog' ? 'active' : ''}>
                <button onClick={() => handleNavClick('blog')}>Case Studies</button>
              </li>
              <li className={activeSection === 'thought-leadership' ? 'active' : ''}>
                <button onClick={() => handleNavClick('thought-leadership')}>Insights</button>
              </li>
              <li className={activeSection === 'resources' ? 'active' : ''}>
                <button onClick={() => handleNavClick('resources')}>Resources</button>
              </li>
              <li className={activeSection === 'contact' ? 'active' : ''}>
                <button onClick={() => handleNavClick('contact')}>Contact</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
    </nav>
  );
};

export default Navbar;