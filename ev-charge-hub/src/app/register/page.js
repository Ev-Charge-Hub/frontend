"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { registerUser } from '@/services/authService';
import { useRouter } from 'next/navigation';

function Page() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if passwords match
        if (password !== verifyPassword) {
            setError("Passwords do not match");
            setSuccessMessage(null);
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            setSuccessMessage(null);
            return;
        }

        try {        
            const response = await registerUser(username, email, password, role);
            setSuccessMessage(response.message);
            setError(null);
            router.push("/login")
        } catch (err) {
            setError("Failed to register. Please try again.");
            setSuccessMessage(null);
        }
        
    };

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <form className='text-center' onSubmit={handleSubmit}>
                <div className='flex w-full justify-center my-3'>
                    <img src='logo.png' className='w-9 h-9' alt="Logo" />
                    <div className='text-green-800 text-3xl ml-3'>Ev Charge Hub</div>
                </div>
                <div className='flex flex-col my-1 items-center w-full'>
                    <input 
                        placeholder='Username' 
                        className='bg-gray-100 w-64 h-8 px-7 rounded-2xl my-2' 
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username}
                    />
                    <input 
                        placeholder='Email' 
                        className='bg-gray-100 w-64 h-8 px-7 rounded-2xl my-2' 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                    />
                    <input 
                        placeholder='Password' 
                        type='password' 
                        className='bg-gray-100 w-64 h-8 px-7 rounded-2xl my-2' 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                    />
                    <input 
                        placeholder='Verify Password' 
                        type='password' 
                        className='bg-gray-100 w-64 h-8 px-7 rounded-2xl my-2' 
                        onChange={(e) => setVerifyPassword(e.target.value)} 
                        value={verifyPassword}
                    />
                </div>
                <button type="submit" className='bg-custom-green w-64 px-7 py-1 mx-6 rounded-2xl text-white'>Register</button>
                {successMessage && <div className="text-green-600">{successMessage}</div>}
                {error && <div className="text-red-600">{error}</div>}
                <div className='my-2'>
                    Already have an account?
                    <Link href='/login' className='ml-2 text-blue-600'>Log In</Link>
                </div>
            </form>
        </div>
    )
}

export default Page
