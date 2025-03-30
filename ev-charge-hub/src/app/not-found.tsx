'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-purple-300 px-4">
      <div className="bg-white p-14 rounded-3xl shadow-2xl text-center max-w-2xl w-full">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          404
        </h1>
        <h2 className="text-3xl font-bold mt-6 text-gray-800">
          OPPS! PAGE NOT FOUND
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/">
            <span className="px-8 py-4 text-lg bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer transition">
              RETURN HOME
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
