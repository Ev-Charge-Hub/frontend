"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export function LocationProvider({ children }) {
    const [location, setLocation] = useState({ lat: 13.736717, lng: 100.523186 }); // Default to Bangkok

    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            if ("geolocation" in navigator) {
                const success = (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    setLocation({ lat: userLat, lng: userLng });
                };

                const error = () => {
                    // Just use default location, don't log error
                    console.log("Using default location");
                };

                navigator.geolocation.getCurrentPosition(success, error, {
                    enableHighAccuracy: true,
                    timeout: 5000
                });
            }
        } catch (e) {
            // Silently fall back to default location
        }
    }, []);

    return (
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    return useContext(LocationContext);
}