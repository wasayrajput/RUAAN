'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  fabric: string;
  image: string;
  bgColor: string;
}

// 10 distinct luxury suits & fabric categories with reference-style pastel backgrounds
const CATEGORIES: CategoryItem[] = [
  {
    id: 'dl05',
    name: 'Festive Pret 3-Pc',
    fabric: 'Doria Linen',
    image: '/products/DL05.jpg',
    bgColor: 'bg-[#FCECEE]', // Soft Rose Pink
  },
  {
    id: 'sl03',
    name: 'Everyday Stone Linen',
    fabric: 'Stone Linen',
    image: '/products/SL03.jpg',
    bgColor: 'bg-[#E3F2FD]', // Soft Powder Blue
  },
  {
    id: 'dv01',
    name: 'Digital Viscose Floral',
    fabric: 'Viscose',
    image: '/products/DV01.jpg',
    bgColor: 'bg-[#EDE7F6]', // Soft Lavender
  },
  {
    id: 'dh01',
    name: 'Warm Dhanak Allover',
    fabric: 'Dhanak',
    image: '/products/DH01.png',
    bgColor: 'bg-[#FFF3E0]', // Soft Warm Sand
  },
  {
    id: 'kd01',
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
    name: 'Embroidered Chic',
    fabric: 'Stone Linen',
    image: '/products/SL04.jpg',
    bgColor: 'bg-[#E8F5E9]', // Soft Mint Sage
  },
  {
    id: 'dl01',
    name: 'Royal Doria Festive',
    fabric: 'Doria Linen',
    image: '/products/DL01.jpg',
    bgColor: 'bg-[#FFF9C4]/40', // Soft Buttercream
  },
  {
    id: 'dv02',
    name: 'Classic Viscose 3-Pc',
    fabric: 'Viscose',
    image: '/products/DV02.jpg',
    bgColor: 'bg-[#E0F2F1]', // Soft Sky Mist
  },
  {
    id: 'kd02',
    name: 'Winter Karandi Edit',
    fabric: 'Karandi',
    image: '/products/KD02.jpg',
    bgColor: 'bg-[#EFEBE9]', // Soft Taupe Stone
  },
];

// Double list for seamless, unbroken infinite loop
const SLIDER_ITEMS = [...CATEGORIES, ...CATEGORIES];

interface CategoryCardsProps {
  onSelectCategory?: (fabric: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  // Delta-time based smooth drift: Never resets on hover! Freezes in place wherever mouse is!
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isHoveredRef.current && container) {
        // Smooth 40px per second drift
        container.scrollLeft += (delta / 1000) * 42;

        // Seamless wrap around when reaching half of duplicated list
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const onEnter = () => {
      isHoveredRef.current = true;
    };
    const onLeave = () => {
      isHoveredRef.current = false;
    };

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);
    container.addEventListener('touchstart', onEnter, { passive: true });
    container.addEventListener('touchend', onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      container.removeEventListener('touchstart', onEnter);
      container.removeEventListener('touchend', onLeave);
    };
  }, []);

  const handleCategoryClick = (fabric: string) => {
    if (onSelectCategory) {
      onSelectCategory(fabric);
    }
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-12 sm:py-16 bg-white border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        
        {/* Section Header with Functional Left/Right Arrow Controls */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-brand-charcoal">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-light">
              Find your perfect style • Handcrafted suits &amp; fine fabrics
            </p>
          </div>

          {/* Interactive Prev / Next Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 sm:p-2.5 rounded-full border border-stone-300 hover:border-stone-900 text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 transition active:scale-95 shadow-xs cursor-pointer"
              aria-label="Previous Slide"
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2 sm:p-2.5 rounded-full border border-stone-300 hover:border-stone-900 text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 transition active:scale-95 shadow-xs cursor-pointer"
              aria-label="Next Slide"
              title="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Smooth Continuous Gliding Track: NEVER resets on hover, stays in place, supports arrows & swipe */}
      <div
        ref={scrollRef}
        className="relative w-full overflow-x-auto no-scrollbar py-2 cursor-grab active:cursor-grabbing"
      >
        <div className="flex gap-4 sm:gap-6 px-4 sm:px-8 w-max">
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
