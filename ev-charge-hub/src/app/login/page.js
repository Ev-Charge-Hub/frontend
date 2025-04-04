// src/app/login/page.js
"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { getToken, setToken } from '@/utils/tokenManager';
import { loginUser } from '@/services/authService';
import { useAuth } from "@/utils/authContext";
import { useEffect } from 'react';

function Page() {
  const { isAuthenticated, username, login, logout, loading } = useAuth();
  const [formData, setFormData] = useState({
    username_or_email: "", 
    password: ""
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (getToken()) {
      console.log("Token found, redirecting to find-ev-station");
      router.push('/find-ev-station');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!formData.username_or_email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const data = await loginUser(formData.username_or_email, formData.password);
      if (data) {
        setToken(data.token);
        login(data)
        router.push('/find-ev-station');
      }
    } catch (error) {
      console.log("Login error details:", error);
      setError(error.message || "Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-white p-4'>
      <div className='bg-white p-8 rounded-xl w-full max-w-md shadow-sm border border-gray-100'>
        <div className='text-center mb-8'>
          <div className='flex justify-center mb-4'>
            <div className='w-16 h-16 rounded-full bg-[#00AB82] flex items-center justify-center'>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 3L4 14H13L11 21L20 10H11L13 3Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <h1 className='text-[#00AB82] text-3xl font-bold mb-1'>EV Charge Hub</h1>
          <h2 className='text-gray-800 text-2xl font-bold'>Sign In</h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="username_or_email">
              Username or Email
            </label>
            <input
              id="username_or_email"
              name="username_or_email"
              placeholder='Enter your username or email'
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AB82] text-gray-800'
              value={formData.username_or_email}
              onChange={handleChange}
            />
          </div>

          <div className='mb-6'>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type='password'
              placeholder='Enter your password'
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AB82] text-gray-800'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className='w-full py-3 rounded-lg text-white font-bold transition duration-200 ease-in-out bg-[#00AB82] hover:bg-[#00956f]'
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className='mt-6 text-center text-gray-600'>
            Don't have an account yet?{' '}
            <Link href='/register' className='text-[#00AB82] font-semibold hover:underline'>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
