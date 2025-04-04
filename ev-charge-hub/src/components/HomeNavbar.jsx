"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/services/authService';

const HomeNavbar = ({ isAuthenticated }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);  // ใช้ useState เพื่อควบคุมการแสดงเมนู
    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);  // สลับสถานะการเปิดปิดเมนู
    };

    const handleAuthButtonClick = () => {
        if (isAuthenticated) {
            logoutUser();
            router.push('/login');
        } else {
            router.push('/login');
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
            <div className="container mx-auto px-4 md:px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <img src="logo.png" className="w-10 h-10 object-contain" />
                        <h1 className="text-black font-semibold text-2xl ml-4 hidden sm:block">EvChargeHub</h1>
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="find-ev-station" className="text-gray-700 hover:text-custom-green transition-colors">Find Stations</Link>
                        <button
                            title={isAuthenticated ? 'Log out' : 'Log in'}
                            className='rounded-md p-2 flex items-center space-x-2 hover:bg-gray-100'
                            onClick={handleAuthButtonClick}
                        >
                            {isAuthenticated ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke='#00AB82' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                    <span>Log Out</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00AB82">
                                        <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                                    </svg>
                                    <span>Log In</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="px-2 py-1 rounded-md hover:bg-gray-100 text-gray-800">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden pt-4 pb-2 space-y-4 animate-fade-in">
                        <Link href="find-ev-station" className="block py-2 text-gray-700 hover:text-custom-green transition-colors">Find Stations</Link>
                        {!isAuthenticated && <Link href="login"><button className="block py-2 text-gray-700 hover:text-custom-green transition-colors" onClick={handleAuthButtonClick}>Log In</button></Link>}
                        {isAuthenticated && <Link href="login"><button className="block py-2 text-gray-700 hover:text-custom-green transition-colors" onClick={handleAuthButtonClick}>Log Out</button></Link>}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default HomeNavbar;
