"use client";

import React, {useCallback, useEffect, useRef, useState} from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useLocation } from '@/utils/UserLocationProvider';
import { useRouter } from 'next/navigation';

function GoogleMap({ onStationSelect, stationData, handleGoogleMapLoad, center }) {
    const mapRef = useRef(null);
    const location = useLocation();
    const [map, setMap] = useState(null);
    const [error, setError] = useState(null);
    const [stations, setStations] = useState([]);
    const router = useRouter();

    const handleStationClick = useCallback((id) => {
      console.log("Station clicked:", id);
      onStationSelect(id);
    }, [onStationSelect]);

    useEffect(() => {
        map?.setZoom(10)
        setStations(stationData);
        console.log(stationData)
    }, [stationData]);

    useEffect(() => {
        if (center) {
            map?.setCenter(center); 
            map?.setZoom(15);
        }
    }, [center]);

    useEffect(() => {
        const initMap = async () => {
            // Check if API key exists
            const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
            if (!apiKey) {
                setError('Google Maps API key is missing');
                console.log('Google Maps API key is not configured');
                return;
            }

            try {
                // Initialize loader with all required libraries
                const loader = new Loader({
                    apiKey: apiKey,
                    version: 'weekly',
                    libraries: ['places', 'geometry', 'drawing'],
                    region: 'TH',  // Set to Thailand
                    language: 'en' // Set to English
                });

                // Log when loader starts
                console.log('Starting Google Maps loader...');

                // Wait for the loader to load
                await loader.load();
                console.log('Google Maps script loaded successfully');
                handleGoogleMapLoad(true);

                // Import the maps library
                const { Map } = await loader.importLibrary('maps');
                console.log('Maps library imported successfully');

                const defaultPosition = { lat: 13.736717, lng: 100.523186 };

                if (!mapRef.current) {
                    setError('Map container reference is not available');
                    return;
                }

                // Create map instance
                const mapInstance = new Map(mapRef.current, {
                    center: defaultPosition,
                    zoom: 15,
                    mapTypeId: "roadmap",
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                });

                console.log('Map instance created successfully');
                setMap(mapInstance);
                setError(null); // Clear any previous errors

            } catch (error) {
                const errorMessage = error.message || 'Unknown error occurred';
                console.log('Detailed error initializing map:', {
                    message: errorMessage,
                    stack: error.stack,
                    type: error.name
                });
                setError(`Failed to load Google Maps: ${errorMessage}`);
            }
        };

        initMap();

        // Cleanup function
        return () => {
            if (map) {
                // Clean up map instance if needed
                setMap(null);
            }
        };
    }, []);

    // Add marker when location is updated
    useEffect(() => {
        if (map && location) {
            try {
                const marker = new google.maps.Marker({
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
                console.log('Marker added and map centered successfully');

                // Cleanup function for marker
                return () => {
                    marker.setMap(null);
                };
            } catch (error) {
                console.log('Error adding marker:', error);
                setError('Failed to add location marker to map');
            }
        }
    }, [location, map]);

    useEffect(() => {
        if (map && stations?.length > 0) {
            const markers = stations.map(station => {

                // Check if any connector is available
                const currentTime = new Date();
                const hasAvailableConnector = station?.connectors?.some(connector => {
                    if (!connector.booking) return true; 
                    return new Date(connector.booking.booking_end_time) <= currentTime; 
                });

                // Determine marker color based on conditions
                let markerColor = "#717171"; // Default grey for closed
                let svgContent = "";

                if (station?.status?.is_open) {
                    if (hasAvailableConnector) {
                        // Station is open and has available connectors - use green marker with lightning
                        markerColor = "#00AB82";
                        svgContent = `
                            <svg width="53" height="73" viewBox="0 0 53 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="26.7494" cy="23.8901" rx="25.4444" ry="23.8901" fill="${markerColor}"/>
                                <path d="M26.4547 72.9637L3.60105 34.2682L49.4224 34.331L26.4547 72.9637Z" fill="${markerColor}"/>
                                <ellipse cx="26.0968" cy="23.8901" rx="19.5726" ry="18.8606" fill="white"/>
                                <ellipse cx="26.0968" cy="23.8901" rx="19.5726" ry="18.8606" fill="white"/>
                                <path d="M23.9683 29.9357L31.565 21.8473H25.6932L26.7574 14.4439L19.9682 23.1519H25.0693L23.9683 29.9357ZM20.2251 34.893L21.693 25.761H14.3533L27.5648 8.80164H30.5007L29.0327 19.2382H37.8404L23.161 34.893H20.2251Z" fill="${markerColor}"/>
                            </svg>
                        `;
                    } else {
                        // Station is open but no available connectors - use grey marker without lightning
                        markerColor = "#AEAEB2";
                        svgContent = `
                            <svg width="41" height="59" viewBox="0 0 41 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="20.5" cy="19" rx="19.5" ry="19" fill="#AEAEB2"/>
                            <path d="M20.2745 58.0288L2.76001 27.2538L37.8764 27.3038L20.2745 58.0288Z" fill="#AEAEB2"/>
                            <circle cx="20" cy="19" r="15" fill="white"/>
                            <circle cx="20" cy="19" r="15" fill="white"/>
                            <path d="M28.1428 17.1591V20.9091H12.87V17.1591H28.1428Z" fill="#AEAEB2"/>
                            <ellipse cx="20.5" cy="19" rx="19.5" ry="19" fill="#FF6B6B"/>
                            <path d="M20.2745 58.0288L2.76001 27.2538L37.8764 27.3038L20.2745 58.0288Z" fill="#FF6B6B"/>
                            <circle cx="20" cy="19" r="15" fill="white"/>
                            <circle cx="20" cy="19" r="15" fill="white"/>
                            <path d="M28.1428 17.1591V20.9091H12.87V17.1591H28.1428Z" fill="#FF6B6B"/>
                            </svg>

                        `;
                    }
                } else {
                    // Station is closed - use grey marker with lightning
                    svgContent = `
                        <svg width="41" height="59" viewBox="0 0 41 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="20.5" cy="19" rx="19.5" ry="19" fill="#717171"/>
                        <path d="M20.2745 58.0288L2.76001 27.2538L37.8764 27.3038L20.2745 58.0288Z" fill="#717171"/>
                        <circle cx="20" cy="19" r="15" fill="white"/>
                        <circle cx="20" cy="19" r="15" fill="white"/>
                        <path d="M20 30.6667C18.3861 30.6667 16.8694 30.3605 15.45 29.748C14.0305 29.1355 12.7958 28.3042 11.7458 27.2542C10.6958 26.2042 9.86456 24.9695 9.25206 23.55C8.63956 22.1306 8.33331 20.6139 8.33331 19C8.33331 17.3862 8.63956 15.8695 9.25206 14.45C9.86456 13.0306 10.6958 11.7959 11.7458 10.7459C12.7958 9.69587 14.0305 8.86462 15.45 8.25212C16.8694 7.63962 18.3861 7.33337 20 7.33337C21.6139 7.33337 23.1305 7.63962 24.55 8.25212C25.9694 8.86462 27.2041 9.69587 28.2541 10.7459C29.3041 11.7959 30.1354 13.0306 30.7479 14.45C31.3604 15.8695 31.6666 17.3862 31.6666 19C31.6666 20.6139 31.3604 22.1306 30.7479 23.55C30.1354 24.9695 29.3041 26.2042 28.2541 27.2542C27.2041 28.3042 25.9694 29.1355 24.55 29.748C23.1305 30.3605 21.6139 30.6667 20 30.6667ZM20 28.3334C21.05 28.3334 22.0611 28.1632 23.0333 27.823C24.0055 27.4827 24.9 26.9917 25.7166 26.35L12.65 13.2834C12.0083 14.1 11.5173 14.9945 11.1771 15.9667C10.8368 16.9389 10.6666 17.95 10.6666 19C10.6666 21.6056 11.5708 23.8125 13.3791 25.6209C15.1875 27.4292 17.3944 28.3334 20 28.3334ZM27.35 24.7167C27.9916 23.9 28.4826 23.0056 28.8229 22.0334C29.1632 21.0612 29.3333 20.05 29.3333 19C29.3333 16.3945 28.4291 14.1875 26.6208 12.3792C24.8125 10.5709 22.6055 9.66671 20 9.66671C18.95 9.66671 17.9389 9.83685 16.9666 10.1771C15.9944 10.5174 15.1 11.0084 14.2833 11.65L27.35 24.7167Z" fill="#717171"/>
                        </svg>
                    `;
                }

                const svgMarker = {
                    url: 'data:image/svg+xml,' + encodeURIComponent(svgContent),
                    scaledSize: new google.maps.Size(32, 44),
                    anchor: new google.maps.Point(16, 44),
                };

                const marker = new google.maps.Marker({
                    position: {
                        lat: parseFloat(station.latitude),
                        lng: parseFloat(station.longitude)
                    },
                    map: map,
                    icon: svgMarker,
                    title: station.name,
                    cursor: 'pointer'
                });

                marker.addListener('click', () => {
                    handleStationClick(station.id)
                    // Center the map on the selected station
                    map.setCenter(marker.getPosition());
                    map.setZoom(15);
                });

                return marker;
            });

            return () => {
                markers.forEach(marker => marker.setMap(null));
            };
        }
    }, [map, stations, router]);

    // Show error message if there's an error
    if (error) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-100">
                <div className="text-red-500 text-center p-4">
                    <p className="font-bold">Error loading map</p>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return <div ref={mapRef} className="h-screen w-full"></div>;
}

export default GoogleMap;