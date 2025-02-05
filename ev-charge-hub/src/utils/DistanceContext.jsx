"use client";
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useLocation } from './UserLocationProvider';

const DistanceContext = createContext();

export const DistanceProvider = ({ children }) => {
  const [distance, setDistance] = useState(null);
  const userLocation = useLocation();
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    if (typeof google !== "undefined" && google.maps) {
      setGoogleLoaded(true);
    } else {
      console.error("Google Maps API is not loaded.");
    }
  }, []);

  const calculateDistance = useCallback((destination) => {
    if (!userLocation) {
      console.error("User location is not available.");
      return;
    }

    if (!googleLoaded) {
      console.error("Google Maps API is not fully loaded.");
      return;
    }

    if (google && google.maps) {
      try {
        const distanceService = new google.maps.DistanceMatrixService();

        const request = {
          origins: [userLocation],
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
  }, [userLocation, googleLoaded]);

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
