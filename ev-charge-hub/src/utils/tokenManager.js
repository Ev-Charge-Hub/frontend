// Store token in localStorage for persistence
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

// Get token from localStorage
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Remove token from localStorage (for logout)
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

// Check if user is logged in
export const isLoggedIn = () => {
  return getToken() !== null;
};