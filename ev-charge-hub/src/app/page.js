"use client";

import React from "react";
import HomeNavbar from "@/components/HomeNavBar";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

function Home() {
  return (
    <div className="min-h-screen">
      <HomeNavbar />
      <main>
        <HeroSection />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}

export default Home;