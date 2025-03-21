"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { setToken, getToken, removeToken } from './tokenManager';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists on initial load
    const token = getToken();
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = (token) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}