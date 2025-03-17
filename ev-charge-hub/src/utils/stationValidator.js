// Basic station data structure
export const createEmptyStation = () => {
  return {
    name: "",
    latitude: "",
    longitude: "",
    company: "",
    status: {
      open_hours: "00:00",
      close_hours: "23:59",
      is_open: true
    },
    connectors: []
  };
};

// Create an empty connector object
export const createEmptyConnector = () => {
  return {
    type: "",
    plug_name: "",
    price_per_unit: "",
    power_output: "",
    is_available: true
  };
};

// Validate station data
export const validateStation = (station) => {
  const errors = {};

  // Basic validation
  if (!station.name || station.name.trim() === '') {
    errors.name = "Station name is required";
  }

  // Validate coordinates
  if (!station.latitude || isNaN(parseFloat(station.latitude))) {
    errors.latitude = "Valid latitude is required";
  } else if (parseFloat(station.latitude) < -90 || parseFloat(station.latitude) > 90) {
    errors.latitude = "Latitude must be between -90 and 90";
  }

  if (!station.longitude || isNaN(parseFloat(station.longitude))) {
    errors.longitude = "Valid longitude is required";
  } else if (parseFloat(station.longitude) < -180 || parseFloat(station.longitude) > 180) {
    errors.longitude = "Longitude must be between -180 and 180";
  }

  // Validate company name
  if (!station.company || station.company.trim() === '') {
    errors.company = "Company name is required";
  }

  // Validate time format (if we have status)
  if (station.status) {
    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

    if (!station.status.open_hours || !timeRegex.test(station.status.open_hours)) {
      errors.openHours = "Valid open hours required (format: HH:MM)";
    }

    if (!station.status.close_hours || !timeRegex.test(station.status.close_hours)) {
      errors.closeHours = "Valid close hours required (format: HH:MM)";
    }
  }

  // Validate connectors
  if (!station.connectors || station.connectors.length === 0) {
    errors.connectors = "At least one connector is required";
  } else {
    // Validate each connector
    const connectorErrors = station.connectors.map((connector, index) => {
      const connErr = {};

      if (!connector.type || connector.type.trim() === '') {
        connErr.type = "Connector type is required";
      }

      if (!connector.plug_name || connector.plug_name.trim() === '') {
        connErr.plug_name = "Plug name is required";
      }

      if (!connector.price_per_unit || isNaN(parseFloat(connector.price_per_unit))) {
        connErr.price_per_unit = "Valid price per unit is required";
      } else if (parseFloat(connector.price_per_unit) < 0) {
        connErr.price_per_unit = "Price cannot be negative";
      }

      if (!connector.power_output || isNaN(parseFloat(connector.power_output))) {
        connErr.power_output = "Valid power output is required";
      } else if (parseFloat(connector.power_output) <= 0) {
        connErr.power_output = "Power output must be greater than 0";
      }

      return Object.keys(connErr).length > 0 ? connErr : null;
    });

    // Filter out null errors and add to main errors if any exist
    const validConnectorErrors = connectorErrors.filter(err => err !== null);
    if (validConnectorErrors.length > 0) {
      errors.connectorDetails = validConnectorErrors;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Format station data before sending to backend
export const formatStationForSubmission = (station) => {
  return {
    ...station,
    latitude: parseFloat(station.latitude),
    longitude: parseFloat(station.longitude),
    connectors: station.connectors.map(conn => ({
      ...conn,
      price_per_unit: parseFloat(conn.price_per_unit),
      power_output: parseFloat(conn.power_output)
    }))
  };
};