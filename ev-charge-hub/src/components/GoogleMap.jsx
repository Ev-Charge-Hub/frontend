"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useLocation } from '@/utils/UserLocationProvider';

function GoogleMap() {
    const mapRef = useRef(null);
    const location = useLocation();
    const [map, setMap] = useState(null);

    useEffect(() => {

        const initMap = async () => {
            try {
                const loader = new Loader({
                    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
                    version: 'weekly',
                });

                const { Map } = await loader.importLibrary('maps');
                const defaultPosition = { lat: 13.736717, lng: 100.523186 };

                const mapInstance = new Map(mapRef.current, {
                    center: defaultPosition,
                    zoom: 15,
                    mapTypeId: "roadmap",
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                });

                setMap(mapInstance);
            } catch (error) {
                console.error('Error loading Google Maps', error);
            }
        };

        initMap();
    }, []);

    // Add marker when location is updated
    useEffect(() => {
        if (map && location) {
            new google.maps.Marker({
                position: location,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: "#4285F4",
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "white",
                },
            });

            map.setCenter(location);
        }
    }, [location, map]);

    return <div ref={mapRef} className="h-screen w-full"></div>;
}

export default GoogleMap;
