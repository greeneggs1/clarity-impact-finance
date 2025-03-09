import React, { useState } from 'react';
import './ThoughtLeadership.css';

const ThoughtLeadership = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Sample articles - replace with your actual LinkedIn articles
  const articles = [
    {
      id: 1,
      title: "The Future of CDFI Financing in Underserved Communities",
      excerpt: "Exploring innovative approaches to community development financing and how CDFIs are evolving to meet the needs of underserved communities.",
      date: "March 15, 2025",
      category: "strategy",
      readTime: "8 min read",
      url: "https://www.linkedin.com/pulse/future-cdfi-financing-underserved-communities",
      image: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Impact Measurement Frameworks for Small to Mid-Sized CDFIs",
      excerpt: "A practical guide to implementing effective impact measurement frameworks that don't overwhelm smaller organizations.",
      date: "February 22, 2025",
      category: "impact",
      readTime: "6 min read",
      url: "https://www.linkedin.com/pulse/impact-measurement-frameworks-small-mid-sized-cdfis",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Navigating Regulatory Changes: What CDFIs Need to Know",
      excerpt: "An analysis of recent regulatory changes affecting CDFIs and strategies for compliance while maintaining mission focus.",
      date: "January 10, 2025",
      category: "regulation",
      readTime: "10 min read",
      url: "https://www.linkedin.com/pulse/navigating-regulatory-changes-what-cdfis-need-know",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Building Effective Partnerships Between CDFIs and Traditional Banks",
      excerpt: "How CDFIs can forge strategic partnerships with traditional financial institutions to expand their impact and reach.",
      date: "December 5, 2024",
      category: "strategy",
      readTime: "7 min read",
      url: "https://www.linkedin.com/pulse/building-effective-partnerships-between-cdfis-traditional-banks",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Technology Adoption in Community Development Finance",
      excerpt: "Exploring how CDFIs can leverage technology to streamline operations, improve lending decisions, and enhance community impact.",
      date: "November 18, 2024",
      category: "technology",
      readTime: "9 min read",
      url: "https://www.linkedin.com/pulse/technology-adoption-community-development-finance",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'impact', label: 'Impact Measurement' },
    { id: 'regulation', label: 'Regulation' },
    { id: 'technology', label: 'Technology' }
  ];

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  return (
    <section id="thought-leadership" className="thought-leadership">
      <div className="container">
        <h2 className="section-title">Thought Leadership</h2>
        <p className="section-subtitle">
          Insights and perspectives on community development finance, impact measurement, and CDFI strategy
        </p>

        <div className="article-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="articles-grid">
          {filteredArticles.map(article => (
            <div className="article-card card" key={article.id}>
              <div className="article-image">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="article-content">
                <div className="article-meta">
                  <span className="article-date">{article.date}</span>
                  <span className="article-read-time">{article.readTime}</span>
                </div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="article-link"
                >
                  Read on LinkedIn
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="thought-leadership-cta">
          <h3>Want more insights delivered to your inbox?</h3>
          <p>Subscribe to our newsletter for the latest trends and strategies in community development finance.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button className="button-primary">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThoughtLeadership; 