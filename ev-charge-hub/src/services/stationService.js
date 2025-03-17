import { mockStations } from '@/utils/mockStations';

// Create a service object with all functions
export const stationService = {
  getAllStations: async () => {
    // Return mock data directly without API call
    return mockStations;
  },

  getStationById: async (stationId) => {
    // Find station in mock data
    const station = mockStations.find(s => s.id === stationId || s.station_id === stationId);
    if (!station) {
      throw new Error('Station not found');
    }
    return station;
  },

  filterStations: async (params) => {
    // Filter mock stations based on params
    return mockStations.filter(station => {
      // Implement filtering logic here if needed
      return true;
    });
  }
};

// this can be use after all api was done
/*

import { apiClient } from '@/services/apiService';
import { mockStations } from '@/utils/mockStations';

// Create a service object with all functions
export const stationService = {
  getAllStations: async () => {
    try {
      // Try to fetch from API if available
      return await apiClient.get('/stations');
    } catch (error) {
      console.log("Using mock station data");
      // Return mock data if API fails
      return mockStations;
    }
  },

  getStationById: async (stationId) => {
    try {
      return await apiClient.get(`/stations/${stationId}`);
    } catch (error) {
      console.error("Error fetching station details:", error);
      throw error;
    }
  },

  filterStations: async (params) => {
    const queryString = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');

    try {
      return await apiClient.get(`/stations/filter?${queryString}`);
    } catch (error) {
      console.error("Error filtering stations:", error);
      throw error;
    }
  },

  addStation: async (stationData) => {
    try {
      return await apiClient.post('/stations', stationData);
    } catch (error) {
      console.error("Error adding station:", error);
      throw error;
    }
  },

  updateStation: async (stationId, stationData) => {
    try {
      return await apiClient.put(`/stations/${stationId}`, stationData);
    } catch (error) {
      console.error("Error updating station:", error);
      throw error;
    }
  },

  deleteStation: async (stationId) => {
    try {
      return await apiClient.delete(`/stations/${stationId}`);
    } catch (error) {
      console.error("Error deleting station:", error);
      throw error;
    }
  }
};

// You can also export individual functions if needed
export const { getAllStations, getStationById, filterStations, addStation, updateStation, deleteStation } = stationService;*/
