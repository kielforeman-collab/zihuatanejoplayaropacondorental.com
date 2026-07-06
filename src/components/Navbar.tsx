import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info, DollarSign, Mail } from 'lucide-react';
import '../styles/main.css';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => {
    return location.pathname === path ? 'active-link' : '';
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/about', label: 'About', icon: <Info size={18} /> },
    { path: '/rates', label: 'Rates', icon: <DollarSign size={18} /> },
    { path: '/contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  return (
    <nav className={`navbar-root ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-casa">Casa OM</span>
          <span className="logo-del-sur">del Sur</span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-desktop-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path)}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary btn-navbar">
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="navbar-toggle-btn"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`navbar-mobile-drawer ${isOpen ? 'drawer-open' : ''}`}>
        <div className="drawer-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`drawer-link ${isActive(link.path)}`}
              onClick={closeMenu}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn btn-primary btn-drawer"
            onClick={closeMenu}
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
