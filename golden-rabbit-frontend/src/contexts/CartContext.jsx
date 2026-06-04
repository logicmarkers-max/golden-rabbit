import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Cart Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      };
    }
    
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: []
      };
    
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload.items || []
      };
    
    default:
      return state;
  }
}

// Initial Cart State
const initialCartState = {
  items: [],
  isOpen: false
};

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('golden_rabbit_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('golden_rabbit_cart', JSON.stringify(cartState));
  }, [cartState]);

  // Cart Helper Functions
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { ...product, quantity }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id: productId }
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Cart Calculations
  const getCartTotal = () => {
    return cartState.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartState.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartTotalWithTax = (taxRate = 0.18) => {
    const subtotal = getCartTotal();
    const tax = subtotal * taxRate;
    return subtotal + tax;
  };

  const isItemInCart = (productId) => {
    return cartState.items.some(item => item.id === productId);
  };

  const getItemQuantity = (productId) => {
    const item = cartState.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Context Value
  const contextValue = {
    // State
    cartItems: cartState.items,
    cartItemCount: getCartItemCount(),
    cartTotal: getCartTotal(),
    cartTotalWithTax: getCartTotalWithTax(),
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Helpers
    isItemInCart,
    getItemQuantity,
    
    // Constants
    TAX_RATE: 0.18 // 18% GST
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook to use Cart Context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Remove default export to fix HMR warning