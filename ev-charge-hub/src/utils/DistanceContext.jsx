"use client";
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const DistanceContext = createContext();

export const DistanceProvider = ({ children }) => {
  const [distance, setDistance] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    const checkGoogleMap = setInterval(() => {
      if (typeof google !== "undefined" && google.maps) {
        setGoogleLoaded(true);
      }
    }, 500);
    return () => clearInterval(checkGoogleMap);
  }, []);

  const calculateDistance = useCallback((origin, destination) => {
    if (!googleLoaded) {
      console.error("Google Maps API is not fully loaded.");
      return;
    }

    if (google && google.maps) {
      try {
        const distanceService = new google.maps.DistanceMatrixService();

        const request = {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        };

        distanceService.getDistanceMatrix(request, (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK) {
            const distanceText = response.rows[0].elements[0].distance.text;
            setDistance(distanceText);
          } else {
            console.error("Error with distance matrix service:", status);
          }
        });
      } catch (error) {
        console.error("Error calling google.maps.DistanceMatrixService:", error);
      }
    } else {
      console.error("Google Maps API not available");
    }
  }, [googleLoaded]); // Remove 'origin' from the dependency array

  return (
    <DistanceContext.Provider value={{ distance, calculateDistance }}>
      {children}
    </DistanceContext.Provider>
  );
};

export const useDistance = () => {
  const context = useContext(DistanceContext);
  if (!context) {
    throw new Error('useDistance must be used within a DistanceProvider');
  }
  return context;
};