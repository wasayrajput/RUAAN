'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Tag } from 'lucide-react';

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
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Offer Banner (Reference Style in RUAAN Palette) */}
        <div className="grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border border-brand-nude/30 shadow-lg">
          
          {/* Left Dark Rich Block */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#2B2A29] to-[#1C1917] p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start text-white space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-nude text-xs font-semibold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>Limited Time Offer</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-brand-cream">
              Up To <br />
              <span className="italic font-normal text-brand-nude">30% OFF</span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-light">
              On selected doria linen, stone linen &amp; digital viscose festive suits.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleClick}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-cream text-brand-charcoal text-xs sm:text-sm font-semibold rounded-full hover:bg-brand-nude hover:text-white transition duration-300 shadow-md uppercase tracking-wider active:scale-95"
              >
                <span>Shop Sale</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Aesthetic Wardrobe / Rack Image */}
          <div className="md:col-span-7 relative min-h-[260px] sm:min-h-[340px] bg-stone-100 overflow-hidden">
            <Image
              src="/products/DL01.jpg"
              alt="RUAAN Festive Sale Collection"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
};
