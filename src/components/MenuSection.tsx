import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/businessData';
import { MenuItem } from '../types';
import { Check, CalendarCheck, Sparkles, Utensils } from 'lucide-react';

interface MenuSectionProps {
  onSelectServiceToBook: (item: MenuItem) => void;
}

type CategoryFilter = 'all' | 'biryani' | 'haleem' | 'kebabs' | 'bakery' | 'desserts';

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'All Offerings' },
    { key: 'biryani', label: 'Royal Biryani' },
    { key: 'haleem', label: 'World-Famous Haleem' },
    { key: 'kebabs', label: 'Kebabs & Tandoor' },
    { key: 'bakery', label: 'Bakery & Irani Chai' },
    { key: 'desserts', label: 'Heritage Desserts' }
  ];

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-16 sm:py-24 relative bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#10B981]/30 text-[#34D399] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Master Crafted Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] tracking-tight leading-tight">
            Nizami Specialties & Artisanal Bakery
          </h2>
          <p className="mt-3 text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            Every dish is prepared using time-honored Hyderabadi culinary recipes, aged spices,
            pure desi ghee, and farm-fresh ingredients.
          </p>
        </div>

        {/* Categorized Filter Tabs (Horizontal scroll on mobile) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar gap-2 px-1">
          {categories.map(cat => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] flex items-center justify-center ${
                  isActive
                    ? 'bg-[#059669] text-white font-bold shadow-[0_4px_16px_rgba(5,150,105,0.4)] border border-emerald-400/40'
                    : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/90 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group border border-white/10 hover:border-emerald-500/40 bg-[#1E293B]/75"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0D1522]">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      const fallback = target.parentElement.querySelector('.img-fallback');
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="img-fallback hidden w-full h-full bg-[#1E293B] flex-col items-center justify-center p-4 text-center">
                  <Utensils className="w-10 h-10 text-[#10B981] mb-2" />
                  <span className="text-xs text-[#F8FAFC] font-medium">{item.name}</span>
                </div>

                {/* Price Tag Overlay with Emerald Green */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-lg glass-modal border border-white/15 text-[#10B981] font-mono font-bold text-base shadow-lg bg-[#111827]/90">
                  ₹{item.price}
                </div>

                {/* Category & Status badges */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#111827]/85 backdrop-blur-md text-[#F8FAFC] border border-white/10">
                    {item.categoryLabel}
                  </span>
                  {item.isBestseller && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#059669] text-white shadow border border-emerald-400/30">
                      Bestseller
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                      Vegetarian
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC] group-hover:text-[#34D399] transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-3 mb-3">
                    {item.description}
                  </p>

                  <div className="text-[11px] font-mono text-[#94A3B8] mb-4 pb-3 border-b border-white/5">
                    {item.durationOrPortion}
                  </div>

                  {/* Highlights with clean Emerald checkmarks */}
                  <div className="space-y-1.5">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#F8FAFC]">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Button: Emerald Green #059669 */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectServiceToBook(item)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#059669] hover:bg-[#047857] active:scale-[0.98] transition-all border border-emerald-400/30 flex items-center justify-center gap-2 cursor-pointer min-h-[44px] shadow-[0_4px_16px_rgba(5,150,105,0.35)] hover:shadow-[0_0_20px_rgba(16,185,129,0.45)]"
                  >
                    <CalendarCheck className="w-4 h-4 text-white" />
                    <span>Reserve Table for This</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
