// src/__mocks__/authContext.js
export const useAuth = jest.fn().mockReturnValue({
  isAuthenticated: true,
  username: 'testuser',
  login: jest.fn(),
  logout: jest.fn()
});