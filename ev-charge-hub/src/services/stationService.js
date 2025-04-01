import { mockStations } from '@/utils/mockStations';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Create a service object with all functions
export const stationService = {
  async getStations() {
    try {
      if (!API_BASE_URL) {
        return mockStations;
      }
      const response = await fetch(`${API_BASE_URL}/stations`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching stations:', error);
      return mockStations;
    }
  },

  async getStationById(stationId) {
    try {
      if (!API_BASE_URL) {
        return mockStations.at(0);
      }
      const response = await fetch(`${API_BASE_URL}/stations/${stationId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching stations:', error);
      return mockStations.at(0);
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stations/filter?${queryString}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching filtered stations:', error);
      return mockStations; // You can return mock data as a fallback
    }
  },

  addStation: async (newStation) => {
    const response = await post('/stations', newStation);
    return {
      success: true,
      station: response,
    };
  },

  updateStation: async (stationId, updatedData) => {
    const response = await put(`/stations/${stationId}`, updatedData);
    return {
      success: true,
      station: response,
    };
  },

  deleteStation: async (stationId) => {
    await del(`/stations/${stationId}`);
    return {
      success: true
    };
  },
}

  bookingStation: async (connectorId, username, booking_end_time) => {
    try {
      const body = {};

      // Add body parameters conditionally if they exist
      if (connectorId) body.connectorId = connectorId;
      if (username) body.username = username;
      if (booking_end_time) body.booking_end_time = booking_end_time;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stations/set-booking`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Error booking station:', error);
      return null; 
    }
  }
};

// You can also export individual functions if needed
// export const {
//   getAllStations,
//   getStationById,
//   filterStations,
//   addStation,
//   updateStation,
//   deleteStation,
//   exportStations
// } = stationService;