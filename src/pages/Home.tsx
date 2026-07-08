import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Compass, Shield, Wind } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

export const Home: React.FC = () => {
  return (
    <div className="page-home animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section text-white">
        <ImageCarousel isBackground={true} />
        <div className="hero-content container">
          <div className="hero-text-block">
            <span className="hero-badge">Vacation Condo Rental</span>
            <h1 className="hero-title">Welcome to Casa OM del Sur</h1>
            <h2 className="hero-subtitle">
              Overlooking beautiful <strong>Playa La Ropa</strong> in Zihuatanejo, Mexico
            </h2>
            <p className="hero-tagline">
              A luxury 3-bedroom, 3-bathroom retreat nested in the private, peaceful Punta Marina complex.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-secondary">
                Check Availability <Calendar size={16} style={{ marginLeft: '8px' }} />
              </Link>
              <Link to="/about" className="btn btn-outline-white">
                Explore the Area
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section container">
        <div className="section-header">
          <h2 className="section-title">Take a Look Inside</h2>
          <p className="section-subtitle">Browse images of our condo, private patio, shared swimming pool, and the beach.</p>
        </div>
        <ImageCarousel />
      </section>

      {/* Overview Section */}
      <section className="overview-section bg-sand-gradient">
        <div className="container overview-grid">
          <div className="overview-text glass-panel">
            <h3 className="overview-title">Your Tropical Home Away From Home</h3>
            <p>
              Casa OM del Sur is a well-appointed, comfortable condo designed for a perfect vacation with family and friends. 
              Located in the safe, quiet, and beautifully maintained <strong>Punta Marina</strong> complex, this suite is just a 
              leisurely 10-minute walk down the hill (including 74 steps) to the world-renowned sandy shoreline of Playa La Ropa.
            </p>
            <p>
              Relax on our massive patio overlooking the bay, cook fresh seafood on the private BBQ, and cool off in the 
              sparkling shared swimming pool. With night watchman security and caretaking staff, you will feel safe and 
              well looked after throughout your stay.
            </p>
          </div>

          <div className="overview-details glass-panel">
            <h3 className="overview-title">Condo Features</h3>
            <ul className="features-list">
              <li>
                <div className="feature-icon">🛌</div>
                <div>
                  <strong>3 King Bedrooms</strong>
                  <span>Each featuring its own private ensuite bathroom with elegant rain showers.</span>
                </div>
              </li>
              <li>
                <div className="feature-icon">🍳</div>
                <div>
                  <strong>Fully Equipped Galley Kitchen</strong>
                  <span>Includes gas stove, air fryer, fridge, cookware, and essential tableware.</span>
                </div>
              </li>
              <li>
                <div className="feature-icon">🌅</div>
                <div>
                  <strong>Huge Covered Patio</strong>
                  <span>Overlooks the bay with private BBQ and three separate comfortable sitting areas.</span>
                </div>
              </li>
              <li>
                <div className="feature-icon">🏖️</div>
                <div>
                  <strong>All Amenities Included</strong>
                  <span>Complete set of bed linens, bath towels, and beach towels for your convenience.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Highlights / Badges Section */}
      <section className="highlights-section container">
        <div className="highlights-grid">
          <div className="highlight-card">
            <Compass className="highlight-icon" />
            <h4>Ideal Location</h4>
            <p>Ten-minute walk down the hill to the soft sands of Playa La Ropa, near premier dining spots.</p>
          </div>
          <div className="highlight-card">
            <Wind className="highlight-icon" />
            <h4>Cool & Breezy</h4>
            <p>Enjoy pleasant ocean breezes on the private patio or relax in air-conditioned suites.</p>
          </div>
          <div className="highlight-card">
            <Shield className="highlight-icon" />
            <h4>Safe & Secure</h4>
            <p>Rest easy with overnight security staff and gated entrance parameters at Punta Marina.</p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="cta-bannerbg bg-ocean-gradient text-white">
        <div className="cta-container container text-center">
          <h2>Ready to Experience Paradise?</h2>
          <p>Book your weekly stay at Casa OM del Sur. Rates range from $1,000 USD to $2,500 USD per week.</p>
          <div className="cta-buttons">
            <Link to="/rates" className="btn btn-secondary">
              View Rates
            </Link>
            <Link to="/contact" className="btn btn-outline-white">
              Contact Host
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
