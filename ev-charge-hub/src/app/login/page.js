"use client"
import React from 'react'
import Link from 'next/link'

function Page() {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='text-center'>
        <div className='flex w-full justify-center my-3'>
          <img src='logo.png' className='w-9 h-9' alt="Logo" />
          <div className='text-green-800 text-3xl ml-3'>Ev Charge Hub</div>
        </div>
        <div className='flex flex-col my-1 items-center w-full'>
          <input placeholder='Username' className='bg-gray-100 w-64 h-8 px-7 rounded-2xl my-2' />
          <input placeholder='Password' type='password' className='bg-gray-100 w-64 h-8 px-7 rounded-2xl my-2' />
        </div>
        <button type="submit" className='bg-green-700 w-64 px-7 py-1 mx-6 rounded-2xl text-white'>Log In</button>
        <div className='my-2'>
          Don't have an account yet?
          <Link href='/register' className='ml-2 text-blue-600'>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Page
