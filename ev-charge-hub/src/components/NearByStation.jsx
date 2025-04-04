import { useLocation } from '@/utils/UserLocationProvider';
import React from 'react';
import { useCallback } from 'react';

function NearByStations({ stationData, handleStationSelect, showStationDetail }) {
    const userLocation = useLocation();

    const haversine = useCallback((lat1, lon1, lat2, lon2) => {
        if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
            console.error('Invalid coordinates passed to haversine:', lat1, lon1, lat2, lon2);
            return Infinity;
        }

        const R = 6371;
        const phi1 = lat1 * (Math.PI / 180);
        const phi2 = lat2 * (Math.PI / 180);
        const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
        const deltaLambda = (lon2 - lon1) * (Math.PI / 180);

        const a = Math.sin(deltaPhi / 2) ** 2 +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }, []);

    const nearbyStations = userLocation?.lat && userLocation?.lng
        ? stationData
            .map(station => {
                const openHour = parseInt(station?.status?.open_hours?.split(":")[0], 10);
                const closeHour = parseInt(station?.status?.close_hours?.split(":")[0], 10);
                const isOpen24Hrs = openHour === 0 && (closeHour === 23 || closeHour === 0);
                return {
                    ...station,
                    isOpen24Hrs,
                    distance: haversine(userLocation.lat, userLocation.lng, station.latitude, station.longitude),
                };
            })
            .filter(station => station.distance !== Infinity)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 10)
        : [];
    console.log("Nearby stations:", nearbyStations);


    return (
<div className="absolute bg-white z-10 h-[25rem] w-full px-4 sm:w-4/12 sm:h-[35rem] sm:px-4 sm:py-2 sm:mt-1 rounded-lg bottom-0 sm:top-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0">            <div className='my-3'>
                <div className='font-semibold my-1 text-xl'>Nearby Stations</div>
                <div className='flex-1 border-t-2 border-custom-green'></div>
            </div>
            <div className='overflow-scroll sm:max-h-[28rem] max-h-[30rem]'>
                {nearbyStations.length > 0 ? (
                    nearbyStations.map((station, index) => (
                        <div key={index} className="flex items-center my-4">
                            <div className='mx-3 align-middle'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="38px" fill="#07775c">
                                    <path d="m340-200 100-160h-60v-120L280-320h60v120ZM240-560h240v-200H240v200Zm0 360h240v-280H240v280Zm-80 80v-640q0-33 23.5-56.5T240-840h240q33 0 56.5 23.5T560-760v280h50q29 0 49.5 20.5T680-410v185q0 17 14 31t31 14q18 0 31.5-14t13.5-31v-375h-10q-17 0-28.5-11.5T720-640v-80h20v-60h40v60h40v-60h40v60h20v80q0 17-11.5 28.5T840-600h-10v375q0 42-30.5 73.5T725-120q-43 0-74-31.5T620-225v-185q0-5-2.5-7.5T610-420h-50v300H160Zm320-80H240h240Z" />
                                </svg>
                            </div>
                            <div className='w-3/4 mx-1'>
                                <div className='flex'>
                                    <div className='font-bold'>{station?.name} ({station?.company})</div>
                                    <button
                                        className='text-custom-green hover:text-custom-green'
                                        onClick={() => {
                                            handleStationSelect(station?.id);
                                            showStationDetail(station);
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-icon lucide-arrow-right">
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className='flex justify-between'>
                                    <div className={`${station?.status?.is_open ? 'text-custom-green' : 'text-custom-red'}`}>
                                        {station?.status?.is_open ? 'Open' : 'Closed'}
                                        {station.isOpen24Hrs ? ' 24 hours' : ` ${station?.status?.open_hours} - ${station?.status?.close_hours}`}
                                    </div>
                                    <div className='text-gray-400'>{`${Number(station?.distance).toFixed(2)} km away`}</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No nearby stations found.</p>
                )}
            </div>
        </div>
    );
}

export default NearByStations;
