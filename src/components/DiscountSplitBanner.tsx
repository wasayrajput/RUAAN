'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface DiscountSplitBannerProps {
  onShopSale?: () => void;
}

export const DiscountSplitBanner: React.FC<DiscountSplitBannerProps> = ({ onShopSale }) => {
  const handleClick = () => {
    if (onShopSale) {
      onShopSale();
    } else {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-10 sm:py-16 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Offer Banner (Reference Exact Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden shadow-lg border border-stone-200">
          
          {/* Left Deep Wine/Plum Block (Reference Exact: bg-[#6A1B4D] / #5E1638) */}
          <div className="md:col-span-5 bg-[#5E1638] p-8 sm:p-12 lg:p-14 flex flex-col justify-center items-start text-white space-y-3 sm:space-y-4">
            <p className="text-base sm:text-lg text-white/90 font-light tracking-wide">
              Up To
            </p>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight text-white leading-none">
              50% OFF
            </h2>

            <p className="text-xs sm:text-sm text-white/80 font-light">
              On Selected Styles
            </p>

            <div className="pt-3">
              <button
                type="button"
                onClick={handleClick}
                className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#5E1638] text-xs sm:text-sm font-semibold rounded-full hover:bg-stone-100 transition duration-200 shadow-md active:scale-95 group"
              >
                <span>Shop Sale</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Aesthetic Clothes Rack / Wardrobe Photo */}
          <div className="md:col-span-7 relative min-h-[260px] sm:min-h-[340px] bg-stone-100 overflow-hidden">
            <Image
              src="/products/DL01.jpg"
              alt="Up To 50% OFF Sale Collection"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
