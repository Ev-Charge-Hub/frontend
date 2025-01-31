"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

function LayoutProvider({ children }) {
    const pathName = usePathname();
    const noLayoutPath = ["/admin"];
    return (
        <>
            {noLayoutPath.includes(pathName) ? (
                children
            ) : (
                <>
                    <Header />
                    <main>{children}</main>
                </>
            )}
        </>
    )
}

export default LayoutProvider