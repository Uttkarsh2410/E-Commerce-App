import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // You could fetch user details here if needed
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password
      });
      
      const { token: newToken, username: userUsername, authorities } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser({
        username: userUsername,
        authorities: authorities
      });
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      await axios.post('/api/auth/register', userData);
      toast.success('Registration successful! Please login.');
      return true;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully!');
  };

  const isAdmin = () => {
    return user && user.authorities && 
           user.authorities.some(auth => auth.authority === 'ROLE_ADMIN');
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

