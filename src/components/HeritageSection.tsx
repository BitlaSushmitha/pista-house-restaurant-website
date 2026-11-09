import React from 'react';
import { Award, Flame, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import haleemImg from '../assets/images/dish_hyderabadi_haleem_1793977955961.jpg';
import osmaniaImg from '../assets/images/dish_bakery_osmania_1793977955921.jpg';

export const HeritageSection: React.FC = () => {
  return (
    <section id="heritage" className="py-16 sm:py-24 relative overflow-hidden bg-[#1E293B] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Trio Showcase */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group aspect-[4/5] bg-[#111827] shadow-xl">
                <img
                  src={haleemImg}
                  alt="Pista House GI Tagged Haleem"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/30 to-transparent flex flex-col justify-end p-4">
                  <div className="text-[11px] font-semibold text-[#34D399]">GI-Certified Legend</div>
                  <div className="text-sm font-bold text-[#F8FAFC]">World-Famous Haleem</div>
                </div>
              </div>

              <div className="p-4 rounded-xl glass-card border border-white/10 text-center bg-[#111827]/60">
                <div className="text-2xl font-bold text-[#10B981] font-mono">1997</div>
                <div className="text-xs text-[#94A3B8] font-medium">Culinary Legacy Began in Hyderabad</div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 rounded-xl glass-card border border-white/10 text-center bg-[#111827]/60">
                <div className="text-2xl font-bold text-[#10B981] font-mono">100%</div>
                <div className="text-xs text-[#94A3B8] font-medium">Pure Desi Ghee & Halal Meats</div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10 group aspect-[4/5] bg-[#111827] shadow-xl">
                <img
                  src={osmaniaImg}
                  alt="Authentic Osmania Biscuits and Irani Chai"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/30 to-transparent flex flex-col justify-end p-4">
                  <div className="text-[11px] font-semibold text-[#34D399]">Fresh Daily Bakery</div>
                  <div className="text-sm font-bold text-[#F8FAFC]">Osmania Biscuits & Chai</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Legacy Text */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#10B981]/30 text-[#34D399] text-xs font-semibold uppercase tracking-wider w-fit">
              <Award className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Royal Heritage Since 1997</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight [text-wrap:balance]">
              Preserving Authentic Hyderabadi Gastronomy for Over 29 Years.
            </h2>

            <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
              Founded under the visionary leadership of Mr. Mohd Abdul Majeed, Pista House has grown
              from its historic roots near Shalibanda into an international symbol of royal Hyderabadi cuisine.
              Our Boduppal / Uppal flagship continues this sacred commitment—every handi of Zafrani Dum Biryani
              is slow-cooked with aged basmati, Kashmir saffron, and pure desi ghee.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 p-3.5 rounded-xl glass-card border border-white/10 bg-[#111827]/60">
                <Flame className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#F8FAFC]">Dum Pukht Fire Cooking</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Sealed clay and copper handis trapping every aroma and nuance.</p>
                </div>
              </div>

              <div className="flex gap-3 p-3.5 rounded-xl glass-card border border-white/10 bg-[#111827]/60">
                <ShieldCheck className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#F8FAFC]">GI-Tagged Haleem Certification</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Recognized globally for uncompromising authenticity and pure ingredients.</p>
                </div>
              </div>

              <div className="flex gap-3 p-3.5 rounded-xl glass-card border border-white/10 bg-[#111827]/60">
                <Sparkles className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#F8FAFC]">Fresh Oven Bakery</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Signature crisp Osmania, Karachi fruit biscuits, and Apricot Delight baked every sunrise.</p>
                </div>
              </div>

              <div className="flex gap-3 p-3.5 rounded-xl glass-card border border-white/10 bg-[#111827]/60">
                <HeartHandshake className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#F8FAFC]">Gracious Nizami Hospitality</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Dedicated family dining floors, private Diwan seating, and hospitable service.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
