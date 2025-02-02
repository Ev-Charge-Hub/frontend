"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export function LocationProvider({ children }) {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    setLocation({ lat: userLat, lng: userLng });
                },
                (error) => {
                    console.error("Error getting user location", error);
                    alert("Unable to retrieve your location.");
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("Geolocation is not supported on this device.");
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
