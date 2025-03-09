import React, { useState } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    service: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
    loading: false
  });

  // The email address where all form submissions will be sent
  const contactEmail = 'amir@clarityimpactfinance.com';

  // EmailJS configuration - you'll need to sign up at emailjs.com and get these values
  const EMAILJS_SERVICE_ID = 'service_8yvh652'; 
  const EMAILJS_TEMPLATE_ID = 'template_asituhs';
  const EMAILJS_PUBLIC_KEY = '3f4qpHZXPHhPyyL7Y';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      submitted: false,
      error: false,
      message: '',
      loading: true
    });

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        to_email: contactEmail,
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        organization: formData.organization || 'Not provided',
        service: formData.service,
        message: formData.message,
        reply_to: formData.email
      };

      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Email sent successfully to:', contactEmail);
      
      // Update form status on success
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your message. We will contact you soon!',
        loading: false
      });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          service: '',
          message: ''
        });
        setFormStatus({
          submitted: false,
          error: false,
          message: '',
          loading: false
        });
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus({
        submitted: false,
        error: true,
        message: 'There was an error sending your message. Please try again later.',
        loading: false
      });
    }
  };

  const services = [
    'Underwriting & Lending Strategy',
    'NMTC Consulting',
    'Federal Program Compliance',
    'Asset Management',
    'Impact Measurement',
    'Portfolio Risk Analysis',
    'Other'
  ];

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <h2>Get in Touch</h2>
        <p className="contact-intro">
          Have questions about our services or want to discuss how we can help your organization? 
          Reach out to us using the form below or contact us directly.
        </p>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-info-item">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3>Email Us</h3>
              <p>
                <a href={`mailto:${contactEmail}`} className="contact-link">
                  {contactEmail}
                </a>
              </p>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-3 3l2-2m-2 2l-5 5.01-3-3L7 15l4 4 9-9m-8.9 8.9L5 15l-3 3 3.9 3.9a2.1 2.1 0 0 0 2.97 0l8.08-8.09a2.1 2.1 0 0 0 0-2.97l-1.52-1.52"></path>
                </svg>
              </div>
              <h3>Connect</h3>
              <div className="social-links">
                <a href="https://linkedin.com/company/clarity-impact-finance" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/clarityimpact" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            {formStatus.submitted ? (
              <div className="form-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <p>{formStatus.message}</p>
              </div>
            ) : formStatus.error ? (
              <div className="form-error">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p>{formStatus.message}</p>
                <button type="button" className="try-again-btn" onClick={() => setFormStatus({...formStatus, error: false})}>
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="organization">Organization (Optional)</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your organization"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="service">Service of Interest</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows="4"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className={`submit-btn ${formStatus.loading ? 'loading' : ''}`}
                  disabled={formStatus.loading}
                >
                  {formStatus.loading ? 'Sending...' : 'Send Message'}
                </button>
                
                <p className="form-note">
                  We respect your privacy and will never share your information with third parties.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 