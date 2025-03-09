import React from 'react';
import './About.css';
import profileImage from '../assets/profile.jpg';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-header">
          <h2>Leadership & Vision</h2>
          <div className="section-divider">
            <span></span>
          </div>
        </div>
        
        <div className="vision-container">
          <div className="vision-content">
            <div className="vision-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <div className="vision-text">
              <h3>Our Vision</h3>
              <p>A thriving CDFI ecosystem where all organizations, regardless of size, have the capacity to deliver equitable lending and TA solutions that meet the needs of underserved communities.</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-image-container">
              <img src={profileImage} alt="Amir Ali, CFA - CDFI Finance Expert" />
            </div>
            <div className="profile-details">
              <h3>Amir Ali, CFA</h3>
              <p className="profile-title">Founder & Principal Consultant</p>
              <div className="profile-quote">
                <svg className="quote-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p>I help community lenders create lasting positive change through smart, innovative approaches.</p>
              </div>
              <div className="profile-contact">
                <a href="mailto:amir@clarityimpactfinance.com" className="contact-link email-link">
                  <span className="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  amir@clarityimpactfinance.com
                </a>
                <a href="https://www.linkedin.com/in/amirali86" target="_blank" rel="noopener noreferrer" className="contact-link linkedin-link">
                  <span className="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </span>
                  LinkedIn Profile
                </a>
              </div>
              <div className="minority-badge">
                <span className="badge-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </span>
                <span className="badge-text">Minority-Owned Enterprise</span>
              </div>
            </div>
          </div>
          
          <div className="experience-container">
            <div className="experience-section">
              <h3>Professional Experience</h3>
              
              <div className="experience-card">
                <div className="experience-header">
                  <div className="experience-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </div>
                  <h4>Strategic Leadership</h4>
                </div>
                <div className="experience-items">
                  <div className="experience-item">
                    <h5>Vice President, Community Facilities Lending</h5>
                    <p>As Vice President of Community Facilities Lending, I led initiatives that brought $150M to neighborhoods that needed it most. I created practical funding solutions for health centers, schools, and community spaces.</p>
                  </div>
                  <div className="experience-item">
                    <h5>Make Help More Effective</h5>
                    <p>I led federal programs and ensured they met all requirements. I streamlined compliance processes to reduce paperwork while maintaining accountability. My approach helped organizations navigate complex regulations and put more resources toward serving communities instead of administrative burdens.</p>
                  </div>
                </div>
              </div>
              
              <div className="experience-card">
                <div className="experience-header">
                  <div className="experience-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h4>Industry Leadership</h4>
                </div>
                <div className="experience-items">
                  <div className="experience-item">
                    <h5>Community Impact</h5>
                    <p>Active Board Member at YMCA of Yonkers, driving initiatives that strengthen community engagement and financial sustainability. Direct experience in translating strategic vision into measurable community outcomes.</p>
                  </div>
                  <div className="experience-item">
                    <h5>Knowledge Leadership</h5>
                    <p>Recognized thought leader in CDFI sector development, regularly presenting at impact finance conferences. Expertise in emerging trends, regulatory changes, and innovative financing structures.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="market-insights">
          <h3>Market Insight</h3>
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">550+</div>
              <div className="stat-label">Target CDFIs</div>
              <div className="stat-detail">Small to Mid-Sized Institutions</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">$150M+</div>
              <div className="stat-label">Proven Track Record</div>
              <div className="stat-detail">In Community Investments</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">$5B</div>
              <div className="stat-label">Market Potential</div>
              <div className="stat-detail">2023 CDFI Fund Awards</div>
            </div>
          </div>
          <div className="market-description">
            <p>In today's evolving CDFI landscape, small and mid-sized institutions face unique challenges in building robust lending programs and measuring impact. Our deep expertise in deploying over $150M in strategic investments positions us to help these institutions unlock their full potential and maximize community impact.</p>
            <div className="cta-container">
              <a href="#contact" className="cta-button">Partner With Us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 