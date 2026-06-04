import React from 'react';
import './LogoOptions.css';

const LogoOptions = () => {
  const logoOptions = [
    { id: 1, icon: '', name: 'Classic Golden Rabbit', description: 'Pure Golden Glow', class: 'golden-style-1' },
    { id: 2, icon: '🐇', name: 'Elegant Golden Rabbit', description: 'Refined & Classy', class: 'golden-style-2' },
    { id: 3, icon: '', name: 'Bright Golden Rabbit', description: 'Radiant & Bold', class: 'golden-style-3' },
    { id: 4, icon: '', name: 'Warm Golden Rabbit', description: 'Cozy & Inviting', class: 'golden-style-4' },
    { id: 5, icon: '🐰', name: 'Royal Golden Rabbit', description: 'Majestic & Premium', class: 'golden-style-5' },
    { id: 6, icon: '🐇', name: 'Sunset Golden Rabbit', description: 'Orange-Gold Blend', class: 'golden-style-6' },
    { id: 7, icon: '🐰', name: 'Shimmering Golden Rabbit', description: 'Animated Sparkle', class: 'golden-style-7' },
    { id: 8, icon: '🐇', name: 'Deep Golden Rabbit', description: 'Rich & Luxurious', class: 'golden-style-8' }
  ];

  const customLogos = [
    { id: 9, content: 'GR', name: 'Monogram Style', description: 'Clean & Modern' },
    { id: 10, content: '◆🐰◆', name: 'Diamond Frame', description: 'Luxury Feel' },
    { id: 11, content: '⚡🐇⚡', name: 'Lightning Rabbit', description: 'High Energy' },
    { id: 12, content: '🏆🐰', name: 'Trophy Rabbit', description: 'Award Winner' }
  ];

  return (
    <div className="logo-showcase">
      <div className="showcase-header">
        <h1>🎨 Golden Rabbit Logo Options</h1>
        <p>Choose your preferred logo design</p>
      </div>
      
      <div className="logo-grid">
        <h2>🔥 Emoji Combinations</h2>
        <div className="options-grid">
          {logoOptions.map(option => (
            <div key={option.id} className="logo-option">
              <div className="logo-preview">
                <span className={`preview-icon ${option.class}`}>{option.icon}</span>
                <span className="preview-text">Golden Rabbit</span>
              </div>
              <div className="option-info">
                <h3>{option.name}</h3>
                <p>{option.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>⭐ Custom Designs</h2>
        <div className="options-grid">
          {customLogos.map(option => (
            <div key={option.id} className="logo-option custom">
              <div className="logo-preview">
                <span className="preview-custom">{option.content}</span>
                <span className="preview-text">Golden Rabbit</span>
              </div>
              <div className="option-info">
                <h3>{option.name}</h3>
                <p>{option.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>🎯 SVG Vector Options</h2>
        <div className="options-grid">
          <div className="logo-option svg">
            <div className="logo-preview">
              <svg className="svg-logo" viewBox="0 0 50 50" width="40" height="40">
                <circle cx="25" cy="25" r="20" fill="url(#goldGradient)" />
                <path d="M15 25 Q25 15 35 25 Q25 35 15 25" fill="#000" opacity="0.7" />
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#ffd700', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:'#ff6b35', stopOpacity:1}} />
                  </linearGradient>
                </defs>
              </svg>
              <span className="preview-text">Golden Rabbit</span>
            </div>
            <div className="option-info">
              <h3>Gradient Circle Rabbit</h3>
              <p>Modern Vector Design</p>
            </div>
          </div>

          <div className="logo-option svg">
            <div className="logo-preview">
              <svg className="svg-logo" viewBox="0 0 50 50" width="40" height="40">
                <polygon points="25,5 35,20 25,35 15,20" fill="url(#goldGradient2)" />
                <circle cx="25" cy="20" r="3" fill="#000" />
                <circle cx="25" cy="28" r="2" fill="#000" />
                <defs>
                  <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#ffed4e', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:'#ffd700', stopOpacity:1}} />
                  </linearGradient>
                </defs>
              </svg>
              <span className="preview-text">Golden Rabbit</span>
            </div>
            <div className="option-info">
              <h3>Diamond Rabbit Shape</h3>
              <p>Geometric & Elegant</p>
            </div>
          </div>
        </div>
      </div>

      <div className="selection-note">
        <p>💡 <strong>Tip:</strong> Each option can be customized with different colors, sizes, and effects!</p>
      </div>
    </div>
  );
};

export default LogoOptions;