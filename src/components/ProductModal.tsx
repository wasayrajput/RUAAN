'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Ruler, ShieldCheck, ZoomIn, CheckCircle2, ArrowLeft, Maximize2 } from 'lucide-react';
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
  const [imageFitMode, setImageFitMode] = useState<'contain' | 'cover'>('contain');

  // Desktop Zoom Lens State
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    if (product) {
      if (product.availableSizes && product.availableSizes.length > 0) {
        setSelectedSize(product.availableSizes[0]);
      }
      setSelectedColor(product.colorSwatches && product.colorSwatches.length > 0 ? product.colorSwatches[0] : undefined);
      setActiveImageIndex(0);
      setQuantity(1);
      setImageFitMode('contain');
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

  const articleCode = getProductArticleCode(product, selectedColor);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 md:p-6">
        
        {/* Backdrop click to close on desktop */}
        <div className="hidden sm:block absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-white w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-4xl sm:rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Top App Bar (Feels like a full native product page) */}
          <div className="sm:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2.5 border-b border-stone-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-1.5 -ml-1 text-stone-800 hover:text-stone-900 flex items-center gap-1.5 text-xs font-semibold active:scale-95 transition"
              aria-label="Back to collection"
            >
              <ArrowLeft className="w-4 h-4 text-stone-700" />
              <span>Back</span>
            </button>

            <span className="font-mono font-bold text-xs bg-stone-900 text-amber-200 px-2.5 py-0.5 rounded-full shadow-2xs">
              Article: {articleCode}
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-1.5 text-stone-700 hover:text-rose-600 active:scale-90 transition"
                aria-label="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-stone-700 hover:bg-stone-100 rounded-full active:scale-90 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Desktop Floating Close Button */}
          <button
            onClick={onClose}
            className="hidden sm:flex absolute top-4 right-4 z-30 p-2 bg-white/90 backdrop-blur-md border border-stone-200 text-stone-800 hover:bg-stone-900 hover:text-white rounded-full shadow-md transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Container Body */}
          <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 p-3 sm:p-6 lg:p-8 gap-4 sm:gap-6 lg:gap-8 no-scrollbar">
            
            {/* Left Column: Full Suit Photo View with Zero Cropping */}
            <div className="space-y-3 flex flex-col justify-start">
              <div
                className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-xs bg-[#FBF9F5] cursor-crosshair group border border-stone-200 flex items-center justify-center"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={imageFitMode === 'contain' ? 'object-contain' : 'object-cover object-top'}
                />

                {/* Fabric Zoom Lens Overlay (Desktop only) */}
                {zoomPos && (
                  <div
                    className="hidden sm:block absolute inset-0 pointer-events-none z-10 border-2 border-brand-nude shadow-2xl rounded-2xl overflow-hidden"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      backgroundSize: '250%',
                    }}
                  />
                )}

                {/* Top Badge: Full Suit Guaranteed */}
                <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
                  <span className="bg-white/90 backdrop-blur-md text-stone-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-stone-200 shadow-2xs">
                    Full Suit View
                  </span>
                </div>

                {/* Toggle Fit Mode Button (Fit Whole Suit vs Full Screen) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageFitMode(imageFitMode === 'contain' ? 'cover' : 'contain');
                  }}
                  className="absolute bottom-2.5 right-2.5 z-20 bg-stone-900/80 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md hover:bg-stone-900 transition active:scale-95"
                  title="Toggle full suit fit"
                >
                  <Maximize2 className="w-3 h-3 text-amber-200" />
                  <span>{imageFitMode === 'contain' ? 'Fill' : 'Fit Entire Suit'}</span>
                </button>

                {!zoomPos && (
                  <div className="hidden sm:flex absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full items-center gap-1">
                    <ZoomIn className="w-3 h-3" />
                    <span>Hover to inspect texture</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedColor(undefined);
                        setActiveImageIndex(idx);
                      }}
                      className={`relative w-14 h-18 sm:w-16 sm:h-20 rounded-xl overflow-hidden border-2 transition flex-shrink-0 bg-stone-50 ${
                        activeImageIndex === idx && !selectedColor
                          ? 'border-stone-900 scale-102 shadow-xs'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Specs & Actions */}
            <div className="flex flex-col justify-between space-y-3 sm:space-y-4">
              <div className="space-y-3 sm:space-y-4">
                
                {/* Header Tag & Wishlist (Desktop) */}
                <div className="hidden sm:flex items-center justify-between pr-8">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 bg-stone-100 text-stone-800 text-xs font-semibold rounded-full uppercase tracking-wider">
                      {product.fabric}
                    </span>
                    <span className="px-2 py-1 bg-amber-50 text-amber-900 text-xs font-medium rounded-full uppercase tracking-wider">
                      {product.stitchType.includes('Unstitched') ? 'Unstitched' : 'Stitched'}
                    </span>
                    <span className="font-mono font-bold text-xs bg-stone-900 text-amber-200 px-2.5 py-1 rounded-full shadow-2xs">
                      Article: {articleCode}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-1.5 text-stone-700 hover:text-rose-600 transition"
                    aria-label="Toggle Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>
                </div>

                {/* Title & Price */}
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
                    {product.title}
                  </h1>
                  <p className="text-xs text-stone-500 mt-0.5 font-light">{product.subtitle}</p>
                  
                  <div className="mt-2.5 flex items-baseline gap-2.5">
                    <span className="text-2xl font-serif font-bold text-stone-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-stone-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-xs font-bold text-[#9B1C3C] bg-rose-50 px-2 py-0.5 rounded-full">
                        Save {formatPrice(product.originalPrice - product.price)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Color Swatch Picker */}
                {product.colorSwatches && product.colorSwatches.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                      Color Swatch: <span className="text-[#B57C53] font-bold">{selectedColor?.name}</span>
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {product.colorSwatches.map((swatch, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(swatch)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs transition ${
                            selectedColor?.name === swatch.name
                              ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                              : 'bg-white text-stone-800 border-stone-300 hover:border-stone-400'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                            style={{ backgroundColor: swatch.hex }}
                          />
                          <span>{swatch.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                  <p className="text-xs text-stone-600 leading-relaxed font-light">{product.description}</p>
                  
                  {/* Fabric Details Breakdown */}
                  {product.details && (
                    <div className="mt-2.5 pt-2 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[11px] text-stone-700">
                      <div>
                        <strong className="text-stone-900">Shirt:</strong> {product.details.shirt}
                      </div>
                      <div>
                        <strong className="text-stone-900">Dupatta:</strong> {product.details.dupatta}
                      </div>
                      <div>
                        <strong className="text-stone-900">Trouser:</strong> {product.details.trouser}
                      </div>
                    </div>
                  )}
                </div>

                {/* Size Selector & Size Guide */}
                {product.availableSizes && product.availableSizes.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                        Select Size:
                      </label>
                      <button
                        onClick={onOpenSizeChart}
                        className="text-xs text-[#B57C53] hover:underline flex items-center gap-1 font-medium"
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
                          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition ${
                            selectedSize === size
                              ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                              : 'bg-white text-stone-800 border-stone-300 hover:border-stone-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1 text-stone-800 hover:bg-stone-100 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-3.5 py-1 text-xs font-semibold text-stone-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1 text-stone-800 hover:bg-stone-100 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>

              {/* Desktop Actions */}
              <div className="hidden sm:block space-y-3 pt-3 border-t border-stone-200">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="py-3 px-4 bg-stone-900 text-white font-semibold text-xs rounded-xl hover:bg-stone-800 transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={handleDirectOrder}
                    className="py-3 px-4 bg-[#B57C53] hover:bg-[#9B1C3C] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer uppercase tracking-wider"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Direct Order</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-dashed border-stone-200">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    100% Original Brand Fabric
                  </span>
                  <button onClick={onOpenCareGuide} className="text-[#B57C53] hover:underline">
                    Fabric Care Guide
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Mobile Sticky Bottom Action Bar (Zero Cutoff, Always Accessible) */}
          <div className="sm:hidden sticky bottom-0 z-30 bg-white/95 backdrop-blur-md p-3 border-t border-stone-200 shadow-[0_-4px_15px_rgba(0,0,0,0.06)]">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddToCart}
                className="py-3 px-3 bg-stone-900 text-white font-semibold text-xs rounded-xl active:scale-95 transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={handleDirectOrder}
                className="py-3 px-3 bg-[#B57C53] active:bg-[#9B1C3C] text-white font-bold text-xs rounded-xl active:scale-95 transition flex items-center justify-center gap-1.5 shadow-xs uppercase tracking-wider"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Direct Order</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
