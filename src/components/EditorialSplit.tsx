'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface EditorialSplitProps {
  onShopCasual?: () => void;
}

export const EditorialSplit: React.FC<EditorialSplitProps> = ({ onShopCasual }) => {
  const handleClick = () => {
    if (onShopCasual) {
      onShopCasual();
    } else {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-6 sm:py-14 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Split Feature (Reference Exact Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200 shadow-md">
          
          {/* Left Full-Bleed Lifestyle Photo */}
          <div className="lg:col-span-6 relative min-h-[240px] sm:min-h-[420px] lg:min-h-[480px] bg-stone-100 overflow-hidden">
            <Image
              src="/products/SL03.jpg"
              alt="Casual Looks For Everyday"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Right Soft Blush Pink Panel */}
          <div className="lg:col-span-6 bg-[#FAF0F2] p-5 sm:p-10 lg:p-14 flex flex-col justify-center space-y-3 sm:space-y-4 text-center lg:text-left relative overflow-hidden">
            
            {/* Official RUAAN Logo Botanical Leaf on Right Edge */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden sm:block opacity-20">
              <Image
                src="/ruaan-leaf.png"
                alt=""
                width={85}
                height={130}
                className="object-contain"
              />
            </div>

            {/* Handwritten Cursive Script Tag */}
            <div>
              <span className="font-serif italic text-lg sm:text-2xl text-[#9B1C3C] font-semibold">
                Effortless Style
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-tight">
              Casual Looks <br />
              For Everyday
            </h2>

            {/* Subtitle */}
            <p className="text-[11px] sm:text-sm lg:text-base text-stone-600 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
              Comfort meets style. Perfect outfits for your daily adventures.
            </p>

            {/* Deep Wine / Plum Button */}
            <div className="pt-1 sm:pt-2">
              <button
                type="button"
                onClick={handleClick}
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3.5 bg-[#9B1C3C] hover:bg-[#801430] text-white text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 shadow-md group active:scale-95"
              >
                <span>Shop Casual</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
