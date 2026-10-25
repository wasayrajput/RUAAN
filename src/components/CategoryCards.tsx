'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  fabric: string;
  description: string;
  image: string;
  bgColor: string;
  tagColor: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'doria-linen',
    name: 'Doria Linen',
    fabric: 'Doria Linen',
    description: '3-Pc Festive Pret',
    image: '/products/DL05.jpg',
    bgColor: 'bg-[#FBECEB]', // Soft blush
    tagColor: 'text-[#9A4C56]',
  },
  {
    id: 'stone-linen',
    name: 'Stone Linen',
    fabric: 'Stone Linen',
    description: 'Everyday Luxury',
    image: '/products/SL03.jpg',
    bgColor: 'bg-[#F7EFE8]', // Warm sand
    tagColor: 'text-[#8C5D39]',
  },
  {
    id: 'digital-viscose',
    name: 'Digital Viscose',
    fabric: 'Viscose',
    description: 'Floral Silhouettes',
    image: '/products/DV01.jpg',
    bgColor: 'bg-[#EBF1F5]', // Soft sky mist
    tagColor: 'text-[#486B85]',
  },
  {
    id: 'dhanak',
    name: 'Dhanak Allover',
    fabric: 'Dhanak',
    description: 'Warm Textured Weaves',
    image: '/products/DH01.png',
    bgColor: 'bg-[#F5EFE0]', // Soft butter cream
    tagColor: 'text-[#876F32]',
  },
  {
    id: 'karandi-khaddar',
    name: 'Karandi & Khaddar',
    fabric: 'Karandi',
    description: 'Signature Winter Edit',
    image: '/products/KD01.jpg',
    bgColor: 'bg-[#EFEAE4]', // Soft taupe stone
    tagColor: 'text-[#6C635B]',
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
    <section className="py-12 sm:py-16 bg-white border-b border-brand-nude/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Reference Style) */}
        <div className="text-center space-y-1 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-brand-charcoal">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-brand-gray font-light">
            Find your perfect style &amp; luxury fabric
          </p>
        </div>

        {/* 5 Category Cards (Horizontal Scroll on Mobile, 5-Col Grid on Desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.fabric)}
              className="group cursor-pointer flex flex-col items-center text-center"
            >
              {/* Rounded Pastel Image Container (Reference Style) */}
              <div
                className={`relative w-full aspect-[4/5] ${cat.bgColor} rounded-2xl sm:rounded-3xl overflow-hidden p-2 sm:p-3 transition-transform duration-500 group-hover:-translate-y-1.5 shadow-xs group-hover:shadow-md flex items-end justify-center`}
              >
                <div className="relative w-full h-[92%] rounded-xl overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Category Info */}
              <div className="mt-3 space-y-0.5">
                <h3 className="text-xs sm:text-sm font-semibold text-brand-charcoal group-hover:text-brand-nude transition">
                  {cat.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-brand-gray/80 font-light">
                  {cat.description}
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-brand-charcoal group-hover:text-brand-nude pt-1 transition"
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
