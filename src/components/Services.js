import React from 'react';
import './Services.css';
import { scrollToSection } from '../utils/scroll';

const Services = () => {
  return (
    <section id="services" className="services">
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

        <div className="services-cta">
          <h3>Ready to Transform Your CDFI's Impact?</h3>
          <p>Let's discuss how our expertise can help you achieve your community development goals.</p>
          <button 
            className="contact-btn"
            onClick={() => scrollToSection('contact')}
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services; 