import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarRange, Info, Check, ShieldCheck, HelpCircle } from 'lucide-react';

export const Rates: React.FC = () => {
  return (
    <div className="page-rates animate-fade-in">
      {/* Banner */}
      <div 
        className="page-banner text-white" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://www.zihuatanejoplayaropacondorental.com/images/webp2/bg Sunset Playa Ropa.jpg")`
        }}
      >
        <div className="banner-content container">
          <h1>Rates & Pricing</h1>
          <h2>Playa La Ropa Condo Rental</h2>
        </div>
      </div>

      <div className="rates-main container">
        <div className="rates-layout-grid">
          {/* Main Price Card */}
          <div className="price-primary-card bg-ocean-gradient text-white">
            <CalendarRange size={36} className="price-card-icon" />
            <h3>Rental Rates</h3>
            <div className="price-tag">
              <span className="price-currency">$1,000</span>
              <span className="price-dash">&mdash;</span>
              <span className="price-amount">$2,500</span>
              <span className="price-period">USD / Week</span>
            </div>
            <p className="price-conditions">
              Prices vary depending on the season, duration, and occupancy. 
              Please inquire for exact pricing for your specific dates.
            </p>
            <div className="price-requirements">
              <Info size={16} />
              <span>Minimum stay of one week is required.</span>
            </div>
            <Link to="/contact" className="btn btn-secondary btn-block">
              Request Availability
            </Link>
          </div>

          {/* Details & Inclusions */}
          <div className="rates-details-panel">
            <div className="details-card glass-panel">
              <h3>What's Included in the Rate</h3>
              <p className="details-intro">
                Our goal is to make your stay at Casa OM del Sur as relaxing and worry-free as possible. The following amenities are included in our weekly rate:
              </p>
              
              <div className="inclusions-grid">
                <div className="inclusion-item">
                  <Check size={18} className="inclusion-check" />
                  <span>All linens, bath towels, and beach towels</span>
                </div>
                <div className="inclusion-item">
                  <Check size={18} className="inclusion-check" />
                  <span>Access to the complex swimming pool & chaises</span>
                </div>
                <div className="inclusion-item">
                  <Check size={18} className="inclusion-check" />
                  <span>Fully equipped galley kitchen & air fryer</span>
                </div>
                <div className="inclusion-item">
                  <Check size={18} className="inclusion-check" />
                  <span>Water, gas, and electricity utilities</span>
                </div>
                <div className="inclusion-item">
                  <Check size={18} className="inclusion-check" />
                  <span>Complex maintenance & night security guard</span>
                </div>
                <div className="inclusion-item">
                  <Check size={18} className="inclusion-check" />
                  <span>High-speed WiFi internet access</span>
                </div>
              </div>
            </div>

            {/* Booking Policies */}
            <div className="details-card glass-panel">
              <h3>Booking & Stay Policies</h3>
              <div className="policies-list">
                <div className="policy-item">
                  <ShieldCheck size={20} className="policy-icon" />
                  <div>
                    <strong>Reservation & Deposit</strong>
                    <p>Contact us to check availability. Reservations are finalized upon receipt of deposit. Rates vary based on High Season (Dec - Apr) and Low Season (May - Nov).</p>
                  </div>
                </div>
                <div className="policy-item">
                  <HelpCircle size={20} className="policy-icon" />
                  <div>
                    <strong>Cancellation & Capacity</strong>
                    <p>Details about cancellations, refunds, and maximum suite guests will be provided with your custom quote. Sleeps up to 6 guests comfortably.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Rates;
