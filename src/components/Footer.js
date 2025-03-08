import React from 'react';
import { scrollToSection } from '../utils/scroll';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', section: 'home' },
    { name: 'About', section: 'about' },
    { name: 'Services', section: 'services' },
    { name: 'Resources', section: 'resources' },
    { name: 'Contact', section: 'contact' }
  ];

  const services = [
    'Financial Strategy',
    'Investment Advisory',
    'Risk Management',
    'Tax Planning',
    'Business Consulting',
    'Wealth Management'
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: '🔗', url: 'https://linkedin.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'Facebook', icon: '👥', url: 'https://facebook.com' },
    { name: 'Instagram', icon: '📸', url: 'https://instagram.com' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>
              Clarity Impact Finance provides expert financial consulting services 
              to help businesses and individuals achieve their financial goals 
              through strategic planning and innovative solutions.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button onClick={() => scrollToSection(link.section)}>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Our Services</h3>
            <ul>
              {services.map((service, index) => (
                <li key={index}>
                  <button onClick={() => scrollToSection('services')}>
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <p>📍 123 Financial District</p>
              <p>New York, NY 10004</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ contact@clarityimpact.com</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Clarity Impact Finance. All rights reserved.</p>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 