import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart, User } from 'lucide-react';
import SiteLogo from '../SiteLogo/SiteLogo';
import Cart from '../Cart/Cart';
import AccountPanel from '../AccountPanel/AccountPanel';
import './Header.css';

const Header = ({ onCartToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { cartItemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCart = () => {
    setIsAccountOpen(false);
    setIsCartOpen(true);
    onCartToggle?.(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
    onCartToggle?.(false);
  };

  const openAccount = () => {
    setIsCartOpen(false);
    onCartToggle?.(false);
    setIsAccountOpen(true);
  };

  const closeAccount = () => {
    setIsAccountOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <a href="#home" className="logo-link">
          <SiteLogo />
        </a>

        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#products">Products</a>
          <a href="#offers">Offers</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="account-btn"
            title="My Account"
            onClick={openAccount}
            aria-expanded={isAccountOpen}
          >
            <User size={20} />
          </button>

          <button
            type="button"
            className="cart-btn"
            onClick={openCart}
            title="Shopping Cart"
            aria-expanded={isCartOpen}
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <Cart isOpen={isCartOpen} onClose={closeCart} />
      <AccountPanel isOpen={isAccountOpen} onClose={closeAccount} />
    </header>
  );
};

export default Header;
