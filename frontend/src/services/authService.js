import api from './api';

export const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data;
};

export const getProfile = async (token) => {
  const response = await api.get('/api/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
