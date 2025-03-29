import React, { useState } from 'react';

function BookingModal({ isOpen, onClose, station, connector }) {
    const [bookingTime, setBookingTime] = useState({ hours: 0, minutes: 0 });
    const [error, setError] = useState(null);
    const maxHours = 8;

    if (!isOpen) return null;

    // Close modal when clicking on the background
    const handleBackgroundClick = (e) => {
        if (e.target.id === "modal-background") {
            onClose();
        }
    };

    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setBookingTime((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateTime = () => {
        const { hours, minutes } = bookingTime;
        if (hours < 0 || minutes < 0 || minutes > 59) {
            setError('Please enter a valid duration. Minutes should be between 0 and 59.');
            return false;
        }
        if (hours > maxHours) {
            setError(`Booking duration cannot exceed ${maxHours} hours.`);
            return false;
        }
        setError(null);
        return true;
    };

    const handleBookingConfirm = () => {
        if (validateTime()) {
            // Process the booking time here
            alert(`Booking Confirmed for ${bookingTime.hours} hours and ${bookingTime.minutes} minutes!`);
        }
    };

    return (
        <div 
            id="modal-background" 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleBackgroundClick}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-4/12 relative z-20">
                <h2 className="text-xl font-semibold mb-4 text-center">Confirm Your Booking</h2>

                <div className="text-gray-700">
                    <p><strong>Station</strong><br/>{station?.name}</p>
                    <p><strong>Connector Type</strong><br/>{connector?.type}</p>
                    <p><strong>Plug Name</strong><br/> {connector?.plug_name}</p>
                    <p><strong>Power Output</strong><br/>{connector?.power_output} kW</p>
                    <p><strong>Price per kWh</strong><br/> ฿{connector?.price_per_unit}</p>
                </div>

                <div>
                    <p htmlFor="hours" className="block text-gray-700"><strong>Booking Duration</strong></p>
                    <div className="flex space-x-2 mt-2 justify-center">
                        <input
                            id="hours"
                            name="hours"
                            type="number"
                            min="0"
                            max={maxHours}
                            value={bookingTime.hours}
                            onChange={handleTimeChange}
                            className="px-3 py-2 border rounded-md w-16"
                            placeholder="Hours"
                        />
                        <span className="text-sm text-gray-600">hours</span>

                        <input
                            id="minutes"
                            name="minutes"
                            type="number"
                            min="0"
                            max="59"
                            value={bookingTime.minutes}
                            onChange={handleTimeChange}
                            className="px-3 py-2 border rounded-md w-16"
                            placeholder="Minutes"
                        />
                        <span className="text-sm text-gray-600">minutes</span>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                <p className="mt-4 text-sm text-gray-600">
                    Please review the details before confirming your booking.
                </p>

                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-custom-green text-white rounded hover:bg-green-600"
                        onClick={handleBookingConfirm}
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookingModal;
