import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';

// Auth Actions
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOAD_USER: 'LOAD_USER',
  UPDATE_PROFILE: 'UPDATE_PROFILE'
};

// Auth Reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    
    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        isAuthenticated: false,
        user: null,
        token: null
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: false,
        user: null,
        token: null
      };
    
    case AUTH_ACTIONS.LOAD_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload.user,
        user: action.payload.user,
        token: action.payload.token
      };
    
    case AUTH_ACTIONS.UPDATE_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload.updates }
      };
    
    default:
      return state;
  }
}

// Initial Auth State
const initialAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    
    if (savedToken) {
      // Verify token and load user data from backend
      authAPI.getProfile()
        .then((data) => {
          if (data.success && data.user) {
            dispatch({
              type: AUTH_ACTIONS.LOAD_USER,
              payload: { user: data.user, token: savedToken }
            });
          }
        })
        .catch((error) => {
          console.error('Error loading user:', error);
          localStorage.removeItem('token');
        });
    }
  }, []);

  // Save token to localStorage whenever auth state changes
  useEffect(() => {
    if (authState.isAuthenticated && authState.token) {
      localStorage.setItem('token', authState.token);
    } else {
      localStorage.removeItem('token');
    }
  }, [authState.isAuthenticated, authState.token]);

  // Login Function - using real API
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const data = await authAPI.login({ email, password });
      
      if (data.success) {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user: data.user, token: data.token }
        });
        
        return { success: true, user: data.user };
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: { error: error.message }
      });
      return { success: false, error: error.message };
    }
  };

  // Register Function - using real API
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });
    
    try {
      const data = await authAPI.register(userData);
      
      if (data.success) {
        dispatch({
          type: AUTH_ACTIONS.REGISTER_SUCCESS,
          payload: { user: data.user, token: data.token }
        });
        
        return { success: true, user: data.user };
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: { error: error.message }
      });
      return { success: false, error: error.message };
    }
  };

  // Logout Function
  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Update Profile Function
  const updateProfile = async (updates) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({
        type: AUTH_ACTIONS.UPDATE_PROFILE,
        payload: { updates }
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Check if user is admin (for future admin features)
  const isAdmin = () => {
    return authState.user?.role === 'admin';
  };

  // Check if user has completed profile
  const hasCompleteProfile = () => {
    if (!authState.user) return false;
    
    const { name, phone, address } = authState.user;
    return name && phone && address?.street && address?.city && address?.pincode;
  };

  // Context Value
  const contextValue = {
    // State
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    error: authState.error,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    
    // Helpers
    isAdmin,
    hasCompleteProfile
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook to use Auth Context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Remove default export to fix HMR warning