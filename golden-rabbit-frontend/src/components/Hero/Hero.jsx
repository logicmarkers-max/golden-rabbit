import React, { useState, useEffect, useCallback } from 'react';
import { getFeaturedProducts } from '../../data/products';
import { getProductPrimaryImage, getCategoryImageUrl } from '../../utils/productImages';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './Hero.css';

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);

const Hero = () => {
  const featuredProducts = getFeaturedProducts();
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index) => {
      if (featuredProducts.length === 0) return;
      setActiveIndex((index + featuredProducts.length) % featuredProducts.length);
    },
    [featuredProducts.length]
  );

  useEffect(() => {
    if (featuredProducts.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % featuredProducts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const product = featuredProducts[activeIndex];
  const discount =
    product?.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-badge">✨ Premium Diwali Collection 2026</p>
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">Golden Rabbit</span>
            <br />
            Crackers Paradise
          </h1>

          <p className="hero-subtitle">
            Experience the magic of celebrations with our premium collection of
            eco-friendly crackers. Safe, vibrant, and unforgettable moments await!
          </p>

          <div className="hero-actions">
            <button type="button" className="cta-primary" onClick={() => scrollTo('products')}>
              <span>Shop Now</span>
              <span>🛒</span>
            </button>
            <button type="button" className="cta-secondary" onClick={() => scrollTo('categories')}>
              <span>🎆</span>
              <span>Browse Categories</span>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          {product && (
            <div className="hero-featured">
              <article key={product.id} className="hero-featured-card">
                <div className="hero-featured-image">
                  <img
                    src={getProductPrimaryImage(product)}
                    alt={product.name}
                    onError={(e) => {
                      const fallback = getCategoryImageUrl(product.category);
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                  {discount > 0 && (
                    <span className="hero-featured-discount">{discount}% OFF</span>
                  )}
                  <span className="hero-featured-badge">
                    <Star size={12} fill="currentColor" />
                    Featured
                  </span>
                </div>
                <div className="hero-featured-body">
                  <p className="hero-featured-category">
                    {product.category?.replace(/-/g, ' ')}
                  </p>
                  <h3 className="hero-featured-name">{product.name}</h3>
                  <div className="hero-featured-prices">
                    <span className="hero-featured-price">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="hero-featured-was">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </article>

              <div className="hero-featured-controls">
                <button
                  type="button"
                  className="hero-featured-nav"
                  onClick={() => goTo(activeIndex - 1)}
                  aria-label="Previous featured product"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="hero-featured-dots" role="tablist" aria-label="Featured products">
                  {featuredProducts.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={index === activeIndex}
                      aria-label={`Show ${item.name}`}
                      className={`hero-featured-dot ${index === activeIndex ? 'is-active' : ''}`}
                      onClick={() => goTo(index)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="hero-featured-nav"
                  onClick={() => goTo(activeIndex + 1)}
                  aria-label="Next featured product"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <button
                type="button"
                className="hero-featured-cta"
                onClick={() => scrollTo('products')}
              >
                Shop featured deals
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
