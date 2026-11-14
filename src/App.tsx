import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './index.css';

// The pages used to be React.lazy code-split, but lazy boundaries force
// React's streaming renderer to emit each route inside a hidden div plus a
// swap script — an empty page with JavaScript off. The three pages are only
// ~21 KiB combined, and with pre-rendered HTML the bundle size no longer
// gates first paint, so they are imported directly and the HTML is fully
// static.
import About from './pages/About';
import Contact from './pages/Contact';
import Rates from './pages/Rates';
import Faq from './pages/Faq';

// Per-route document title + meta description. Each route is pre-rendered
// to its own static HTML file at build time, so the prerender script also
// uses this table to write the title/meta into that HTML.
export const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Zihuatanejo Playa Ropa condo rental - Casa OM del Sur',
    description:
      'Rent Casa OM del Sur, a Playa La Ropa vacation rental with a swimming pool in Zihuatanejo, Mexico. Three king bedrooms with ensuites, private patio, bay views.',
  },
  '/about': {
    title: 'About Playa La Ropa & Zihuatanejo - Casa OM del Sur',
    description:
      'About Casa OM del Sur and Playa La Ropa, Zihuatanejo, Mexico — the beach, the Punta Marina complex, and local dining recommendations.',
  },
  '/rates': {
    title: 'Rates & Pricing - Casa OM del Sur, Playa La Ropa',
    description:
      'Weekly vacation rental rates for Casa OM del Sur, Playa La Ropa — $1,000 to $2,500 USD per week by season, plus cleaning fee and deposit details.',
  },
  '/contact': {
    title: 'Contact & Booking - Casa OM del Sur, Playa La Ropa',
    description:
      'Contact Oscar Mario Sanchez to check availability and book Casa OM del Sur, a 3-bedroom condo rental on Playa La Ropa, Zihuatanejo, Mexico.',
  },
  '/faq': {
    title: 'Frequently Asked Questions - Casa OM del Sur, Playa La Ropa',
    description:
      'Answers about renting Casa OM del Sur, a Playa La Ropa vacation rental: weekly rates, minimum stay, deposits, what is included, and how to book.',
  },
};

export const SITE_URL = 'https://www.zihuatanejoplayaropacondorental.com';

const RouteMeta: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[pathname] ?? ROUTE_META['/'];
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', meta.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `${SITE_URL}${pathname === '/' ? '/' : pathname}`);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `${SITE_URL}${pathname === '/' ? '/' : pathname}`);
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

// Old hash URLs (#/about, #/rates, #/contact) from before the router switch:
// redirect them to the matching real path so shared links and bookmarks keep working.
const HashRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/')) {
      const path = hash.slice(1).split('?')[0];
      if (ROUTE_META[path]) navigate(path, { replace: true });
    }
    // Runs once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

// Everything inside the router, so the prerender script can wrap this in a
// StaticRouter while the client wraps it in a BrowserRouter.
export const AppShell: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <RouteMeta />
      <AnalyticsTracker />
      <HashRedirect />
      <Analytics />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main id="main-content" className="main-content" style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/rates" element={<Rates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="*" element={<Home />} /> {/* Fallback route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppShell />
    </Router>
  );
};

export default App;
