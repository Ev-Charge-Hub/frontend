"use client"
import React, { useState } from 'react'
import Link from 'next/link'

function Page() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [error, setError] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(username, email, password, role);
            
            const response = await registerUser(username, email, password, role);
            // setSuccessMessage(response.message); // Display success message from the server
            // setError(null); // Reset any previous errors
        } catch (err) {
            // setError("Failed to register. Please try again.");
            // setSuccessMessage(null);
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
                    <input placeholder='Username' className='bg-gray-100 w-64 h-8 px-7 rounded-2xl my-2' onChange={(e) => setUsername(e.target.value)} />
                    <input placeholder='Email' className='bg-gray-100 w-64 h-8 px-7 rounded-2xl my-2' onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder='Password' type='password' className='bg-gray-100 w-64 h-8 px-7 rounded-2xl my-2' onChange={(e) => setPassword(e.target.value)} />
                    <input placeholder='Verify Password' type='password' className='bg-gray-100 w-64 h-8 px-7 rounded-2xl my-2' onChange={(e) => setVerifyPassword(e.target.value)} />
                </div>
                <button type="submit" className='bg-green-700 w-64 px-7 py-1 mx-6 rounded-2xl text-white'>Register</button>
                <div className='my-2'>
                    Already have an account?
                    <Link href='/login' className='ml-2 text-blue-600'>Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default Page
