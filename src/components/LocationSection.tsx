import React from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, Car, Wifi, ShieldCheck, Users } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-16 sm:py-24 relative bg-[#1E293B] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Location & Hours details */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#10B981]/30 text-[#34D399] text-xs font-semibold uppercase tracking-wider mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Visit Our Flagship</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] tracking-tight leading-tight">
                Pista House Boduppal & Uppal
              </h2>
              <p className="mt-2 text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                Conveniently situated along the eastern highway corridor with multi-floor dining,
                dedicated family hall, and ground floor bakery.
              </p>
            </div>

            {/* Address & Hours cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl glass-card border border-white/10 bg-[#111827]/75 space-y-3">
                <div className="flex items-center gap-2 text-[#10B981] font-semibold text-sm">
                  <MapPin className="w-4 h-4 text-[#10B981]" />
                  <span>Physical Address</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F8FAFC] leading-relaxed">
                  {BUSINESS_INFO.address}
                </p>
                <div className="text-xs text-[#34D399] font-medium">
                  Landmark: {BUSINESS_INFO.landmark}
                </div>
              </div>

              <div className="p-5 rounded-xl glass-card border border-white/10 bg-[#111827]/75 space-y-3">
                <div className="flex items-center gap-2 text-[#10B981] font-semibold text-sm">
                  <Clock className="w-4 h-4 text-[#10B981]" />
                  <span>Operational Timings</span>
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>Main Restaurant:</span>
                    <span className="font-mono text-[#F8FAFC] font-medium">11:00 AM – 11:00 PM</span>
                  </div>
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>Bakery & Irani Chai:</span>
                    <span className="font-mono text-[#F8FAFC] font-medium">08:00 AM – 11:30 PM</span>
                  </div>
                  <div className="text-[11px] text-[#10B981] font-medium pt-1">
                    Open All 7 Days · Monday through Sunday
                  </div>
                </div>
              </div>
            </div>

            {/* Contact links with Emerald Green CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold bg-[#059669] hover:bg-[#047857] shadow-[0_4px_20px_rgba(5,150,105,0.45)] hover:shadow-[0_0_24px_rgba(16,185,129,0.45)] transition-all cursor-pointer text-xs sm:text-sm border border-emerald-400/30"
              >
                <Navigation className="w-4 h-4 text-white" />
                <span>Get Driving Directions</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phonePrimary}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-[#F8FAFC] font-medium bg-[#111827]/80 hover:bg-[#111827] border border-white/10 hover:border-emerald-500/40 hover:text-[#34D399] transition-colors text-xs sm:text-sm"
              >
                <Phone className="w-4 h-4 text-[#10B981]" />
                <span>{BUSINESS_INFO.phonePrimary}</span>
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] bg-[#111827]/80 hover:bg-[#111827] border border-white/10 hover:border-emerald-500/40 transition-colors text-xs sm:text-sm"
              >
                <Mail className="w-4 h-4 text-[#10B981]" />
                <span>Email Us</span>
              </a>
            </div>

            {/* Amenities Grid */}
            <div className="pt-2 border-t border-white/10">
              <div className="text-xs uppercase tracking-wider text-[#94A3B8] font-semibold mb-3">
                Guest Amenities & Facilities
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#F8FAFC]">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#10B981]" />
                  <span>Free Valet Parking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#10B981]" />
                  <span>AC Family Hall</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-[#10B981]" />
                  <span>Complimentary Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>100% Halal Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Maps preview card with interactive trigger */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl glass-card border border-white/10 bg-[#111827]/80 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#F8FAFC]">Google Maps Location</h3>
                  <p className="text-xs text-[#94A3B8]">Boduppal / Uppal Junction, Hyderabad</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#059669]/20 text-[#34D399] text-xs font-mono font-semibold border border-emerald-500/30">
                  17.5315° N, 78.8473° E
                </span>
              </div>

              {/* Styled interactive map preview with Emerald glow */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-[#0D1522] flex flex-col items-center justify-center text-center p-6 group">
                <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#059669]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] mb-3 shadow-[0_0_24px_rgba(16,185,129,0.35)] animate-pulse">
                    <MapPin className="w-8 h-8 text-[#10B981]" />
                  </div>
                  <h4 className="text-xl font-bold text-[#F8FAFC]">Pista House</h4>
                  <p className="text-xs text-[#94A3B8] mt-1 max-w-xs">
                    Main Road Boduppal / Uppal Highway Corridor
                  </p>
                  <p className="text-[11px] text-[#34D399] font-mono mt-1 font-semibold">
                    4.3 ★ · 8,450+ Reviews
                  </p>

                  <a
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 px-4 py-2 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-[0_4px_16px_rgba(5,150,105,0.4)] border border-emerald-400/30"
                  >
                    <span>Open in Google Maps</span>
                    <Navigation className="w-3.5 h-3.5 text-white" />
                  </a>
                </div>
              </div>

              <div className="text-xs text-[#94A3B8] text-center">
                Click above to open the exact location, navigation routes, and live traffic on Google Maps.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
