'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, MessageCircle } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface BestSellersProps {
  onQuickView: (product: Product) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onQuickView }) => {
  const { addToCart, openDirectOrder, toggleWishlist, isInWishlist, formatPrice } = useCart();

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

        {/* 4 Product Cards Grid (Reference Exact Layout: 4 Columns with Heart, Image, Title, Price, Rating) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {bestsellers.map((product) => {
            const isFav = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-xl sm:rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container with Wishlist Heart */}
                <div
                  className="relative w-full aspect-[3/4] bg-stone-50 cursor-pointer overflow-hidden"
                  onClick={() => onQuickView(product)}
                >
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Wishlist Heart on Top Right (Reference Style) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 p-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-xs hover:bg-white text-stone-700 hover:text-rose-600 transition active:scale-90"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>
                </div>

                {/* Product Info (Reference Exact: Title -> Price -> Rating -> Quick Actions) */}
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3
                      onClick={() => onQuickView(product)}
                      className="text-xs sm:text-sm font-semibold text-stone-900 hover:text-[#9B1C3C] transition line-clamp-1 cursor-pointer"
                    >
                      {product.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-xs sm:text-sm font-bold text-stone-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Rating (Reference Exact: ★ 4.7 (85)) */}
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-500 font-medium">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-stone-800">4.8</span>
                      <span className="text-stone-400 text-[10px]">(95)</span>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => addToCart(product, undefined, undefined, 1)}
                      className="py-1.5 px-1 bg-stone-900 hover:bg-[#9B1C3C] text-white text-[11px] font-semibold rounded-lg transition flex items-center justify-center gap-1 active:scale-95"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openDirectOrder(product)}
                      className="py-1.5 px-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold rounded-lg transition flex items-center justify-center gap-1 shadow-xs active:scale-95"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </button>
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
