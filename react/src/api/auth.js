import instance from './axios';

export const register = (userData) => {
  return instance.post('/api/auth/register', userData);
};

export const login = (credentials) => {
  return instance.post('/api/auth/login', credentials);
};

export const getCurrentUser = () => {
  return instance.get('/api/auth/me');
};