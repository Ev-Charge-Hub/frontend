import React from 'react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();
  const handleFindNearestStation = () => {
    router.push('/find-ev-station');
  };
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 bg-gradient-to-br from-white to-blue-100">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-green-100 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Power Your Journey With Convenient EV Charging
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find, book, and pay for EV charging stations nationwide. Seamless charging experience for every electric vehicle.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 text-lg rounded-md" onClick={() => handleFindNearestStation()}>
              Find Nearest Station
            </button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>EV Charging Stations in Thailand</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>Compatible With All EVs</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
