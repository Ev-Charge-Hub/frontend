import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const HomeNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                        <Link href="login"><button className="bg-custom-green hover:opacity-80 px-4 py-2 text-white rounded">Sign In</button></Link>
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
                        <Link href="login"><button className="w-full bg-custom-green hover:opacity-80 px-4 py-2 text-white rounded">Sign In</button></Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default HomeNavbar;
