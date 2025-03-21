// Header.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/utils/authContext';
import { removeToken } from '@/utils/tokenManager';

function Header() {
  const [activeFilterButton, setActiveFilterButton] = useState(false);
  const [activeBookmarkButton, setActiveBookmarkButton] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're in the admin section
  const isAdminPage = pathname?.startsWith('/admin');

  const handleFilterButtonClick = (state) => {
    setActiveBookmarkButton(false);
    setActiveFilterButton(state);
  };

  const handleBookmarkButtonClick = (state) => {
    setActiveFilterButton(false);
    setActiveBookmarkButton(state);
  };

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      // User is logged in, so log them out
      logout();
      router.push('/login');
    } else {
      // User is not logged in, redirect to login
      router.push('/login');
    }
  };

  return (
    <div className='bg-white px-4 py-4 drop-shadow-sm'>
      <div className='flex'>
        <Link href="/">
          <img src="/logo.png" className='w-8 h-8' alt="Logo" />
        </Link>

        {/* If in admin page, show a title instead of search */}
        {isAdminPage ? (
          <div className='flex items-center ml-6 text-[#00AB82] font-bold'>
            Admin Dashboard
          </div>
        ) : (
          <input type="text" placeholder='Search' className='bg-gray-100 w-full h-8 px-7 mx-6 rounded-2xl' />
        )}

        {/* Only show these buttons if not in admin page */}
        {!isAdminPage && (
          <>
            <Link href={activeFilterButton === true ? '/' : '/filter'} title='filter' className={`mx-1 rounded-full px-1 content-center ${activeFilterButton === true ? 'bg-[#00AB82] text-white' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => handleFilterButtonClick(!activeFilterButton)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={activeFilterButton === true ? '#FFFFFF' : '#00AB82'}><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" /></svg>
            </Link>
            <button title='book mark' className={`mx-1 rounded-full px-1 ${activeBookmarkButton === true ? 'bg-[#00AB82] text-white' : 'bg-white hover:bg-gray-100'}`} onClick={() => handleBookmarkButtonClick(!activeBookmarkButton)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={activeBookmarkButton === true ? '#FFFFFF' : '#00AB82'}><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" /></svg>
            </button>
          </>
        )}

        {/* Show admin panel link if admin */}
        {isAuthenticated && !isAdminPage && (
          <Link href="/admin" title='Admin Panel' className='mx-1 hover:bg-gray-100 rounded-full px-1'>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00AB82">
              <path d="M560-440q33 0 56.5-23.5T640-520q0-33-23.5-56.5T560-600q-33 0-56.5 23.5T480-520q0 33 23.5 56.5T560-440ZM280-440q33 0 56.5-23.5T360-520q0-33-23.5-56.5T280-600q-33 0-56.5 23.5T200-520q0 33 23.5 56.5T280-440Zm280 120q-66 0-113 47t-47 113v40h320v-40q0-66-47-113t-113-47Zm-280 0q-66 0-113 47t-47 113v40h320v-40q0-66-47-113t-113-47Zm0 80q39 0 67.5 24t35.5 62h-206q7-38 35.5-62t67.5-24Zm280 0q39 0 67.5 24t35.5 62h-206q7-38 35.5-62t67.5-24Zm0-320q13 0 21.5 8.5T590-520q0 13-8.5 21.5T560-490q-13 0-21.5-8.5T530-520q0-13 8.5-21.5T560-550Zm-280 0q13 0 21.5 8.5T310-520q0 13-8.5 21.5T280-490q-13 0-21.5-8.5T250-520q0-13 8.5-21.5T280-550ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
            </svg>
          </Link>
        )}

        <button
          title={isAuthenticated ? 'log out' : 'log in'}
          className='mx-1 hover:bg-gray-100 rounded-full px-1'
          onClick={handleAuthButtonClick}
        >
          {isAuthenticated ? (
            // Logout icon
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00AB82">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          ) : (
            // Login icon
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00AB82">
              <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;