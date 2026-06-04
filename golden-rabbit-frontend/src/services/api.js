// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  
  return data;
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  getProfile: async () => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};

// Products API
export const productsAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams 
      ? `${API_BASE_URL}/products?${queryParams}`
      : `${API_BASE_URL}/products`;
    
    const response = await fetch(url);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse(response);
  },

  getByCategory: async (categoryId) => {
    const response = await fetch(`${API_BASE_URL}/products?category_id=${categoryId}`);
    return handleResponse(response);
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    return handleResponse(response);
  },
};

// Cart API
export const cartAPI = {
  getItems: async () => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  addItem: async (productId, quantity = 1) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    return handleResponse(response);
  },

  updateItem: async (itemId, quantity) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });
    return handleResponse(response);
  },

  removeItem: async (itemId) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  clearCart: async () => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};

export default {
  authAPI,
  productsAPI,
  categoriesAPI,
  cartAPI,
};