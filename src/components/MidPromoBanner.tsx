'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

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
    <section className="py-8 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deep Wine / Plum Banner (Reference Exact Style) */}
        <div className="relative rounded-3xl overflow-hidden bg-[#5E1638] text-white p-6 sm:p-10 lg:p-14 shadow-lg">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* Left Model Photo in Arched Container (Reference Style) */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-52 sm:w-64 md:w-72 aspect-[3/4] rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl bg-black/20 border-2 border-white/20">
                <Image
                  src="/products/DL05.jpg"
                  alt="New Season New Vibes"
                  fill
                  sizes="(max-width: 768px) 240px, 300px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Text Content (Reference Exact Style) */}
            <div className="md:col-span-7 space-y-3 sm:space-y-4 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight text-white tracking-tight">
                New Season <br />
                <span className="font-normal italic">
                  New Vibes
                </span>
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-white/80 font-light max-w-md mx-auto md:mx-0">
                Fresh styles. Bold looks. Just for you.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClick}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 bg-white text-[#5E1638] text-xs sm:text-sm font-semibold rounded-full hover:bg-stone-100 transition-colors duration-200 shadow-md active:scale-95 group"
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
