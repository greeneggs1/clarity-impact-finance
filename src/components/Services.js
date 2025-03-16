import React, { useEffect, useRef } from 'react';
import './Services.css';
import { scrollToSection } from '../utils/scroll';

const Services = () => {
  const servicesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When services section enters viewport
        if (entry.isIntersecting) {
          servicesRef.current.classList.add('in-view');
        } else {
          servicesRef.current.classList.remove('in-view');
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% visible
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    // Clean up the observer on unmount
    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  return (
    <section id="services" className="services" ref={servicesRef}>
      <div className="services-container">
        <h2>Our Services</h2>
        <p className="services-intro">
          Specialized consulting services designed to strengthen CDFIs and maximize their community impact
        </p>

        <div className="services-grid">
          <div className="service-card">
            <h3>Underwriting & Lending Strategy</h3>
            <div className="service-content">
              <p>Advising on lending product design, underwriting policies, and equitable lending practices.</p>
              <ul className="service-features">
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Lending Product Design & Innovation</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Underwriting Policy Development</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Risk Assessment Frameworks</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Equitable Lending Practices</span>
                </li>
              </ul>
              <div className="service-benefits">
                <h4>Key Benefits</h4>
                <ul>
                  <li>Streamlined lending processes</li>
                  <li>Enhanced risk management</li>
                  <li>Increased operational efficiency</li>
                  <li>Greater community impact</li>
                </ul>
              </div>
            </div>
            <button 
              className="learn-more-btn"
              onClick={() => scrollToSection('contact')}
            >
              Learn More
            </button>
          </div>

          <div className="service-card">
            <h3>NMTC Consulting</h3>
            <div className="service-content">
              <p>Strategic program development, compliance oversight, and asset management solutions for New Markets Tax Credit initiatives.</p>
              <ul className="service-features">
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Program Strategy Development</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Compliance Management</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Asset Management Solutions</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Impact Measurement</span>
                </li>
              </ul>
              <div className="service-benefits">
                <h4>Key Benefits</h4>
                <ul>
                  <li>Optimized NMTC strategies</li>
                  <li>Regulatory compliance</li>
                  <li>Enhanced portfolio management</li>
                  <li>Maximized community benefits</li>
                </ul>
              </div>
            </div>
            <button 
              className="learn-more-btn"
              onClick={() => scrollToSection('contact')}
            >
              Learn More
            </button>
          </div>

          <div className="service-card">
            <h3>Federal Program Compliance & Asset Management</h3>
            <div className="service-content">
              <p>Comprehensive compliance oversight and asset management solutions for federal programs including BGP and Department of Education initiatives.</p>
              <ul className="service-features">
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Program Compliance Systems</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Risk Management & Monitoring</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Portfolio Oversight</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Reporting & Documentation</span>
                </li>
              </ul>
              <div className="service-benefits">
                <h4>Key Benefits</h4>
                <ul>
                  <li>Regulatory compliance assurance</li>
                  <li>Streamlined monitoring processes</li>
                  <li>Enhanced risk management</li>
                  <li>Improved reporting efficiency</li>
                </ul>
              </div>
            </div>
            <button 
              className="learn-more-btn"
              onClick={() => scrollToSection('contact')}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 