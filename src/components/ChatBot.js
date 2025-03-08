import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

// Predefined knowledge base from cdfi.org and ofn.org
const knowledgeBase = {
  cdfiBasics: `
Community Development Financial Institutions (CDFIs) are private-sector, financial intermediaries with community development as their primary mission. Where others see risk, CDFIs see opportunity.

CDFIs measure success by focusing on the "double bottom line": economic gains and the contributions they make to the local community. They rebuild businesses, housing, voluntary organizations, and services central to revitalizing our nation's poor and working class neighborhoods.

Key Statistics:
- Over 1,400 certified CDFIs nationwide
- Manage more than $222 billion in assets
- Serve clients across all 50 states, DC, US Virgin Islands, and Puerto Rico

Client Demographics:
- 66% Clients of Color
- 85% Low-Income Clients
- 27% Rural Clients
- 48% Women Clients
  `,
  
  cdfiTypes: `
There are four main types of CDFIs, each serving different community needs:

1. Community Development Banks:
- Provide capital to rebuild economically distressed communities
- For-profit corporations with community representation on boards
- Regulated by FDIC and other federal/state agencies
- Deposits are FDIC insured

2. Community Development Credit Unions:
- Promote ownership of assets and savings
- Provide affordable credit and retail financial services
- Nonprofit financial cooperatives owned by members
- Regulated by National Credit Union Administration
- Deposits typically NCUA insured

3. Community Development Loan Funds:
- Focus on businesses, housing, and community service organizations
- Provide financing and development services
- Typically nonprofit organizations
- Governed by boards with community representation

4. Community Development Venture Capital Funds:
- Provide equity and debt-with-equity features
- Focus on small and medium-sized businesses
- Can be for-profit or nonprofit
- Include community representation
  `,

  services: `
CDFIs provide essential tools and services to underserved communities:

Core Financial Services:
- Traditional banking and financial services
- Small business lending
- Affordable housing financing
- Community facility funding
- Personal loans and savings accounts
- Microenterprise development

Underwriting and Lending:
- Credit analysis and risk assessment
- Financial statement analysis
- Cash flow projections
- Collateral evaluation
- Term structuring
- Risk mitigation strategies

NMTC Consulting:
- Project structuring
- Application preparation
- Compliance monitoring
- Impact measurement
- Reporting requirements
- Investor relations

Federal Program Compliance and Asset Management:
- Bond Guarantee Program (BGP) administration
  • Quarterly reporting and monitoring
  • Asset-liability matching
  • Credit enhancement tracking
- Department of Education program management
  • Title IV compliance oversight
  • Financial aid administration
  • Default prevention programs
- Portfolio monitoring and oversight
  • Risk assessment and mitigation
  • Performance tracking
  • Compliance monitoring
- Federal grant compliance
  • Reporting and documentation
  • Audit preparation
  • Program-specific requirements

Technical Assistance:
- Financial education and training
- Business development support
- Compliance guidance
- Grant writing assistance
- Technology implementation
- Staff capacity building

Development Services:
- Community needs assessment
- Project feasibility studies
- Partnership development
- Impact measurement
- Sustainability planning
- Strategic advisory services
  `,

  impact: `
CDFIs create significant impact in communities through:

Economic Development:
- Job creation and retention
- Small business growth
- Local economic stimulation
- Wealth building opportunities

Community Benefits:
- Affordable housing development
- Community facility creation
- Financial education
- Technical assistance
- Local decision-making
- Sustainable community development

Multiplier Effect:
- Loan repayments recycled into new community investments
- Creation of future markets for mainstream financial institutions
- "Graduate" borrowers to conventional lending
- Ripple effects bringing responsible homeowners and locally-owned businesses
  `,

  funding: `
CDFIs attract capital from diverse sources:

Private Sector:
- Corporations
- Individual investors
- Religious institutions
- Private foundations
- Bank investments (CRA-motivated)
- Impact investors
- Corporate partners

Public Sector:
- CDFI Fund (U.S. Treasury)
- Capital grants
- Equity investments
- Technical assistance awards
- New Markets Tax Credits
- Bank Enterprise Award Program

Customer Sources:
- Depositor funds (for banks and credit unions)
- Loan repayments
- Service fees
  `,

  history: `
CDFI History and Evolution:

Origins:
- Roots in immigrant guilds of NYC's Lower East Side
- Prairie Populists of late 1800s
- First community development credit unions in 1930s
- Modern industry began in late 1960s and early 1970s

Key Developments:
- 1973: First community development bank (South Shore Bank, Chicago)
- 1977: Santa Cruz Community Credit Union established
- 1994: Riegle Community Development Banking Act
- 1995: CRA regulations recognize CDFI investments

Current Status:
Key Functions of CDFIs:
- Providing affordable housing loans
- Supporting small business development
- Offering community facility financing
- Creating jobs through business lending
- Delivering financial education and technical assistance

Impact Areas:
- Economic Development
- Affordable Housing
- Community Facilities
- Small Business Growth
- Financial Inclusion
  `,
  
  certificationProcess: `
CDFI Certification Process and Requirements:

1. Primary Mission Test:
- Must have a primary mission of promoting community development
- Documentation of mission in organizing documents
- Track record of community development activities

2. Financing Entity Test:
- Must be a financing entity
- Dedication of assets to development services
- Demonstrated lending or investment activity

3. Target Market Test:
- Service to eligible target market
- Investment Areas (geographic)
- Low-Income Targeted Populations
- Other Targeted Populations

4. Accountability Test:
- Maintain accountability to defined target market
- Board representation from target market
- Advisory board involvement

5. Development Services Test:
- Provision of development services
- Technical assistance
- Financial education
- Business planning support

Application Steps:
1. Submit CDFI Certification Application
2. Provide supporting documentation
3. Undergo review by CDFI Fund
4. Respond to additional information requests
5. Receive certification decision
  `,

  fundingGuide: `
CDFI Funding Sources and Programs:

1. Federal Funding:
- CDFI Fund Financial Assistance (FA)
- Technical Assistance (TA) grants
- Bank Enterprise Award (BEA) Program
- Capital Magnet Fund
- New Markets Tax Credit Program

2. Private Sector Sources:
- Bank investments (CRA-motivated)
- Foundation grants
- Impact investors
- Corporate partners
- Religious institutions

3. State and Local Resources:
- State CDFI programs
- Municipal partnerships
- Local economic development initiatives
- Regional funding collaboratives

Application Tips:
- Start preparation early
- Ensure strong track record
- Document community impact
- Build diverse funding sources
- Maintain compliance records
  `,

  complianceAndAsset: `
Federal Program Compliance and Asset Management Details:

Bond Guarantee Program (BGP):
- Compliance with CDFI Fund requirements
- Quarterly reporting and monitoring
- Asset-liability matching
- Risk management protocols
- Capital adequacy maintenance
- Credit enhancement tracking
- Impact measurement systems

Department of Education Programs:
- Title IV compliance
- Financial aid administration
- Student loan servicing
- Default prevention
- Reporting requirements
- Program eligibility maintenance
- Administrative capability demonstration

Asset Management Framework:
- Portfolio segmentation
- Risk-based pricing models
- Early warning systems
- Workout strategies
- Collection procedures
- Loss mitigation protocols
- Performance analytics

Compliance Management Systems:
- Policy and procedure development
- Staff training programs
- Internal audit protocols
- Documentation standards
- Quality control measures
- Regulatory change management
- Compliance testing procedures

Risk Management:
- Credit risk assessment
- Market risk evaluation
- Operational risk monitoring
- Compliance risk tracking
- Strategic risk analysis
- Reputation risk management
- Capital adequacy assessment

Reporting and Documentation:
- Federal agency reporting
- Impact measurement
- Performance metrics
- Compliance certifications
- Audit documentation
- Board reporting
- Stakeholder communications
  `,
  
  // New Markets Tax Credit (NMTC) knowledge base
  nmtcBasics: `
The New Markets Tax Credit Program (NMTC Program) helps economically distressed communities attract private investment capital by providing investors with a federal tax credit.

Established by Congress in 2000, the NMTC Program permits individual and corporate taxpayers to receive a credit against federal income taxes for making Qualified Equity Investments (QEIs) in qualified community development entities (CDEs).

The credit provided to the investor totals 39% of the cost of the investment and is claimed over a seven-year period.

Key Program Features:
- Administered by the CDFI Fund
- Attracts investment capital to low-income communities
- Permits taxpayers to claim credit against federal income taxes
- Provides 39% tax credit over seven years (5% for each of first three years, 6% for remaining four years)
- Investments must remain in qualified low-income communities for seven years
  `,
  
  nmtcEligibility: `
NMTC Program Eligibility Requirements:

For Community Development Entities (CDEs):
- Must be certified by the CDFI Fund
- Primary mission of serving low-income communities
- Accountability to residents of low-income communities
- Must have a track record of providing capital or technical assistance

For Qualified Low-Income Community Investments (QLICIs):
- Must be located in eligible census tracts
- Typically areas with poverty rates of at least 20% or
- Median family income at or below 80% of area median

For Businesses:
- Must be located in qualifying low-income census tracts
- Cannot be in certain prohibited business types (e.g., gambling facilities, liquor stores, etc.)
- Must generate revenues and create jobs within the low-income community

For Investors:
- Can be banks, insurance companies, corporations, or individuals
- Must make equity investments in CDEs
- Must maintain investment for the full seven-year period to claim full tax credit
  `,
  
  nmtcApplication: `
NMTC Application Process:

1. CDE Certification:
- Organizations must first be certified as CDEs by the CDFI Fund
- Application requires demonstration of primary mission and accountability

2. NMTC Allocation Application:
- Annual competitive application process
- CDEs apply to the CDFI Fund for the authority to issue tax credits to investors
- Applications evaluated based on business strategy, community impact, management capacity, and capitalization strategy

3. Allocation Awards:
- CDFI Fund announces allocation awards annually
- Successful CDEs receive authority to issue a specific dollar amount of tax credits

4. Deployment of Allocation:
- CDEs raise capital from investors in exchange for tax credits
- CDEs deploy capital as QLICIs in qualified businesses and projects
- Investments must be maintained for seven years

5. Compliance and Reporting:
- CDEs must report to the CDFI Fund annually
- Must demonstrate compliance with program requirements
- Must show community impact of investments
  `,
  
  nmtcImpact: `
NMTC Program Impact:

Economic Development Outcomes:
- Since inception, the NMTC has generated over $60 billion in investments in low-income communities
- Created or retained approximately 830,000 jobs
- Financed over 6,500 businesses and revitalization projects
- Every $1 of federal tax revenue foregone generates $8 of private investment

Types of Projects Financed:
- Community facilities (healthcare centers, schools, childcare)
- Manufacturing and industrial facilities
- Mixed-use real estate
- Grocery stores and fresh food retailers in food deserts
- Small business incubators
- Arts and cultural facilities
- Charter schools and educational facilities

Community Benefits:
- Job creation and retention
- Increased access to healthcare, education, and healthy food
- Improved community facilities
- Environmental remediation
- Affordable housing development
- Catalytic effect on additional investment
  `,
  
  // Charter Schools knowledge base
  charterSchoolsBasics: `
Charter schools are public schools operating under a contract (or "charter") with an authorizing entity, typically a state or local school board. They receive public funding but operate with more autonomy than traditional public schools.

Key Characteristics:
- Publicly funded, tuition-free schools
- Open to all students, often through lottery if oversubscribed
- Operate with increased autonomy in exchange for increased accountability
- Governed by independent boards
- Exempt from some regulations that apply to traditional public schools
- Must meet academic performance standards outlined in their charter

Charter School Models:
- Startup charter schools (new schools)
- Conversion charter schools (converted from existing public schools)
- Virtual charter schools (online learning)
- Specialized focus schools (STEM, arts, language immersion, etc.)
- Networks or Charter Management Organizations (CMOs)
  `,
  
  charterSchoolsFunding: `
Charter School Funding Sources:

Public Funding:
- Per-pupil allocation from state and local sources
- Typically receive 70-80% of the per-pupil funding of traditional public schools
- Often do not receive facilities funding
- Eligible for certain federal grants and programs

Private Funding:
- Philanthropy and foundation grants
- Corporate partnerships
- Individual donors
- Community support

Specialized Funding Programs:
- Charter School Program (CSP) federal grants
- Credit enhancement programs
- State charter school facilities funds
- Tax-exempt bond financing
- CDFI financing programs
- New Markets Tax Credits

Funding Challenges:
- Facilities acquisition and financing
- Cash flow management during startup
- Unequal funding compared to district schools
- Limited access to local tax revenue
- Sustainability beyond startup funding
  `,
  
  charterSchoolsFinancing: `
Charter School Financing Options:

Facilities Financing:
- Commercial bank loans
- Tax-exempt bond financing
- CDFI loans and program-related investments
- New Markets Tax Credits
- USDA Community Facilities program
- State charter school facilities funds
- Lease financing
- Public-private partnerships

Working Capital Solutions:
- Lines of credit
- Bridge loans for delayed public payments
- Receivables financing
- Cash flow loans

Growth Capital:
- Philanthropy and grants
- Program-related investments
- Charter School Growth Fund
- Social impact investments
- Charter network expansion funds

Technical Assistance:
- Financial planning and budgeting
- Facilities acquisition support
- Credit enhancement programs
- Financial modeling
- Board training on financial oversight
  `,
  
  charterSchoolsImpact: `
Charter School Impact and Outcomes:

Academic Performance:
- Results vary by school, network, and region
- Urban charter schools often show stronger results
- Charter networks like KIPP, Success Academy, and Uncommon Schools demonstrate significant academic gains
- Innovation in teaching methods and school models

Student Demographics:
- Serve approximately 3.7 million students nationwide
- Higher percentages of Black and Hispanic students than traditional public schools
- Similar percentages of economically disadvantaged students
- Growing English Language Learner and special education populations

Community Impact:
- School choice options for underserved communities
- Neighborhood revitalization around school sites
- Parent and community engagement
- Innovative educational approaches
- Professional development opportunities for educators

Challenges and Considerations:
- Quality varies significantly across the sector
- Concerns about equity and access
- Sustainability challenges for independent schools
- Facilities acquisition and financing hurdles
- Balancing autonomy with accountability
  `
};

