import React from 'react';
import { User, X, LogIn } from 'lucide-react';
import './AccountPanel.css';

const AccountPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSignIn = () => {
    // Placeholder for future auth integration
    onClose();
  };

  return (
    <div className="account-overlay" onClick={onClose} role="presentation">
      <div
        className="account-sidebar"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Account"
      >
        <div className="account-header">
          <h2>
            <User className="account-icon" />
            My Account
          </h2>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>

        <div className="account-content">
          <p className="account-message">
            Sign in to save your cart, track orders, and get exclusive festival offers.
          </p>
          <button type="button" className="sign-in-btn" onClick={handleSignIn}>
            <LogIn size={18} />
            Sign In
          </button>
          <p className="account-hint">
            New here? Sign in to create your Golden Rabbit account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountPanel;
