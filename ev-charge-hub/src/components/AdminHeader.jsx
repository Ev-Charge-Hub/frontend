'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/services/authService';
import { stationService } from '@/services/stationService';
import { Menu, X } from 'lucide-react';

function AdminHeader({
  onAddStationButtonClick,
  activeAddStation,
  onEditStationButtonClick,
  activeEditStation,
  isAuthenticated,
  setStationData,
}) {
  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddStationButtonClick = () => {
    onEditStationButtonClick(false);
    onAddStationButtonClick(true);
    setIsMenuOpen(false);
  };

  const handleEditStationButtonClick = () => {
    onAddStationButtonClick(false);
    onEditStationButtonClick(true);
    setIsMenuOpen(false);
  };

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      logoutUser();
      router.push('/login');
    } else {
      router.push('/login');
    }
    setIsMenuOpen(false);
  };

  const handleSearch = async () => {
    const search = {
      search: searchText || undefined,
    };
    const data = await stationService.filterStations(search);
    setStationData(data);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='bg-white px-4 sm:px-6 py-3 drop-shadow-lg fixed top-0 left-0 w-full flex items-center justify-between z-10'>
      {/* Logo */}
      <div className='flex items-center'>
        <img src="logo.png" className='w-10 h-10 object-contain' alt="Logo" />
        <h1 className='text-black font-semibold text-2xl ml-4 hidden sm:block'>EvChargeHub</h1>
      </div>

      {/* Search */}
      <div className='flex-grow flex justify-center'>
        <div className='relative'>
          <input
            type="text"
            placeholder='Search for charging station'
            className='bg-gray-100 w-80 h-10 px-6 rounded-md text-sm focus:outline-none'
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className='absolute right-3 top-2' onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="px-2 py-1 rounded-md hover:bg-gray-100 text-gray-800">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className='hidden md:flex md:items-center md:space-x-4'>
        <button
          className={`rounded-md p-2 flex items-center space-x-2 ${activeAddStation ? 'bg-[#00AB82] text-white' : 'bg-white hover:bg-gray-100'}`}
          onClick={handleAddStationButtonClick}
        >
          <svg className="lucide lucide-square-plus" width="24" height="24" fill="none" stroke={activeAddStation ? '#FFFFFF' : '#00AB82'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
          <span>Add Station</span>
        </button>

        <button
          className={`rounded-md p-2 flex items-center space-x-2 ${activeEditStation ? 'bg-[#00AB82] text-white' : 'bg-white hover:bg-gray-100'}`}
          onClick={handleEditStationButtonClick}
        >
          <svg className="lucide lucide-pencil" width="24" height="24" fill="none" stroke={activeEditStation ? '#FFFFFF' : '#00AB82'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z" />
            <path d="m15 5 4 4" />
          </svg>
          <span>Edit Station</span>
        </button>

        <button
          title={isAuthenticated ? 'Log out' : 'Log in'}
          className='rounded-md p-2 flex items-center space-x-2 hover:bg-gray-100'
          onClick={handleAuthButtonClick}
        >
          {isAuthenticated ? (
            <>
              <svg width="24" height="24" fill="none" stroke="#00AB82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              <span>Log Out</span>
            </>
          ) : (
            <>
              <svg width="24" height="24" viewBox="0 -960 960 960" fill="#00AB82">
                <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
              </svg>
              <span>Log In</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 z-20 space-y-4">
          <button onClick={handleAddStationButtonClick} className="w-full text-center p-2 hover:bg-gray-100">Add Station</button>
          <button onClick={handleEditStationButtonClick} className="w-full text-center p-2 hover:bg-gray-100">Edit Station</button>
          <button onClick={handleAuthButtonClick} className="w-full text-center p-2 hover:bg-gray-100">
            {isAuthenticated ? 'Log Out' : 'Log In'}
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminHeader;
