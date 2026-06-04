import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import './Toast.css';

// Toast Context
const ToastContext = createContext();

// Toast Types
const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};

// Toast Provider
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 4000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);
    
    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message, duration) => {
    return addToast(message, TOAST_TYPES.SUCCESS, duration);
  }, [addToast]);

  const error = useCallback((message, duration) => {
    return addToast(message, TOAST_TYPES.ERROR, duration);
  }, [addToast]);

  const info = useCallback((message, duration) => {
    return addToast(message, TOAST_TYPES.INFO, duration);
  }, [addToast]);

  const warning = useCallback((message, duration) => {
    return addToast(message, TOAST_TYPES.WARNING, duration);
  }, [addToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Toast Container Component
function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

// Individual Toast Component
function Toast({ toast, onClose }) {
  const getIcon = () => {
    switch (toast.type) {
      case TOAST_TYPES.SUCCESS:
        return <CheckCircle size={20} />;
      case TOAST_TYPES.ERROR:
        return <AlertCircle size={20} />;
      case TOAST_TYPES.WARNING:
        return <AlertCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div className={`toast toast-${toast.type}`}>
      <div className="toast-icon">
        {getIcon()}
      </div>
      <div className="toast-message">
        {toast.message}
      </div>
      <button className="toast-close" onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
}

// Custom Hook
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export { TOAST_TYPES };