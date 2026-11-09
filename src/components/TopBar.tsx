import React, { useMemo } from 'react';
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const TopBar: React.FC = () => {
  // Check if currently within operating hours (11 AM to 11 PM)
  const isCurrentlyOpen = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= BUSINESS_INFO.openHour && currentHour < BUSINESS_INFO.closeHour;
  }, []);

  return (
    <div className="w-full bg-[#0D1522] border-b border-white/10 text-xs text-[#94A3B8] py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        {/* Left: Operating status & Address */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <div className="inline-flex items-center gap-2 font-medium">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                isCurrentlyOpen ? 'bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-emerald-600'
              }`}
            />
            <span className={isCurrentlyOpen ? 'text-emerald-400 font-semibold' : 'text-emerald-300 font-semibold'}>
              {isCurrentlyOpen ? 'Open Now' : 'Opens 11:00 AM'}
            </span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="text-[#94A3B8] hidden sm:inline flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 inline text-[#10B981]" />
              11:00 AM – 11:00 PM
            </span>
          </div>

          <a
            href={BUSINESS_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#F8FAFC] hover:text-[#34D399] transition-colors truncate max-w-[260px] sm:max-w-none group"
            title="View on Google Maps"
          >
            <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate">Boduppal / Uppal Corridor, Hyderabad</span>
          </a>
        </div>

        {/* Right: Direct Phone & WhatsApp CTAs */}
        <div className="flex items-center gap-3 shrink-0 ml-auto sm:ml-0">
          <a
            href={`tel:${BUSINESS_INFO.phonePrimary}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#F8FAFC] hover:text-[#34D399] transition-colors border border-white/10 active:scale-95"
            aria-label="Call Pista House"
          >
            <Phone className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="font-mono text-[11px] sm:text-xs font-medium">{BUSINESS_INFO.phonePrimary}</span>
          </a>

          <a
            href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(
              'Hello Pista House! I would like to inquire about table reservations & menu specials.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 transition-colors border border-emerald-500/30 active:scale-95"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] sm:text-xs font-semibold">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