// Example questions by category
const categoryQuestions = {
  cdfi: [
    "What are CDFIs?",
    "How are CDFIs funded?",
    "What services do CDFIs provide?"
  ],
  nmtc: [
    "What is the New Markets Tax Credit Program?",
    "How do businesses qualify for NMTC financing?",
    "What impact has the NMTC Program had?"
  ],
  charterSchools: [
    "How are charter schools funded?",
    "What financing options are available for charter schools?",
    "What impact do charter schools have on communities?"
  ]
};

// External resources by category
const categoryResources = {
  cdfi: "Learn more at https://www.cdfifund.gov/",
  nmtc: "Learn more at https://www.cdfifund.gov/programs-training/programs/new-markets-tax-credit",
  charterSchools: "Learn more at https://charterschoolcenter.ed.gov/"
};

// Document resources by category
const documentResources = {
  cdfi: [
    {
      title: "CDFI Certification Guide",
      description: "A comprehensive guide to CDFI certification requirements and process",
      path: "/chatbot-resources/cdfi/cdfi-certification-guide.pdf"
    },
    {
      title: "CDFI Fund Annual Report (2023)",
      description: "Official annual report detailing CDFI Fund programs and impact",
      path: "/chatbot-resources/cdfi/CDFI_Fund_FY_2023_Annual_Report_FINAL_508c.pdf"
    },
    {
      title: "Sizing the CDFI Market",
      description: "Research report on understanding CDFI industry growth and market size",
      path: "/chatbot-resources/cdfi/sizing-the-cdfi-market-understanding-industry-growth.pdf"
    }
  ],
  nmtc: [
    {
      title: "New Markets Tax Credit Overview",
      description: "Comprehensive overview of the NMTC program structure and benefits",
      path: "/chatbot-resources/nmtc/New Markets Tax Credit.docx"
    },
    {
      title: "NMTC Program Fact Sheet",
      description: "Key facts and statistics about the NMTC Program",
      path: "/chatbot-resources/nmtc/nmtc-fact-sheet.pdf"
    },
    {
      title: "NMTC Compliance Guide",
      description: "Guide to maintaining compliance with NMTC Program requirements",
      path: "/chatbot-resources/nmtc/nmtc-compliance-guide.pdf"
    }
  ],
  charterSchools: [
    {
      title: "Charter School Loan Affordability and Readiness",
      description: "Guide to assessing charter school readiness for facility financing",
      path: "/chatbot-resources/charter-schools/Charter School Loan Affordability and Readiness.docx"
    },
    {
      title: "Charter School Facilities Financing Guide",
      description: "Guide to financing options for charter school facilities",
      path: "/chatbot-resources/charter-schools/facilities-financing-guide.pdf"
    },
    {
      title: "Charter School Credit Analysis Framework",
      description: "Framework for analyzing charter school credit quality",
      path: "/chatbot-resources/charter-schools/credit-analysis-framework.pdf"
    }
  ]
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! I can help answer your questions about community development finance. Please select a topic you\'re interested in:'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [useLLM, setUseLLM] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  // Function to query an LLM API (OpenAI's GPT-4 or Anthropic's Claude)
  const queryLLM = async (prompt, category) => {
    setIsProcessing(true);
    
    try {
      // This is where you would make an API call to OpenAI or Anthropic
      // For now, we'll simulate a response with a timeout
      
      // Example OpenAI API call (commented out)
      /*
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are a helpful assistant specializing in ${category === 'cdfi' ? 'Community Development Financial Institutions' : 
                        category === 'nmtc' ? 'New Markets Tax Credit Program' : 
                        'Charter School financing and development'}. 
                        Provide accurate, concise information based on your knowledge.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500
        })
      });
      
      const data = await response.json();
      return data.choices[0].message.content;
      */
      
      // Example Anthropic API call (commented out)
      /*
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-opus-20240229',
          messages: [
            {
              role: 'user',
              content: `You are a helpful assistant specializing in ${category === 'cdfi' ? 'Community Development Financial Institutions' : 
                        category === 'nmtc' ? 'New Markets Tax Credit Program' : 
                        'Charter School financing and development'}. 
                        
                        Please answer the following question:
                        ${prompt}`
            }
          ],
          max_tokens: 500
        })
      });
      
      const data = await response.json();
      return data.content[0].text;
      */
      
      // Simulate API response time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return a simulated response
      return `This is a simulated LLM response about ${category === 'cdfi' ? 'Community Development Financial Institutions' : 
              category === 'nmtc' ? 'New Markets Tax Credit Program' : 
              'Charter School financing and development'} in response to your question: "${prompt}".
              
              To use a real LLM like GPT-4 or Claude, you would need to:
              1. Sign up for an API key from OpenAI or Anthropic
              2. Store the API key securely in your environment variables
              3. Uncomment and configure the API call in the queryLLM function
              4. Deploy with proper backend support for API key security
              
              The LLM could then analyze your documents and provide more dynamic responses based on their content.`;
    } catch (error) {
      console.error('Error querying LLM:', error);
      return `I'm sorry, there was an error processing your request. Please try again later or contact support.`;
    } finally {
      setIsProcessing(false);
    }
  };

  const searchKnowledgeBase = (query, category) => {
    const results = [];
    const queryWords = query.toLowerCase().split(' ').filter(word => 
      !['what', 'how', 'when', 'where', 'why', 'is', 'are', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'].includes(word)
    );
    
    // Filter knowledge base sections based on category
    let relevantSections = {};
    
    if (category === 'cdfi') {
      relevantSections = {
        cdfiBasics: knowledgeBase.cdfiBasics,
        cdfiTypes: knowledgeBase.cdfiTypes,
        services: knowledgeBase.services,
        impact: knowledgeBase.impact,
        funding: knowledgeBase.funding,
        history: knowledgeBase.history,
        certificationProcess: knowledgeBase.certificationProcess,
        fundingGuide: knowledgeBase.fundingGuide,
        complianceAndAsset: knowledgeBase.complianceAndAsset
      };
    } else if (category === 'nmtc') {
      relevantSections = {
        nmtcBasics: knowledgeBase.nmtcBasics,
        nmtcEligibility: knowledgeBase.nmtcEligibility,
        nmtcApplication: knowledgeBase.nmtcApplication,
        nmtcImpact: knowledgeBase.nmtcImpact
      };
    } else if (category === 'charterSchools') {
      relevantSections = {
        charterSchoolsBasics: knowledgeBase.charterSchoolsBasics,
        charterSchoolsFunding: knowledgeBase.charterSchoolsFunding,
        charterSchoolsFinancing: knowledgeBase.charterSchoolsFinancing,
        charterSchoolsImpact: knowledgeBase.charterSchoolsImpact
      };
    }
    
    // Search through each section of the relevant knowledge base
    for (const [section, content] of Object.entries(relevantSections)) {
      const paragraphs = content.split('\n\n').filter(p => p.trim());
      
      for (const paragraph of paragraphs) {
        const paragraphLower = paragraph.toLowerCase();
        // Calculate relevance score based on number of matching words
        const matchingWords = queryWords.filter(word => paragraphLower.includes(word));
        if (matchingWords.length > 0) {
          results.push({
            text: paragraph.trim(),
            source: section,
            relevance: matchingWords.length / queryWords.length
          });
        }
      }
    }
    
    // Sort by relevance
    return results.sort((a, b) => b.relevance - a.relevance);
  };

  const getBotResponse = async (question, category) => {
    // If LLM mode is enabled, use the LLM to generate a response
    if (useLLM) {
      const llmResponse = await queryLLM(question, category);
      
      // Check if the question is about documents and append document links if needed
      const lowerQuestion = question.toLowerCase();
      if (lowerQuestion.includes('document') || lowerQuestion.includes('resource') || lowerQuestion.includes('guide') || 
          lowerQuestion.includes('download') || lowerQuestion.includes('pdf') || lowerQuestion.includes('file')) {
        
        let documentSection = `\n\nHere are some helpful ${category === 'cdfi' ? 'CDFI' : 
                              category === 'nmtc' ? 'NMTC' : 
                              'Charter School'} resources you can download:\n`;
        
        documentResources[category].forEach(doc => {
          documentSection += `\n• ${doc.title}: ${doc.description} [Download](${doc.path})`;
        });
        
        return llmResponse + documentSection;
      }
      
      return llmResponse;
    }
    
    // Otherwise, use the existing rule-based response system
    const lowerQuestion = question.toLowerCase();
    let response = '';
    
    if (category === 'cdfi') {
      // CDFI-specific responses
      if (lowerQuestion.includes('what') && lowerQuestion.includes('cdfi')) {
        response = knowledgeBase.cdfiBasics.split('\n\n')[0].trim() + '\n\n' + categoryResources.cdfi;
      }
      
      else if (lowerQuestion.includes('type') || lowerQuestion.includes('kinds')) {
        response = knowledgeBase.cdfiTypes.split('\n\n').slice(0, 2).join('\n\n').trim() + '\n\n' + categoryResources.cdfi;
      }
      
      else if (lowerQuestion.includes('service') || lowerQuestion.includes('provide') || lowerQuestion.includes('offer')) {
        response = knowledgeBase.services.split('\n\n').slice(0, 4).join('\n\n').trim() + '\n\n' + categoryResources.cdfi;
      }
      
      else if (lowerQuestion.includes('fund') || lowerQuestion.includes('money') || lowerQuestion.includes('capital')) {
        response = knowledgeBase.funding.split('\n\n').slice(0, 3).join('\n\n').trim() + '\n\n' + categoryResources.cdfi;
      }
      
      else {
        response = 'I can help you learn about CDFIs, their certification, funding, and impact. Try asking more specific questions about CDFIs.\n\n' + categoryResources.cdfi;
      }
      
      // Check if the question is about documents or resources
      if (lowerQuestion.includes('document') || lowerQuestion.includes('resource') || lowerQuestion.includes('guide') || 
          lowerQuestion.includes('download') || lowerQuestion.includes('pdf') || lowerQuestion.includes('file')) {
        response += '\n\nHere are some helpful CDFI resources you can download:\n';
        documentResources.cdfi.forEach(doc => {
          response += `\n• ${doc.title}: ${doc.description} [Download](${doc.path})`;
        });
      }
    } 
    else if (category === 'nmtc') {
      // NMTC-specific responses
      if (lowerQuestion.includes('what') && (lowerQuestion.includes('nmtc') || lowerQuestion.includes('new market'))) {
        response = knowledgeBase.nmtcBasics.split('\n\n').slice(0, 3).join('\n\n').trim() + '\n\n' + categoryResources.nmtc;
      }
      
      else if (lowerQuestion.includes('eligib') || lowerQuestion.includes('qualify')) {
        response = knowledgeBase.nmtcEligibility.split('\n\n').slice(0, 3).join('\n\n').trim() + '\n\n' + categoryResources.nmtc;
      }
      
      else if (lowerQuestion.includes('apply') || lowerQuestion.includes('application') || lowerQuestion.includes('process')) {
        response = knowledgeBase.nmtcApplication.split('\n\n').slice(0, 3).join('\n\n').trim() + '\n\n' + categoryResources.nmtc;
      }
      
      else if (lowerQuestion.includes('impact') || lowerQuestion.includes('benefit') || lowerQuestion.includes('effect')) {
        response = knowledgeBase.nmtcImpact.split('\n\n').slice(0, 3).join('\n\n').trim() + '\n\n' + categoryResources.nmtc;
      }
      
      else {
        response = 'I can help you learn about the New Markets Tax Credit Program, including eligibility, application process, and impact. Try asking more specific questions about NMTC.\n\n' + categoryResources.nmtc;
      }
      
      // Check if the question is about documents or resources
      if (lowerQuestion.includes('document') || lowerQuestion.includes('resource') || lowerQuestion.includes('guide') || 
          lowerQuestion.includes('download') || lowerQuestion.includes('pdf') || lowerQuestion.includes('file')) {
        response += '\n\nHere are some helpful NMTC resources you can download:\n';
        documentResources.nmtc.forEach(doc => {
          response += `\n• ${doc.title}: ${doc.description} [Download](${doc.path})`;
        });
      }
    } 
    else if (category === 'charterSchools') {
      // Charter Schools-specific responses
      if (lowerQuestion.includes('what') && lowerQuestion.includes('charter')) {
        response = knowledgeBase.charterSchoolsBasics.split('\n\n').slice(0, 3).join('\n\n').trim() + '\n\n' + categoryResources.charterSchools;
      }
      
      else if (lowerQuestion.includes('fund') || lowerQuestion.includes('money')) {
        response = knowledgeBase.charterSchoolsFunding.split('\n\n').slice(0, 3).join('\n\n').trim() + '\n\n' + categoryResources.charterSchools;
      }
      
      else if (lowerQuestion.includes('financ') || lowerQuestion.includes('loan') || lowerQuestion.includes('capital')) {
        response = knowledgeBase.charterSchoolsFinancing.split('\n\n').slice(0, 3).join('\n\n').trim() + '\n\n' + categoryResources.charterSchools;
      }
      
      else if (lowerQuestion.includes('impact') || lowerQuestion.includes('outcome') || lowerQuestion.includes('result')) {
        response = knowledgeBase.charterSchoolsImpact.split('\n\n').slice(0, 3).join('\n\n').trim() + '\n\n' + categoryResources.charterSchools;
      }
      
      else {
        response = 'I can help you learn about charter schools, including funding, financing options, and community impact. Try asking more specific questions about charter schools.\n\n' + categoryResources.charterSchools;
      }
      
      // Check if the question is about documents or resources
      if (lowerQuestion.includes('document') || lowerQuestion.includes('resource') || lowerQuestion.includes('guide') || 
          lowerQuestion.includes('download') || lowerQuestion.includes('pdf') || lowerQuestion.includes('file')) {
        response += '\n\nHere are some helpful Charter School resources you can download:\n';
        documentResources.charterSchools.forEach(doc => {
          response += `\n• ${doc.title}: ${doc.description} [Download](${doc.path})`;
        });
      }
    }
    else {
      response = 'Please select a topic (CDFI, NMTC, or Charter Schools) to get started.';
    }
    
    return response;
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    
    let welcomeMessage = '';
    if (category === 'cdfi') {
      welcomeMessage = 'You\'ve selected Community Development Financial Institutions (CDFIs). What would you like to know about CDFIs?';
    } else if (category === 'nmtc') {
      welcomeMessage = 'You\'ve selected New Markets Tax Credit Program (NMTC). What would you like to know about the NMTC Program?';
    } else if (category === 'charterSchools') {
      welcomeMessage = 'You\'ve selected Charter Schools. What would you like to know about charter school financing and development?';
    }
    
    setMessages([
      ...messages,
      { type: 'user', text: `I want to learn about ${category === 'cdfi' ? 'CDFIs' : category === 'nmtc' ? 'NMTC' : 'Charter Schools'}` },
      { type: 'bot', text: welcomeMessage }
    ]);
  };

  const handleExampleClick = (question) => {
    if (!selectedCategory) {
      setMessages([...messages, { type: 'bot', text: 'Please select a topic first (CDFI, NMTC, or Charter Schools).' }]);
      return;
    }
    
    setMessages([...messages, { type: 'user', text: question }]);
    
    setTimeout(async () => {
      const botResponse = await getBotResponse(question, selectedCategory);
      setMessages(prevMessages => [...prevMessages, { type: 'bot', text: botResponse }]);
      
      // Scroll to bottom after bot response
      scrollToBottom();
    }, 100);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    if (!selectedCategory) {
      setMessages([...messages, 
        { type: 'user', text: inputText },
        { type: 'bot', text: 'Please select a topic first (CDFI, NMTC, or Charter Schools).' }
      ]);
      setInputText('');
      return;
    }

    setMessages([...messages, { type: 'user', text: inputText }]);
    setInputText('');
    
    setTimeout(async () => {
      const botResponse = await getBotResponse(inputText, selectedCategory);
      setMessages(prevMessages => [...prevMessages, { type: 'bot', text: botResponse }]);
      
      // Scroll to bottom after bot response
      scrollToBottom();
    }, 100);
  };

  const handleResetCategory = () => {
    setSelectedCategory(null);
    setMessages([
      {
        type: 'bot',
        text: 'Hi! I can help answer your questions about community development finance. Please select a topic you\'re interested in:'
      }
    ]);
  };

  // Add a function to handle document links
  const renderMessageWithLinks = (text) => {
    // Regular expression to match markdown-style links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    
    // Split the text by links
    const parts = text.split(linkRegex);
    
    if (parts.length === 1) {
      // No links found, return the text as is
      return text;
    }
    
    const elements = [];
    let i = 0;
    
    // Process the text and links
    while (i < parts.length) {
      // Add the text before the link
      if (parts[i]) {
        elements.push(<span key={`text-${i}`}>{parts[i]}</span>);
      }
      
      // If there's a link, add it
      if (i + 2 < parts.length) {
        const linkText = parts[i + 1];
        const linkUrl = parts[i + 2];
        
        elements.push(
          <a 
            key={`link-${i}`} 
            href={linkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="chatbot-link"
          >
            {linkText}
          </a>
        );
        
        i += 2;
      }
      
      i++;
    }
    
    return <>{elements}</>;
  };

  const toggleLLMMode = () => {
    setUseLLM(!useLLM);
    setMessages([
      {
        type: 'bot',
        text: !useLLM 
          ? 'LLM mode enabled. I will now use an AI language model to generate responses. Please note this is currently simulated - to use a real LLM, you need to configure the API keys.'
          : 'LLM mode disabled. I will now use predefined responses from the knowledge base.'
      }
    ]);
    setSelectedCategory(null);
  };

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button 
          className="chat-button"
          onClick={() => setIsOpen(true)}
        >
          <span className="chat-button-text">Finance-Helper</span>
          <span className="chat-button-icon">💬</span>
        </button>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Finance Knowledge Assistant</h3>
            <div className="chat-header-controls">
              <button 
                className="llm-toggle-button"
                onClick={toggleLLMMode}
                title={useLLM ? "Switch to predefined responses" : "Switch to LLM-powered responses"}
              >
                {useLLM ? "AI: ON" : "AI: OFF"}
              </button>
              <button 
                className="close-button"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>
          </div>
          <div className="messages-container">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.type}`}
              >
                {message.type === 'bot' ? renderMessageWithLinks(message.text) : message.text}
              </div>
            ))}
            {isProcessing && (
              <div className="message bot typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {!selectedCategory ? (
            <div className="category-selection">
              <button 
                className="category-button cdfi"
                onClick={() => handleCategorySelect('cdfi')}
              >
                CDFI
              </button>
              <button 
                className="category-button nmtc"
                onClick={() => handleCategorySelect('nmtc')}
              >
                NMTC
              </button>
              <button 
                className="category-button charter-schools"
                onClick={() => handleCategorySelect('charterSchools')}
              >
                Charter Schools
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSendMessage} className="input-container">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your question here..."
                  className="message-input"
                  disabled={isProcessing}
                />
                <button type="submit" className="send-button" disabled={isProcessing}>
                  Send
                </button>
              </form>
              <div className="example-questions">
                <div className="example-questions-title">
                  <span>Try asking:</span>
                  <button 
                    className="reset-category-button"
                    onClick={handleResetCategory}
                  >
                    Change Topic
                  </button>
                </div>
                {categoryQuestions[selectedCategory].map((question, index) => (
                  <button
                    key={index}
                    className="example-question-button"
                    onClick={() => handleExampleClick(question)}
                    disabled={isProcessing}
                  >
                    {question}
                  </button>
                ))}
                <button
                  className="example-question-button document-question"
                  onClick={() => handleExampleClick(`What documents do you have about ${selectedCategory === 'cdfi' ? 'CDFIs' : selectedCategory === 'nmtc' ? 'NMTC' : 'Charter Schools'}?`)}
                  disabled={isProcessing}
                >
                  Show available documents
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot; 