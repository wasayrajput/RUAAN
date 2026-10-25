'use client';

import React from 'react';
import { Sparkles, Truck, RotateCcw, Headphones } from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <Sparkles className="w-6 h-6 text-brand-nude" />,
    title: 'Premium Quality',
    description: '100% authentic, breathable yarns & durable colorfast prints.',
  },
  {
    icon: <Truck className="w-6 h-6 text-brand-nude" />,
    title: 'Fast Delivery',
    description: 'Express nationwide delivery with Cash on Delivery across Pakistan.',
  },
  {
    icon: <RotateCcw className="w-6 h-6 text-brand-nude" />,
    title: 'Easy Exchange',
    description: '7-day hassle-free replacement process if you need a size change.',
  },
  {
    icon: <Headphones className="w-6 h-6 text-brand-nude" />,
    title: '24/7 Concierge',
    description: 'Direct 1-on-1 styling & sizing guidance on WhatsApp.',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-brand-cream/30 border-t border-brand-nude/20 relative overflow-hidden">
      
      {/* Decorative Botanical Accents (Like Reference) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-1 mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-brand-charcoal">
            Why Choose Us?
          </h2>
          <p className="text-xs sm:text-sm text-brand-gray font-light">
            Because you deserve the finest luxury &amp; craftsmanship
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-white border border-brand-nude/30 shadow-xs hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-brand-cream flex items-center justify-center border border-brand-nude/40 mb-3 shadow-xs">
                {item.icon}
              </div>
              <h3 className="text-sm sm:text-base font-serif font-semibold text-brand-charcoal mb-1">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-brand-gray font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
