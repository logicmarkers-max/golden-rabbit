import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { crackerCategories } from '../../data/products';
import { useFilterContext } from '../../contexts/FilterContext';
import SiteLogo from '../SiteLogo/SiteLogo';
import './Footer.css';

const scrollToProducts = (categoryName, setFilter) => {
  setFilter(categoryName);
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Footer = () => {
  const { setFilter } = useFilterContext();

  const handleCategoryClick = (e, categoryName) => {
    e.preventDefault();
    scrollToProducts(categoryName, setFilter);
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <SiteLogo className="site-logo--footer" />
            <p className="footer-description">
              Your trusted partner for premium crackers since 2008.
              Bringing joy and celebration to thousands of families across India.
            </p>
            <div className="social-links">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-link"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-link"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="social-link"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#offers">Special Offers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              {crackerCategories.map((category) => (
                <li key={category.id}>
                  <a
                    href="#products"
                    onClick={(e) => handleCategoryClick(e, category.name)}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Sivakasi, Tamil Nadu, India</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 99405 50329</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>vishalinancy@logicmarkers.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕒</span>
                <span>Mon-Sat: 9 AM - 7 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2026 Golden Rabbit Crackers. All rights reserved.</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#shipping">Shipping Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
