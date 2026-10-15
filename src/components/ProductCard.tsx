'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, MessageCircle, Check } from 'lucide-react';
import { Product, getProductArticleCode } from '@/types/product';
import { BRAND_CONFIG } from '@/config/brand';
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden border border-brand-nude/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isNewArrival && (
          <span className="px-2.5 py-1 bg-brand-charcoal text-brand-cream text-[10px] font-bold uppercase tracking-wider rounded-md">
            New
          </span>
        )}
        {product.isBestseller && (
          <span className="px-2.5 py-1 bg-brand-nude text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
            Bestseller
          </span>
        )}
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="px-2.5 py-1 bg-rose-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-xs hover:bg-white text-brand-charcoal hover:text-rose-600 transition"
        aria-label="Wishlist"
      >
        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
      </button>

      {/* Product Image Container */}
      <div
        className="relative w-full aspect-[3/4] bg-brand-cream overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <Image
          src={activeImage}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-3.5 py-2 bg-white text-brand-charcoal text-xs font-semibold rounded-lg hover:bg-brand-nude hover:text-white transition flex items-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Subtitle & Fabric Tag */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider mb-1">
            <span className="font-semibold text-brand-nude">{product.fabric}</span>
            <span className="font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded text-[10px]">
              {product.stitchType.includes('Unstitched') ? 'Unstitched' : 'Stitched'}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-sm font-serif font-semibold text-brand-charcoal hover:text-brand-nude transition line-clamp-1 cursor-pointer"
          >
            {product.title}
          </h3>

          <p className="text-xs text-brand-gray/80 line-clamp-1 mt-0.5 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-brand-nude/20 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-serif font-bold text-brand-charcoal">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-brand-gray line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleAddToCart}
              className={`py-2.5 px-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1 ${
                isAddedToCart
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-charcoal text-brand-cream hover:bg-brand-nude hover:text-brand-charcoal'
              }`}
            >
              {isAddedToCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add Cart</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppBuy}
              className="py-2.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1 shadow-xs"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
