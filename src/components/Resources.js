import React, { useState } from 'react';
import './Resources.css';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('All Types');
  const [activeView, setActiveView] = useState('resources'); // 'resources' or 'learning-path'
  const [activeLearningPath, setActiveLearningPath] = useState(null);
  const [activePathStep, setActivePathStep] = useState(null);
  const [showAllResources, setShowAllResources] = useState(false);
  
  // Learning paths
  const learningPaths = [
    {
      id: 'loan-officer',
      title: 'CDFI Loan Officer',
      description: 'A comprehensive learning journey for new and experienced CDFI loan officers covering the entire lending process from application to monitoring.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      steps: [
        {
          id: 'collateral',
          title: 'Collateral',
          description: 'Understanding collateral types, valuation methods, and appraisal review for different asset classes.',
          resources: [2, 9, 13] // IDs of related resources
        },
        {
          id: 'guarantees',
          title: 'Guarantees',
          description: 'Evaluating personal and corporate guarantees and other credit enhancement structures.',
          resources: [3, 10] // IDs of related resources
        },
        {
          id: 'covenants',
          title: 'Covenants',
          description: 'Designing effective covenant packages and understanding loan documentation.',
          resources: [4, 11, 14] // IDs of related resources
        },
        {
          id: 'underwriting-checklists',
          title: 'Underwriting Checklists',
          description: 'Comprehensive checklists and frameworks for thorough loan underwriting.',
          resources: [1, 8, 12, 15] // IDs of related resources
        }
      ]
    },
    {
      id: 'asset-management',
      title: 'Asset Management and Compliance',
      description: 'Essential knowledge for managing loan portfolios, monitoring performance, and maintaining regulatory compliance.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      steps: [
        {
          id: 'portfolio-monitoring',
          title: 'Portfolio Monitoring',
          description: 'Best practices for ongoing loan monitoring and early warning systems.',
          resources: [5, 6] // IDs of related resources
        },
        {
          id: 'compliance-reporting',
          title: 'Compliance Reporting',
          description: 'Understanding regulatory requirements and reporting obligations.',
          resources: [7] // IDs of related resources
        },
        {
          id: 'risk-management',
          title: 'Risk Management',
          description: 'Strategies for identifying, assessing, and mitigating portfolio risks.',
          resources: [6, 15] // IDs of related resources
        },
        {
          id: 'loan-servicing',
          title: 'Loan Servicing',
          description: 'Effective loan servicing practices and systems.',
          resources: [5, 14] // IDs of related resources
        }
      ]
    }
  ];
  
  // External resources database with IDs
  const resources = [
    {
      id: 1,
      title: "Small Business Loan Underwriting Checklist",
      description: "Comprehensive checklist for underwriting small business loans, including financial analysis, management assessment, and industry evaluation.",
      organization: "Opportunity Finance Network",
      type: "Checklist",
      category: "Small Business",
      tags: ["underwriting", "small business", "credit analysis"],
      url: "https://ofn.org/",
      fileType: "PDF",
      fileSize: "1.2 MB",
      lastUpdated: "2023-06-15",
      featured: true
    },
    {
      id: 2,
      title: "Commercial Real Estate Appraisal Review Guide",
      description: "Guide to reviewing commercial real estate appraisals, including key components, red flags, and best practices.",
      organization: "LISC",
      type: "Guide",
      category: "Real Estate",
      tags: ["appraisals", "commercial real estate", "collateral"],
      url: "https://www.lisc.org/",
      fileType: "PDF",
      fileSize: "2.4 MB",
      lastUpdated: "2023-04-22",
      featured: false
    },
    {
      id: 3,
      title: "SBA Guarantee Program Overview",
      description: "Overview of SBA guarantee programs, including 7(a), 504, and Community Advantage, with eligibility requirements and application processes.",
      organization: "Small Business Administration",
      type: "Government Resource",
      category: "Small Business",
      tags: ["guarantees", "SBA", "credit enhancement"],
      url: "https://www.sba.gov/",
      fileType: "PDF",
      fileSize: "3.1 MB",
      lastUpdated: "2023-08-10",
      featured: true
    },
    {
      id: 4,
      title: "CDFI Loan Fund Credit Memo Template",
      description: "Customizable credit memo template for CDFI loan funds, including sections for financial analysis, impact assessment, and risk rating.",
      organization: "Opportunity Finance Network",
      type: "Template",
      category: "Loan Documentation",
      tags: ["credit memo", "documentation", "underwriting"],
      url: "https://ofn.org/",
      fileType: "DOCX",
      fileSize: "850 KB",
      lastUpdated: "2023-05-18",
      featured: true
    },
    {
      id: 5,
      title: "Loan Portfolio Monitoring Dashboard",
      description: "Excel-based dashboard for monitoring loan portfolio performance, including delinquency tracking, concentration analysis, and risk rating migration.",
      organization: "CDFI Fund",
      type: "Tool",
      category: "Portfolio Management",
      tags: ["monitoring", "portfolio management", "reporting"],
      url: "https://www.cdfifund.gov/",
      fileType: "XLSX",
      fileSize: "1.8 MB",
      lastUpdated: "2023-07-05",
      featured: false
    },
    {
      id: 6,
      title: "Early Warning Signs in Loan Monitoring",
      description: "Guide to identifying early warning signs of loan deterioration and implementing proactive intervention strategies.",
      organization: "Federal Reserve Bank of San Francisco",
      type: "Guide",
      category: "Portfolio Management",
      tags: ["monitoring", "risk management", "delinquency"],
      url: "https://www.frbsf.org/",
      fileType: "PDF",
      fileSize: "1.5 MB",
      lastUpdated: "2023-03-12",
      featured: false
    },
    {
      id: 7,
      title: "CDFI Fund Annual Certification Report Guide",
      description: "Comprehensive guide to completing the CDFI Fund Annual Certification Report, including reporting requirements and best practices.",
      organization: "CDFI Fund",
      type: "Government Resource",
      category: "Compliance",
      tags: ["reporting", "certification", "compliance"],
      url: "https://www.cdfifund.gov/",
      fileType: "PDF",
      fileSize: "2.2 MB",
      lastUpdated: "2023-09-01",
      featured: false
    },
    {
      id: 8,
      title: "Financial Statement Analysis for CDFIs",
      description: "Guide to analyzing financial statements for mission-focused lending, including key ratios and industry benchmarks.",
      organization: "Opportunity Finance Network",
      type: "Guide",
      category: "Credit Analysis",
      tags: ["financial analysis", "underwriting", "credit analysis"],
      url: "https://ofn.org/",
      fileType: "PDF",
      fileSize: "1.9 MB",
      lastUpdated: "2023-02-28",
      featured: false
    },
    {
      id: 9,
      title: "Collateral Valuation Methods for Different Asset Classes",
      description: "Overview of collateral valuation methods for different asset classes, including real estate, equipment, and accounts receivable.",
      organization: "LISC",
      type: "Guide",
      category: "Collateral",
      tags: ["collateral", "valuation", "appraisals"],
      url: "https://www.lisc.org/",
      fileType: "PDF",
      fileSize: "1.7 MB",
      lastUpdated: "2023-05-10",
      featured: false
    },
    {
      id: 10,
      title: "Personal Guarantee Analysis Framework",
      description: "Framework for analyzing personal guarantees, including personal financial statement analysis and liquidity assessment.",
      organization: "Opportunity Finance Network",
      type: "Framework",
      category: "Guarantees",
      tags: ["guarantees", "personal guarantee", "credit enhancement"],
      url: "https://ofn.org/",
      fileType: "PDF",
      fileSize: "1.1 MB",
      lastUpdated: "2023-04-05",
      featured: false
    },
    {
      id: 11,
      title: "Effective Covenant Packages for CDFI Loans",
      description: "Guide to designing effective covenant packages for different loan types, including financial covenants, reporting requirements, and default triggers.",
      organization: "Opportunity Finance Network",
      type: "Guide",
      category: "Loan Documentation",
      tags: ["covenants", "documentation", "loan terms"],
      url: "https://ofn.org/",
      fileType: "PDF",
      fileSize: "1.4 MB",
      lastUpdated: "2023-06-22",
      featured: false
    },
    {
      id: 12,
      title: "Cash Flow Analysis for Small Business Lending",
      description: "Detailed guide to cash flow analysis for small business lending, including UCA cash flow, EBITDA analysis, and debt service coverage.",
      organization: "Federal Reserve Bank of New York",
      type: "Guide",
      category: "Credit Analysis",
      tags: ["cash flow", "underwriting", "small business"],
      url: "https://www.newyorkfed.org/",
      fileType: "PDF",
      fileSize: "2.0 MB",
      lastUpdated: "2023-03-18",
      featured: true
    },
    {
      id: 13,
      title: "Equipment Appraisal Guidelines",
      description: "Guidelines for appraising equipment collateral, including valuation methods, useful life considerations, and depreciation factors.",
      organization: "Equipment Leasing and Finance Association",
      type: "Guide",
      category: "Collateral",
      tags: ["equipment", "appraisals", "collateral"],
      url: "https://www.elfaonline.org/",
      fileType: "PDF",
      fileSize: "1.6 MB",
      lastUpdated: "2023-07-14",
      featured: false
    },
    {
      id: 14,
      title: "Loan Documentation Checklist",
      description: "Comprehensive checklist for loan documentation, including required documents for different loan types and borrower entities.",
      organization: "CDFI Fund",
      type: "Checklist",
      category: "Loan Documentation",
      tags: ["documentation", "closing", "loan terms"],
      url: "https://www.cdfifund.gov/",
      fileType: "PDF",
      fileSize: "950 KB",
      lastUpdated: "2023-08-05",
      featured: false
    },
    {
      id: 15,
      title: "Industry Risk Analysis Framework",
      description: "Framework for analyzing industry risk factors, including market trends, competitive dynamics, and regulatory considerations.",
      organization: "Federal Reserve Bank of San Francisco",
      type: "Framework",
      category: "Credit Analysis",
      tags: ["industry analysis", "underwriting", "risk assessment"],
      url: "https://www.frbsf.org/",
      fileType: "PDF",
      fileSize: "1.8 MB",
      lastUpdated: "2023-05-30",
      featured: false
    },
    {
      id: 16,
      title: "Affordable Housing Project Analysis Spreadsheet",
      description: "Comprehensive spreadsheet for analyzing affordable housing projects, including development budget, operating pro forma, and sources and uses.",
      organization: "NeighborWorks America",
      type: "Tool",
      category: "Affordable Housing",
      tags: ["affordable housing", "project analysis", "pro forma"],
      url: "https://www.neighborworks.org/",
      fileType: "XLSX",
      fileSize: "2.5 MB",
      lastUpdated: "2023-06-10",
      featured: true
    },
    {
      id: 17,
      title: "Community Facility Loan Underwriting Guide",
      description: "Comprehensive guide to underwriting community facility loans, including financial analysis, impact assessment, and risk mitigation strategies.",
      organization: "LISC",
      type: "Guide",
      category: "Community Facilities",
      tags: ["community facilities", "underwriting", "impact assessment"],
      url: "https://www.lisc.org/",
      fileType: "PDF",
      fileSize: "2.1 MB",
      lastUpdated: "2023-04-15",
      featured: false
    },
    // Original resources from the existing component
    {
      id: 101,
      title: "Charter School Innovation Hub",
      description: "Explore funding opportunities, case studies, and innovative approaches for charter school development and growth.",
      organization: "Charter School Growth Fund",
      type: "Resource Hub",
      category: "Charter Schools",
      tags: ["charter schools", "education", "innovation", "funding"],
      url: "https://chartergrowthfund.org/innovation/",
      fileType: "Web",
      fileSize: "N/A",
      lastUpdated: "2023-09-15",
      featured: true
    },
    {
      id: 102,
      title: "Affordable Housing Underwriting Guidelines",
      description: "Comprehensive guidelines for underwriting affordable housing projects, including risk assessment frameworks and best practices.",
      organization: "NeighborWorks America",
      type: "Guide",
      category: "Affordable Housing",
      tags: ["affordable housing", "underwriting", "risk assessment"],
      url: "https://www.neighborworks.org/",
      fileType: "PDF",
      fileSize: "3.2 MB",
      lastUpdated: "2023-07-22",
      featured: true
    },
    // Additional original resources would be included here
  ];

  // Available categories and types for filtering
  const categories = ['All Categories', 'Small Business', 'Affordable Housing', 'Real Estate', 'Credit Analysis', 'Collateral', 'Guarantees', 'Loan Documentation', 'Portfolio Management', 'Compliance', 'Community Facilities', 'Charter Schools', 'Healthcare', 'NMTC', 'LIHTC', 'Clean Energy'];
  const types = ['All Types', 'Guide', 'Toolkit', 'Handbook', 'Checklist', 'Template', 'Framework', 'Tool', 'Resource Hub', 'Government Resource'];
  
  // Popular tags for quick filtering
  const popularTags = ['underwriting', 'affordable housing', 'small business', 'collateral', 'monitoring', 'documentation', 'credit analysis', 'impact assessment'];

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

  // Get initial 4 resources to display
  const initialResources = filteredResources.filter(resource => resource.featured).slice(0, 4);
  
  // Determine which resources to display based on showAllResources state
  const displayedResources = showAllResources ? filteredResources : initialResources;

  // Handle tag click
  const handleTagClick = (tag) => {
    setSearchTerm(tag);
    setSelectedCategory('All Categories');
    setSelectedType('All Types');
    setActiveView('resources');
    setShowAllResources(true); // Show all resources when filtering by tag
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedType('All Types');
    setShowAllResources(false); // Reset to showing only initial resources
  };

  // Handle learning path selection
  const handleLearningPathSelect = (pathId) => {
    const selectedPath = learningPaths.find(path => path.id === pathId);
    setActiveLearningPath(selectedPath);
    setActivePathStep(selectedPath.steps[0]);
    setActiveView('learning-path');
    setShowAllResources(true); // Show all resources when viewing learning path
  };

  // Handle learning path step selection
  const handleStepSelect = (stepId) => {
    const step = activeLearningPath.steps.find(s => s.id === stepId);
    setActivePathStep(step);
  };

  // Get resources for current learning path step
  const getStepResources = () => {
    if (!activePathStep) return [];
    return resources.filter(resource => activePathStep.resources.includes(resource.id));
  };

  // Return to main resources view
  const handleBackToResources = () => {
    setActiveView('resources');
    setActiveLearningPath(null);
    setActivePathStep(null);
  };

  // Toggle showing all resources
  const handleShowAllResources = () => {
    setShowAllResources(true);
  };

  return (
    <section id="resources" className="resources">
      <div className="resources-container">
        {activeView === 'resources' ? (
          <>
            <div className="resources-header">
              <h1>Resource Hub</h1>
              <p>Connect to specialized resources from leading organizations in community development finance.</p>
              <div className="resource-hub-description">
                <p>Our Resource Hub serves as a comprehensive training and development platform specifically designed for the CDFI sector. We've curated essential tools, guides, and frameworks to help community development financial institutions build capacity, improve lending practices, and maximize their impact in underserved communities.</p>
              </div>
            </div>
            
            {/* Prominent Learning Pathways */}
            <div className="featured-learning-paths">
              <h2>Learning Pathways</h2>
              <p>Follow guided learning journeys curated by industry experts to develop specialized skills in community finance</p>
              
              <div className="featured-learning-paths-grid">
                {learningPaths.map((path) => (
                  <div 
                    key={path.id} 
                    className="featured-learning-path-card"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLearningPathSelect(path.id);
                    }}
                  >
                    <div className="featured-path-image" style={{ backgroundImage: `url(${path.image})` }}>
                      <div className="featured-path-overlay"></div>
                    </div>
                    <div className="featured-path-content">
                      <h3>{path.title}</h3>
                      <p>{path.description}</p>
                      <div className="featured-path-steps">
                        {path.steps.map((step, index) => (
                          <div key={step.id} className="featured-path-step">
                            <div className="step-number">{index + 1}</div>
                            <div className="step-name">{step.title}</div>
                          </div>
                        ))}
                      </div>
                      <button className="start-path-button">
                        Start Learning Path
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="resources-main-content">
              <div className="resources-filters">
                <h2>Search & Filter</h2>
                
                <h3>Search Resources</h3>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by keyword..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (e.target.value) setShowAllResources(true);
                  }}
                />
                
                <h3>Filter by Category</h3>
                <select 
                  className="filter-select"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    if (e.target.value !== 'All Categories') setShowAllResources(true);
                  }}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
                
                <h3>Filter by Type</h3>
                <select 
                  className="filter-select"
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    if (e.target.value !== 'All Types') setShowAllResources(true);
                  }}
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
                    {displayedResources.length} {displayedResources.length === 1 ? 'Resource' : 'Resources'} Available
                    {!showAllResources && filteredResources.length > initialResources.length && (
                      <span className="resources-count-note"> (Showing {initialResources.length} of {filteredResources.length})</span>
                    )}
                  </h2>
                  <p>Curated resources from trusted partners in community development</p>
                </div>
                
                {displayedResources.length > 0 ? (
                  <>
                    <div className="resources-grid">
                      {displayedResources.map((resource) => (
                        <div key={resource.id} className={`resource-card ${resource.featured ? 'featured' : ''}`}>
                          {resource.featured && <span className="featured-badge">Featured</span>}
                          <div className="resource-content">
                            <div className="resource-category">{resource.category}</div>
                            <h3>{resource.title}</h3>
                            <p>{resource.description}</p>
                            <div className="resource-meta">
                              <span className="resource-type">{resource.type}</span>
                            </div>
                            <div className="resource-details">
                              <span className="resource-file-type">{resource.fileType}</span>
                              <span className="resource-file-size">{resource.fileSize}</span>
                              <span className="resource-date">Updated: {resource.lastUpdated}</span>
                            </div>
                            <div className="resource-tags">
                              {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span 
                                  key={tagIndex} 
                                  className="resource-tag"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTagClick(tag);
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <a 
                            href="#resource-coming-soon"
                            className="resource-link-button coming-soon" 
                            onClick={(e) => e.preventDefault()}
                            aria-label="Resource coming soon"
                            role="button"
                          >
                            Coming Soon
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="16"></line>
                              <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                          </a>
                        </div>
                      ))}
                    </div>
                    
                    {!showAllResources && filteredResources.length > initialResources.length && (
                      <div className="show-more-container">
                        <button className="show-more-button" onClick={handleShowAllResources}>
                          Show All Resources
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                      </div>
                    )}
                  </>
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
          </>
        ) : (
          // Learning Path View
          <div className="learning-path-container">
            <div className="learning-path-sidebar">
              <button className="back-button" onClick={handleBackToResources}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Resources
              </button>
              
              <div className="learning-path-info">
                <h2>{activeLearningPath?.title}</h2>
                <p>{activeLearningPath?.description}</p>
              </div>
              
              <div className="learning-path-steps-list">
                <h3>Learning Steps</h3>
                {activeLearningPath?.steps.map((step, index) => (
                  <div 
                    key={step.id} 
                    className={`learning-path-step ${activePathStep?.id === step.id ? 'active' : ''}`}
                    onClick={() => handleStepSelect(step.id)}
                  >
                    <div className="step-number">{index + 1}</div>
                    <div className="step-content">
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="learning-path-content">
              <h2>{activePathStep?.title} Resources</h2>
              <p>Curated resources to help you master this topic</p>
              
              <div className="learning-path-resources">
                {getStepResources().map((resource) => (
                  <div key={resource.id} className="resource-card">
                    <div className="resource-content">
                      <div className="resource-category">{resource.category}</div>
                      <h3>{resource.title}</h3>
                      <p>{resource.description}</p>
                      <div className="resource-meta">
                        <span className="resource-type">{resource.type}</span>
                      </div>
                      <div className="resource-details">
                        <span className="resource-file-type">{resource.fileType}</span>
                        <span className="resource-file-size">{resource.fileSize}</span>
                        <span className="resource-date">Updated: {resource.lastUpdated}</span>
                      </div>
                      <div className="resource-tags">
                        {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="resource-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <a 
                      href="#resource-coming-soon"
                      className="resource-link-button coming-soon" 
                      onClick={(e) => e.preventDefault()}
                      aria-label="Resource coming soon"
                      role="button"
                    >
                      Coming Soon
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Resources; 