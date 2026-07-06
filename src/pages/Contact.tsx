import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export const Contact: React.FC = () => {
  return (
    <div className="page-contact animate-fade-in">
      {/* Header Banner */}
      <div 
        className="page-banner text-white" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://www.zihuatanejoplayaropacondorental.com/images/webp2/bg Sunset Playa Ropa.jpg")`
        }}
      >
        <div className="banner-content container">
          <h1>Contact Us</h1>
          <h2>Rates, Inquiries & Booking</h2>
        </div>
      </div>

      <div className="contact-main container">
        <div className="contact-layout-grid">
          {/* Info cards and Details */}
          <div className="contact-info-panel">
            <div className="info-card glass-panel highlight-border">
              <h3>Booking Inquiries</h3>
              <p className="booking-instructions">
                Please contact <strong>Oscar Mario Sanchez</strong> directly for current availability, customized seasonal rates, and booking requests.
              </p>
              
              <ul className="booking-contact-list">
                <li>
                  <a href="mailto:info@puntamarinazihuatanejo.com" className="contact-detail-item">
                    <div className="contact-icon-box">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="contact-label">Email Address</span>
                      <span className="contact-value font-medium">info@puntamarinazihuatanejo.com</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="tel:+1527551036035" className="contact-detail-item">
                    <div className="contact-icon-box">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="contact-label">Phone / WhatsApp</span>
                      <span className="contact-value font-medium">1 52 755 103 6035</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className="info-card glass-panel">
              <h3>Condo Location</h3>
              <ul className="details-list">
                <li>
                  <MapPin size={20} className="details-icon" />
                  <div>
                    <strong>Address:</strong>
                    <p>#103 Punta Marina, Playa La Ropa, Zihuatanejo, Guerrero, Mexico</p>
                  </div>
                </li>
                <li>
                  <Clock size={20} className="details-icon" />
                  <div>
                    <strong>Check-in Details:</strong>
                    <p>Weekly rentals only. Check-in/out times flexible by arrangement.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Map Iframe Container */}
            <div className="contact-map-card glass-panel">
              <h3>Map Location</h3>
              <div className="map-iframe-container">
                <iframe 
                  title="Punta Marina Location Map"
                  src="https://maps.google.com/maps?width=100%25&height=400&hl=en&q=Punta Marina 103 Zihuatanejo+(Punta Marina 103)&t=&z=17&ie=UTF8&iwloc=B&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="contact-form-panel">
            <h2 className="panel-title">Send Us a Message</h2>
            <p className="panel-subtitle">Fill in the fields below and we'll reply to your booking inquiry as soon as possible.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
