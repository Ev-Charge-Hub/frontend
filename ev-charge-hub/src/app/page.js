"use client";

import GoogleMap from "@/components/GoogleMap";
import StationDetail from "@/components/StationDetail";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Filter from "@/components/Filter";
import { stationService } from "@/services/stationService";

function Home() {
  const [stationID, setStationID] = useState(null);
  const [activeFilterButton, setActiveFilterButton] = useState(false);
  const [activeBookmarkButton, setActiveBookmarkButton] = useState(false);
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);

  const handleStationSelect = (id) => {
    setStationID(id);
    setActiveFilterButton(false);
    setActiveBookmarkButton(false);
  };

  const handleCloseStationDetail = () => {
    setStationID(null);
  };

  const handleCloseFilter = () => {
    setActiveFilterButton(false);
  };

  const handleFilterButtonClick = (state) => {
    setActiveFilterButton(state);
    setStationID(null);
    setActiveBookmarkButton(false);
  };

  const handleBookmarkButtonClick = (state) => {
    setActiveBookmarkButton(state);
    setActiveFilterButton(false);
    setStationID(null);
  };

  const handleSetStationData = (data) => {
    console.log("Setting stations data:", data); // Log the data before setting it
    setStations(data);
  };

  const fetchStations = async () => {
      try {
        const data = await stationService.getStations();

        console.log("Fetched data:", data); // Log the data to check what is fetched

        if (Array.isArray(data)) {
          console.log("Setting stations with:", data); // Log before setting state
          setStations(data);
        } else {
          setError('Fetched data is not an array');
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        setError('Failed to fetch stations');
        console.error("Error fetching stations:", error);
      }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  useEffect(() => {
    console.log("Stations updated:", stations); 
  }, [stations]); 



  return (
    <div>
      <Header
        onFilterButtonClick={handleFilterButtonClick}
        activeFilter={activeFilterButton}
        onBookmarkButtonClick={handleBookmarkButtonClick}
        activeBookmark={activeBookmarkButton}
      />
      {stations.length !== 0 && <GoogleMap onStationSelect={handleStationSelect} stationData={stations} />}

      {stationID !== null && (
        <StationDetail key={stationID} stationID={stationID} closeStationDetail={handleCloseStationDetail} />
      )}

      {activeFilterButton && (
        <Filter closeFilter={handleCloseFilter} setStationData={handleSetStationData} setDefaultData={fetchStations} />
      )}
    </div>
  );
}

export default Home;