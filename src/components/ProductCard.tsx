'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Eye, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { toggleWishlist, isInWishlist, formatPrice } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const activeImage = isHovered && product.galleryImages[1] ? product.galleryImages[1] : product.mainImage;

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full relative cursor-pointer border border-stone-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Left Discount Badge (Reference Exact Style: Small Rounded Rose Pill) */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 pointer-events-none">
        {discountPercent ? (
          <span className="px-2 py-0.5 bg-[#9B1C3C] text-white text-[10px] font-bold rounded-full shadow-xs">
            -{discountPercent}%
          </span>
        ) : product.isNewArrival ? (
          <span className="px-2 py-0.5 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs">
            New
          </span>
        ) : null}
      </div>

      {/* Top Right Wishlist Heart Button (Reference Exact Style: Delicate Outline Heart) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className="absolute top-2.5 right-2.5 z-10 p-1.5 bg-white/80 backdrop-blur-md rounded-full text-stone-700 hover:text-rose-600 transition active:scale-90 shadow-2xs"
        aria-label="Wishlist"
      >
        <Heart className={`w-4 h-4 stroke-[1.75] ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
      </button>

      {/* Product Image Container (Reference Exact 3:4 Aspect Ratio) */}
      <div className="relative w-full aspect-[3/4] bg-stone-50 overflow-hidden">
        <Image
          src={activeImage}
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

      {/* Product Details (Reference Style + Fabric Tag) */}
      <div className="p-3 sm:p-3.5 flex flex-col space-y-1">
        {/* Fabric Tag */}
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#B57C53]">
          {product.fabric}
        </span>

        {/* Title (Reference Exact: 1 Line Clean Heading) */}
        <h3 className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-[#9B1C3C] transition line-clamp-1 leading-snug">
          {product.title}
        </h3>

        {/* Price (Reference Exact: Bold Price + Strikethrough Original) */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs sm:text-sm font-bold text-stone-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[10px] sm:text-xs text-stone-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Star Rating (Reference Exact: ★ 4.8 (120)) */}
        <div className="flex items-center gap-1 text-[11px] text-amber-500 font-medium pt-0.5">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-stone-800">4.8</span>
          <span className="text-stone-400 text-[10px]">(120)</span>
        </div>
      </div>
    </motion.div>
  );
};
