"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { loginUser } from '@/services/authService';
import { useRouter } from 'next/navigation';

function Page() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [token, setToken] = useState("");
  const router = useRouter()

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(username, password);
      setSuccessMessage(response.message);
      setError(null);
      console.log(response.token);
      setToken(response.token)
      router.push("/")
    } catch (err) {
      setError("Failed to log in. Please try again.");
      setSuccessMessage(null);
    }
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <form onSubmit={handleLogin} className='text-center'>
        <div className='flex w-full justify-center my-3'>
          <img src='logo.png' className='w-9 h-9' alt="Logo" />
          <div className='text-green-800 text-3xl ml-3'>Ev Charge Hub</div>
        </div>
        <div className='flex flex-col my-1 items-center w-full'>
          <input placeholder='Username'
            className='bg-gray-100 w-64 h-8 px-7 rounded-2xl my-2'
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
          <input placeholder='Password' type='password'
            className='bg-gray-100 w-64 h-8 px-7 rounded-2xl my-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className='bg-custom-green w-64 px-7 py-1 mx-6 rounded-2xl text-white'>Log In</button>
        <div className='my-2'>
          Don't have an account yet?
          <Link href='/register' className='ml-2 text-blue-600'>Register</Link>
        </div>
      </form>
    </div>
  )
}

export default Page
