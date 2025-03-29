"use client";
import React, { useEffect, useState, useMemo } from "react";

function ConnectorDetail({ connector }) {
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

    return (
        <div className="grid grid-cols-2 text-center border-2 border-custom-gray rounded-lg my-2 relative">
            <div className="my-4">
                <img className="w-11 mx-auto my-1" src={`/connector_types/${connectorImg}`} alt={connector.plug_name} />
                
                <div className="font-semibold">{`${connector.plug_name} (${connector.type})`}</div>
                <div>{`${connector?.power_output} kW`}</div>
            </div>
            <div className="content-center">
                {isAvailable ? (
                    <div className="text-custom-green">Available</div>
                ) : (
                    <div className="text-gray-500">
                        Unavailable
                        {timeRemaining > 0 && <div>{timeRemaining} mins remaining</div>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ConnectorDetail;
