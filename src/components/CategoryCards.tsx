'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

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
];

interface CategoryCardsProps {
  onSelectCategory?: (fabric: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  const handleCategoryClick = (fabric: string) => {
    if (onSelectCategory) {
      onSelectCategory(fabric);
    }
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-12 sm:py-16 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Reference Exact Style) */}
        <div className="text-center space-y-1 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-charcoal">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Find your perfect style
          </p>
        </div>

        {/* 5 Category Cards (Reference Exact: 5 Columns with Rounded Pastel Blocks) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.fabric)}
              className="group cursor-pointer flex flex-col items-center text-center"
            >
              {/* Rounded Pastel Image Box (Reference Exact: Soft Pastel Box with Model Inside) */}
              <div
                className={`relative w-full aspect-[4/5] ${cat.bgColor} rounded-2xl sm:rounded-3xl overflow-hidden p-2.5 sm:p-3 transition-transform duration-300 group-hover:-translate-y-1 shadow-xs group-hover:shadow-md flex items-end justify-center`}
              >
                <div className="relative w-full h-[94%] rounded-xl sm:rounded-2xl overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Category Title & Shop Now Link */}
              <div className="mt-2.5 space-y-0.5">
                <h3 className="text-xs sm:text-sm font-semibold text-brand-charcoal group-hover:text-[#9B1C3C] transition">
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
