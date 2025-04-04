import React from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/services/authService';
import { useState } from 'react';
import { stationService } from '@/services/stationService';

function AdminHeader({ onAddStationButtonClick, activeAddStation, onEditStationButtonClick, activeEditStation, isAuthenticated, setStationData }) {

  const router = useRouter();

  const handleAddStationButtonClick = (state) => {
    onEditStationButtonClick(false);
    onAddStationButtonClick(true);
  };

  const handleEditStationButtonClick = (state) => {
    onAddStationButtonClick(false);
    onEditStationButtonClick(true);
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

      <div className='hidden md:flex md:items-center md:space-x-4'>
        <button
          title='Filter'
          className={`rounded-md p-2 flex items-center space-x-2 ${activeAddStation ? 'bg-[#00AB82] text-white' : 'bg-white hover:bg-gray-100'}`}
          onClick={handleAddStationButtonClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={activeAddStation ? '#FFFFFF' : '#00AB82'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-plus-icon lucide-square-plus"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
          <span>Add Station</span>
        </button>
        <button
          title='My Booking'
          className={`rounded-md p-2 flex items-center space-x-2 ${activeEditStation ? 'bg-[#00AB82] text-white' : 'bg-white hover:bg-gray-100'}`}
          onClick={handleEditStationButtonClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={activeEditStation ? '#FFFFFF' : '#00AB82'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
          <span>Edit Station</span>
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

export default AdminHeader;
