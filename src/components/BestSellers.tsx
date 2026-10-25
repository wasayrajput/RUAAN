'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Star, Eye } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface BestSellersProps {
  onQuickView: (product: Product) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onQuickView }) => {
  const { toggleWishlist, isInWishlist, formatPrice } = useCart();

  // 4 Standout Best Sellers
  const bestsellers = (productsData as Product[])
    .filter((p) => p.isBestseller || p.isFeatured)
    .slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Reference Exact Style) */}
        <div className="text-center space-y-1 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900">
            Best Sellers
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Loved by thousands of women
          </p>
        </div>

        {/* 4 Product Cards Grid (Reference Exact Layout: Image with Heart -> Title -> Price -> Rating) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {bestsellers.map((product) => {
            const isFav = isInWishlist(product.id);
            const discountPercent = product.originalPrice && product.originalPrice > product.price
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : null;

            return (
              <div
                key={product.id}
                onClick={() => onQuickView(product)}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-100 relative"
              >
                {/* Top Left Discount Badge */}
                {discountPercent && (
                  <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                    <span className="px-2 py-0.5 bg-[#9B1C3C] text-white text-[10px] font-bold rounded-full shadow-xs">
                      -{discountPercent}%
                    </span>
                  </div>
                )}

                {/* Top Right Wishlist Heart */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-2.5 right-2.5 z-10 p-1.5 bg-white/80 backdrop-blur-md rounded-full text-stone-700 hover:text-rose-600 transition active:scale-90 shadow-2xs"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 stroke-[1.75] ${isFav ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>

                {/* Image Container with Hover Quick View */}
                <div className="relative w-full aspect-[3/4] bg-stone-50 overflow-hidden">
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Desktop Quick View Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
                    <div className="px-4 py-2 bg-white/95 text-stone-900 text-xs font-semibold rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-stone-700" />
                      <span>Quick View</span>
                    </div>
                  </div>
                </div>

                {/* Product Info (Reference Style + Fabric Tag) */}
                <div className="p-3 sm:p-3.5 flex flex-col space-y-1">
                  {/* Fabric Tag */}
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#B57C53]">
                    {product.fabric}
                  </span>

                  <h3 className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-[#9B1C3C] transition line-clamp-1">
                    {product.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-stone-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-[11px] text-amber-500 font-medium pt-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-stone-800">4.8</span>
                    <span className="text-stone-400 text-[10px]">(95)</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
