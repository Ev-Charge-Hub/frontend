"use client";

import React from "react";
import HomeNavbar from "@/components/HomeNavBar";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import { useAuth } from "@/utils/authContext";

function Home() {
  const { isAuthenticated, username, login, logout, loading } = useAuth();
  return (
    <div className="min-h-screen">
      <HomeNavbar isAuthenticated={isAuthenticated} />
      <main>
        <HeroSection />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}

export default Home;