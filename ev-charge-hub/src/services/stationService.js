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
  },

  // New functions for station management

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

  // Additional utility methods

  exportStations: () => {
    // Generate the JavaScript code for mockStations.js
    const jsCode = `export const mockStations = ${JSON.stringify(mockStations, null, 2)};`;
    return jsCode;
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