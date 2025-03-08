import React, { useState } from 'react';
import './Resources.css';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('All Types');
  
  // External resources database
  const resources = [
    {
      title: "Charter School Innovation Hub",
      description: "Explore funding opportunities, case studies, and innovative approaches for charter school development and growth.",
      organization: "Charter School Growth Fund",
      type: "Resource Hub",
      category: "Charter Schools",
      tags: ["charter schools", "education", "innovation", "funding"],
      url: "https://chartergrowthfund.org/innovation/",
      featured: true
    },
    {
      title: "Affordable Housing Underwriting Guidelines",
      description: "Comprehensive guidelines for underwriting affordable housing projects, including risk assessment frameworks and best practices.",
      organization: "NeighborWorks America",
      type: "Guide",
      category: "Affordable Housing",
      tags: ["affordable housing", "underwriting", "risk assessment"],
      url: "https://www.neighborworks.org/",
      featured: true
    },
    {
      title: "NMTC Program Resources",
      description: "Official resources for the New Markets Tax Credit Program, including application materials, compliance requirements, and program updates.",
      organization: "CDFI Fund",
      type: "Government Resource",
      category: "NMTC",
      tags: ["NMTC", "tax credits", "compliance", "application"],
      url: "https://www.cdfifund.gov/programs-training/programs/new-markets-tax-credit",
      featured: false
    },
    {
      title: "Small Business Lending Toolkit",
      description: "Tools and templates for small business lending, including credit memo templates, underwriting checklists, and portfolio management resources.",
      organization: "Opportunity Finance Network",
      type: "Toolkit",
      category: "Small Business",
      tags: ["small business", "lending", "underwriting", "portfolio management"],
      url: "https://ofn.org/",
      featured: true
    },
    {
      title: "Community Facilities Financing Guide",
      description: "Comprehensive guide to financing community facilities, including YMCAs, healthcare centers, and other community assets.",
      organization: "LISC",
      type: "Guide",
      category: "Community Facilities",
      tags: ["community facilities", "YMCAs", "healthcare", "financing"],
      url: "https://www.lisc.org/",
      featured: false
    },
    {
      title: "LIHTC Compliance Handbook",
      description: "Detailed handbook for Low-Income Housing Tax Credit compliance, including reporting requirements and best practices.",
      organization: "Novogradac",
      type: "Handbook",
      category: "LIHTC",
      tags: ["LIHTC", "tax credits", "compliance", "affordable housing"],
      url: "https://www.novoco.com/",
      featured: false
    },
    {
      title: "Clean Energy Finance Resources",
      description: "Resources for financing clean energy projects in low-income communities, including solar, energy efficiency, and resilience projects.",
      organization: "Clean Energy Group",
      type: "Resource Hub",
      category: "Clean Energy",
      tags: ["clean energy", "solar", "energy efficiency", "resilience"],
      url: "https://www.cleanegroup.org/",
      featured: false
    },
    {
      title: "Healthcare Facility Financing Toolkit",
      description: "Comprehensive toolkit for financing healthcare facilities in underserved communities, including FQHCs and rural health clinics.",
      organization: "Primary Care Development Corporation",
      type: "Toolkit",
      category: "Healthcare",
      tags: ["healthcare", "FQHCs", "rural health", "financing"],
      url: "https://www.pcdc.org/",
      featured: true
    }
  ];

  // Available categories and types for filtering
  const categories = ['All Categories', 'Affordable Housing', 'Small Business', 'Community Facilities', 'Charter Schools', 'Healthcare', 'NMTC', 'LIHTC', 'Clean Energy'];
  const types = ['All Types', 'Guide', 'Toolkit', 'Handbook', 'Resource Hub', 'Government Resource'];
  
  // Popular tags for quick filtering
  const popularTags = ['affordable housing', 'charter schools', 'NMTC', 'small business', 'YMCAs', 'healthcare', 'underwriting'];

  // Filter resources based on search term, category, and type
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
                         resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All Types' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // Handle tag click
  const handleTagClick = (tag) => {
    setSearchTerm(tag);
    setSelectedCategory('All Categories');
    setSelectedType('All Types');
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedType('All Types');
  };

  return (
    <section id="resources" className="resources">
      <div className="resources-container">
        <div className="resources-filters">
          <h2>Resource Hub</h2>
          <p>Connect to specialized resources from leading organizations in community development finance.</p>
          
          <h3>Search Resources</h3>
          <input
            type="text"
            className="search-input"
            placeholder="Search by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <h3>Filter by Category</h3>
          <select 
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          
          <h3>Filter by Type</h3>
          <select 
            className="filter-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {types.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          
          <h3>Popular Topics</h3>
          <div className="popular-tags">
            {popularTags.map((tag, index) => (
              <button 
                key={index} 
                className="tag-button"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          
          <button className="reset-button" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
        
        <div className="resources-results">
          <div className="results-header">
            <h2>
              {filteredResources.length} {filteredResources.length === 1 ? 'Resource' : 'Resources'} Available
            </h2>
            <p>Curated resources from trusted partners in community development</p>
          </div>
          
          {filteredResources.length > 0 ? (
            <div className="resources-grid">
              {filteredResources.map((resource, index) => (
                <div key={index} className={`resource-card ${resource.featured ? 'featured' : ''}`}>
                  {resource.featured && <span className="featured-badge">Featured</span>}
                  <div className="resource-content">
                    <div className="resource-category">{resource.category}</div>
                    <h3>{resource.title}</h3>
                    <p>{resource.description}</p>
                    <div className="resource-meta">
                      <span className="resource-type">{resource.type}</span>
                      <span className="resource-org">By {resource.organization}</span>
                    </div>
                    <div className="resource-tags">
                      {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="resource-tag"
                          onClick={() => handleTagClick(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a 
                    href={resource.url} 
                    className="resource-link-button" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Visit Resource
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No resources found</h3>
              <p>Try adjusting your search criteria or <button onClick={resetFilters}>reset all filters</button></p>
            </div>
          )}
          
          <div className="resources-disclaimer">
            <p>
              These resources are provided by third-party organizations. Clarity Impact Finance does not host or maintain these resources directly. 
              Links will take you to external websites where you can access the full content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources; 