import React, { useState } from 'react';
import './TeamSection.css';
import profileImage from '../assets/profile.jpg';
import logoEmblem from '../assets/logo-emblem.svg';

const TeamSection = () => {
  const [showFullBio, setShowFullBio] = useState(false);

  const fullBio = `Amir organizes his work around a fundamental belief: that equitable access to capital can transform underserved communities and address critical social determinants of health. Throughout his career spanning more than a decade, Amir has consistently delivered transformative results by leveraging his expertise in impact investing, community development, and tax credit finance.

Since founding Clarity Impact Finance, Amir has partnered with CDFIs and mission-driven lenders to optimize their operations, strengthen their impact measurement frameworks, and unlock new capital sources for community development. His consulting approach combines deep financial expertise with a genuine commitment to improving housing, healthcare, education, and childcare access in low-income communities.

Prior to launching Clarity Impact Finance, Amir served as Vice President of National Community Facilities Lending & New Market Tax Credit at Low Income Investment Fund, where he led critical initiatives to expand community facilities in underserved areas.

Earlier in his career, Amir developed diverse expertise across the financial sector, managing a portfolio of 15+ real estate private equity funds with investments totaling $150MM at Aviva Investors and supporting 40+ high-net-worth clients with wealth management services at Bank of New York Mellon. His entrepreneurial spirit was evident when he founded GroceryBox, an affordable online grocery marketplace delivering essentials to seniors and people with disabilities.

Amir holds a B.Com in Finance and Accounting from McGill University and is a CFA Charterholder. He remains actively engaged in community service through his volunteer work with the Mental Health Association of Rockland and previously with the Grameen Foundation's Bankers Without Borders program, where he assisted a micro-finance institution in Sudan.

What drives Amir most is witnessing the tangible differences that strategic capital deployment makes in people's lives—whether through affordable housing developments, community health centers, quality educational facilities, or accessible childcare options. He brings this passion, extensive financial expertise, and commitment to impact to every client engagement at Clarity Impact Finance.`;

  const bioPreview = fullBio.substring(0, 300) + '...';

  return (
    <section id="about" className="about">
      <div className="about-content-wrapper">
        <div className="logo-emblem-container">
          <img src={logoEmblem} alt="Clarity Impact Finance Logo Emblem" className="logo-emblem" />
          <div style={{ 
            backgroundColor: 'red', 
            color: 'white', 
            padding: '10px', 
            borderRadius: '5px',
            margin: '10px 0',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            DEPLOYMENT TEST - {new Date().toLocaleString()}
          </div>
        </div>
        
        {/* Leadership Section */}
        <h2>Our Team</h2>
        
        <div className="vision-statement">
          <p>A thriving CDFI ecosystem where all organizations, regardless of size, have the capacity to deliver equitable lending and TA solutions that meet the needs of underserved communities.</p>
        </div>

        {/* Founder Bio Card */}
        <div className="team-section">
          <div className="team-member founder">
            <div className="member-image-container">
              <img src={profileImage} alt="Amir Ali, CFA - Founder and Principal Consultant" className="member-image" />
            </div>
            <div className="member-content">
              <h3>Amir Ali, CFA</h3>
              <p className="member-title">Founder and Principal Consultant</p>
              <div className="member-bio">
                <p>{showFullBio ? fullBio : bioPreview}</p>
                <button 
                  className="read-more-btn" 
                  onClick={() => setShowFullBio(!showFullBio)}
                >
                  {showFullBio ? "Show Less" : "Read More"}
                </button>
              </div>
              <div className="member-social">
                <a 
                  href="https://www.linkedin.com/in/amirali86" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link linkedin"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                <a 
                  href="mailto:amir@clarityimpactfinance.com" 
                  className="social-link email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                  </svg>
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Advisory Board Section - Changed to Coming Soon */}
        <div className="advisory-board-section">
          <h3 className="section-subheading">Advisory Board</h3>
          <div className="coming-soon-container">
            <p className="coming-soon-message">Coming Soon - Updated May 2024</p>
          </div>
        </div>

        {/* Company Values or Additional Information Section */}
        <div className="company-values-section">
          <h3 className="section-subheading">Our Approach</h3>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.834 9.686l-4.166.575 3.032 2.914-.74 4.139 3.708-1.982 3.708 1.983-.74-4.139 3.032-2.915-4.166-.575-1.834-3.784-1.834 3.784z"/>
                </svg>
              </div>
              <h4>Excellence</h4>
              <p>We hold ourselves to the highest standards of financial rigor and community impact, delivering innovative solutions that create lasting positive change.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.248-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z"/>
                </svg>
              </div>
              <h4>Partnership</h4>
              <p>We believe in collaborative relationships that leverage the unique strengths of each organization to achieve shared goals for community development.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"/>
                </svg>
              </div>
              <h4>Integrity</h4>
              <p>We uphold the highest ethical standards in all our work, maintaining transparency, honesty, and accountability in every client relationship.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;