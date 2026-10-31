'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, MessageCircle, Ruler, ShieldCheck, ZoomIn, CheckCircle2 } from 'lucide-react';
import { Product, SizeOption, ColorSwatch, getProductArticleCode } from '@/types/product';
import { BRAND_CONFIG } from '@/config/brand';
import { useCart } from '@/context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenSizeChart: () => void;
  onOpenCareGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOpenSizeChart,
  onOpenCareGuide,
}) => {
  const { addToCart, openDirectOrder, toggleWishlist, isInWishlist, formatPrice } = useCart();
  const [selectedSize, setSelectedSize] = useState<SizeOption>(
    product?.availableSizes ? product.availableSizes[0] : 'Unstitched'
  );
  const [selectedColor, setSelectedColor] = useState<ColorSwatch | undefined>(
    product?.colorSwatches ? product.colorSwatches[0] : undefined
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Zoom Lens State
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    if (product) {
      if (product.availableSizes && product.availableSizes.length > 0) {
        setSelectedSize(product.availableSizes[0]);
      }
      setSelectedColor(product.colorSwatches && product.colorSwatches.length > 0 ? product.colorSwatches[0] : undefined);
      setActiveImageIndex(0);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const isFavorite = isInWishlist(product.id);

  const activeImage = selectedColor
    ? selectedColor.image
    : product.galleryImages[activeImageIndex] || product.mainImage;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleMouseLeave = () => {
    setZoomPos(null);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  const handleDirectOrder = () => {
    openDirectOrder(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-brand-nude/40 my-auto z-10 max-h-[90vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Always Visible Sticky Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 bg-white/90 backdrop-blur-md border border-brand-nude/30 text-brand-charcoal hover:bg-brand-charcoal hover:text-white rounded-full shadow-md transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Container Body */}
          <div className="overflow-y-auto grid grid-cols-1 md:grid-cols-2 p-6 sm:p-8 gap-6 sm:gap-8 max-h-[90vh] no-scrollbar">
            
            {/* Left Column: Interactive Fabric Zoom Lens Gallery */}
            <div className="space-y-4 flex flex-col justify-between">
              <div
                className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-md bg-brand-cream cursor-crosshair group border border-brand-nude/20"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover object-top"
                />

                {/* Fabric Zoom Lens Overlay */}
                {zoomPos && (
                  <div
                    className="absolute inset-0 pointer-events-none z-10 border-2 border-brand-nude shadow-2xl rounded-2xl overflow-hidden"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      backgroundSize: '250%',
                    }}
                  />
                )}

                {!zoomPos && (
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ZoomIn className="w-3 h-3" />
                    <span>Hover to inspect fabric texture</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedColor(undefined);
                        setActiveImageIndex(idx);
                      }}
                      className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 transition flex-shrink-0 ${
                        activeImageIndex === idx && !selectedColor
                          ? 'border-brand-charcoal scale-105 shadow-sm'
                          : 'border-brand-nude/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Specs & Actions */}
            <div className="flex flex-col justify-between space-y-5 pr-2">
              <div className="space-y-4">
                
                {/* Header Tag & Wishlist */}
                <div className="flex items-center justify-between pr-8">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-brand-nude/20 text-brand-charcoal text-xs font-semibold rounded-full uppercase tracking-widest">
                      {product.fabric}
                    </span>
                    <span className="px-2.5 py-1 bg-stone-100 text-stone-700 text-xs font-medium rounded-full uppercase tracking-wider">
                      {product.stitchType.includes('Unstitched') ? 'Unstitched' : 'Stitched'}
                    </span>
                    <span className="font-mono font-bold text-xs bg-brand-charcoal text-amber-200 px-2.5 py-1 rounded-full shadow-xs">
                      Article: {getProductArticleCode(product, selectedColor)}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 text-brand-charcoal hover:text-rose-600 transition"
                    aria-label="Toggle Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>
                </div>

                {/* Title & Price */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal leading-snug">
                    {product.title}
                  </h2>
                  <p className="text-xs text-brand-gray mt-1 font-light">{product.subtitle}</p>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="text-2xl font-serif font-bold text-brand-charcoal">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-brand-gray line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Color Swatch Picker */}
                {product.colorSwatches && product.colorSwatches.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-brand-charcoal uppercase tracking-wider">
                      Color Swatch: <span className="text-brand-nude font-bold">{selectedColor?.name}</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      {product.colorSwatches.map((swatch, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(swatch)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition ${
                            selectedColor?.name === swatch.name
                              ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-xs'
                              : 'bg-white text-brand-charcoal border-brand-nude/40 hover:border-brand-nude'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white"
                            style={{ backgroundColor: swatch.hex }}
                          />
                          <span>{swatch.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-brand-gray leading-relaxed font-light">{product.description}</p>

                {/* Size Selector & Size Guide */}
                {product.availableSizes && product.availableSizes.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-brand-charcoal uppercase tracking-wider">
                        Select Size:
                      </label>
                      <button
                        onClick={onOpenSizeChart}
                        className="text-xs text-brand-nude hover:underline flex items-center gap-1 font-medium"
                      >
                        <Ruler className="w-3.5 h-3.5" />
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition ${
                            selectedSize === size
                              ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-xs'
                              : 'bg-white text-brand-charcoal border-brand-nude/50 hover:border-brand-nude'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex items-center gap-4 pt-1">
                  <span className="text-xs font-semibold text-brand-charcoal uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-brand-nude/50 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1 text-brand-charcoal hover:bg-brand-cream font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-xs font-semibold text-brand-charcoal">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1 text-brand-charcoal hover:bg-brand-cream font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-brand-nude/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="py-3.5 px-4 bg-brand-charcoal text-brand-cream font-semibold text-xs rounded-xl hover:bg-brand-nude hover:text-brand-charcoal transition flex items-center justify-center gap-2 shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={handleDirectOrder}
                    className="py-3.5 px-4 bg-[#B57C53] hover:bg-[#9B1C3C] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer uppercase tracking-wider"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Direct Order</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-brand-gray pt-2 border-t border-dashed border-brand-nude/40">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-nude" />
                    100% Original Fabric Guarantee
                  </span>
                  <button onClick={onOpenCareGuide} className="text-brand-nude hover:underline">
                    Fabric Wash Guide
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
