"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode"; 
import { setToken, getToken, removeToken } from './tokenManager';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username || decodedToken.sub || null); // Adjust based on token structure
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Invalid token", error);
        removeToken();
        setIsAuthenticated(false);
        setUsername(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.username || decodedToken.sub || null); // Extract username
      console.log("Decoded token:", decodedToken.username);
      console.log(token)
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Invalid token", error);
    }
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
