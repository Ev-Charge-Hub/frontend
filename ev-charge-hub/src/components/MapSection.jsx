import React from 'react';
import { MapPin, Search } from 'lucide-react';
import Link from 'next/link';

const MapSection = () => {
    return (
        <section id="find" className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Find Charging Stations Anywhere
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Easily find charging stations along your route or at your destination, filter by connector type, check their real-time availability, estimate charging costs based on your vehicle, and reserve a spot in advance for a seamless experience.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                { title: 'Real-time Availability', desc: 'See which stations are currently in use and which are available.' },
                                { title: 'Charging Price Calculator', desc: "Calculate the cost of charging based on your vehicle's needs." },
                                { title: 'Booking', desc: 'Reserve your charging spot in advance for a seamless experience.' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="mt-1 mr-4 w-6 h-6 rounded-full bg-custom-green flex items-center justify-center text-white">
                                        <span className="text-sm font-bold">{index + 1}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 text-lg font-semibold mb-1">{item.title}</h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link href="/find-ev-station">
                            <button className="bg-custom-green hover:opacity-80 text-white px-6 py-3 rounded-md flex items-center">
                                <Search className="mr-2 h-4 w-4" /> Find Stations Near Me
                            </button>
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="bg-white p-3 rounded-lg shadow-xl">
                            <div className="aspect-video bg-gray-200 rounded-md overflow-hidden relative">
                                <div className="absolute inset-0 bg-[url('/find-ev.png')] bg-contain bg-center bg-no-repeat">
                                    {/* Static map preview image */}
                                </div>
                            </div>



                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
