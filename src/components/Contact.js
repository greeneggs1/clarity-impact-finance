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
          Reach out to us using the form below.
        </p>
        
        <div className="contact-content-centered">
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
                
                <div className="form-note">
                  We'll get back to you as soon as possible.
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 