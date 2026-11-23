import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="page-not-found container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <h1>Page Not Found</h1>
      <p style={{ maxWidth: '520px', margin: '1rem auto 2rem', color: 'var(--neutral-700)' }}>
        The page you are looking for does not exist or may have moved.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link to="/contact" className="btn btn-secondary">
          Contact Host
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
