import React from 'react';
import { Star, CheckCircle, ExternalLink, ThumbsUp } from 'lucide-react';
import { BUSINESS_INFO, REVIEWS_DATA } from '../data/businessData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 relative bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/15 border border-[#10B981]/30 text-[#34D399] text-xs font-semibold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-[#10B981] text-[#10B981]" />
            <span>Verified Customer Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] tracking-tight leading-tight">
            Loved by Over 8,450+ Hyderabadi Diners
          </h2>
          <p className="mt-3 text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            Real experiences from Google Maps reviewers and passionate food lovers who dine with us daily.
          </p>
        </div>

        {/* Rating Overview Card */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl glass-card border border-white/10 bg-[#1E293B]/75 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#059669]/25 via-[#10B981]/15 to-transparent border border-[#10B981]/40 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-[#10B981] font-mono">4.3</span>
              <span className="text-[10px] text-[#94A3B8] font-semibold tracking-wider">OUT OF 5</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1 justify-center md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-base font-bold text-[#F8FAFC]">
                Exceptional Google Maps Rating
              </div>
              <div className="text-xs text-[#94A3B8]">
                Based on 8,450+ verified customer reviews across Hyderabad
              </div>
            </div>
          </div>

          <a
            href={BUSINESS_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#F8FAFC] hover:text-[#34D399] font-medium text-xs sm:text-sm border border-white/10 hover:border-emerald-500/40 transition-colors cursor-pointer shrink-0"
          >
            <span>Read on Google Maps</span>
            <ExternalLink className="w-4 h-4 text-[#10B981]" />
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-7 rounded-2xl glass-card border border-white/10 bg-[#1E293B]/75 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-[#94A3B8] font-mono">{rev.date}</span>
                </div>

                <p className="text-[#F8FAFC] text-sm leading-relaxed italic">
                  "{rev.reviewText}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#F8FAFC] flex items-center gap-1.5">
                    {rev.authorName}
                    {rev.verified && (
                      <span title="Verified Customer" className="inline-flex">
                        <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
                      </span>
                    )}
                  </h4>
                  <div className="text-xs text-[#94A3B8]">{rev.role}</div>
                </div>

                <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Helpful review</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
