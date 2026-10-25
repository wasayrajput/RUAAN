'use client';

import React from 'react';
import { Gem, Truck, RotateCcw, Headphones } from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <Gem className="w-5 h-5 text-stone-800 stroke-[1.5]" />,
    title: 'Premium Quality',
    description: 'Stylish & durable products',
  },
  {
    icon: <Truck className="w-5 h-5 text-stone-800 stroke-[1.5]" />,
    title: 'Fast Delivery',
    description: 'Get your order quickly',
  },
  {
    icon: <RotateCcw className="w-5 h-5 text-stone-800 stroke-[1.5]" />,
    title: 'Easy Returns',
    description: 'Hassle-free process',
  },
  {
    icon: <Headphones className="w-5 h-5 text-stone-800 stroke-[1.5]" />,
    title: '24/7 Support',
    description: "We're here for you",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-stone-200/80 relative overflow-hidden">
      
      {/* Decorative Botanical Leaf Accents (Reference Style) */}
      <div className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 text-stone-200 select-none pointer-events-none hidden md:block">
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 110C20 90 40 70 20 40C10 20 30 10 50 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22 65C35 55 45 60 48 70C35 75 25 72 22 65Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 40C10 30 15 15 25 15C28 28 25 35 20 40Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 text-stone-200 select-none pointer-events-none hidden md:block">
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-x-[-1]">
          <path d="M10 110C20 90 40 70 20 40C10 20 30 10 50 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22 65C35 55 45 60 48 70C35 75 25 72 22 65Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 40C10 30 15 15 25 15C28 28 25 35 20 40Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Reference Exact Style) */}
        <div className="text-center space-y-1 mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-charcoal">
            Why Choose Us?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Because you deserve the best
          </p>
        </div>

        {/* 4 Feature Columns (Reference Exact: Circular Outline Icon + Title + Subtitle) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-4"
            >
              {/* Circular Outline Icon Container */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-stone-300 flex items-center justify-center mb-3 bg-stone-50/50 shadow-xs">
                {item.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-900 mb-0.5">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-500 font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
