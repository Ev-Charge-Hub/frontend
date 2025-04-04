import { stationService } from '@/services/stationService';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
function MyBooking({ username, closeBooking, handleStationSelect, showStationDetail }) {
    const [bookingData, setBookingData] = useState(null);
    const [isOpen24Hrs, setIsOpen24Hrs] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        if (!username) {
            console.log("Username is missing, skipping fetch.");
            return;
        }

        const fetchBooking = async () => {
            try {
                const response = await stationService.getBookingByUsername(username);
                setBookingData(response);
            } catch (error) {
                console.error("Error fetching booking:", error);
            }
        };

        fetchBooking();
    }, [username]);

    // Ensure status exists before checking open hours
    useEffect(() => {
        if (bookingData?.status) {
            setIsOpen24Hrs(
                bookingData.status.open_hours === 0 &&
                (bookingData.status.close_hours === 23 || bookingData.status.close_hours === 0)
            );
        }

        // Check if booking has expired or is still valid
        if (bookingData?.connectors?.[0]?.booking?.booking_end_time) {
            const currentTime = new Date();
            const bookingEndTime = new Date(bookingData.connectors[0].booking.booking_end_time);

            if (currentTime > bookingEndTime) {
                setStatusMessage("Expired");
            } else {
                const timeRemaining = bookingEndTime - currentTime;
                const hoursRemaining = Math.floor(timeRemaining / 1000 / 60 / 60);
                const minutesRemaining = Math.floor((timeRemaining / 1000 / 60) % 60);

                setStatusMessage(`เวลาที่จะครบเวลา: ${hoursRemaining} ชั่วโมง ${minutesRemaining} นาที`);
            }
        }
    }, [bookingData]);

    // Format date properly
    const formatDateTime = (timestamp) => {
        if (!timestamp) return "N/A";
        return new Date(timestamp).toLocaleString();
    };

    const connectorImg = useMemo(() => {
        switch (bookingData?.connectors?.[0]?.plug_name) {
            case "Type 1": return "ac_type_1.png";
            case "Type 2": return "ac_type_2.png";
            case "CHAdeMO": return "dc_CHAdeMo.png";
            case "CCS1": return "dc_ccs_1.png";
            case "CCS2": return "dc_ccs_2.png";
            default: return "default.png";
        }
    }, [bookingData?.connectors?.[0]?.plug_name]);

    return (
        <div className="absolute bg-white z-10 h-full w-full px-4 sm:w-4/12 sm:h-[35rem] sm:px-4 sm:py-2 sm:mt-2 rounded-lg top-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0">
            <div className='relative py-1'>
                <button className='absolute top-1 right-1' onClick={closeBooking}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>
            <div className='my-3'>
                <div className='font-semibold my-1 text-xl'>My Booking</div>
                <div className='flex-1 border-t-2 border-custom-green'></div>
            </div>
            <div className='overflow-scroll max-h-[28rem]'>
                {bookingData ? (
                    <div className='flex flex-col justify-between my-2 border-2 border-custom-gray rounded-lg p-4'>
                        <div className='flex justify-center py-2 pt-2 relative'>
                            <div className='mx-3 align-middle'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="38px" fill="#07775c"><path d="m340-200 100-160h-60v-120L280-320h60v120ZM240-560h240v-200H240v200Zm0 360h240v-280H240v280Zm-80 80v-640q0-33 23.5-56.5T240-840h240q33 0 56.5 23.5T560-760v280h50q29 0 49.5 20.5T680-410v185q0 17 14 31t31 14q18 0 31.5-14t13.5-31v-375h-10q-17 0-28.5-11.5T720-640v-80h20v-60h40v60h40v-60h40v60h20v80q0 17-11.5 28.5T840-600h-10v375q0 42-30.5 73.5T725-120q-43 0-74-31.5T620-225v-185q0-5-2.5-7.5T610-420h-50v300H160Zm320-80H240h240Z" /></svg>
                            </div>
                            <div className='w-full mx-1'>
                                <div className='font-bold'>
                                    {bookingData?.name}<br /> ({bookingData?.company})
                                </div>
                                <div className='flex justify-between'>
                                    <div className={`${bookingData?.status?.is_open ? 'text-custom-green' : 'text-custom-red'}`}>
                                        {bookingData?.status?.is_open ? 'Open' : 'Closed'}
                                        {isOpen24Hrs ? ' 24 hours' : ` ${bookingData?.status?.open_hours} - ${bookingData?.status?.close_hours}`}
                                    </div>
                                    <button 
                                        className='text-custom-green hover:text-custom-green' 
                                        onClick={() => {
                                            handleStationSelect(bookingData?.id); 
                                            showStationDetail(bookingData); 
                                            closeBooking();
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-icon lucide-arrow-right">
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                {bookingData?.distance && (
                                    <div className='text-gray-400'>{`${bookingData?.distance} away`}</div>
                                )}
                            </div>
                        </div>
                        <div className='flex'>
                            <div className="w-32 my-4 text-center mr-3">
                                <img className="w-11 mx-auto my-1" src={`/connector_types/${connectorImg}`} alt={bookingData?.connectors?.[0]?.plug_name} />
                                <div className="font-semibold">{`${bookingData?.connectors?.[0]?.plug_name} (${bookingData?.connectors?.[0]?.type})`}</div>
                                <div>{`${bookingData?.connectors?.[0]?.power_output} kW`}</div>
                            </div>
                            <div className='mt-2'>
                                <div className='font-semibold mt-2'>Booking Details</div>
                                <div className='text-gray-700'>
                                    <span className="font-medium">Type:</span> {bookingData?.connectors?.[0]?.type || "Unknown"}
                                </div>
                                <div className='text-gray-700'>
                                    <span className="font-medium">Plug:</span> {bookingData?.connectors?.[0]?.plug_name || "Unknown"}
                                </div>
                                <div className='text-gray-700'>
                                    <span className="font-medium">Booking Ends:</span> {formatDateTime(bookingData?.connectors?.[0]?.booking?.booking_end_time)}
                                </div>
                            </div>
                        </div>

                        <div className='mt-1 w-full flex justify-end'>
                            <span className="text-lg text-gray-500">{statusMessage}</span>
                        </div>
                    </div>
                ) : (
                    <p className="mt-5 text-center text-gray-500">No bookings found.</p>
                )}
            </div>
        </div>
    );
}

export default MyBooking;
