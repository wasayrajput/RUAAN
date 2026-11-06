'use client';

import React from 'react';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';

interface BestSellersProps {
  onQuickView: (product: Product) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onQuickView }) => {
  // Diverse, curated mix of 4 best sellers across distinct fabric collections
  // (e.g. Fine Linen, Digital Viscose, Doria Linen, Khaddar)
  const bestsellers = React.useMemo(() => {
    const all = productsData as Product[];

    // Curated priority mix representing 4 distinct fabrics & luxury looks
    const preferredCodes = ['FL02', 'DV01', 'DL01', 'KD01'];
    const curated = preferredCodes
      .map((code) => all.find((p) => (p.designCode || p.id).toUpperCase() === code))
      .filter((p): p is Product => Boolean(p));

    if (curated.length === 4) {
      return curated;
    }

    // Dynamic fallback: select 1 best seller per unique fabric type to always maintain a balanced mix
    const seenFabrics = new Set<string>();
    const mix: Product[] = [];

    for (const p of all) {
      if ((p.isBestseller || p.isFeatured) && !seenFabrics.has(p.fabric)) {
        seenFabrics.add(p.fabric);
        mix.push(p);
        if (mix.length === 4) break;
      }
    }

    if (mix.length < 4) {
      for (const p of all) {
        if (!mix.some((m) => m.id === p.id) && !seenFabrics.has(p.fabric)) {
          seenFabrics.add(p.fabric);
          mix.push(p);
          if (mix.length === 4) break;
        }
      }
    }

    return mix.length === 4 ? mix : all.slice(0, 4);
  }, []);

  return (
    <section className="py-10 sm:py-16 bg-white border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-1 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900">
            Best Sellers
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Loved by thousands of women across Pakistan
          </p>
        </div>

        {/* 4 Product Cards Grid Animated (2 from left, 2 from right on laptop; 1 from left, 1 from right on mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 overflow-hidden py-1">
          {bestsellers.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onQuickView={onQuickView}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
