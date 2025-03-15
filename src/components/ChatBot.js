import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import emailjs from 'emailjs-com';

// Predefined FAQ database
const faqDatabase = {
  services: `Clarity Impact Finance provides the following services: Underwriting, Lending Strategy, Process Mapping, Training, and Compliance/Asset Management.`,
  pricing: `Let's discuss your specific needs to determine the right pricing for your organization.`,
  location: `We are based in New York but work with clients nationally.`,
  contact: `You can get in touch with our team by emailing us at contact@clarityimpactfinance.com or by calling (555) 123-4567 during business hours. You can also use the contact form in this chat by clicking the "Contact Us" button.`
};

// Example questions to display in the chatbot
const faqQuestions = [
  "What services do you provide?",
  "How can I get in touch?",
  "How does your pricing work?",
  "Where are you located?"
];

// EmailJS service details
const EMAILJS_SERVICE_ID = "service_id"; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = "template_id"; // Replace with your EmailJS template ID
const EMAILJS_USER_ID = "user_id"; // Replace with your EmailJS user ID

// Add a default recipient email
const DEFAULT_RECIPIENT_EMAIL = "amir@clarityimpactfinance.com";

// Knowledge base and document resources data structure remains unchanged

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! I\'m IRIS, your Impact Resource & Investment Specialist. I can help with questions about our services, pricing, and more. How can I assist you today?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  // eslint-disable-next-line no-unused-vars
  const hasValidApiKey = apiKey && apiKey.startsWith('sk-') && apiKey.length > 20;
  // Always keep useLLM false to focus on predetermined questions
  const [useLLM] = useState(false); // Removed setUseLLM to fix ESLint warning
  // State to control visibility of example questions
  const [showExamples, setShowExamples] = useState(true);
  // State for contact form
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactFormErrors, setContactFormErrors] = useState({});
  const [contactSending, setContactSending] = useState(false);
  // Initialize optionsMinimized as false to make options visible by default
  const [optionsMinimized, setOptionsMinimized] = useState(false);
  // State to track if on mobile device
  const [isMobile, setIsMobile] = useState(false);
  // New state to track if the user has interacted with the chatbot
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Debug info
  console.log('LLM enabled:', useLLM);
  
  // Check if on mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    // Check initially
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Enhanced scroll function for better mobile support
  const scrollToResponse = () => {
    if (messagesEndRef.current) {
      // Use a slight delay to ensure the DOM has updated
      setTimeout(() => {
        // First try to use modern scrollIntoView options for better positioning
        messagesEndRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });

        // Special handling for mobile devices - ensure the latest message is visible
        if (isMobile) {
          const messagesContainer = document.querySelector('.messages-container');
          const latestMessage = messagesContainer.lastElementChild.previousElementSibling;
          
          if (latestMessage) {
            // Scroll so the latest message is at the top of the viewport
            latestMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Add a class to help with styling if needed
            latestMessage.classList.add('highlighted-response');
            
            // Remove the highlight class after animation completes
            setTimeout(() => {
              latestMessage.classList.remove('highlighted-response');
            }, 2000);
          }
        }
      }, 100);
    }
  };

  // For backwards compatibility, define scrollToBottom that calls scrollToResponse
  const scrollToBottom = () => {
    scrollToResponse();
  };

  // Function to check for FAQ matches in the input text
  const checkForFAQMatch = (text) => {
    text = text.toLowerCase();

    // Check for services related questions
    if (
      text.includes('service') || 
      text.includes('offer') || 
      text.includes('provide') || 
      text.includes('do you do')
    ) {
      return faqDatabase.services;
    }

    // Check for contact/get in touch related questions
    if (
      text.includes('get in touch') || 
      text.includes('contact') || 
      text.includes('reach') || 
      text.includes('talk to')
    ) {
      return faqDatabase.contact || "You can get in touch with our team by emailing us at contact@clarityimpactfinance.com or by filling out the contact form in the chat.";
    }

    // Check for pricing related questions
    if (
      text.includes('price') || 
      text.includes('cost') || 
      text.includes('fee') || 
      text.includes('charge') || 
      text.includes('how much') ||
      text.includes('pricing')
    ) {
      return faqDatabase.pricing;
    }

    // Check for location related questions
    if (
      text.includes('where') || 
      text.includes('location') || 
      text.includes('based') || 
      text.includes('office') ||
      text.includes('address')
    ) {
      return faqDatabase.location;
    }

    return null;
  };

  // Function to handle example question clicks
  const handleExampleClick = (question) => {
    if (question === 'Contact Us') {
      setShowContactForm(true);
      // Mark as interacted when clicking Contact Us
      setHasInteracted(true);
      // Minimize options on mobile after interaction
      if (isMobile) {
        setOptionsMinimized(true);
      }
    } else {
      // Add the user's question to the chat
      setMessages(prev => [...prev, { type: 'user', text: question }]);

      // Process the question
      let answer = '';

      // Check for FAQ match
      const faqMatch = checkForFAQMatch(question);
      if (faqMatch) {
        answer = faqMatch;
      } else if (selectedCategory) {
        answer = `I'm still learning about ${selectedCategory}. Please try another question or check our website for more information.`;
      } else {
        answer = "I don't have specific information about that yet. Please try one of the suggested questions or contact us directly for more assistance.";
      }

      // Mark as interacted with a question
      setHasInteracted(true);
      
      // Minimize options on mobile after user has interacted with a question
      if (isMobile) {
        setOptionsMinimized(true);
      }

      // Add slight delay before showing the answer for a more natural feel
      setIsProcessing(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: answer }]);
        setIsProcessing(false);
        // Use enhanced scroll function instead of scrollToBottom
        scrollToResponse();
      }, 800);
    }
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([
      {
        type: 'bot',
        text: 'Hi! I\'m IRIS, your Impact Resource & Investment Specialist. I can help with questions about our services, pricing, and more. How can I assist you today?'
      }
    ]);
    setShowExamples(true);
    setSelectedCategory(null);
    setShowContactForm(false);
    // Reset options to visible on mobile
    if (isMobile) {
      setOptionsMinimized(false);
    }
  };

  // Toggle examples visibility
  const toggleExamples = () => {
    setShowExamples(!showExamples);
  };

  // Handle contact form input changes
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });

    // Clear error for this field as user types
    if (contactFormErrors[name]) {
      setContactFormErrors({
        ...contactFormErrors,
        [name]: ''
      });
    }
  };

  // Validate contact form
  const validateContactForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!contactForm.name.trim()) {
      errors.name = "Name is required";
    }

    if (!contactForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(contactForm.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!contactForm.message.trim()) {
      errors.message = "Message is required";
    }

    setContactFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (!validateContactForm()) {
      return;
    }

    setContactSending(true);

    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: contactForm.name,
      reply_to: contactForm.email,
      to_email: DEFAULT_RECIPIENT_EMAIL,
      message: contactForm.message
    };

    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID)
      .then(() => {
        // Success message
        setMessages(prev => [
          ...prev,
          { 
            type: 'bot', 
            text: `Thank you, ${contactForm.name}! Your message has been sent. We'll get back to you at ${contactForm.email} as soon as possible.` 
          }
        ]);

        // Reset form
        setContactForm({
          name: '',
          email: '',
          message: ''
        });

        // Hide contact form
        setShowContactForm(false);
        setContactSending(false);
        // Use enhanced scroll function instead of scrollToBottom
        scrollToResponse();
      })
      .catch(error => {
        // Error message
        console.error('EmailJS error:', error);
        setMessages(prev => [
          ...prev,
          { 
            type: 'bot', 
            text: "I'm sorry, there was an error sending your message. Please try again or contact us directly at contact@clarityimpactfinance.com." 
          }
        ]);
        setContactSending(false);
        // Use enhanced scroll function here too
        scrollToResponse();
      });
  };

  // Show contact form
  const showContactFormHandler = () => {
    setShowContactForm(true);
    
    // Add a small delay to ensure the contact form is rendered before attempting to manipulate DOM
    setTimeout(() => {
      // Find the contact form container
      const formContainer = document.querySelector('.contact-form-container');
      if (formContainer) {
        // Ensure the form is visible
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      
      // Ensure messages container is set to allow scrolling
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
      }
    }, 100);
  };
  
  // Cancel contact form
  const cancelContactForm = () => {
    setShowContactForm(false);
    setContactForm({
      name: '',
      email: '',
      message: ''
    });
    setContactFormErrors({});
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    // Mark as interacted when sending a message
    setHasInteracted(true);
    
    // Minimize options on mobile when user sends their own message
    if (isMobile) {
      setOptionsMinimized(true);
    }

    const userMessage = {
      type: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    // Hide examples after user input but leave a toggle button to show them again
    if (showExamples) {
      setShowExamples(false);
    }

    try {
      // Check for FAQ match
      const faqMatch = checkForFAQMatch(inputText);

      if (faqMatch) {
        // FAQ response found
        setTimeout(() => {
          setMessages(prev => [
            ...prev, 
            { 
              type: 'bot', 
              text: faqMatch 
            }
          ]);
          setIsProcessing(false);
          // Use enhanced scroll function instead of scrollToBottom
          scrollToResponse();
        }, 800); // Slight delay for natural feel
      return;
    }

      // Use predetermined responses for all other cases
      const botResponse = await getBotResponse(inputText, selectedCategory);

      // Check if we have a good answer or should suggest contact form
      // eslint-disable-next-line no-unused-vars
      const lowerQuestion = inputText.toLowerCase();
      const unknownQuestion = 
        botResponse.includes("I don't have specific information") || 
        botResponse.includes("I'm still learning about") ||
        botResponse.includes("try one of the suggested questions");

      setTimeout(() => {
        if (unknownQuestion) {
          setMessages(prevMessages => [
            ...prevMessages, 
      {
        type: 'bot',
              text: `${botResponse} Would you like to send us a message directly?`,
              actions: [
                {
                  label: 'Contact Us',
                  handler: showContactFormHandler
                }
              ]
            }
          ]);
        } else {
          setMessages(prevMessages => [...prevMessages, { type: 'bot', text: botResponse }]);
        }
        setIsProcessing(false);
        // Use enhanced scroll function instead of scrollToBottom
        scrollToResponse();
      }, 800);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { type: 'bot', text: "I'm sorry, I encountered an error. Please try again." }]);
      setIsProcessing(false);
      // Use enhanced scroll function here too
      scrollToResponse();
    }
  };

  const handleResetCategory = () => {
    setSelectedCategory(null);
    // Show examples again when returning to main menu
    setShowExamples(true);
  };

  const getBotResponse = async (question, category) => {
    // Always use predetermined responses
    // eslint-disable-next-line no-unused-vars
    const lowerQuestion = question.toLowerCase();
    let response = '';

    // Handle category-specific responses
    if (category === 'cdfi') {
      if (lowerQuestion.includes('what') || lowerQuestion.includes('definition') || lowerQuestion.includes('explain')) {
        response = "A Community Development Financial Institution (CDFI) is a specialized financial institution that works in market niches underserved by traditional financial institutions. CDFIs provide a unique range of financial products and services to economically disadvantaged communities.";
      } else if (lowerQuestion.includes('require') || lowerQuestion.includes('certification')) {
        response = "To be certified as a CDFI, an organization must: be a legal entity, have a primary mission of promoting community development, serve one or more target markets, provide development services, maintain accountability to its defined target market, and be a non-governmental entity.";
      } else if (lowerQuestion.includes('fund') || lowerQuestion.includes('capital') || lowerQuestion.includes('financing')) {
        response = "CDFIs are funded through various sources including: the CDFI Fund, private investment, bank loans (often CRA-motivated), foundation grants and program-related investments, and religious institutions. We can help you develop strategies to access these funding sources.";
      } else {
        response = "CDFIs are vital organizations that provide financial services to underserved communities. Our team at Clarity Impact Finance has extensive experience working with CDFIs on underwriting, lending strategies, process mapping, and compliance.";
      }
    } else if (category === 'nmtc') {
      if (lowerQuestion.includes('what') || lowerQuestion.includes('definition') || lowerQuestion.includes('explain')) {
        response = "The New Markets Tax Credit (NMTC) Program incentivizes community development and economic growth through the use of tax credits that attract private investment to distressed communities. The program is administered by the CDFI Fund.";
      } else if (lowerQuestion.includes('eligible') || lowerQuestion.includes('qualify')) {
        response = "To be eligible for NMTC, projects must be located in qualifying low-income census tracts (typically with poverty rates of at least 20% or median family incomes below 80% of area median). Eligible businesses typically include commercial and industrial facilities, community facilities, mixed-use developments, and certain housing projects.";
      } else if (lowerQuestion.includes('apply') || lowerQuestion.includes('process') || lowerQuestion.includes('how do')) {
        response = "The NMTC application process involves: 1) Finding a Community Development Entity (CDE) with NMTC allocation, 2) Meeting the CDE's requirements and demonstrating community impact, 3) Structuring the transaction with the CDE and investors, and 4) Closing the financing. Our team can guide you through this complex process.";
      } else {
        response = "The NMTC Program has deployed over $61 billion in tax credit authority since its inception. These investments have created or retained over 830,000 jobs and supported the construction of more than 215 million square feet of manufacturing, office, and retail space in low-income communities.";
      }
    } else if (category === 'charterSchools') {
      if (lowerQuestion.includes('what') || lowerQuestion.includes('definition') || lowerQuestion.includes('explain')) {
        response = "Charter schools are public schools operating under a contract (or charter) that provides them with public funding but greater flexibility in their operations compared to traditional public schools. They are accountable for academic results and upholding their charter promises.";
      } else if (lowerQuestion.includes('fund') || lowerQuestion.includes('finance') || lowerQuestion.includes('capital')) {
        response = "Charter schools can access funding through various channels including: per-pupil funding from state/local sources, federal grants (like the Charter Schools Program), philanthropy, CDFIs, bonds, and specialized facilities financing. Clarity Impact Finance can help develop comprehensive financial strategies.";
      } else if (lowerQuestion.includes('facility') || lowerQuestion.includes('building') || lowerQuestion.includes('space')) {
        response = "Charter school facility financing often involves a combination of approaches such as: leasing from a school district, commercial leases, mortgage loans from CDFIs or banks, tax-exempt bond financing, or working with specialized charter school facility developers. We can help navigate these options.";
      } else {
        response = "Charter schools serve over 3.6 million students nationwide and make up about 7% of all public schools. Our team specializes in helping charter schools develop sustainable financial models, access capital, and implement strong financial management practices.";
      }
    } else {
      // General responses
      const faqMatch = checkForFAQMatch(question);
      if (faqMatch) {
        return faqMatch;
      }

      if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
        response = "Hello! I'm IRIS, your Impact Resource & Investment Specialist. How can I assist you today?";
      } else if (lowerQuestion.includes('thank')) {
        response = "You're welcome! I'm glad I could help. Is there anything else you'd like to know about our services?";
      } else if (lowerQuestion.includes('contact') || lowerQuestion.includes('speak') || lowerQuestion.includes('human') || lowerQuestion.includes('person')) {
        response = "If you'd like to speak with a member of our team, please email us at contact@clarityimpactfinance.com or call (555) 123-4567 during business hours (9am-5pm ET, Monday through Friday).";
      } else {
        response = "I don't have specific information about that yet. Please try one of the suggested questions or contact us directly for more assistance.";
      }
    }

    return response;
  };

  // Render message text with possible action buttons
  const renderMessage = (message) => {
    return (
      <>
        <div className="message-text">{message.text}</div>
        {message.actions && message.actions.length > 0 && (
          <div className="message-actions">
            {message.actions.map((action, i) => (
              <button 
                key={i} 
                className="action-button"
                onClick={action.handler}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </>
    );
  };

  const toggleChat = () => {
    // When opening the chat, make sure options are visible
    if (!isOpen && isMobile) {
      setOptionsMinimized(false);
    }
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  useEffect(() => {
    scrollToResponse();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    // Hide examples after category selection but leave toggle button
    if (showExamples) {
      setShowExamples(false);
    }

    // Mark as interacted when selecting a category
    setHasInteracted(true);
    
    // Minimize options on mobile after category selection
    if (isMobile) {
      setOptionsMinimized(true);
    }

    let welcomeMessage = '';
    switch(category) {
      case 'cdfi':
        welcomeMessage = "You've selected Community Development Financial Institutions. What would you like to know about CDFIs? I can explain what they are, certification requirements, funding sources, or their impact.";
        break;
      case 'nmtc':
        welcomeMessage = "You've selected the New Markets Tax Credit Program. What would you like to know about NMTCs? I can explain what they are, eligibility criteria, the application process, or their community impact.";
        break;
      case 'charterSchools':
        welcomeMessage = "You've selected Charter Schools. What would you like to know about charter school finance? I can explain what charter schools are, funding sources, facility financing options, or their role in the education landscape.";
        break;
      default:
        welcomeMessage = "Let me know what questions you have about this topic.";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: welcomeMessage }]);
      // Use enhanced scroll function instead of scrollToBottom
      scrollToResponse();
    }, 100);
  };

  // Function to toggle options visibility on mobile
  const toggleOptionsVisibility = () => {
    setOptionsMinimized(!optionsMinimized);
  };

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button 
          className="chatbot-button" 
          onClick={toggleChat}
          aria-label="Open IRIS chatbot"
        >
          <span className="chatbot-icon">💬</span>
          <span>Ask IRIS</span>
        </button>
      ) : (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <h3>IRIS - AI Assistant</h3>
            <div className="chatbot-controls">
              <button 
                className="clear-chat-button" 
                onClick={clearChat}
                aria-label="Clear chat history"
              >
                <span role="img" aria-label="Reset">🔄</span>
              </button>
              <button 
                className="close-button"
                onClick={toggleChat}
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>
          </div>

          <div className={`messages-container ${showContactForm ? 'showing-form' : ''}`}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.type}`}
              >
                {renderMessage(message)}
              </div>
            ))}
            <div ref={messagesEndRef} />

            {isProcessing && (
              <div className="message bot">
                <div className="typing-indicator">
                  <span>●</span><span>●</span><span>●</span>
                </div>
              </div>
            )}

            {showContactForm && (
              <div className="contact-form-container">
                <h4>Contact Us</h4>
                <form onSubmit={handleContactSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactInputChange}
                      disabled={contactSending}
                      className={contactFormErrors.name ? 'error' : ''}
                      autoFocus
                    />
                    {contactFormErrors.name && <span className="error-message">{contactFormErrors.name}</span>}
          </div>
          
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactInputChange}
                      disabled={contactSending}
                      className={contactFormErrors.email ? 'error' : ''}
                    />
                    {contactFormErrors.email && <span className="error-message">{contactFormErrors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactInputChange}
                      rows="2"
                      disabled={contactSending}
                      className={contactFormErrors.message ? 'error' : ''}
                    ></textarea>
                    {contactFormErrors.message && <span className="error-message">{contactFormErrors.message}</span>}
                  </div>

                  <div className="form-actions">
              <button 
                      type="button" 
                      onClick={cancelContactForm}
                      disabled={contactSending}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={contactSending}
                      className="submit-button"
                    >
                      {contactSending ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Contact Us button */}
          {!selectedCategory && !showContactForm && (
            <button 
              onClick={() => handleExampleClick('Contact Us')}
              className="contact-us-button"
            >
              Contact Us
            </button>
          )}

          {/* Mobile options toggle - always show on mobile */}
          {isMobile && !showContactForm && (
            <button 
              className={`mobile-options-toggle ${!optionsMinimized ? 'options-visible' : ''}`}
              onClick={toggleOptionsVisibility}
              aria-expanded={!optionsMinimized}
            >
              {optionsMinimized ? 'Show Options ▼' : 'Hide Options ▲'}
            </button>
          )}

          {/* Two-column layout for questions and topics */}
          {!showContactForm && (
            <div className={`chatbot-options-layout ${optionsMinimized ? 'minimized' : ''}`}>
              {/* Popular Questions Column */}
              <div className="popular-questions-column">
                <h4 className="options-section-title">Popular Questions</h4>
                <div className="option-buttons">
                  <button 
                    className="option-button"
                    onClick={() => handleExampleClick("What services do you provide?")}
                  >
                    What services do you provide?
                  </button>
                  <button 
                    className="option-button"
                    onClick={() => handleExampleClick("What is your pricing?")}
                  >
                    What is your pricing?
                  </button>
                  <button 
                    className="option-button"
                    onClick={() => handleExampleClick("Where are you located?")}
                  >
                    Where are you located?
                  </button>
                </div>
              </div>
              
              {/* Popular Topics Column */}
              <div className="popular-topics-column">
                <h4 className="options-section-title">Popular Topics</h4>
                <div className="option-buttons">
                  <button 
                    className="option-button"
                onClick={() => handleCategorySelect('cdfi')}
              >
                    <span className="topic-icon">🏦</span> CDFIs
              </button>
              <button 
                    className="option-button"
                onClick={() => handleCategorySelect('nmtc')}
              >
                    <span className="topic-icon">💰</span> New Markets Tax Credit
              </button>
              <button 
                    className="option-button"
                onClick={() => handleCategorySelect('charterSchools')}
              >
                    <span className="topic-icon">🏫</span> Charter Schools
              </button>
            </div>
              </div>
            </div>
          )}

          {selectedCategory && (
            <div style={{ padding: '8px 16px', textAlign: 'center' }}>
              <button 
                onClick={handleResetCategory}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#3f6fb6', 
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '14px'
                }}
              >
                Return to Main Menu
              </button>
            </div>
          )}

          {!showContactForm && (
              <form onSubmit={handleSendMessage} className="input-container">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your question here..."
                  className="message-input"
                  disabled={isProcessing}
                />
                  <button 
                type="submit" 
                className="send-button" 
                disabled={isProcessing || !inputText.trim()}
                  >
                Send
                  </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot; 