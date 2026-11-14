import React, { useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './index.css';

// Non-home routes are code-split so the homepage (the LCP route) does not
// pay for their JavaScript up front.
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Rates = lazy(() => import('./pages/Rates'));

// Per-route document title + meta description. The SPA has one HTML shell,
// so without this every route shared the homepage title.
const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Zihuatanejo Playa Ropa condo rental - Casa OM del Sur',
    description:
      'Rent a beautiful Playa Ropa condo with a swimming pool in Zihuatanejo, Mexico! Three large king bedrooms with ensuite bathrooms, private patio, and bay views.',
  },
  '/about': {
    title: 'About Playa La Ropa & Zihuatanejo - Casa OM del Sur',
    description:
      'About Casa OM del Sur and Playa La Ropa, Zihuatanejo, Mexico — the beach, the Punta Marina complex, and local dining recommendations.',
  },
  '/rates': {
    title: 'Rates & Pricing - Casa OM del Sur, Playa La Ropa',
    description:
      'Weekly rental rates for Casa OM del Sur, Playa La Ropa, Zihuatanejo — $1,000 to $2,500 USD per week depending on season, plus cleaning fee and deposit details.',
  },
  '/contact': {
    title: 'Contact & Booking - Casa OM del Sur, Playa La Ropa',
    description:
      'Contact Oscar Mario Sanchez to check availability and book Casa OM del Sur, a 3-bedroom condo rental on Playa La Ropa, Zihuatanejo, Mexico.',
  },
};

const RouteMeta: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[pathname] ?? ROUTE_META['/'];
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', meta.description);
  }, [pathname]);

  return null;
};

// Scroll to top of the page on route transition
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Route change tracker for Google Analytics (if gtag exists)
const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'G-H6Y04DNSLW', {
        page_path: location.pathname + location.search + location.hash,
      });
    }
  }, [location]);

  return null;
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <RouteMeta />
      <AnalyticsTracker />
      <Analytics />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main id="main-content" className="main-content" style={{ flexGrow: 1 }}>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/rates" element={<Rates />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} /> {/* Fallback route */}
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
