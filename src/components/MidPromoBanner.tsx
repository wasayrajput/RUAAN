'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MidPromoBannerProps {
  onExplore?: () => void;
}

export const MidPromoBanner: React.FC<MidPromoBannerProps> = ({ onExplore }) => {
  const handleClick = () => {
    if (onExplore) {
      onExplore();
    } else {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Contrast Container (Reference Plum Banner translated to RUAAN Luxury Charcoal) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1C1917] via-[#2B2A29] to-[#1C1917] text-white p-6 sm:p-12 lg:p-16 border border-brand-nude/20 shadow-xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-nude/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-peach/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Model Photo (Arched container like reference) */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-60 sm:w-72 md:w-80 aspect-[3/4] rounded-t-full rounded-b-2xl overflow-hidden border-2 border-brand-nude/40 shadow-2xl bg-stone-800">
                <Image
                  src="/products/DL05.jpg"
                  alt="RUAAN New Season Edit"
                  fill
                  sizes="(max-width: 768px) 280px, 320px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Text Content (Reference Style) */}
            <div className="md:col-span-7 space-y-4 sm:space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-brand-nude text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-brand-nude" />
                <span>Barkha Festive Edit &apos;26</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight text-brand-cream">
                New Season <br />
                <span className="italic font-normal text-brand-nude">
                  New Vibes
                </span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300 font-light max-w-lg mx-auto md:mx-0 leading-relaxed">
                Fresh styles. Bold looks. Handcrafted just for you. Explore our signature 3-piece embroidered sets and breathable doria linen designed for every festive moment.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClick}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-brand-cream text-brand-charcoal text-xs sm:text-sm font-semibold rounded-full hover:bg-brand-nude hover:text-white transition-colors duration-300 shadow-lg uppercase tracking-wider group active:scale-95"
                >
                  <span>Explore New Arrivals</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
