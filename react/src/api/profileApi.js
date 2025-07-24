import instance from './axios';

export const getUserProfile = (userId) => {
  return instance.get(`/api/users/${userId}`);
};

export const updateUserProfile = (userId, userData) => {
  return instance.put(`/api/users/${userId}`, userData);
};

export const getCurrentUser = () => {
  return instance.get('/api/auth/me');
};