import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Rates from './pages/Rates';
import './index.css';

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
      <AnalyticsTracker />
      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main className="main-content" style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/rates" element={<Rates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} /> {/* Fallback route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
