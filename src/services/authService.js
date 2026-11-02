import apiClient, { USE_MOCK_FALLBACK } from './api';
import { DEFAULT_USER } from '../data/demoUsers';

const AUTH_STORAGE_KEY = 'vericove_current_user';
const TOKEN_STORAGE_KEY = 'vericove_auth_token';

// In-memory or localStorage cache for demo mode
const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_USER;
  } catch {
    return DEFAULT_USER;
  }
};

const setStoredUser = (user) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Failed saving user to storage', err);
  }
};

export const authService = {
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/users/profile');
      return response.data || response;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        return getStoredUser();
      }
      throw err;
    }
  },

  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, user } = response.data || response;
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      setStoredUser(user);
      return user;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        // Mock successful login
        const mockUser = {
          ...getStoredUser(),
          email: email || 'maya.sharma@example.com'
        };
        localStorage.setItem(TOKEN_STORAGE_KEY, 'mock_jwt_token_demo_mode');
        setStoredUser(mockUser);
        return mockUser;
      }
      throw err;
    }
  },

  async signup(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      const { token, user } = response.data || response;
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      setStoredUser(user);
      return user;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const newUser = {
          ...DEFAULT_USER,
          ...userData,
          id: `usr_${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(TOKEN_STORAGE_KEY, 'mock_jwt_token_demo_mode');
        setStoredUser(newUser);
        return newUser;
      }
      throw err;
    }
  },

  async updateProfile(updates) {
    try {
      const response = await apiClient.put('/users/profile', updates);
      const updated = response.data || response;
      setStoredUser(updated);
      return updated;
    } catch (err) {
      if (USE_MOCK_FALLBACK) {
        const current = getStoredUser();
        const updated = { ...current, ...updates };
        setStoredUser(updated);
        return updated;
      }
      throw err;
    }
  },

  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // ignore
    } finally {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_STORAGE_KEY) || USE_MOCK_FALLBACK);
  }
};

export default authService;
