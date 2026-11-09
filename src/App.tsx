import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { HeritageSection } from './components/HeritageSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { BookingModal } from './components/BookingModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { MenuItem } from './types';
import { CalendarCheck } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'client' | 'admin'>('client');
  
  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<string | undefined>(undefined);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  const handleOpenBooking = (serviceName?: string) => {
    setPreSelectedService(serviceName);
    setIsBookingModalOpen(true);
  };

  const handleSelectServiceFromMenu = (item: MenuItem) => {
    handleOpenBooking(item.name);
  };

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setCurrentView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminLoginModalOpen(false);
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentView('client');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseAdminView = () => {
    setCurrentView('client');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // If in Admin Management Mode:
  if (currentView === 'admin') {
    return (
      <AdminPortal
        onLogout={handleAdminLogout}
        onClose={handleCloseAdminView}
      />
    );
  }

  // Customer-Facing Experience
  return (
    <div className="min-h-screen bg-[#111827] text-[#F8FAFC] flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* 2.1 Top Bar */}
      <TopBar />

      {/* Main Glass Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2.2 Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreMenu={handleExploreMenu}
        />

        {/* 2.3 Services / Offerings Grid */}
        <MenuSection onSelectServiceToBook={handleSelectServiceFromMenu} />

        {/* Heritage & Authentic GI-Tagged Haleem Story */}
        <HeritageSection />

        {/* Real Customer Reviews from Google Maps */}
        <ReviewsSection />

        {/* Location & Operating Hours */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Interactive Booking / Reservation Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preSelectedServiceName={preSelectedService}
      />

      {/* Protected Admin Login Gate Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Floating Quick Reservation CTA for Mobile devices with Emerald Green */}
      <div className="fixed bottom-4 right-4 z-30 sm:hidden">
        <button
          onClick={() => handleOpenBooking()}
          className="p-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-bold shadow-[0_4px_24px_rgba(5,150,105,0.6)] flex items-center gap-2 active:scale-95 transition-all border border-emerald-400/40"
          aria-label="Book a Table"
        >
          <CalendarCheck className="w-5 h-5 text-white" />
          <span className="text-xs pr-1 font-bold">Reserve</span>
        </button>
      </div>
    </div>
  );
}
