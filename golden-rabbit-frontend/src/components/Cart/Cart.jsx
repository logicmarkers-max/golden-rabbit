import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { getProductPrimaryImage } from '../../utils/productImages';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const {
    cartItems,
    cartItemCount,
    cartTotal,
    cartTotalWithTax,
    updateQuantity,
    removeFromCart,
    clearCart,
    TAX_RATE
  } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const subtotal = cartTotal;
  const tax = subtotal * TAX_RATE;
  const total = cartTotalWithTax;

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose} role="presentation">
      <div
        className="cart-sidebar"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="cart-header">
          <h2>
            <ShoppingCart className="cart-icon" />
            Shopping Cart ({cartItemCount})
          </h2>
          <button className="close-button" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingCart className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p>Add some spectacular fireworks to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img 
                        src={getProductPrimaryImage(item)} 
                        alt={item.name}
                      />
                    </div>

                    <div className="item-main">
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-category">{item.category?.replace('-', ' ')}</p>
                        <div className="item-price">
                          {formatPrice(item.price)}
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="original-price">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>
                        <div className="item-total">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>

                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus />
                        </button>
                      </div>

                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove from cart"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>GST ({(TAX_RATE * 100).toFixed(0)}%):</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button className="clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;