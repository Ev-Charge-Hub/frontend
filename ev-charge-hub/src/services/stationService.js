import { get, post, put, del } from '@/utils/apiClient';


// Create a service object with all functions
export const stationService = {
  getAllStations: async () => {
    const stations = await get('/stations');
    const normalized = stations.map(station => ({
      ...station,
      id: station.id
    }));
    return normalized;
  },

  getStationById: async (stationId) => {
    return await get(`/stations/${stationId}`);
  },

  filterStations: async (params) => {
    // This assumes your backend accepts query parameters for filtering
    const queryString = new URLSearchParams(params).toString();
    return await get(`/stations?${queryString}`);
  },

  // New functions for station management

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

  // Additional utility methods

//   exportStations: () => {
//     // Generate the JavaScript code for mockStations.js
//     const jsCode = `export const mockStations = ${JSON.stringify(mockStations, null, 2)};`;
//     return jsCode;
//   }
// };

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