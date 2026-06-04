import React, { useState, useRef, useCallback } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../Toast/Toast';
import { Star, Heart, ShoppingCart, Plus, Minus, Eye } from 'lucide-react';
import { crackerCategories } from '../../data/products';
import { getProductPrimaryImage, getCategoryImageUrl } from '../../utils/productImages';
import './ProductCard.css';

const ProductCard = ({ product, showQuickView = false }) => {
  const containerRef = React.useRef(null);
  const { addToCart, isItemInCart, getItemQuantity, updateQuantity } = useCart();
  const { success, info } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const handleAddToCart = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addToCart(product, 1);
    success(`${product.name} added to cart! 🎆`);
    setIsAddingToCart(false);
  }, [addToCart, product, success]);

  const handleQuantityUpdate = useCallback((e, newQuantity) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, newQuantity);
  }, [product.id, updateQuantity]);

  const toggleWishlist = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(prev => !prev);
    
    if (!isWishlisted) {
      info(`${product.name} added to wishlist! ❤️`);
    } else {
      info(`${product.name} removed from wishlist`);
    }
  }, [isWishlisted, product.name, info]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
        size={12}
        fill={index < Math.floor(rating) ? '#ffd700' : 'none'}
        color={index < Math.floor(rating) ? '#ffd700' : 'rgba(255, 255, 255, 0.3)'}
      />
    ));
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const currentQuantity = getItemQuantity(product.id);
  const inCart = isItemInCart(product.id);

  const productImageSrc = getProductPrimaryImage(product);
  const categoryIcon = crackerCategories.find((c) => c.id === product.category)?.icon;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const preventBubbling = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      data-category={product.category}
      onClick={preventBubbling}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {discountPercentage > 0 && (
        <div className="discount-badge">
          {discountPercentage}% OFF
        </div>
      )}

      {!product.inStock && (
        <div className="out-of-stock-badge">
          Out of Stock
        </div>
      )}

      <div className="product-image-container">
        {!imageFailed ? (
          <img
            src={productImageSrc}
            alt={product.name}
            className={`product-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const fallback = getCategoryImageUrl(product.category);
              if (e.currentTarget.src !== fallback && !e.currentTarget.dataset.retried) {
                e.currentTarget.dataset.retried = 'true';
                e.currentTarget.src = fallback;
                return;
              }
              setImageFailed(true);
            }}
          />
        ) : (
          <div className="product-image-fallback" aria-hidden>
            <span className="product-image-fallback-icon">{categoryIcon ?? '🎆'}</span>
            <span className="product-image-fallback-label">
              {product.category?.replace(/-/g, ' ')}
            </span>
          </div>
        )}
        {categoryIcon && !imageFailed && (
          <span className="product-image-badge" aria-hidden>
            {categoryIcon}
          </span>
        )}

        <div className="product-overlay">
          <button 
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={toggleWishlist}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={isWishlisted ? 'filled' : ''} />
          </button>
          
          {showQuickView && (
            <button className="quick-view-btn" title="Quick view">
              <Eye />
            </button>
          )}
        </div>

        {product.featured && (
          <div className="featured-badge">
            ⭐ Featured
          </div>
        )}
      </div>

      <div className="product-info">
        <div className="product-category">
          {product.category?.replace('-', ' ').toUpperCase()}
        </div>
        
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <div className="stars">
            {renderStars(product.reviews?.average || 0)}
          </div>
          <span className="rating-text">
            {product.reviews?.average?.toFixed(1) || 'N/A'} ({product.reviews?.count || 0} reviews)
          </span>
        </div>

        <div className="product-specs">
          {product.specifications?.noiseLevel && (
            <span className={`noise-level ${product.specifications.noiseLevel.toLowerCase()}`}>
              {product.specifications.noiseLevel} Sound
            </span>
          )}
          {product.specifications?.ageLimit && (
            <span className="age-limit">
              {product.specifications.ageLimit}
            </span>
          )}
        </div>

        <p className="product-description">
          {product.description?.length > 100 
            ? `${product.description.substring(0, 100)}...`
            : product.description
          }
        </p>

        {product.tags && Array.isArray(product.tags) && product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="product-footer">
          <div className="product-price">
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <div className="product-actions">
            {!product.inStock ? (
              <button className="add-to-cart-btn disabled" disabled>
                Out of Stock
              </button>
            ) : inCart ? (
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={(e) => handleQuantityUpdate(e, currentQuantity - 1)}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-display">{currentQuantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={(e) => handleQuantityUpdate(e, currentQuantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <button 
                className={`add-to-cart-btn ${isAddingToCart ? 'loading' : ''}`} 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <ShoppingCart size={16} />
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;