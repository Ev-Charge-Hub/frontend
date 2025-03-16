import { stationService } from '@/services/stationService';
import React, { useState } from 'react';

function Filter({closeFilter, setStationData, setDefaultData}) {
    const [selectedStatusO, setSelectedStatusO] = useState(null);
    const [selectedConnector, setSelectedConnector] = useState(null);
    const [selectedStatusA, setSelectedStatusA] = useState(null);
    const [selectedOperator, setSelectedOperator] = useState(null);

    const companies = ["Caltex EV", "PTT EV Station", "Shell Recharge", "Bangchak EV Station", "ESSO EV", "SUSCO EV"];
    const sortedCompanies = companies.sort();

    // Handlers for selection
    const handleStatusClickO = (statusO) => setSelectedStatusO(statusO);
    const handleStatusClickA = (statusA) => setSelectedStatusA(statusA);

    const handleConnectorClick = (connector) => {
        const connectorMapping = {
            ACType1: ['AC', 'Type 1'],
            ACType2: ['AC', 'Type 2'],
            CHAdeMO: ['DC', 'CHAdeMO'],
            DCType1: ['DC', 'CCS1'],
            DCType2: ['DC', 'CCS2'],
        };
        setSelectedConnector(connectorMapping[connector] || null);
    };

    const handleClear = () => {
        setSelectedStatusO(null);
        setSelectedStatusA(null);
        setSelectedConnector(null);
        setSelectedOperator(null);
    };

    const handleApplyFilters = async () => {
        const filters = {
            company: selectedOperator || undefined,
            type: selectedConnector ? selectedConnector[0] : undefined,
            plug_name: selectedConnector ? selectedConnector[1] : undefined,
        };
        const data = await stationService.filterStations(filters);
        setStationData(data)
    };

    return (
        <div className="absolute bg-white z-10 w-96 px-4 py-1 rounded-lg top-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0">
            <div className='relative py-1'>
                <button className='absolute top-1 right-[-0.5rem]' onClick={() => { closeFilter(); setDefaultData(); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
            </div>
            <div className='my-3'>
                <div className='flex flex-row justify-between'>
                    <div className='font-semibold my-1'>Filter</div>
                    <button
                        onClick={handleClear}
                        className="text-sm text-gray-600">Clear
                    </button>
                </div>
                <div className='flex-1 border-t-2 border-custom-green'></div>
            </div>
            <div className='overflow-scroll max-h-[28rem]'>
                <div className="space-y-4">
                    <div>
                        <h2 className="font-semibold mb-2">Status</h2>
                        <div className="flex space-x-4">
                            <button
                                className={`px-4 py-2 rounded-lg ${selectedStatusO === true ? 'bg-custom-green text-white' : 'bg-gray-100'}`}
                                onClick={() => handleStatusClickO(true)}>Open
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg ${selectedStatusA === true ? 'bg-custom-green text-white' : 'bg-gray-100'}`}
                                onClick={() => handleStatusClickA(true)}>Available Charger
                            </button>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-2">Connector Type</h2>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                className={`px-4 py-3 rounded-lg flex flex-col items-center space-x-2 text-sm ${JSON.stringify(selectedConnector) === JSON.stringify(['AC', 'Type 1']) ? 'bg-custom-green text-white' : 'bg-gray-100'}`}
                                onClick={() => handleConnectorClick('ACType1')}>
                                <img src="/connector_types/ac_type_1.png" alt="ACType1"
                                    className="w-10 h-10 object-cover rounded-lg" />
                                <span>AC Type 1</span>
                            </button>
                            <button
                                className={`px-4 py-3 rounded-lg flex flex-col items-center space-x-2 text-sm ${JSON.stringify(selectedConnector) === JSON.stringify(['AC', 'Type 2']) ? 'bg-custom-green text-white' : 'bg-gray-100'}`}
                                onClick={() => handleConnectorClick('ACType2')}>
                                <img src="/connector_types/ac_type_2.png" alt="ACType2"
                                    className="w-10 h-10 object-cover rounded-lg" />
                                <span>AC Type 2</span>
                            </button>
                            <button
                                className={`px-4 py-3 rounded-lg flex flex-col items-center space-x-2 text-sm ${JSON.stringify(selectedConnector) === JSON.stringify(['DC', 'CHAdeMO']) ? 'bg-custom-green text-white' : 'bg-gray-100'}`}
                                onClick={() => handleConnectorClick('CHAdeMO')}>
                                <img src="/connector_types/dc_CHAdeMo.png" alt="CHAdeMO"
                                    className="w-10 h-10 object-cover rounded-lg" />
                                <span>CHAdeMO</span>
                            </button>
                            <button
                                className={`px-4 py-3 rounded-lg flex flex-col items-center space-x-2 text-sm ${JSON.stringify(selectedConnector) === JSON.stringify(['DC', 'CCS1']) ? 'bg-custom-green text-white' : 'bg-gray-100'}`}
                                onClick={() => handleConnectorClick('DCType1')}>
                                <img src="/connector_types/dc_ccs_1.png" alt="DCType1"
                                    className="w-10 h-13 object-cover rounded-lg" />
                                <span>DC Type 1</span>
                            </button>
                            <button
                                className={`px-4 py-3 rounded-lg flex flex-col items-center space-x-2 text-sm ${JSON.stringify(selectedConnector) === JSON.stringify(['DC', 'CCS2']) ? 'bg-custom-green text-white' : 'bg-gray-100'}`}
                                onClick={() => handleConnectorClick('DCType2')}>
                                <img src="/connector_types/dc_ccs_2.png" alt="DCType2"
                                    className="w-10 h-13 object-cover rounded-lg" />
                                <span>DC Type 2</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-2">Operator</h2>
                        <div className="grid grid-cols-3 gap-3">
                            {sortedCompanies.map((item) =>
                                <button
                                    className={`px-4 py-2 rounded-lg ${selectedOperator === item ? 'bg-custom-green text-white' : 'bg-gray-100'}`}
                                    key={item}
                                    onClick={() => setSelectedOperator(item)}>{item}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-3">
                <button className={`w-full text-white py-2 rounded-lg ${selectedStatusO || selectedStatusA || selectedConnector || selectedOperator ? 'bg-custom-green' : 'bg-gray-400'}`} onClick={handleApplyFilters} disabled={!selectedStatusO && !selectedStatusA && !selectedConnector && !selectedOperator}>Apply</button>
            </div>
        </div>
    )
}

export default Filter