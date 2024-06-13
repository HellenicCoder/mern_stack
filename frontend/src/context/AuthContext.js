import React, { createContext, useState } from 'react';
import { register, login, getProfile } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const registerUser = async (userData) => {
    try {
      const data = await register(userData);
      console.log('Registration successful:', data);
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  const loginUser = async (credentials) => {
    try {
      const data = await login(credentials);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      const profile = await getProfile(data.token);
      setUser(profile.user);
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
