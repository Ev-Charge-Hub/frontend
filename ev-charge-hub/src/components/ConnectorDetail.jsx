"use client";
import React, { useEffect, useState, useMemo } from "react";

function ConnectorDetail({ connector, handleSelectedConnector, handleBookingModalOpen, haversineDistance }) {
    const [timeRemaining, setTimeRemaining] = useState(null);

    // Select the appropriate connector image based on plug_name
    const connectorImg = useMemo(() => {
        switch (connector.plug_name) {
            case "Type 1": return "ac_type_1.png";
            case "Type 2": return "ac_type_2.png";
            case "CHAdeMO": return "dc_CHAdeMo.png";
            case "CCS1": return "dc_ccs_1.png";
            case "CCS2": return "dc_ccs_2.png";
            default: return "default.png";
        }
    }, [connector.plug_name]);

    useEffect(() => {
        // If the connector has a booking, calculate the remaining time
        if (connector.booking?.booking_end_time) {
            const updateRemainingTime = () => {
                const endTime = new Date(connector.booking.booking_end_time);
                const currentTime = new Date();
                const diffMs = endTime - currentTime;

                if (diffMs > 0) {
                    // Convert milliseconds to minutes and round up
                    const minutes = Math.ceil(diffMs / (1000 * 60));
                    setTimeRemaining(minutes);
                } else {
                    setTimeRemaining(0); // Booking expired, mark as available
                }
            };

            updateRemainingTime(); // Initial calculation
            const interval = setInterval(updateRemainingTime, 1000 * 30); // Update every 30 seconds

            return () => clearInterval(interval); // Cleanup interval on unmount
        }
    }, [connector.booking?.booking_end_time]);

    // Determine if the connector is available
    const isAvailable = !connector.booking || timeRemaining === 0;

    const handleSelectedConnectorClick = () => {
        handleSelectedConnector(connector);
        handleBookingModalOpen(true);
    }

    const isWithin20Km = haversineDistance <= 20;

    return (
        <div className="grid grid-cols-2 text-center border-2 border-custom-gray rounded-lg my-2 relative">
            <div className="my-4">
                <img className="w-11 mx-auto my-1" src={`/connector_types/${connectorImg}`} alt={connector.plug_name} />

                <div className="font-semibold">{`${connector.plug_name} (${connector.type})`}</div>
                <div>{`${connector?.power_output} kW`}</div>
            </div>
            <div className="content-center">
                {isAvailable ? (
                    <div className="text-custom-green flex flex-row justify-center">
                        <div className="mt-2 ">

                        Available
                        </div>
                        <button
                            className={`px-4 py-2 bg-custom-green text-white ml-2 rounded ${isWithin20Km ? 'hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'}`}
                            onClick={() => { handleSelectedConnectorClick() }}
                            disabled={!isWithin20Km}
                        >
                            Book Now
                        </button>
                    </div>
                ) : (
                    <div className="text-gray-500">
                        Unavailable
                        {timeRemaining > 0 && <div>{timeRemaining} mins remaining</div>}
                    </div>
                )}

                {/* Display the error message if not within 20km */}
                {!isWithin20Km && (
                    <p className="text-red-500 text-sm px-1">
                        You cannot book because you're not within 20km of the station.
                    </p>
                )}

            </div>
        </div>
    );
}

export default ConnectorDetail;
