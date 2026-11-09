import React from 'react';
import { Phone, MessageCircle, MapPin, Mail, Clock, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  return (
    <footer className="bg-[#0D1522] border-t border-white/10 text-[#94A3B8] text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#059669]/30 via-[#10B981]/20 to-transparent border border-[#10B981]/40 flex items-center justify-center text-[#10B981] font-bold text-xl shadow-[0_0_16px_rgba(16,185,129,0.25)]">
                P
              </div>
              <div>
                <span className="text-2xl font-bold text-[#F8FAFC] tracking-tight">
                  {BUSINESS_INFO.name}
                </span>
                <div className="text-[11px] text-[#10B981] font-semibold tracking-wider">
                  BAKERY, RESTAURANT & CAFE
                </div>
              </div>
            </div>

            <p className="text-[#94A3B8] text-xs leading-relaxed max-w-sm">
              Hyderabad’s culinary landmark since 1997. World-renowned for GI-tagged authentic Haleem,
              slow-cooked Zafrani Dum Pukht Biryani, and fresh artisanal bakery delights.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-[#1E293B] border border-white/10 text-[#F8FAFC]">
                100% Pure Desi Ghee
              </span>
              <span className="px-2.5 py-1 rounded bg-[#1E293B] border border-white/10 text-[#F8FAFC]">
                Halal Certified
              </span>
              <span className="px-2.5 py-1 rounded bg-[#1E293B] border border-white/10 text-[#F8FAFC]">
                GI Tag Certified
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold text-[#F8FAFC] uppercase tracking-wider">
              Quick Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-[#34D399] transition-colors">
                  Menu & Offerings
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-[#34D399] transition-colors">
                  Our Culinary Heritage
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#34D399] transition-colors">
                  Guest Reviews
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#34D399] transition-colors">
                  Location & Driving Map
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-[#10B981] hover:text-[#34D399] hover:underline font-semibold cursor-pointer"
                >
                  Book a Table
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-[#F8FAFC] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Operating Hours</span>
            </div>
            <div className="space-y-2 text-xs text-[#94A3B8]">
              <div>
                <div className="text-[#F8FAFC] font-medium">Restaurant Dine-in:</div>
                <div className="text-[#94A3B8]">11:00 AM – 11:00 PM (Daily)</div>
              </div>
              <div>
                <div className="text-[#F8FAFC] font-medium">Bakery & Irani Chai:</div>
                <div className="text-[#94A3B8]">08:00 AM – 11:30 PM (Daily)</div>
              </div>
              <div className="text-[11px] text-[#10B981] pt-1 font-medium">
                Open All 7 Days a week including national holidays.
              </div>
            </div>
          </div>

          {/* Contact Details & Direct Actions */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-[#F8FAFC] uppercase tracking-wider">
              Contact & Directions
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span className="text-[#F8FAFC] leading-relaxed">
                  {BUSINESS_INFO.address}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#10B981] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phonePrimary}`} className="text-[#F8FAFC] hover:text-[#34D399] font-mono">
                  {BUSINESS_INFO.phonePrimary}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#10B981] shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="text-[#94A3B8] hover:text-[#F8FAFC]">
                  {BUSINESS_INFO.email}
                </a>
              </div>

              {/* Direct Call & WhatsApp Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`tel:${BUSINESS_INFO.phonePrimary}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-[#F8FAFC] hover:text-[#34D399] text-center font-medium border border-white/10 flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/${BUSINESS_INFO.phoneRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 text-center font-medium border border-emerald-500/30 flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal Link */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div>
            © {new Date().getFullYear()} {BUSINESS_INFO.name} ({BUSINESS_INFO.legalName}). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#34D399] transition-colors"
            >
              Google Maps Listing
            </a>
            <span className="text-slate-700">·</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-[#94A3B8] hover:text-[#34D399] transition-colors cursor-pointer py-1 px-2 rounded hover:bg-white/5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Staff Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
