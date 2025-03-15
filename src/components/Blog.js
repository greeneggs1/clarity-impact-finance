import React from 'react';
import './Blog.css';
import { scrollToSection } from '../utils/scroll';

function Blog() {
  // Case studies data
  const caseStudies = [
    {
      id: 1,
      title: "Central City Concern",
      subtitle: "Innovative Approach to Housing & Healthcare",
      location: "Portland, OR",
      category: "NMTC",
      description: "The Blackburn Center provides 124 affordable housing units and integrated healthcare services through innovative financing.",
      logoUrl: "/images/central-city-concern.jpg",
      detailUrl: "/case-studies/central-city-concern"
    },
    {
      id: 2,
      title: "Martha O'Bryan Center",
      subtitle: "Community Development & Education",
      location: "Nashville, TN",
      category: "Community Facilities",
      description: "Helping families leave poverty in a single generation through inclusive and equitable environments for education and economic mobility.",
      logoUrl: "/images/martha-obryan-center.jpg",
      detailUrl: "/case-studies/martha-obryan-center"
    },
    {
      id: 3,
      title: "Amana Academy",
      subtitle: "Charter School Expansion",
      location: "Alpharetta, GA",
      category: "Charter Schools",
      description: "Supporting the expansion of a STEM-focused charter school with innovative educational programs and facilities.",
      logoUrl: "/images/amana-academy.jpg",
      detailUrl: "/case-studies/amana-academy"
    }
  ];

  return (
    <section id="blog" className="blog">
      <div className="blog-container">
        <h2>Case Studies</h2>
        <p className="blog-intro">
          Explore our portfolio of impactful projects across various sectors including charter schools, 
          affordable housing, and community facilities.
        </p>

        <div className="case-studies-grid">
          {caseStudies.map((study) => (
            <div key={study.id} className="case-study-box" onClick={() => window.location.href = study.detailUrl}>
              <div className="case-study-content">
                <div className="case-study-logo">
                  <img src={study.logoUrl} alt={`${study.title}`} />
                  <div className="image-title-overlay">
                    <span className="image-category">{study.category}</span>
                    <h3>{study.title}</h3>
                  </div>
                </div>
                <div className="case-study-overlay">
                  <div className="overlay-content">
                    <span className="case-study-category">{study.category}</span>
                    <h3>{study.title}</h3>
                    <p className="case-study-subtitle">{study.subtitle}</p>
                    <p className="case-study-location">{study.location}</p>
                    <p className="case-study-description">{study.description}</p>
                    <span className="view-details">View Details</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="linkedin-articles">
          <h3>More Articles</h3>
          <p>
            For additional industry insights and thought leadership articles, visit our LinkedIn Articles section.
          </p>
          <a 
            href="https://www.linkedin.com/in/amirali86" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="linkedin-btn"
          >
            Read on LinkedIn 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '6px' }}>
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
            </svg>
          </a>
        </div>
        
        <div className="services-cta">
          <h3>Ready to Create Innovative Solutions?</h3>
          <p>
            Our team has extensive experience in structuring complex financing for impactful community development projects.
            Let's discuss how we can help your organization achieve its mission.
          </p>
          <button 
            className="contact-btn"
            onClick={() => scrollToSection('contact')}
          >
            Contact Us Today
          </button>
        </div>
      </div>
    </section>
  );
}

export default Blog; 