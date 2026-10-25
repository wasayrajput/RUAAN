'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  fabric: string;
  image: string;
  bgColor: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'dresses',
    name: 'Festive Pret',
    fabric: 'Doria Linen',
    image: '/products/DL05.jpg',
    bgColor: 'bg-[#FCECEE]', // Soft Rose / Pink
  },
  {
    id: 'stone-linen',
    name: 'Everyday Pret',
    fabric: 'Stone Linen',
    image: '/products/SL03.jpg',
    bgColor: 'bg-[#E3F2FD]', // Soft Powder Blue
  },
  {
    id: 'viscose',
    name: 'Digital Viscose',
    fabric: 'Viscose',
    image: '/products/DV01.jpg',
    bgColor: 'bg-[#EDE7F6]', // Soft Lavender / Lilac
  },
  {
    id: 'dhanak',
    name: 'Warm Dhanak',
    fabric: 'Dhanak',
    image: '/products/DH01.png',
    bgColor: 'bg-[#FFF3E0]', // Soft Warm Sand / Peach
  },
  {
    id: 'karandi',
    name: 'Karandi & Khaddar',
    fabric: 'Karandi',
    image: '/products/KD01.jpg',
    bgColor: 'bg-[#F3E5F5]', // Soft Muted Mauve
  },
  {
    id: 'sl10',
    name: 'Stone Linen Luxe',
    fabric: 'Stone Linen',
    image: '/products/SL10.jpg',
    bgColor: 'bg-[#FDECE8]', // Soft Peach Blush
  },
  {
    id: 'sl04',
    name: 'Chic Embroidered',
    fabric: 'Stone Linen',
    image: '/products/SL04.jpg',
    bgColor: 'bg-[#E8F5E9]', // Soft Mint Sage
  },
];

// Double list for seamless continuous infinite slide
const SLIDER_ITEMS = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

interface CategoryCardsProps {
  onSelectCategory?: (fabric: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleCategoryClick = (fabric: string) => {
    if (onSelectCategory) {
      onSelectCategory(fabric);
    }
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="categories" className="py-12 sm:py-16 bg-white border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        
        {/* Section Header with Left/Right Arrow Controls (Reference Style + Slider Controls) */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-charcoal">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-light">
              Find your perfect style • Auto-sliding collection
            </p>
          </div>

          {/* Slider Prev / Next Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="p-2 sm:p-2.5 rounded-full border border-stone-300 hover:border-stone-900 text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 transition active:scale-95 shadow-xs"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="p-2 sm:p-2.5 rounded-full border border-stone-300 hover:border-stone-900 text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 transition active:scale-95 shadow-xs"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Auto-Moving Infinite Slider Ribbon ("Jaise pehle chalte the") */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="relative w-full overflow-x-auto no-scrollbar py-2"
      >
        <div
          className={`flex gap-4 sm:gap-6 px-4 sm:px-8 w-max ${
            isPaused ? '' : 'animate-infinite-scroll'
          }`}
          style={{ animationDuration: '45s' }}
        >
          {SLIDER_ITEMS.map((cat, idx) => (
            <div
              key={`${cat.id}-${idx}`}
              onClick={() => handleCategoryClick(cat.fabric)}
              className="group cursor-pointer flex flex-col items-center text-center w-48 sm:w-56 md:w-64 shrink-0 transition-transform duration-300"
            >
              {/* Rounded Pastel Image Box (Reference Exact: Soft Pastel Box with Model Inside) */}
              <div
                className={`relative w-full aspect-[4/5] ${cat.bgColor} rounded-2xl sm:rounded-3xl overflow-hidden p-2.5 sm:p-3 transition-all duration-300 group-hover:-translate-y-1 shadow-xs group-hover:shadow-lg flex items-end justify-center`}
              >
                <div className="relative w-full h-[94%] rounded-xl sm:rounded-2xl overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="260px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Category Title & Shop Now Link */}
              <div className="mt-2.5 space-y-0.5 w-full">
                <h3 className="text-xs sm:text-sm font-semibold text-brand-charcoal group-hover:text-[#9B1C3C] transition truncate">
                  {cat.name}
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-stone-500 group-hover:text-[#9B1C3C] font-normal transition"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
