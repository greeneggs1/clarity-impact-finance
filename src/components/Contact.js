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
  const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID'; 
  const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';

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

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-intro">
          Ready to take the next step in your financial journey? Get in touch with our expert team today.
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-info-item">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <h3>Phone</h3>
                <p>(555) 123-4567</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h3>Email</h3>
                <p>{contactEmail}</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3>Address</h3>
                <p>123 Finance Street, Suite 400<br />San Francisco, CA 94105</p>
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
                <button 
                  type="button" 
                  className="try-again-btn"
                  onClick={() => setFormStatus({submitted: false, error: false, message: '', loading: false})}
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      disabled={formStatus.loading}
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
                      required
                      placeholder="Your email address"
                      disabled={formStatus.loading}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number (optional)"
                      disabled={formStatus.loading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="organization">Organization</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your organization (optional)"
                      disabled={formStatus.loading}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Interested In</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    disabled={formStatus.loading}
                  >
                    <option value="">Select a Service</option>
                    <option value="underwriting">Underwriting & Lending Strategy</option>
                    <option value="nmtc">NMTC Consulting</option>
                    <option value="compliance">Federal Program Compliance & Asset Management</option>
                    <option value="other">Other Services</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="How can we help you?"
                    disabled={formStatus.loading}
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
                  <p>All messages will be sent to {contactEmail}</p>
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