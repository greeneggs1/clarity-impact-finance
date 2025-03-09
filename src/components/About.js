import React from 'react';
import './About.css';
import profileImage from '../assets/profile.jpg';

const About = () => {
  // Timeline data for the company journey
  const timelineData = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Established Clarity Impact Finance with a mission to transform CDFI operations.'
    },
    {
      year: '2021',
      title: 'First Major Partnership',
      description: 'Launched strategic consulting services for small to mid-sized CDFIs.'
    },
    {
      year: '2022',
      title: 'Impact Framework',
      description: 'Developed proprietary impact measurement methodology for community investments.'
    },
    {
      year: '2023',
      title: 'Expansion',
      description: 'Expanded services to include technical assistance and strategic planning.'
    }
  ];

  // Impact statistics with visual elements
  const impactStats = [
    {
      number: '$150M+',
      label: 'Community Investments',
      icon: '💰',
      description: 'Capital deployed to underserved communities through strategic lending initiatives'
    },
    {
      number: '25+',
      label: 'CDFI Partnerships',
      icon: '🤝',
      description: 'Strategic partnerships with community development financial institutions'
    },
    {
      number: '15+',
      label: 'Healthcare Facilities',
      icon: '🏥',
      description: 'Critical healthcare infrastructure projects in underserved communities'
    },
    {
      number: '20+',
      label: 'Education Projects',
      icon: '🏫',
      description: 'Educational facilities and programs supported through strategic financing'
    }
  ];

  return (
    <section id="about" className="about">
      <div className="about-content-wrapper">
        <h2>Leadership & Vision</h2>
        
        <div className="vision-statement">
          <div className="vision-quote">
            <span className="quote-mark">"</span>
            <p>A thriving CDFI ecosystem where all organizations, regardless of size, have the capacity to deliver equitable lending and TA solutions that meet the needs of underserved communities.</p>
            <span className="quote-mark">"</span>
          </div>
        </div>

        {/* Journey Timeline Section */}
        <div className="journey-timeline">
          <h3 className="section-title">Our Journey</h3>
          <div className="timeline">
            {timelineData.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
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
              <div className="founder-quote">
                <p>"Empowering CDFIs to create lasting community impact through strategic innovation."</p>
              </div>
              <div className="founder-contact">
                <a href="mailto:amir@clarityimpactfinance.com" className="contact-link">
                  <span className="contact-icon">✉</span>
                  amir@clarityimpactfinance.com
                </a>
                <a href="tel:917-660-4019" className="contact-link">
                  <span className="contact-icon">📱</span>
                  917-660-4019
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
                <div className="card-header">
                  <div className="card-icon">🏢</div>
                  <h5>Vice President, Community Facilities Lending</h5>
                </div>
                <p className="experience-details">
                  Spearheaded strategic lending initiatives at Low Income Investment Fund (a major CDFI), orchestrating over $150M in 
                  community investments. Developed innovative financing solutions for healthcare, education, 
                  and community facility projects.
                </p>
                <div className="highlight-box">
                  <span className="highlight-label">Key Achievement</span>
                  <p>Structured complex financing for critical community facilities in underserved markets</p>
                </div>
              </div>
              <div className="experience-card">
                <div className="card-header">
                  <div className="card-icon">💡</div>
                  <h5>Technical Assistance Innovation</h5>
                </div>
                <p className="experience-details">
                  Pioneered comprehensive TA programs that revolutionized CDFI operations. Created scalable 
                  frameworks for impact measurement, operational efficiency, and program evaluation.
                </p>
                <div className="highlight-box">
                  <span className="highlight-label">Key Achievement</span>
                  <p>Developed impact measurement framework adopted by multiple CDFIs</p>
                </div>
              </div>
            </div>

            <div className="professional-section">
              <h4>Industry Leadership</h4>
              <div className="experience-card">
                <div className="card-header">
                  <div className="card-icon">🌱</div>
                  <h5>Community Impact</h5>
                </div>
                <p className="experience-details">
                  Active Board Member at YMCA of Yonkers, driving initiatives that strengthen community 
                  engagement and financial sustainability. Direct experience in translating strategic 
                  vision into measurable community outcomes.
                </p>
              </div>
              <div className="experience-card">
                <div className="card-header">
                  <div className="card-icon">📊</div>
                  <h5>Knowledge Leadership</h5>
                </div>
                <p className="experience-details">
                  Recognized thought leader in CDFI sector development, regularly presenting at impact 
                  finance conferences. Expertise in emerging trends, regulatory changes, and innovative 
                  financing structures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Visualization Section */}
        <div className="impact-visualization">
          <h3 className="section-title">Our Impact</h3>
          <div className="impact-stats-grid">
            {impactStats.map((stat, index) => (
              <div className="impact-stat-card" key={index}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <p className="stat-description">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study Preview */}
        <div className="case-study-preview">
          <h3 className="section-title">Featured Project</h3>
          <div className="case-study-card">
            <div className="case-study-content">
              <h4>Rural Healthcare Access Initiative</h4>
              <div className="case-study-stats">
                <div className="cs-stat">
                  <span className="cs-stat-number">$12M</span>
                  <span className="cs-stat-label">Financing</span>
                </div>
                <div className="cs-stat">
                  <span className="cs-stat-number">3</span>
                  <span className="cs-stat-label">Facilities</span>
                </div>
                <div className="cs-stat">
                  <span className="cs-stat-number">15,000+</span>
                  <span className="cs-stat-label">Patients Served</span>
                </div>
              </div>
              <p className="case-study-description">
                Structured innovative financing for three rural healthcare facilities, 
                bringing essential medical services to communities with limited healthcare access. 
                The project combined New Markets Tax Credits, CDFI Fund grants, and private capital.
              </p>
              <div className="case-study-outcome">
                <h5>Outcome</h5>
                <p>Increased healthcare access for 15,000+ rural residents and created 45 permanent healthcare jobs</p>
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