'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { stationService } from '@/services/stationService';

function FilterPage({ onApplyFilters }) {
    const [selectedStatusO, setSelectedStatusO] = useState(null);
    const [selectedConnector, setSelectedConnector] = useState(null);
    const [selectedDistance, setSelectedDistance] = useState(null);
    const [selectedStatusA, setSelectedStatusA] = useState(null);

    const handleStatusClickO = (statusO) => setSelectedStatusO(statusO);
    const handleDistanceClick = (distance) => setSelectedDistance(distance);
    const handleStatusClickA = (statusA) => setSelectedStatusA(statusA);

    const handleClear = () => {
        setSelectedStatusO(false);
        setSelectedConnector(null);
        setSelectedDistance(null);
        setSelectedStatusA(false);
    };

    const handleConnectorClick = (connector) => {
        if (connector === 'ACType1') {
            setSelectedConnector(['AC', 'Type 1']);
        } else if (connector === 'ACType2') {
            setSelectedConnector(['AC', 'Type 2']);
        } else if (connector === 'CHAdeMO') {
            setSelectedConnector(['DC', 'CHAdeMO']);
        } else if (connector === 'Tesla') {
            setSelectedConnector(['Tesla']);
        } else if (connector === 'DCType1') {
            setSelectedConnector(['DC', 'CCS1']);
        } else if (connector === 'DCType2') {
            setSelectedConnector(['DC', 'CCS2']);
        } else if (connector === 'DCGBT') {
            setSelectedConnector(['DC', 'G/BT']);
        } else {
            setSelectedConnector([connector]);
        }
    };

    async function fetchFilteredStations(filters = {}) {  // Default to an empty object
        try {
            const stations = await stationService.getStations();
            console.log("All stations fetched:", stations);
            const filteredStations = stations.filter(station => {
                // Apply your filtering logic based on `filters`
                return Object.keys(filters).every(key => station[key] === filters[key]);
            });
            console.log("Filtered stations:", filteredStations);
            setFilteredStations(filteredStations);
        } catch (error) {
            console.error('Error fetching filtered stations:', error);
        }
    }

    const [filteredStations, setFilteredStations] = useState([]);

    useEffect(() => {
        fetchFilteredStations();
    }, [selectedStatusO, selectedStatusA, selectedConnector, selectedDistance]);


    return (
        <div className="bg-white p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Filter</h1>
                <button
                    onClick={handleClear}
                    className="text-sm text-gray-600">Clear
                </button>
            </div>
            <div className="space-y-4">
                <div>
                    <h2 className="font-semibold mb-2">Status</h2>
                    <div className="flex space-x-4">
                        <button
                            className={`px-4 py-2 rounded-lg ${selectedStatusO === true ? 'bg-[#00AB82] text-white' : 'bg-gray-100'}`}
                            onClick={() => handleStatusClickO(true)}>Open
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${selectedStatusA === true ? 'bg-[#00AB82] text-white' : 'bg-gray-100'}`}
                            onClick={() => handleStatusClickA(true)}>Available Charger
                        </button>
                    </div>
                </div>
                <div>
                    <h2 className="font-semibold mb-2">Connector Type</h2>
                    <div className="grid grid-cols-4 gap-4">
                        <button
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm ${JSON.stringify(selectedConnector) === JSON.stringify(['AC', 'Type 1']) ? 'bg-[#00AB82] text-white' : 'bg-gray-100'}`}
                            onClick={() => handleConnectorClick('ACType1')}>
                            <img src="charger/AC_Type_1.png" alt="ACType1"
                                 className="w-10 h-10 object-cover rounded-lg"/>
                            <span>AC Type 1</span>
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm ${JSON.stringify(selectedConnector) === JSON.stringify(['AC', 'Type 2']) ? 'bg-[#00AB82] text-white' : 'bg-gray-100'}`}
                            onClick={() => handleConnectorClick('ACType2')}>
                            <img src="charger/AC_Type_2.png" alt="ACType2"
                                 className="w-10 h-10 object-cover rounded-lg"/>
                            <span>AC Type 2</span>
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm ${JSON.stringify(selectedConnector) === JSON.stringify(['DC', 'CHAdeMO']) ? 'bg-[#00AB82] text-white' : 'bg-gray-100'}`}
                            onClick={() => handleConnectorClick('CHAdeMO')}>
                            <img src="charger/CHAdeMO.png" alt="CHAdeMO"
                                 className="w-10 h-10 object-cover rounded-lg"/>
                            <span>CHAdeMO</span>
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm ${JSON.stringify(selectedConnector) === JSON.stringify(['Tesla']) ? 'bg-[#00AB82] text-white' : 'bg-gray-100'}`}
                            onClick={() => handleConnectorClick('Tesla')}>
                            <img src="charger/Tesla.png" alt="Tesla"
                                 className="w-10 h-10 object-cover rounded-lg"/>
                            <span>Tesla</span>
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm ${JSON.stringify(selectedConnector) === JSON.stringify(['DC', 'CCS1']) ? 'bg-[#00AB82] text-white' : 'bg-gray-100'}`}
                            onClick={() => handleConnectorClick('DCType1')}>
                            <img src="charger/DC_CSS_TYPE_2.png" alt="DCType1"
                                 className="w-10 h-10 object-cover rounded-lg"/>
                            <span>DC Type 1</span>
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm ${JSON.stringify(selectedConnector) === JSON.stringify(['DC', 'CCS2']) ? 'bg-[#00AB82] text-white' : 'bg-gray-100'}`}
                            onClick={() => handleConnectorClick('DCType2')}>
                            <img src="charger/DC_CSS_TYPE_2.png" alt="DCType2"
                                 className="w-10 h-10 object-cover rounded-lg"/>
                            <span>DC Type 2</span>
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm ${JSON.stringify(selectedConnector) === JSON.stringify(['DC', 'G/BT']) ? 'bg-[#00AB82] text-white' : 'bg-gray-100'}`}
                            onClick={() => handleConnectorClick('DCGBT')}>
                            <img src="charger/DC_GB_T.png" alt="DCGBT"
                                 className="w-12 h-12 object-cover rounded-lg"/>
                            <span>DC GBT</span>
                        </button>
                    </div>
                </div>
                <div>
                    <h2 className="font-semibold mb-2">Distance from your location</h2>
                    <div className="flex space-x-4">
                        <button
                            className={`px-4 py-2 rounded-lg ${selectedDistance === 10 ? 'bg-[#00AB82] text-white' : 'bg-gray-100'}`}
                            onClick={() => handleDistanceClick(10)}>less than 10 km
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${selectedDistance === 20 ? 'bg-[#00AB82] text-white' : 'bg-gray-100'}`}
                            onClick={() => handleDistanceClick(20)}>less than 20 km
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${selectedDistance === 30 ? 'bg-[#00AB82] text-white' : 'bg-gray-100'}`}
                            onClick={() => handleDistanceClick(30)}>less than 30 km
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <button
                    onClick={() => {
                        // Log all the state values
                        console.log("Selected Status O:", selectedStatusO);
                        console.log("Selected Status A:", selectedStatusA);
                        console.log("Selected Connector:", selectedConnector);
                        console.log("Selected Distance:", selectedDistance);

                        // Pass filters to fetchFilteredStations function
                        const filters = {selectedStatusO, selectedStatusA, selectedConnector, selectedDistance};
                        fetchFilteredStations(filters);  // Call function with filters
                    }}
                    className="w-full bg-[#00AB82] text-white py-2 rounded-lg">Apply
                </button>

            </div>
            {/*<div>*/}
            {/*    {filteredStations.map((station, index) => (*/}
            {/*        <div key={station.id || index}> /!* Use index as fallback if id is not available *!/*/}
            {/*            {station.name}*/}
            {/*        </div>*/}
            {/*    ))}*/}

            {/*</div>*/}
        </div>
    );
}

export default FilterPage;
