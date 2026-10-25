'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, MessageCircle, Check, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, openDirectOrder, toggleWishlist, isInWishlist, formatPrice } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const activeImage = isHovered && product.galleryImages[1] ? product.galleryImages[1] : product.mainImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, undefined, undefined, 1);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleWhatsAppBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    openDirectOrder(product);
  };

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Left Discount Badge (Reference Style: Rose Pill Badge e.g. -20%) */}
      <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 flex flex-col gap-1 pointer-events-none">
        {discountPercent ? (
          <span className="px-2 py-0.5 bg-[#9B1C3C] text-white text-[9px] sm:text-[10px] font-bold rounded-md shadow-xs">
            -{discountPercent}%
          </span>
        ) : product.isNewArrival ? (
          <span className="px-2 py-0.5 bg-stone-900 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-md shadow-xs">
            New
          </span>
        ) : null}
      </div>

      {/* Top Right Wishlist Heart Button (Reference Style) */}
      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 p-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-xs hover:bg-white text-stone-700 hover:text-rose-600 transition active:scale-90"
        aria-label="Wishlist"
      >
        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
      </button>

      {/* Product Image Container (3:4 Ratio) */}
      <div
        className="relative w-full aspect-[3/4] bg-stone-50 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <Image
          src={activeImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />

        {/* Desktop Quick View Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-3.5 py-1.5 bg-white text-stone-900 text-xs font-semibold rounded-lg hover:bg-stone-900 hover:text-white transition flex items-center gap-1.5 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>

        {/* Mobile Quick Tap Indicator */}
        <div className="sm:hidden absolute bottom-1.5 right-1.5 bg-black/40 backdrop-blur-xs text-white rounded-md p-1 pointer-events-none">
          <Eye className="w-3 h-3 text-white/90" />
        </div>
      </div>

      {/* Product Details (Reference Exact Hierarchy: Title -> Price -> Rating -> Quick Actions) */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Fabric Tag */}
          <div className="flex items-center justify-between text-[10px] text-stone-500 uppercase tracking-wider mb-1">
            <span className="font-semibold text-brand-nude">{product.fabric}</span>
            <span>{product.stitchType.includes('Unstitched') ? 'Unstitched' : 'Stitched'}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-sm font-semibold text-stone-900 hover:text-[#9B1C3C] transition line-clamp-1 cursor-pointer leading-snug"
          >
            {product.title}
          </h3>

          {/* Price (Reference Exact: Bold Price + Strikethrough Original) */}
          <div className="flex items-baseline gap-1.5 mt-1">
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
          <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-500 font-medium">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-stone-800">4.8</span>
            <span className="text-stone-400 text-[10px]">(120)</span>
          </div>
        </div>

        {/* Quick Buy Actions */}
        <div className="pt-2 border-t border-stone-100 grid grid-cols-2 gap-1.5">
          <button
            onClick={handleAddToCart}
            className={`py-1.5 px-1 text-[11px] font-semibold rounded-lg transition flex items-center justify-center gap-1 active:scale-95 ${
              isAddedToCart
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 text-white hover:bg-[#9B1C3C]'
            }`}
            title="Add to Cart"
          >
            {isAddedToCart ? (
              <>
                <Check className="w-3 h-3" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                <span>Add</span>
              </>
            )}
          </button>

          <button
            onClick={handleWhatsAppBuy}
            className="py-1.5 px-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold rounded-lg transition flex items-center justify-center gap-1 shadow-xs active:scale-95"
            title="Order on WhatsApp"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
};
