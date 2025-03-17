import React from 'react'
import { useState } from 'react';

function Header({onFilterButtonClick, activeFilter, onBookmarkButtonClick, activeBookmark}) {

  const handleFilterButtonClick = (state) => {
    onBookmarkButtonClick(false);
    onFilterButtonClick(true)
  };

  const handleBookmarkButtonClick = (state) => {
    onFilterButtonClick(false)
    onBookmarkButtonClick(true);
  };

  return (
    <div className='bg-white px-4 py-3 drop-shadow-sm absolute z-10 top-4 right-4 left-4 rounded-full'>
      <div className='flex'>
          <img src="logo.png" className='w-8 h-8 object-contain' />
          <h1 className='text-custom-green font-semibold w-80 pl-3 text-lg hidden sm:block'>Ev Charge Hub</h1>
        <input type="text" placeholder='Search' className='bg-gray-100 w-full h-8 px-7 mx-6 rounded-2xl' />
        <button title='filter' className={`mx-1 rounded-full px-1 content-center ${activeFilter === true ? 'bg-[#00AB82] text-white' : 'bg-white hover:bg-gray-100'}`}
          onClick={handleFilterButtonClick}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={activeFilter === true ? '#FFFFFF' : '#00AB82'}><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" /></svg>
        </button>
        <button title='book mark' className={`mx-1 rounded-full px-1 ${activeBookmark === true ? 'bg-[#00AB82] text-white' : 'bg-white hover:bg-gray-100'}`} onClick={handleBookmarkButtonClick}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={activeBookmark === true ? '#FFFFFF' : '#00AB82'}><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" /></svg>
        </button>
        <button title='log out' className='mx-1 hover:bg-gray-100 rounded-full px-1'>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00AB82"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
        </button>
      </div>
    </div>
  )
}

export default Header