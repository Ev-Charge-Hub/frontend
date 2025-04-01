import { useDistance } from '@/utils/DistanceContext';
import { useLocation } from '@/utils/UserLocationProvider';
import React from 'react';
import Station from './Station';

function NearByStations({ stationData, isLoaded }) {
    const { calculateDistance } = useDistance();
    const userLocation = useLocation();

    // Ensure calculations only happen when data is loaded
    const nearbyStationData = isLoaded
        ? stationData
            .map((station) => {
                const lat = parseFloat(station?.latitude);
                const lng = parseFloat(station?.longitude);
                
                if (!isNaN(lat) && !isNaN(lng)) { // Ensure valid coordinates
                    return {
                        ...station,
                        distance: calculateDistance(userLocation, { lat, lng }),
                    };
                }
                return null; // Filter out invalid stations
            })
            .filter(station => station !== null) // Remove invalid stations
            .sort((a, b) => a.distance - b.distance) // Sort nearest first
            .slice(0, 10) // Select top 10
        : [];

    return (
        <div className="absolute bg-white z-10 w-96 px-4 py-1 rounded-lg top-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0">
            <div className='my-3'>
                <div className='font-semibold my-1'>Near By Stations</div>
                <div className='flex-1 border-t-2 border-custom-green'></div>
            </div>
            <div className='overflow-scroll max-h-[28rem]'>
                {nearbyStationData.length > 0 ? (
                    nearbyStationData.map((station) => (
                        <Station key={station.station_id} station={station} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No nearby stations found.</p>
                )}
            </div>
        </div>
    );
}

export default NearByStations;
