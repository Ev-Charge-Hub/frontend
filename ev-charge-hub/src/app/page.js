"use client";

import GoogleMap from "@/components/GoogleMap";
import StationDetail from "@/components/StationDetail";
import { useState } from "react";
import Header from "@/components/Header";
import Filter from "@/components/Filter";

export default function Home() {

  const [stationID, setStationID] = useState(null);
  const [activeFilterButton, setActiveFilterButton] = useState(false);
  const [activeBookmarkButton, setActiveBookmarkButton] = useState(false);

  const handleStationSelect = (id) => {
    setStationID(id);
    setActiveFilterButton(false)
    setActiveBookmarkButton(false); 
  };

  const handleCloseStationDetail = () => {
    setStationID(null);
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

  return (
    <div>
      <Header onFilterButtonClick={handleFilterButtonClick} activeFilter={activeFilterButton} onBookmarkButtonClick={handleBookmarkButtonClick} activeBookmark={activeBookmarkButton} />
      <GoogleMap onStationSelect={handleStationSelect} />
      {stationID !== null && <StationDetail key={stationID} stationID={stationID} closeStationDetail={handleCloseStationDetail} />}
      {activeFilterButton && <Filter />}
    </div>
  );
}
