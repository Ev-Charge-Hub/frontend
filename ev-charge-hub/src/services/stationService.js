// GET all stations
// Path: GET /stations (this is correct)
export const getAllStations = async () => {
  try {
    return await apiClient.get('/stations');
  } catch (error) {
    console.error("Error fetching stations:", error);
    throw error;
  }
};

// GET station by ID
// Path: GET /stations/:id (this is correct)
export const getStationById = async (stationId) => {
  try {
    return await apiClient.get(`/stations/${stationId}`);
  } catch (error) {
    console.error("Error fetching station details:", error);
    throw error;
  }
};

// Filter stations
// Path: GET /stations/filter (this is correct)
export const filterStations = async (params) => {
  const queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');

  try {
    return await apiClient.get(`/stations/filter?${queryString}`);
  } catch (error) {
    console.error("Error filtering stations:", error);
    throw error;
  }
};

// Add new station
// Path: POST /stations
export const addStation = async (stationData) => {
  // Validation code...
  try {
    const formattedData = formatStationForSubmission(stationData);
    return await apiClient.post('/stations', formattedData);
  } catch (error) {
    console.error("Error adding station:", error);
    throw error;
  }
};

// Update existing station
// Path: PUT /stations/:id
export const updateStation = async (stationId, stationData) => {
  // Validation code...
  try {
    const formattedData = formatStationForSubmission(stationData);
    return await apiClient.put(`/stations/${stationId}`, formattedData);
  } catch (error) {
    console.error("Error updating station:", error);
    throw error;
  }
};

// Delete a station
// Path: DELETE /stations/:id
export const deleteStation = async (stationId) => {
  try {
    return await apiClient.delete(`/stations/${stationId}`);
  } catch (error) {
    console.error("Error deleting station:", error);
    throw error;
  }
};