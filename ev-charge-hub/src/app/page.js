"use client";

import GoogleMap from "@/components/GoogleMap";
import { useDistance } from "@/utils/DistanceContext";
import { useEffect } from "react";
import { useLocation } from "@/utils/UserLocationProvider";

export default function Home() {
  const { distance, calculateDistance } = useDistance();
  const userLocation = useLocation(); 
  // lat and lon of station example
  const destination = { lat: 13.736717, lng: 100.523186 }; 

  useEffect(() => {
    if (userLocation) {
      // use calculateDistance from useDistance to calculate distance between station and user
      calculateDistance(destination);
      console.log(distance);
    }
  }, [userLocation, calculateDistance, destination]);

  return (
    <div className="h-screen">
      {/* {distance ? <p>Distance: {distance}</p> : <p>Calculating distance...</p>} */}
      <GoogleMap />
    </div>
  );
}
