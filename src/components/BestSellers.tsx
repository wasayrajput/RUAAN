'use client';

import React from 'react';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';

interface BestSellersProps {
  onQuickView: (product: Product) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onQuickView }) => {
  // 4 Standout Best Sellers
  const bestsellers = (productsData as Product[])
    .filter((p) => p.isBestseller || p.isFeatured)
    .slice(0, 4);

  return (
    <section className="py-10 sm:py-16 bg-white border-b border-stone-200/80">
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
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
