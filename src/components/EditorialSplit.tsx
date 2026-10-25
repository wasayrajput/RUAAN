'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

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
    <section className="py-12 sm:py-16 bg-brand-cream/40 border-y border-brand-nude/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Split Feature (Reference Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden bg-white border border-brand-nude/30 shadow-md">
          
          {/* Left Large Lifestyle Portrait */}
          <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] bg-stone-100 overflow-hidden">
            <Image
              src="/products/SL03.jpg"
              alt="RUAAN Everyday Casual Pret"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right Soft Warm Panel (Reference Style) */}
          <div className="lg:col-span-6 bg-[#FAF4ED] p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-5 text-center lg:text-left relative">
            
            {/* Cursive Tag */}
            <div>
              <span className="font-serif italic text-brand-nude text-xl sm:text-2xl font-normal">
                Effortless Style
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-brand-charcoal leading-tight">
              Casual Looks <br className="hidden sm:inline" />
              For Everyday.
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-brand-gray font-light leading-relaxed max-w-md mx-auto lg:mx-0">
              Comfort meets pure sophistication. Breathable stone linen and delicate textures crafted to drape effortlessly, making every day feel like an occasion.
            </p>

            {/* Trust Points */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-brand-charcoal font-medium">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-nude" />
                Air-light Fabrics
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-nude" />
                Tailored Silhouettes
              </span>
            </div>

            {/* CTA Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleClick}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-charcoal text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-brand-nude transition-colors duration-300 shadow-md tracking-wider uppercase active:scale-95"
              >
                <span>Shop Everyday Pret</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
