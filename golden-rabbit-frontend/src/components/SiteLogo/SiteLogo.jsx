import React, { useState } from 'react';
import './SiteLogo.css';

const SiteLogo = ({ showText = true, className = '' }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className={`site-logo ${className}`.trim()}>
      <div className="site-logo-icon golden-rabbit-brand">
        {!logoError ? (
          <img
            src="/images/main-rabbit-logo.jpg"
            alt="Golden Rabbit Logo"
            className="site-logo-image"
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className="site-logo-fallback">🐰</div>
        )}
      </div>
      {showText && <span className="site-logo-text">Golden Rabbit</span>}
    </div>
  );
};

export default SiteLogo;
