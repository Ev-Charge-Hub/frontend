// src/utils/apiClient.js with enhanced debugging
import { getToken } from '@/utils/tokenManager';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

console.log("API Client initialized with base URL:", API_BASE_URL);

// Helper function to handle API responses
const handleResponse = async (response) => {
  console.log(`Response received: ${response.status} ${response.statusText} for ${response.url}`);

  if (!response.ok) {
    // Try to get error message from response body
    try {
      const errorData = await response.json();
      // console.error("API error respzonse body:", errorData);
      throw new Error(errorData.message || `API error: ${response.status}`);
    } catch (error) {
      // If JSON parsing fails or some other error occurs
      console.error("Error parsing error response:", error);
      if (error.message && error.message.includes('API error')) {
        throw error; // Re-throw the already created error
      } else {
        // For any other error (like JSON parse errors), throw with status code
        throw new Error(`API error: ${response.status}`);
      }
    }
  }

  try {
    const jsonResponse = await response.json();
    console.log("Successful response parsed as JSON");
    return jsonResponse;
  } catch (error) {
    // Handle case where response isn't JSON
    console.warn("Response is not JSON:", error);
    return { success: true, message: "Operation completed successfully" };
  }
};

// API client with methods for different HTTP requests
export const apiClient = {
  // GET request
  get: async (endpoint) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`Making GET request to: ${url}`);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Network error for GET ${url}:`, error);
      throw error;
    }
  },

  // POST request
  post: async (endpoint, data) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`Making POST request to: ${url}`);
    console.log("Request payload:", data);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Network error for POST ${url}:`, error);
      throw error;
    }
  },
  // PUT request
  put: async (endpoint, data) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`Making PUT request to: ${url}`);
    console.log("PUT payload:", data);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Network error for PUT ${url}:`, error);
      throw error;
    }
  },
  // DELETE request
  delete: async (endpoint) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`Making DELETE request to: ${url}`);

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Network error for DELETE ${url}:`, error);
      throw error;
    }
  },
};

// Export individual methods if needed
export const { get, post, put, delete: del, upload } = apiClient;