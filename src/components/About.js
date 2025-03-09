import React from 'react';
import './About.css';
import profileImage from '../assets/profile.jpg';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-content-wrapper">
        <h2>Leadership & Vision</h2>
        
        <div className="vision-statement">
          <p>A thriving CDFI ecosystem where all organizations, regardless of size, have the capacity to deliver equitable lending and TA solutions that meet the needs of underserved communities.</p>
        </div>

        <div className="about-grid">
          {/* Founder Profile Column */}
          <div className="founder-column">
            <div className="founder-profile">
              <div className="founder-image">
                <img src={profileImage} alt="Amir Ali, CFA - CDFI Finance Expert" />
              </div>
              <h3>Amir Ali, CFA</h3>
              <p className="founder-title">Founder & Principal Consultant</p>
              <p className="founder-motto">"Empowering CDFIs to create lasting community impact through strategic innovation."</p>
              <div className="founder-contact">
                <a href="mailto:amir@clarityimpactfinance.com" className="contact-link email-link">
                  <span className="contact-icon">✉</span>
                  amir@clarityimpactfinance.com
                </a>
                <a href="https://www.linkedin.com/in/amirali86" target="_blank" rel="noopener noreferrer" className="contact-link linkedin-link">
                  <span className="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </span>
                  LinkedIn Profile
                </a>
              </div>
            </div>

            <div className="company-badge">
              <div className="badge-content">
                <h4>Minority-Owned Enterprise</h4>
                <p>Bringing authentic perspectives and innovative solutions to community development finance</p>
              </div>
            </div>
          </div>

          {/* Professional Info Column */}
          <div className="professional-column">
            <div className="professional-section">
              <h4>Strategic Leadership</h4>
              <div className="experience-card">
                <h5>Vice President, Community Facilities Lending</h5>
                <p className="experience-details">
                  Spearheaded strategic lending initiatives at Low Income Investment Fund (a major CDFI), orchestrating over $150M in 
                  community investments. Developed innovative financing solutions for healthcare, education, 
                  and community facility projects.
                </p>
              </div>
              <div className="experience-card">
                <h5>Technical Assistance Innovation</h5>
                <p className="experience-details">
                  Pioneered comprehensive TA programs that revolutionized CDFI operations. Created scalable 
                  frameworks for impact measurement, operational efficiency, and program evaluation.
                </p>
              </div>
            </div>

            <div className="professional-section">
              <h4>Industry Leadership</h4>
              <div className="experience-card">
                <h5>Community Impact</h5>
                <p className="experience-details">
                  Active Board Member at YMCA of Yonkers, driving initiatives that strengthen community 
                  engagement and financial sustainability. Direct experience in translating strategic 
                  vision into measurable community outcomes.
                </p>
              </div>
              <div className="experience-card">
                <h5>Knowledge Leadership</h5>
                <p className="experience-details">
                  Recognized thought leader in CDFI sector development, regularly presenting at impact 
                  finance conferences. Expertise in emerging trends, regulatory changes, and innovative 
                  financing structures.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="market-section">
          <h3>Market Insight</h3>
          <div className="market-stats">
            <div className="stat-card">
              <span className="stat-number">550+</span>
              <p>Target CDFIs<br /><span className="stat-detail">Small to Mid-Sized Institutions</span></p>
            </div>
            <div className="stat-card">
              <span className="stat-number">$150M+</span>
              <p>Proven Track Record<br /><span className="stat-detail">In Community Investments</span></p>
            </div>
            <div className="stat-card">
              <span className="stat-number">$5B</span>
              <p>Market Potential<br /><span className="stat-detail">2023 CDFI Fund Awards</span></p>
            </div>
          </div>
          <p className="market-description">
            In today's evolving CDFI landscape, small and mid-sized institutions face unique challenges 
            in building robust lending programs and measuring impact. Our deep expertise in deploying 
            over $150M in strategic investments positions us to help these institutions unlock their 
            full potential and maximize community impact.
          </p>
          <div className="market-cta">
            <button onClick={() => window.location.href = '#contact'} className="cta-button">
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 