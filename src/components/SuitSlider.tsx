'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, MessageCircle, Sparkles, Play, Pause, CheckCircle2 } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product, getProductArticleCode } from '@/types/product';
import { BRAND_CONFIG } from '@/config/brand';
import { useCart } from '@/context/CartContext';

interface SuitSliderProps {
  onQuickView: (product: Product) => void;
}

export const SuitSlider: React.FC<SuitSliderProps> = ({ onQuickView }) => {
  const { formatPrice, addToCart, openDirectOrder } = useCart();
  const allSuits = productsData as Product[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % allSuits.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + allSuits.length) % allSuits.length);
  };

  const currentSuit = allSuits[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
  };

  const marqueeSuits = [...allSuits, ...allSuits];

  return (
    <section className="py-12 bg-brand-cream/40 border-b border-brand-nude/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-brand-nude uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Auto-Scrolling Spotlight Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-brand-charcoal">
              Live Suit Slideshow
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-3.5 py-1.5 bg-white border border-brand-nude/40 rounded-full text-xs text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition flex items-center gap-1.5 shadow-xs font-medium cursor-pointer"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>Auto-Slide: ON</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>Auto-Slide: PAUSED</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5 mx-2">
              {allSuits.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-brand-charcoal' : 'w-2 bg-brand-nude/40 hover:bg-brand-nude'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handlePrev}
              className="p-2.5 bg-white border border-brand-nude/40 rounded-full hover:bg-brand-charcoal hover:text-white text-brand-charcoal shadow-xs transition cursor-pointer flex items-center justify-center"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 bg-white border border-brand-nude/40 rounded-full hover:bg-brand-charcoal hover:text-white text-brand-charcoal shadow-xs transition cursor-pointer flex items-center justify-center"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. Main Spotlight Slideshow Box */}
        <div
          className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-brand-nude/30 min-h-[420px] sm:min-h-[460px] flex items-center"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 items-center p-6 sm:p-10 gap-8"
            >
              {/* Left Column: Image Showcase */}
              <div className="lg:col-span-6 relative">
                <div
                  className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md bg-brand-cream cursor-pointer"
                  onClick={() => onQuickView(currentSuit)}
                >
                  <Image
                    src={currentSuit.mainImage}
                    alt={currentSuit.title}
                    fill
                    priority
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-brand-charcoal/90 backdrop-blur-md text-brand-cream text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {currentSuit.fabric} • {currentSuit.collection}
                  </div>
                </div>
              </div>

              {/* Right Column: Suit Info */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-brand-nude uppercase tracking-widest">
                    {currentSuit.fabric}
                  </span>
                  <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                    • {currentSuit.stitchType.includes('Unstitched') ? 'Unstitched' : 'Stitched'}
                  </span>
                  <span className="font-mono font-bold text-xs bg-brand-charcoal text-amber-200 px-2 py-0.5 rounded shadow-xs">
                    Article: {getProductArticleCode(currentSuit)}
                  </span>
                </div>

                <h3
                  onClick={() => onQuickView(currentSuit)}
                  className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal cursor-pointer hover:text-brand-nude transition"
                >
                  {currentSuit.title}
                </h3>

                <p className="text-xs text-brand-gray leading-relaxed max-w-lg font-light">
                  {currentSuit.subtitle} — {currentSuit.description}
                </p>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline gap-3">
                  <span className="text-2xl font-serif font-bold text-brand-charcoal">
                    {formatPrice(currentSuit.price)}
                  </span>
                  {currentSuit.originalPrice && currentSuit.originalPrice > currentSuit.price && (
                    <span className="text-sm text-brand-gray line-through">
                      {formatPrice(currentSuit.originalPrice)}
                    </span>
                  )}
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onQuickView(currentSuit)}
                    className="px-6 py-3 bg-brand-charcoal text-white font-semibold text-xs rounded-xl hover:bg-brand-nude hover:text-brand-charcoal transition shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Quick View Suit</span>
                  </button>

                  <button
                    onClick={() => addToCart(currentSuit, undefined, undefined, 1)}
                    className="px-6 py-3 bg-brand-nude text-white font-semibold text-xs rounded-xl hover:bg-brand-charcoal transition shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => openDirectOrder(currentSuit)}
                    className="px-6 py-3 bg-[#B57C53] hover:bg-[#9B1C3C] text-white font-semibold text-xs rounded-xl transition shadow-sm flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Direct Order</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2. Continuous Infinite Auto-Scrolling Carousel Ribbon */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-brand-gray">
            <span className="font-serif font-semibold text-brand-charcoal uppercase tracking-wider text-xs sm:text-sm">
              ✦ RUAAN Signature Collection
            </span>
            <span className="text-[11px] text-brand-nude font-medium tracking-wide">
              ✦ Explore All Designs
            </span>
          </div>

          <div className="overflow-hidden relative py-2 no-scrollbar">
            <div className="animate-infinite-scroll flex gap-4 w-max">
              {marqueeSuits.map((suit, index) => (
                <div
                  key={`${suit.id}-${index}`}
                  onClick={() => onQuickView(suit)}
                  className="w-48 sm:w-56 flex-shrink-0 bg-white rounded-2xl overflow-hidden border border-brand-nude/30 shadow-xs hover:shadow-lg transition cursor-pointer group"
                >
                  <div className="relative aspect-[3/4] w-full bg-brand-cream overflow-hidden">
                    <Image
                      src={suit.mainImage}
                      alt={suit.title}
                      fill
                      sizes="220px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 space-y-1">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-0.5">
                      <span className="font-semibold text-brand-nude">{suit.fabric}</span>
                      <span className="text-stone-500 font-medium">
                        {suit.stitchType.includes('Unstitched') ? 'Unstitched' : 'Stitched'}
                      </span>
                    </div>
                    <h4 className="text-xs font-serif font-semibold text-brand-charcoal truncate group-hover:text-brand-nude transition">
                      {suit.title}
                    </h4>
                    <p className="text-[11px] font-bold text-brand-charcoal">
                      {formatPrice(suit.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
