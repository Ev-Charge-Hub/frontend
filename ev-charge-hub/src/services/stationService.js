import { get, post, put, del } from '@/utils/apiClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Create a service object with all functions
export const stationService = {
  async getStations() {
    try {
      if (!API_BASE_URL) {
        throw new Error('API_BASE_URL is not set');
      }
      return await get('/stations'); 
    } catch (error) {
      console.error('Error fetching stations:', error);
      throw error; 
    }
  },

  async getStationById(stationId) {
    try {
      if (!API_BASE_URL) {
        throw new Error('API_BASE_URL is not set');
      }
      return await get(`/stations/${stationId}`); 
    } catch (error) {
      console.error('Error fetching station by ID:', error);
      throw error; 
    }
  },

  async filterStations({ company, type, plug_name, status, search }) {
    try {
      const queryParams = new URLSearchParams();

      // Add query parameters conditionally if they exist
      if (company) queryParams.append('company', company);
      if (type) queryParams.append('type', type);
      if (plug_name) queryParams.append('plug_name', plug_name);
      if (status) queryParams.append('status', status);
      if (search) queryParams.append('search', search);

      const queryString = queryParams.toString();
      return await get(`/stations/filter?${queryString}`); 
    } catch (error) {
      console.error('Error fetching filtered stations:', error);
      throw error; 
    }
  },

  addStation: async (newStation) => {
    try {
      const response = await post('/stations', newStation); 
      return {
        success: true,
        station: response,
      };
    } catch (error) {
      console.error('Error adding station:', error);
      return {
        success: false,
        message: 'Error adding station',
      };
    }
  },

  updateStation: async (stationId, updatedData) => {
    try {
      const response = await put(`/stations/${stationId}`, updatedData); 
      return {
        success: true,
        station: response,
      };
    } catch (error) {
      console.error('Error updating station:', error);
      return {
        success: false,
        message: 'Error updating station',
      };
    }
  },

  deleteStation: async (stationId) => {
    try {
      await del(`/stations/${stationId}`); 
      return {
        success: true,
      };
    } catch (error) {
      console.error('Error deleting station:', error);
      return {
        success: false,
        message: 'Error deleting station',
      };
    }
  },

  bookingStation: async (connector_id, username, booking_end_time) => {
    try {
      const body = {};

      // Add body parameters conditionally if they exist
      if (connector_id) body.connector_id = connector_id;
      if (username) body.username = username;
      if (booking_end_time) body.booking_end_time = booking_end_time;

      const response = await put('/stations/set-booking', body); 
      return response;
    } catch (error) {
      console.error('Error booking station:', error);
      return null; 
    }
  },

  async getBookingByUsername(username) {
    try {
      if (!API_BASE_URL) {
        throw new Error('API_BASE_URL is not set');
      }
      return await get(`/stations/username/${username}`); 
    } catch (error) {
      console.error('Error fetching stations:', error);
      throw error; 
    }
  },
};
