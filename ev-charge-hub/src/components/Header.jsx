import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/authContext';

function Header({ onFilterButtonClick, activeFilter, onBookmarkButtonClick, activeBookmark }) {

  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleFilterButtonClick = (state) => {
    onBookmarkButtonClick(false);
    onFilterButtonClick(true);
  };

  const handleBookmarkButtonClick = (state) => {
    onFilterButtonClick(false);
    onBookmarkButtonClick(true);
  };

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      logout();
      router.push('/login');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className='bg-white px-6 py-3 drop-shadow-lg absolute z-10 w-full flex items-center justify-between'>
      <div className='flex items-center'>
        <img src="logo.png" className='w-10 h-10 object-contain' />
        <h1 className='text-black font-semibold text-2xl ml-4 hidden sm:block'>Ev Charge Hub</h1>
      </div>

      {/* Centered Search Bar */}
      <div className='flex-grow flex justify-center'>
        <div className='relative'>
          <input
            type="text"
            placeholder='Search for charging station'
            className='bg-gray-100 w-80 h-10 px-6 rounded-md text-sm focus:outline-none'
          />
          <button className='absolute right-3 top-2'>
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

        {/* Bookmark Button */}
        <button
          title='Bookmark'
          className={`rounded-md p-2 flex items-center space-x-2 ${activeBookmark ? 'bg-[#00AB82] text-white' : 'bg-white hover:bg-gray-100'}`}
          onClick={handleBookmarkButtonClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={activeBookmark ? '#FFFFFF' : '#00AB82'}>
            <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
          </svg>
          <span>Bookmark</span>
        </button>

        {/* Auth Button */}
        <button
          title={isAuthenticated ? 'Log out' : 'Log in'}
          className='rounded-md p-2 flex items-center space-x-2 hover:bg-gray-100'
          onClick={handleAuthButtonClick}
        >
          {isAuthenticated ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00AB82">
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
              </svg>
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
