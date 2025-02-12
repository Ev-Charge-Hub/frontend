"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

function LayoutProvider({ children }) {
    const pathName = usePathname();
    const noLayoutPath = ["/admin", "/login"];
    return (
        <>
            {noLayoutPath.includes(pathName) ? (
                children
            ) : (
                <>
                    <Header />
                    <main className='container bg-yellow-100'>{children}</main>
                </>
            )}
        </>
    )
}

export default LayoutProvider