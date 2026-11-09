import React, { useState } from 'react';
import { Menu, X, CalendarCheck, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface NavbarProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAdmin,
  isAdminLoggedIn
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Menu & Offerings', href: '#menu' },
    { label: 'Our Heritage', href: '#heritage' },
    { label: 'Guest Reviews', href: '#reviews' },
    { label: 'Location & Hours', href: '#location' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 transition-colors bg-[#111827]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Zone: 1 clean text wordmark with Emerald emblem */}
        <a
          href="#"
          className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded-xl p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#059669]/30 via-[#10B981]/20 to-transparent border border-[#10B981]/40 flex items-center justify-center text-[#10B981] font-bold text-xl shadow-[0_0_16px_rgba(16,185,129,0.25)] group-hover:border-[#34D399] group-hover:shadow-[0_0_24px_rgba(52,211,153,0.4)] transition-all">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#F8FAFC] group-hover:text-[#34D399] transition-colors leading-tight">
              {BUSINESS_INFO.name}
            </span>
            <span className="text-[11px] text-[#10B981] tracking-wider font-semibold uppercase">
              EST. 1997 · HYDERABAD
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links for Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#94A3B8]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="hover:text-[#34D399] transition-colors cursor-pointer py-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
            title="Open Admin Management Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Admin Portal</span>
            {isAdminLoggedIn && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] ml-0.5" />
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Conversion CTA: Emerald Green */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#059669] hover:bg-[#047857] active:scale-[0.98] rounded-xl shadow-[0_4px_20px_rgba(5,150,105,0.45)] hover:shadow-[0_0_24px_rgba(16,185,129,0.45)] transition-all cursor-pointer whitespace-nowrap border border-emerald-400/30"
          >
            <CalendarCheck className="w-4 h-4 text-white" />
            <span>Reserve Table</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => onOpenBooking()}
            className="sm:hidden px-3 py-2 text-xs font-bold text-white bg-[#059669] hover:bg-[#047857] rounded-lg transition-colors cursor-pointer"
          >
            Reserve
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#1E293B]/80 border border-white/10 text-slate-200 hover:text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#34D399]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-modal border-b border-white/10 px-5 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200 bg-[#1E293B]/95">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-3 px-3 rounded-lg text-[#F8FAFC] hover:bg-white/5 hover:text-[#34D399] transition-colors text-base font-medium min-h-[44px] flex items-center"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-left py-3 px-3 rounded-lg text-[#94A3B8] hover:bg-white/5 hover:text-[#34D399] transition-colors text-base font-medium min-h-[44px] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                Admin Management Portal
              </span>
              {isAdminLoggedIn ? (
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Logged In</span>
              ) : (
                <span className="text-xs text-slate-400">Restricted</span>
              )}
            </button>
          </div>

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 px-4 text-sm font-bold text-white bg-[#059669] hover:bg-[#047857] rounded-xl shadow-[0_4px_20px_rgba(5,150,105,0.45)] transition-transform active:scale-[0.99] flex items-center justify-center gap-2 min-h-[44px] border border-emerald-400/30"
            >
              <CalendarCheck className="w-4 h-4 text-white" />
              <span>Book / Reserve a Table</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
