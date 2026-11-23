import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import PageBanner from '../components/PageBanner';

export const Contact: React.FC = () => {
  return (
    <div className="page-contact">
      {/* Markdown version of this page (llms.txt v2); React hoists it to <head>. */}
      <link rel="alternate" type="text/markdown" href="/contact.md" />
      <PageBanner
        image="/images/1. Sunset Playa Ropa.webp"
        title="Contact Us"
        subtitle="Rates, Inquiries & Booking"
      />

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
          </div>

          {/* Map Panel */}
          <div className="contact-map-panel">
            <div className="contact-map-card glass-panel">
              <h2 className="panel-title">Map Location</h2>
              <p className="panel-subtitle">
                Punta Marina #103 overlooks Playa La Ropa — a 10-minute walk down the hill to the beach.
              </p>
              <div className="map-iframe-container">
                <iframe
                  title="Punta Marina Location Map"
                  src="https://maps.google.com/maps?width=100%25&height=480&hl=en&q=Punta%20Marina%20103%20Zihuatanejo&ll=17.6235504,-101.5435028&t=&z=14&iwloc=A&ie=UTF8&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
