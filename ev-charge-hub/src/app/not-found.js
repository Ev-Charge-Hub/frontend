"use client"
import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-custom-gray to-custom-green px-4">
      <div className="bg-white p-14 rounded-3xl shadow-2xl text-center max-w-2xl w-full">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-custom-green to-custom-green">
          404
        </h1>
        <h2 className="text-3xl font-bold mt-6 text-gray-800">
          OOPS! PAGE NOT FOUND
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          <a href="/" className="px-8 py-4 text-lg bg-custom-green text-white rounded-full hover:bg-green-300 transition">
            RETURN HOME
          </a>
        </div>
      </div>
    </div>
  );
}
