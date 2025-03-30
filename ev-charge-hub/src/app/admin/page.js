// src/app/admin/page.js
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import GoogleMap from '@/components/GoogleMap';
import { apiClient } from '@/utils/apiClient';

export default function Page() {
  const router = useRouter();
  const [mapVisible, setMapVisible] = useState(true);
  const [debugInfo, setDebugInfo] = useState({});
  const mapContainerRef = useRef(null);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapKey, setMapKey] = useState(0);
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
  const [isEditing, setIsEditing] = useState(false);
  const [editingStationId, setEditingStationId] = useState(null);

  // Add debug info
  useEffect(() => {
    // Check if API key exists
    const hasApiKey = !!process.env.NEXT_PUBLIC_MAPS_API_KEY;
    const apiKeyFirstChars = hasApiKey
      ? `${process.env.NEXT_PUBLIC_MAPS_API_KEY.substring(0, 3)}...`
      : "none";

    // Check container dimensions
    let containerWidth = 0;
    let containerHeight = 0;

    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      containerWidth = rect.width;
      containerHeight = rect.height;
    }

    setDebugInfo({
      hasApiKey,
      apiKeyFirstChars,
      containerWidth,
      containerHeight,
      windowDimensions: `${window.innerWidth}x${window.innerHeight}`,
      userAgent: navigator.userAgent
    });

    console.log("Map Debug Info:", {
      hasApiKey,
      apiKeyFirstChars,
      containerWidth,
      containerHeight,
      windowDimensions: `${window.innerWidth}x${window.innerHeight}`,
    });
  }, []);

  // Load existing stations
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await apiClient.get('/stations');
        setStations(data);
        setError(null);
        console.log("Stations loaded:", data);
      } catch (error) {
        console.error("Error loading stations:", error);
        setError(`Failed to load stations: ${error.message}`);
        setStations([]);
      }
    };

    fetchStations();
  }, []);

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

  // Required handler for station selection
  const handleStationSelect = async (id) => {
    console.log("Station selected:", id);
    try {
      const data = await apiClient.get(`/stations/${id}`);

      setStation({
        name: data.name,
        company: data.company,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
        status: {
          open_hours: data.status.open_hours,
          close_hours: data.status.close_hours,
          is_open: data.status.is_open
        },
        chargerType: data.chargerType || 'AC and DC',
        numStalls: data.numStalls || data.connectors.length
      });

      setConnectors(data.connectors.map(conn => ({
        type: conn.type,
        power_output: conn.power_output.toString(),
        price_per_unit: conn.price_per_unit.toString(),
        is_available: conn.is_available
      })));

      setEditingStationId(id);
      setIsEditing(true);
    } catch (error) {
      console.error("Failed to load station data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      const stationData = {
        name: station.name,
        latitude: parseFloat(station.latitude),
        longitude: parseFloat(station.longitude),
        company: station.company || "EV Charge Hub",
        status: {
          open_hours: station.status.open_hours,
          close_hours: station.status.close_hours,
          is_open: true
        },
        connectors: connectors.map((conn) => ({
          type: conn.type,
          plug_name: conn.type === 'AC' ? 'Type 2' : 'CCS2',
          price_per_unit: parseFloat(conn.price_per_unit),
          power_output: parseFloat(conn.power_output),
          is_available: true
        }))
      };

      console.log("Sending data to API:", stationData);

      if (isEditing) {
        const updatedStation = await apiClient.put(`/stations/${editingStationId}`, stationData);
        console.log("Station updated:", updatedStation);

        setStations(stations.map(station =>
          station.id === editingStationId ? { ...station, ...stationData } : station
        ));

        alert("Station updated successfully!");
        setMapKey(prev => prev + 1);
      } else {
        const newStation = await apiClient.post('/stations/create', stationData);
        console.log("Station created:", newStation);

        setStations([...stations, newStation]);
        alert("Station added successfully!");
        setMapKey(prev => prev + 1);
      }
      // Reset form
      setStation({
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
        numStalls: 1
      });
      setConnectors([{
        type: 'AC',
        power_output: '',
        price_per_unit: '',
        is_available: true
      }]);
      setIsEditing(false);
      setEditingStationId(null);

    } catch (error) {
      console.error("Error submitting station:", error);
      setError(`Failed to submit station: ${error.message}`);
      alert(`Failed to submit station: ${error.message}`);
      setMapKey(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full relative" ref={mapContainerRef}>
      {/* Debug information overlay */}
      <div className="absolute top-24 left-4 z-20 bg-white p-3 rounded shadow text-xs max-w-xs">
        <h3 className="font-bold">Map Debug Info:</h3>
        <ul>
          <li>API Key: {debugInfo.hasApiKey ? 'Present' : 'Missing'} ({debugInfo.apiKeyFirstChars})</li>
          <li>Container: {debugInfo.containerWidth}x{debugInfo.containerHeight}px</li>
          <li>Window: {debugInfo.windowDimensions}</li>
          <li>Map Visible: {mapVisible ? 'Yes' : 'No'}</li>
        </ul>
        <button
          onClick={() => setMapVisible(!mapVisible)}
          className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
        >
          Toggle Map
        </button>
      </div>

      {/* Map with explicit styling */}
      <div className="absolute inset-0 z-0" style={{ display: mapVisible ? 'block' : 'none' }}>
        <GoogleMap
          onStationSelect={handleStationSelect}
          key={`map-${mapKey}`}
        />
      </div>

      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded z-50 text-sm">
          {error}
        </div>
      )}

      {/* Form container - moved higher up near the navbar */}
      <div className="absolute right-4 top-12 w-96 max-h-[85vh] overflow-y-auto bg-white rounded-lg shadow-lg z-10">
        <div className="p-3">
          <h2 className="text-lg font-bold mb-1 text-[#00AB82]">
            {isEditing ? 'Edit EV Charge Station' : 'Add EV Charge Station'}
          </h2>
          <div className="border-t-2 border-[#00AB82] mb-2"></div>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <h3 className="font-semibold text-sm mb-1">Station Detail</h3>
              <div className="border-t-2 border-[#00AB82] mb-2"></div>

              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">Operator Name</label>
                <input
                  type="text"
                  name="name"
                  value={station.name}
                  onChange={handleStationChange}
                  className="bg-gray-100 w-full px-3 py-2 rounded-lg text-sm"
                  placeholder="Enter station name"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={station.company}
                  onChange={handleStationChange}
                  className="bg-gray-100 w-full px-3 py-2 rounded-lg text-sm"
                  placeholder="Enter company name"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">Station&#39;s Location</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="latitude"
                    value={station.latitude}
                    onChange={handleStationChange}
                    className="bg-gray-100 px-3 py-2 rounded-lg text-sm"
                    placeholder="Latitude"
                    required
                  />
                  <input
                    type="text"
                    name="longitude"
                    value={station.longitude}
                    onChange={handleStationChange}
                    className="bg-gray-100 px-3 py-2 rounded-lg text-sm"
                    placeholder="Longitude"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Charger Type</label>
                  <select
                    name="chargerType"
                    value={station.chargerType}
                    onChange={handleStationChange}
                    className="bg-gray-100 w-full h-9 px-3 rounded-lg text-sm appearance-none"
                  >
                    <option value="AC and DC">AC and DC</option>
                    <option value="AC only">AC only</option>
                    <option value="DC only">DC only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Number of Stalls</label>
                  <input
                    type="number"
                    name="numStalls"
                    value={station.numStalls}
                    onChange={handleStationChange}
                    min="1"
                    max="20"
                    className="bg-gray-100 w-full px-3 py-2 rounded-lg text-sm"
                    required
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">Opening Hours</label>
                <div className="grid grid-cols-5 gap-2 items-center">
                  <input
                    type="time"
                    name="status.open_hours"
                    value={station.status.open_hours}
                    onChange={handleStationChange}
                    className="bg-gray-100 col-span-2 px-3 py-2 rounded-lg text-sm"
                  />
                  <span className="text-center text-sm">to</span>
                  <input
                    type="time"
                    name="status.close_hours"
                    value={station.status.close_hours}
                    onChange={handleStationChange}
                    className="bg-gray-100 col-span-2 px-3 py-2 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Stalls Detail</h3>
                <button
                  type="button"
                  onClick={addConnector}
                  className="bg-[#00AB82] text-white p-1 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="border-t-2 border-[#00AB82] mb-2"></div>

              {connectors.map((connector, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded-lg mb-2 border border-gray-200 text-sm">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium text-sm">Connector #{index + 1}</h4>
                    {connectors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeConnector(index)}
                        className="text-red-500 p-1 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm mb-1">Charger Type</label>
                    <select
                      name="type"
                      value={connector.type}
                      onChange={(e) => handleConnectorChange(index, e)}
                      className="bg-gray-100 w-full h-9 px-3 rounded-lg appearance-none text-sm"
                    >
                      <option value="AC">AC</option>
                      <option value="DC">DC</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Power</label>
                      <div className="relative">
                        <input
                          type="number"
                          name="power_output"
                          value={connector.power_output}
                          onChange={(e) => handleConnectorChange(index, e)}
                          className="bg-gray-100 w-full px-3 py-2 rounded-lg text-sm"
                          placeholder="Power"
                          required
                        />
                        <span className="absolute right-3 top-2 text-gray-500 text-sm">kW</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Rate</label>
                      <div className="relative">
                        <input
                          type="number"
                          name="price_per_unit"
                          value={connector.price_per_unit}
                          onChange={(e) => handleConnectorChange(index, e)}
                          className="bg-gray-100 w-full px-3 py-2 rounded-lg text-sm"
                          placeholder="Rate"
                          required
                        />
                        <span className="absolute right-3 top-2 text-gray-500 text-sm">฿/unit</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-2 mb-2">
              <button
                  type="button"
                  onClick={() => {
                    setStation({
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
                    setConnectors([{
                      type: 'AC',
                      power_output: '',
                      price_per_unit: '',
                      is_available: true
                    }]);
                    setIsEditing(false);
                    setEditingStationId(null);
                  }}
                  className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700"
              >
                Cancel
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={async () => {
                    const confirmed = window.confirm("Are you sure you want to delete this station?");
                    if (!confirmed) return;

                    try {
                      await apiClient.delete(`/stations/${editingStationId}`);
                      setStations(stations.filter(station => station.id !== editingStationId));
                      setStation({
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
                      setConnectors([{
                        type: 'AC',
                        power_output: '',
                        price_per_unit: '',
                        is_available: true
                      }]);
                      setIsEditing(false);
                      setEditingStationId(null);
                      alert("Station deleted successfully!");
                      setMapKey(prev => prev + 1);
                    } catch (err) {
                      console.error("Failed to delete station:", err);
                      alert(`Failed to delete station: ${err.message}`);
                      setMapKey(prev => prev + 1);
                    }
                  }}
                  className="px-4 py-1.5 text-sm rounded-lg border border-red-400 text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              )}
              <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-1.5 text-sm rounded-lg ${loading ? 'bg-gray-400' : 'bg-[#00AB82]'} text-white`}
              >
                {loading
                    ? isEditing ? 'Saving...' : 'Adding...'
                    : isEditing ? 'Save' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}