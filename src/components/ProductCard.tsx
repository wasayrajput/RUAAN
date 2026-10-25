'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, MessageCircle, Check } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-brand-nude/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges Container */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex flex-col gap-1 pointer-events-none">
        {product.isNewArrival && (
          <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-brand-charcoal text-brand-cream text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-md shadow-xs">
            New
          </span>
        )}
        {product.isBestseller && (
          <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-brand-nude text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-md shadow-xs">
            Bestseller
          </span>
        )}
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-rose-700 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-md shadow-xs">
            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 p-1.5 sm:p-2 bg-white/85 backdrop-blur-md rounded-full shadow-xs hover:bg-white text-brand-charcoal hover:text-rose-600 transition active:scale-90"
        aria-label="Wishlist"
      >
        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
      </button>

      {/* Product Image Container (3:4 Editorial Aspect Ratio) */}
      <div
        className="relative w-full aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <Image
          src={activeImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />

        {/* Desktop Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-3.5 py-1.5 bg-white text-brand-charcoal text-xs font-semibold rounded-lg hover:bg-brand-nude hover:text-white transition flex items-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>

        {/* Mobile Quick Tap Indicator (tap to view) */}
        <div className="sm:hidden absolute bottom-1.5 right-1.5 bg-black/40 backdrop-blur-xs text-white rounded-md p-1 pointer-events-none">
          <Eye className="w-3 h-3 text-white/90" />
        </div>
      </div>

      {/* Product Information */}
      <div className="p-2.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div>
          {/* Subtitle & Fabric Tag */}
          <div className="flex items-center justify-between text-[9px] sm:text-[11px] uppercase tracking-wider mb-1 gap-1">
            <span className="font-semibold text-brand-nude truncate">{product.fabric}</span>
            <span className="font-medium text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] shrink-0">
              {product.stitchType.includes('Unstitched') ? 'Unstitched' : 'Stitched'}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-sm font-serif font-semibold text-brand-charcoal hover:text-brand-nude transition line-clamp-1 cursor-pointer leading-snug"
          >
            {product.title}
          </h3>

          <p className="text-[10px] sm:text-xs text-brand-gray/80 line-clamp-1 mt-0.5 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-brand-nude/20 space-y-2 sm:space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-sm sm:text-base font-serif font-bold text-brand-charcoal">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[10px] sm:text-xs text-brand-gray line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* 2-Column Responsive Buttons */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-0.5">
            <button
              onClick={handleAddToCart}
              className={`py-2 px-1 text-[11px] sm:text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1 active:scale-95 ${
                isAddedToCart
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-charcoal text-brand-cream hover:bg-brand-nude hover:text-brand-charcoal'
              }`}
              title="Add to Cart"
            >
              {isAddedToCart ? (
                <>
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="truncate">Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="truncate">Add</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppBuy}
              className="py-2 px-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] sm:text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1 shadow-xs active:scale-95"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="truncate">WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
