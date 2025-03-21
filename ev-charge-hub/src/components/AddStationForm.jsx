"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddStationForm = () => {
  const router = useRouter();
  const [station, setStation] = useState({
    name: '',
    company: '',
    latitude: '',
    longitude: '',
    status: {
      open_hours: '08:00',
      close_hours: '20:00',
      is_open: true
    },
    chargerType: 'AC and DC',
    numStalls: 1,
    connectors: []
  });

  const [connectors, setConnectors] = useState([
    {
      type: 'AC',
      power_output: '',
      price_per_unit: '',
      is_available: true
    }
  ]);

  const handleStationChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setStation({
        ...station,
        [parent]: {
          ...station[parent],
          [child]: value
        }
      });
    } else {
      setStation({
        ...station,
        [name]: value
      });
    }
  };

  const handleConnectorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedConnectors = [...connectors];
    updatedConnectors[index] = {
      ...updatedConnectors[index],
      [name]: value
    };
    setConnectors(updatedConnectors);
  };

  const addConnector = () => {
    setConnectors([
      ...connectors,
      {
        type: 'AC',
        power_output: '',
        price_per_unit: '',
        is_available: true
      }
    ]);
  };

  const removeConnector = (index) => {
    const updatedConnectors = connectors.filter((_, i) => i !== index);
    setConnectors(updatedConnectors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the new station object with proper structure
    const newStation = {
      id: Math.random().toString(36).substr(2, 9),
      station_id: `ST${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: station.name,
      latitude: parseFloat(station.latitude),
      longitude: parseFloat(station.longitude),
      company: station.company,
      status: {
        open_hours: station.status.open_hours,
        close_hours: station.status.close_hours,
        is_open: true
      },
      connectors: connectors.map((conn, index) => ({
        connector_id: `C${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        type: conn.type,
        plug_name: conn.type === 'AC' ? 'Type 2' : 'CCS2',
        price_per_unit: parseFloat(conn.price_per_unit),
        power_output: parseFloat(conn.power_output),
        is_available: true
      }))
    };

    // Add to mock data
    // Note: In a real app, this would be an API call
    // Here we'll just simulate it by logging the new station
    console.log("New station added:", newStation);

    // In a real scenario with API:
    // await stationService.addStation(newStation);

    // For now, just reload the page to simulate refresh
    alert("Station added successfully!");
    router.refresh();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-[#00AB82]">Add EV Charge Station</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Station Detail</h3>
          <div className="flex-1 border-t-2 border-[#00AB82] mb-4"></div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Operator Name</label>
            <input
              type="text"
              name="name"
              value={station.name}
              onChange={handleStationChange}
              className="bg-gray-100 w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Enter station name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Company</label>
            <input
              type="text"
              name="company"
              value={station.company}
              onChange={handleStationChange}
              className="bg-gray-100 w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Station's Location</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="latitude"
                value={station.latitude}
                onChange={handleStationChange}
                className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300"
                placeholder="Latitude"
                required
              />
              <input
                type="text"
                name="longitude"
                value={station.longitude}
                onChange={handleStationChange}
                className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300"
                placeholder="Longitude"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Charger Type</label>
              <select
                name="chargerType"
                value={station.chargerType}
                onChange={handleStationChange}
                className="bg-gray-100 w-full h-10 px-4 rounded-lg border border-gray-300 appearance-none"
              >
                <option value="AC and DC">AC and DC</option>
                <option value="AC only">AC only</option>
                <option value="DC only">DC only</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Number of Stalls</label>
              <input
                type="number"
                name="numStalls"
                value={station.numStalls}
                onChange={handleStationChange}
                min="1"
                max="20"
                className="bg-gray-100 w-full px-4 py-2 rounded-lg border border-gray-300"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Opening Hours</label>
            <div className="grid grid-cols-5 gap-2 items-center">
              <input
                type="time"
                name="status.open_hours"
                value={station.status.open_hours}
                onChange={handleStationChange}
                className="bg-gray-100 col-span-2 px-4 py-2 rounded-lg border border-gray-300"
              />
              <span className="text-center">to</span>
              <input
                type="time"
                name="status.close_hours"
                value={station.status.close_hours}
                onChange={handleStationChange}
                className="bg-gray-100 col-span-2 px-4 py-2 rounded-lg border border-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Stalls Detail</h3>
            <button
              type="button"
              onClick={addConnector}
              className="bg-[#00AB82] text-white p-1 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <div className="flex-1 border-t-2 border-[#00AB82] mb-4"></div>

          {connectors.map((connector, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
              <div className="flex justify-between mb-4">
                <h4 className="font-medium">Connector #{index + 1}</h4>
                {connectors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeConnector(index)}
                    className="text-red-500 p-1 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Charger Type</label>
                <select
                  name="type"
                  value={connector.type}
                  onChange={(e) => handleConnectorChange(index, e)}
                  className="bg-gray-100 w-full h-10 px-4 rounded-lg border border-gray-300 appearance-none"
                >
                  <option value="AC">AC</option>
                  <option value="DC">DC</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Power (kW)</label>
                  <input
                    type="number"
                    name="power_output"
                    value={connector.power_output}
                    onChange={(e) => handleConnectorChange(index, e)}
                    className="bg-gray-100 w-full px-4 py-2 rounded-lg border border-gray-300"
                    placeholder="kW"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Rate (baht/unit)</label>
                  <input
                    type="number"
                    name="price_per_unit"
                    value={connector.price_per_unit}
                    onChange={(e) => handleConnectorChange(index, e)}
                    className="bg-gray-100 w-full px-4 py-2 rounded-lg border border-gray-300"
                    placeholder="baht/unit"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#00AB82] text-white"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStationForm;