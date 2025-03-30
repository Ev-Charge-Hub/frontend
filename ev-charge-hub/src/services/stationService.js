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
    // In a real application, this would call an API endpoint
    // For now, we'll simulate adding it to the mockStations array

    // Generate a new station ID if one doesn't exist
    if (!newStation.station_id) {
      const idPattern = /ST(\d+)/;
      let maxId = 0;

      mockStations.forEach(station => {
        if (station.station_id) {
          const match = station.station_id.match(idPattern);
          if (match && match[1]) {
            const idNum = parseInt(match[1], 10);
            if (idNum > maxId) {
              maxId = idNum;
            }
          }
        }
      });

      // Increment and format with leading zeros (e.g., ST019)
      const newId = maxId + 1;
      newStation.station_id = `ST${newId.toString().padStart(3, '0')}`;
    }

    // Simulate adding to the array (this doesn't actually modify mockStations.js)
    const updatedStations = [...mockStations, newStation];

    console.log("New station added:", newStation);
    console.log("To update the file, you would need to implement an API endpoint that writes to the mockStations.js file");

    return {
      success: true,
      station: newStation,
      updatedStations
    };
  },

  updateStation: async (stationId, updatedData) => {
    // Find the station index
    const stationIndex = mockStations.findIndex(s => s.id === stationId || s.station_id === stationId);
    if (stationIndex === -1) {
      throw new Error('Station not found');
    }

    // Create updated station by merging existing data with updates
    const updatedStation = {
      ...mockStations[stationIndex],
      ...updatedData
    };

    // Simulate updating the array (this doesn't actually modify mockStations.js)
    const updatedStations = [...mockStations];
    updatedStations[stationIndex] = updatedStation;

    console.log("Station updated:", updatedStation);

    return {
      success: true,
      station: updatedStation,
      updatedStations
    };
  },

  deleteStation: async (stationId) => {
    // Check if station exists
    const stationIndex = mockStations.findIndex(s => s.id === stationId || s.station_id === stationId);
    if (stationIndex === -1) {
      throw new Error('Station not found');
    }

    // Simulate deleting from the array
    const updatedStations = mockStations.filter(s => s.id !== stationId && s.station_id !== stationId);

    console.log("Station deleted:", stationId);

    return {
      success: true,
      updatedStations
    };
  },

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
export const {
  getAllStations,
  getStationById,
  filterStations,
  addStation,
  updateStation,
  deleteStation,
  exportStations
} = stationService;