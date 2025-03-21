// src/app/register/page.js
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER'
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log("Registration attempt with data:", {
      ...formData,
      password: "REDACTED",
      confirmPassword: "REDACTED"
    });

    // Form validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    // Validate username length - using 3 as the minimum since that's a common requirement
    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Password length validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/users/register`;
      console.log("Sending registration request to:", url);

      const requestData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "USER"
      };

      console.log("Request payload:", { ...requestData, password: "REDACTED" });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      console.log("Registration response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Registration API error:", errorText);

        // Try to parse the error message to provide a more user-friendly message
        if (errorText.includes("Username") && errorText.includes("min")) {
          throw new Error("Username is too short. Please use a longer username.");
        } else if (errorText.includes("validation")) {
          throw new Error("Validation error: " + errorText);
        } else {
          throw new Error(errorText || 'Registration failed');
        }
      }

      const data = await response.json();
      console.log("Registration successful:", data);

      // Success - redirect to login
      router.push('/login');
    } catch (error) {
      console.error("Registration error details:", error);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
          <h2 className='text-gray-800 text-2xl font-bold'>Create Account</h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className='mb-4'>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
              Username <span className="text-sm text-gray-500">(min. 3 characters)</span>
            </label>
            <input
              id="username"
              name="username"
              placeholder='Choose a username'
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AB82] text-gray-800'
              value={formData.username}
              onChange={handleChange}
              minLength={3}
            />
          </div>

          <div className='mb-4'>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder='Enter your email'
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AB82] text-gray-800'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className='mb-4'>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password <span className="text-sm text-gray-500">(min. 6 characters)</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder='Create a password'
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AB82] text-gray-800'
              value={formData.password}
              onChange={handleChange}
              minLength={6}
            />
          </div>

          <div className='mb-6'>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder='Confirm your password'
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AB82] text-gray-800'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className='w-full py-3 rounded-lg text-white font-bold transition duration-200 ease-in-out bg-[#00AB82] hover:bg-[#00956f]'
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className='mt-6 text-center text-gray-600'>
            Already have an account?{' '}
            <Link href='/login' className='text-[#00AB82] font-semibold hover:underline'>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;