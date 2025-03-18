// src/app/admin/layout.js
"use client"
import React from 'react';
import Header from '@/components/Header';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default Layout;