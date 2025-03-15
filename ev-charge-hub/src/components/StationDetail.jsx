"use client"
import React, { useEffect } from 'react'
import { useDistance } from '@/utils/DistanceContext';
import ConnectorDetail from '@/components/ConnectorDetail';
import { useState } from 'react';
import { stationService } from '@/services/stationService';
import { useLocation } from '@/utils/UserLocationProvider';

function StationDetail({ stationID }) {
    console.log(stationID)
    const [station, setStation] = useState(null);
    const { distance, calculateDistance } = useDistance();
    const [isOpen24Hrs, setIsOpen24Hrs] = useState(false);
    const [connectorId, setConnectorType] = useState('');
    const userLocation = useLocation();

    useEffect(() => {
        const fetchStationDetail = async () => {
            try {
                const data = await stationService.getStationById(stationID);
                const openHour = parseInt(data?.status?.open_hours.split(":")[0], 10);
                const closeHour = parseInt(data?.status?.close_hours.split(":")[0], 10);
                setIsOpen24Hrs(openHour === 0 && (closeHour === 23 || closeHour === 0));

                if (data?.latitude && data?.longitude) {
                    const lat = parseFloat(data?.latitude);
                    const lng = parseFloat(data?.longitude);
                    if (!isNaN(lat) && !isNaN(lng)) {
                        console.log(userLocation, lat, lng);

                        calculateDistance(userLocation, { lat, lng });
                    } else {
                        console.error("Invalid latitude or longitude:", data.status);
                    }
                } else {
                    console.error("Latitude or longitude is missing:", data);
                }
                setStation(data);
                setConnectorType(data?.connectors.at(0).connector_id)
            } catch (error) {
                setError('Failed to fetch stations');
            }
        };
        fetchStationDetail();
    }, []);

    const [currentBattery, setCurrentBattery] = useState(0);
    const [targetBattery, setTargetBattery] = useState(100);
    const [estimatedCost, setEstimatedCost] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState(0);

    const calculateTime = (percentDiff, batteryCapacity) => {
        const energyNeeded = (percentDiff * batteryCapacity) / 100;
        const connector = station?.connectors.find((connector) => connector.connector_id === connectorId)

        if (connector?.power_output > 0) {
            return (energyNeeded / connector.power_output) * 60;
        }

        return 0;
    };

    useEffect(() => {
        const percentDiff = targetBattery - currentBattery;
        const connector = station?.connectors.find((connector) => connector.connector_id === connectorId)
        setEstimatedCost(percentDiff * connector?.price_per_unit);
        const batteryCapacity = 60;
        setEstimatedTime(calculateTime(percentDiff, batteryCapacity))

    }, [connectorId, currentBattery, targetBattery])

    return (
        <div className="absolute bg-white z-10 w-96 px-4 py-1 rounded-lg top-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0">
            <div className='flex justify-center py-2 pt-5 relative'>
                <button className='absolute top-1 right-[-0.5rem]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
                <div className='mx-3 align-middle'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="38px" fill="#07775c"><path d="m340-200 100-160h-60v-120L280-320h60v120ZM240-560h240v-200H240v200Zm0 360h240v-280H240v280Zm-80 80v-640q0-33 23.5-56.5T240-840h240q33 0 56.5 23.5T560-760v280h50q29 0 49.5 20.5T680-410v185q0 17 14 31t31 14q18 0 31.5-14t13.5-31v-375h-10q-17 0-28.5-11.5T720-640v-80h20v-60h40v60h40v-60h40v60h20v80q0 17-11.5 28.5T840-600h-10v375q0 42-30.5 73.5T725-120q-43 0-74-31.5T620-225v-185q0-5-2.5-7.5T610-420h-50v300H160Zm320-80H240h240Z" /></svg>
                </div>
                <div className='w-3/4 mx-1'>
                    <div className='font-bold'>{station?.name} ({station?.company})</div>
                    <div className='flex justify-between'>
                        <div className={`${station?.status.is_open ? 'text-custom-green' : 'text-custom-red'}`}>
                            {station?.status.is_open ? 'Open' : 'Closed'}
                            {isOpen24Hrs ? ' 24 hours' : ` ${station?.status.open_hours} - ${station?.status.close_hours}`}
                        </div>
                        <div className='text-gray-400'>{` ${distance} away `}</div>
                    </div>
                </div>
            </div>
            <div className='my-3'>
                <div className='font-semibold my-1'>Connector Type</div>
                <div className='flex-1 border-t-2 border-custom-green'></div>
            </div>
            <div className='overflow-scroll max-h-72 sm:max-h-44'>
                {station?.connectors?.map((connector) => (
                    <ConnectorDetail key={connector.connector_id} connector={connector} />
                ))}
            </div>
            <div className='mt-4'>
                <div className='my-2'>
                    <div className='font-semibold my-1'>Cost and Time Calculator</div>
                    <div className='flex-1 border-t-2 border-custom-green'></div>
                </div>
                <form className='my-2'>
                    <div className='grid grid-cols-[1fr_2fr] my-2'>
                        <div className='mt-1'>Connector Type</div>
                        <div className="relative">
                            <select className='bg-gray-100 rounded-lg h-8 my-1 appearance-none px-4 w-full'
                                value={connectorId}
                                onChange={(e) => {
                                    const selected = station?.connectors?.find(c => c.connector_id === e.target.value);
                                    setConnectorType(selected?.connector_id);
                                }}>
                                {station?.connectors?.map((connector) => (
                                    <option key={connector.connector_id} value={connector.connector_id}>{`${connector.plug_name} (${connector.type})`}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 my-2'>
                        <div className='flex flex-col mr-1'>
                            <div>Current Battery (%)</div>
                            <input type='number' min="0" max="100" step="1" className="bg-gray-100 rounded-lg h-8 my-1 p-4"
                                value={currentBattery} onChange={(e) => { setCurrentBattery(e.target.value) }}></input>
                        </div>
                        <div className='flex flex-col ml-1'>
                            <div>Target Battery (%)</div>
                            <input type='number' min="0" max="100" step="1" className="bg-gray-100 rounded-lg h-8 my-1 p-4"
                                value={targetBattery} onChange={(e) => { setTargetBattery(e.target.value) }}></input>
                        </div>
                    </div>
                    <div className='flex justify-between my-2'>
                        <div>Estimated Cost</div>
                        <div>฿{estimatedCost.toFixed(2)}</div>
                    </div>
                    <div className='flex justify-between my-2'>
                        <div>Estimated Time</div>
                        <div>{estimatedTime.toFixed(2)} min</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StationDetail