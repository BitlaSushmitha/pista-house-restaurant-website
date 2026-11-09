import React, { useState } from 'react';
import { Star, CalendarCheck, Utensils, CheckCircle2, Award, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import heroBiryaniImg from '../assets/images/hero_pista_house_biryani_1793977955483.jpg';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreMenu }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24 bg-[#111827]">
      {/* Ambient background glow highlights (Emerald Green & Subtle Mint) */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#10B981]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#059669]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Content & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Trust Kicker & Rating Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#059669]/15 border border-[#10B981]/30 text-[#34D399]">
                <Award className="w-4 h-4 text-[#10B981]" />
                <span className="font-semibold tracking-wide">GI-Tagged Haleem Heritage</span>
              </div>

              <div className="flex items-center gap-2 text-[#94A3B8]">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/40 text-amber-400/40'}`}
                    />
                  ))}
                </div>
                <span className="font-bold text-[#F8FAFC] font-mono tabular-nums">{BUSINESS_INFO.rating}</span>
                <span className="text-[#94A3B8] text-xs">({BUSINESS_INFO.reviewCount.toLocaleString()} Google Reviews)</span>
              </div>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.15] [text-wrap:balance]">
              Hyderabad’s Legendary Royal Dining & Celebrated Haleem.
            </h1>

            {/* Subhead / Value Proposition */}
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Indulge in authentic Nizami Zafrani Dum Biryani slow-cooked in sealed copper handis,
              our world-renowned GI-tagged Haleem, and artisanal Osmania bakery treats crafted daily
              with 100% pure desi ghee.
            </p>

            {/* Verified Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#F8FAFC]">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>100% Pure Desi Ghee</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#F8FAFC]">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Certified Halal Meats</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#F8FAFC] col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Grand AC Family Dining</span>
              </div>
            </div>

            {/* CTA Buttons: Emerald Green Primary & Deep Slate Secondary */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-white bg-[#059669] hover:bg-[#047857] rounded-xl shadow-[0_8px_30px_rgba(5,150,105,0.45)] hover:shadow-[0_0_28px_rgba(16,185,129,0.45)] active:scale-[0.98] transition-all cursor-pointer min-h-[52px] border border-emerald-400/30"
              >
                <CalendarCheck className="w-5 h-5 text-white" />
                <span>Book a Table / Reserve</span>
              </button>

              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-[#F8FAFC] bg-[#1E293B]/70 hover:bg-[#1E293B] rounded-xl border border-emerald-500/40 hover:border-emerald-400 hover:text-emerald-300 transition-all cursor-pointer min-h-[52px]"
              >
                <Utensils className="w-5 h-5 text-[#10B981]" />
                <span>Explore Offerings</span>
              </button>
            </div>

            {/* Operating info strip */}
            <div className="pt-2 text-xs text-[#94A3B8] flex items-center justify-center lg:justify-start gap-2">
              <Clock className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Dine-in Open Daily 11:00 AM – 11:00 PM · Instant Table Confirmation</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glass decorative halo with emerald glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#059669]/30 via-[#10B981]/20 to-transparent rounded-3xl blur-xl opacity-75" />

              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1E293B]/90 shadow-2xl">
                {!imgError ? (
                  <img
                    src={heroBiryaniImg}
                    alt="Authentic Hyderabadi Zafrani Dum Biryani in copper handi at Pista House"
                    referrerPolicy="no-referrer"
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgError(true)}
                    className={`w-full aspect-[4/3] object-cover object-center transition-all duration-700 ${
                      imgLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-90'
                    }`}
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#111827] via-[#1E293B] to-slate-900 flex flex-col items-center justify-center p-8 text-center">
                    <Utensils className="w-16 h-16 text-[#10B981] mb-3" />
                    <span className="text-2xl font-bold text-[#F8FAFC]">Authentic Zafrani Dum Biryani</span>
                    <span className="text-xs text-[#94A3B8] mt-1">Slow cooked in copper handi with pure desi ghee</span>
                  </div>
                )}

                {/* Overlaid glass badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-modal border border-white/15 text-left flex items-center justify-between gap-3 bg-[#111827]/90">
                  <div>
                    <div className="text-[11px] font-semibold text-[#34D399] uppercase tracking-wider">
                      Signature Heritage Dish
                    </div>
                    <div className="text-sm font-bold text-[#F8FAFC]">
                      Zafrani Dum Pukht Biryani
                    </div>
                    <div className="text-xs text-[#94A3B8]">
                      Slow-cooked in sealed copper handi with Kashmiri saffron
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-[#94A3B8]">From</div>
                    <div className="text-lg font-bold text-[#10B981] font-mono tabular-nums">
                      ₹360
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
