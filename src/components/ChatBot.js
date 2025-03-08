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
  `
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! I can help answer your questions about Community Development Financial Institutions (CDFIs) and the community development sector. Try clicking one of the example questions below or ask your own question.'
    }
  ]);
  const [inputText, setInputText] = useState('');
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

  const exampleQuestions = [
    "What are CDFIs?",
    "How are CDFIs funded?",
    "What services do CDFIs provide?"
  ];

  const searchKnowledgeBase = (query) => {
    const results = [];
    const queryWords = query.toLowerCase().split(' ').filter(word => 
      !['what', 'how', 'when', 'where', 'why', 'is', 'are', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'].includes(word)
    );
    
    // Search through each section of the knowledge base
    for (const [section, content] of Object.entries(knowledgeBase)) {
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

  const getBotResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Common question patterns
    if (lowerQuestion.includes('what') && lowerQuestion.includes('cdfi')) {
      return knowledgeBase.cdfiBasics.split('\n\n')[0].trim();
    }
    
    if (lowerQuestion.includes('type') || lowerQuestion.includes('kinds')) {
      return knowledgeBase.cdfiTypes.split('\n\n').slice(0, 2).join('\n\n').trim();
    }
    
    if (lowerQuestion.includes('service') || lowerQuestion.includes('provide') || lowerQuestion.includes('offer')) {
      return knowledgeBase.services.split('\n\n').slice(0, 4).join('\n\n').trim();
    }
    
    if (lowerQuestion.includes('compliance') || lowerQuestion.includes('bgp') || lowerQuestion.includes('asset')) {
      return knowledgeBase.complianceAndAsset.split('\n\n').slice(0, 3).join('\n\n').trim();
    }
    
    if (lowerQuestion.includes('impact') || lowerQuestion.includes('benefit')) {
      return knowledgeBase.impact.split('\n\n').slice(0, 3).join('\n\n').trim();
    }
    
    if (lowerQuestion.includes('fund') || lowerQuestion.includes('money') || lowerQuestion.includes('capital')) {
      return knowledgeBase.funding.split('\n\n').slice(0, 3).join('\n\n').trim();
    }
    
    if (lowerQuestion.includes('history') || lowerQuestion.includes('start') || lowerQuestion.includes('begin')) {
      return knowledgeBase.history.split('\n\n').slice(0, 3).join('\n\n').trim();
    }
    
    if (lowerQuestion.includes('certif') || lowerQuestion.includes('require')) {
      return knowledgeBase.certificationProcess.split('\n\n').slice(0, 3).join('\n\n').trim();
    }

    return 'I can help you learn about CDFIs, their certification, funding, and impact. Try asking about:\n- What is a CDFI?\n- Types of CDFIs\n- CDFI services and impact\n- Funding sources\n- Certification requirements\n- CDFI history';
  };

  const handleExampleClick = (question) => {
    setMessages([...messages, { type: 'user', text: question }]);
    
    setTimeout(() => {
      const botResponse = getBotResponse(question);
      setMessages(prevMessages => [...prevMessages, { type: 'bot', text: botResponse }]);
      
      // Scroll to bottom after bot response
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages([...messages, { type: 'user', text: inputText }]);
    setInputText('');
    
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      setMessages(prevMessages => [...prevMessages, { type: 'bot', text: botResponse }]);
      
      // Scroll to bottom after bot response
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  };

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button 
          className="chat-button"
          onClick={() => setIsOpen(true)}
        >
          <span className="chat-button-text">CDFI-Helper</span>
          <span className="chat-button-icon">💬</span>
        </button>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <h3>CDFI Knowledge Assistant</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="messages-container">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.type}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your question here..."
              className="message-input"
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
          <div className="example-questions">
            <div className="example-questions-title">Try asking:</div>
            {exampleQuestions.map((question, index) => (
              <button
                key={index}
                className="example-question-button"
                onClick={() => handleExampleClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 