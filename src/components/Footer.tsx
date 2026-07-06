import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-root">
      <div className="footer-container container">
        <div className="footer-grid">
          {/* Brand block */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-casa">Casa OM</span>
              <span className="logo-del-sur">del Sur</span>
            </Link>
            <p className="footer-description">
              Experience the perfect vacation getaway. Rent our beautiful king-bedroom condo overlooking Playa La Ropa in Zihuatanejo, Mexico.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="footer-title">Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About & Area Guide</Link></li>
              <li><Link to="/rates">Rates & Options</Link></li>
              <li><Link to="/contact">Contact & Booking</Link></li>
            </ul>
          </div>

          {/* Contact details */}
          <div className="footer-contact">
            <h4 className="footer-title">Contact</h4>
            <ul>
              <li>
                <MapPin size={16} />
                <span>Punta Marina 103, Playa La Ropa, Zihuatanejo, MX</span>
              </li>
              <li>
                <Mail size={16} />
                <a href="mailto:info@puntamarinazihuatanejo.com">info@puntamarinazihuatanejo.com</a>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+1527551036035">+1 52 755 103 6035</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} zihuatanejoplayaropacondorental.com. All rights reserved.
          </p>
          <div className="footer-division">
            A division of{' '}
            <a 
              href="https://www.downtownsuites.ca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-parent-link"
            >
              Downtown Suites LTD <ExternalLink size={12} style={{ display: 'inline', marginLeft: '2px' }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
