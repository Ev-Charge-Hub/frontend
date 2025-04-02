import React from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/services/authService';
import { useState } from 'react';
import { stationService } from '@/services/stationService';

function Header({ onFilterButtonClick, activeFilter, onBookingButtonClick, activeBooking, isAuthenticated, setStationData }) {

  const router = useRouter();

  const handleFilterButtonClick = (state) => {
    onBookingButtonClick(false);
    onFilterButtonClick(true);
  };

  const handleBookingButtonClick = (state) => {
    onFilterButtonClick(false);
    onBookingButtonClick(true);
  };

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      logoutUser();
      router.push('/login');
    } else {
      router.push('/login');
    }
  };

  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    const search = {
      search: searchText || undefined,
    };
    const data = await stationService.filterStations(search);
    setStationData(data)
  };

  return (
    <div className='bg-white px-4 sm:px-6 py-3 drop-shadow-lg fixed top-0 left-0 w-full flex items-center justify-between z-10'>
      <div className='flex items-center'>
        <img src="logo.png" className='w-10 h-10 object-contain' />
        <h1 className='text-black font-semibold text-2xl ml-4 hidden sm:block'>EvChargeHub</h1>
      </div>

      {/* Centered Search Bar */}
      <div className='flex-grow flex justify-center'>
        <div className='relative'>
          <input
            type="text"
            placeholder='Search for charging station'
            className='bg-gray-100 w-80 h-10 px-6 rounded-md text-sm focus:outline-none'
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className='absolute right-3 top-2' onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
      </div>

      <div className='flex items-center space-x-4'>
        {/* Filter Button */}
        <button
          title='Filter'
          className={`rounded-md p-2 flex items-center space-x-2 ${activeFilter ? 'bg-[#00AB82] text-white' : 'bg-white hover:bg-gray-100'}`}
          onClick={handleFilterButtonClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={activeFilter ? '#FFFFFF' : '#00AB82'}>
            <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
          </svg>
          <span>Filter</span>
        </button>

        {/* Booking Button */}
        <button
          title='My Booking'
          className={`rounded-md p-2 flex items-center space-x-2 ${activeBooking ? 'bg-[#00AB82] text-white' : 'bg-white hover:bg-gray-100'}`}
          onClick={handleBookingButtonClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={activeBooking ? '#FFFFFF' : '#00AB82'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big-icon lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg>
          <span>My Booking</span>
        </button>

        {/* Auth Button */}
        <button
          title={isAuthenticated ? 'Log out' : 'Log in'}
          className='rounded-md p-2 flex items-center space-x-2 hover:bg-gray-100'
          onClick={handleAuthButtonClick}
        >
          {isAuthenticated ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke='#00AB82' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
              <span>Log Out</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00AB82">
                <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
              </svg>
              <span>Log In</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;
