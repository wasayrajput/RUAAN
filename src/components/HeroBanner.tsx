'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Truck, RotateCcw, ShieldCheck, Heart } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] py-8 sm:py-14 lg:py-20 border-b border-brand-nude/20">
      
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-nude/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-peach/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content (Reference Style) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left"
          >
            {/* Tag / Pre-title */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-nude/40 text-brand-charcoal text-[11px] sm:text-xs font-semibold uppercase tracking-widest shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brand-nude animate-pulse" />
              <span>Style That Feels Like You</span>
            </div>

            {/* Bold Elegant Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-brand-charcoal leading-[1.15] font-medium">
              Trendy Outfits <br />
              <span className="italic font-normal text-brand-nude">
                for Every You
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-brand-gray font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover the latest women&apos;s luxury fashion — from everyday breathable linen to regal festive 3-piece sets, crafted with exquisite craftsmanship.
            </p>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href="#catalog"
                className="w-full sm:w-auto px-7 py-3.5 bg-brand-charcoal text-brand-cream text-xs sm:text-sm font-semibold rounded-full hover:bg-brand-nude hover:text-white transition duration-300 shadow-md flex items-center justify-center gap-2 uppercase tracking-wider group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition transform group-hover:translate-x-1" />
              </a>

              <a
                href={BRAND_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-emerald-800 transition duration-300 shadow-md flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* Mini Trust Features Row (Reference Style) */}
            <div className="pt-6 border-t border-brand-nude/30 grid grid-cols-3 gap-2 sm:gap-4 text-left">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-nude shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-brand-charcoal">Free Shipping</h4>
                  <p className="text-[10px] sm:text-[11px] text-brand-gray font-light">On orders over Rs 5,000</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-brand-nude shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-brand-charcoal">Easy Exchange</h4>
                  <p className="text-[10px] sm:text-[11px] text-brand-gray font-light">Within 7 days hassle-free</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-nude shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-brand-charcoal">100% Original</h4>
                  <p className="text-[10px] sm:text-[11px] text-brand-gray font-light">Authentic tested fabrics</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Model Photo Card (Reference Style with Handwritten Script Tag) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              
              {/* Outer Pastel Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl bg-[#F6EDE4] border border-brand-nude/30 aspect-[3/4]">
                <Image
                  src="/products/DL05.jpg"
                  alt="RUAAN Festive Pret Model"
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition duration-700"
                />

                {/* Handwritten Chic Script Accent (Reference: "Fashion For Your Story ♡") */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-nude/40 shadow-sm flex items-center gap-1.5">
                  <span className="font-serif italic text-xs sm:text-sm text-brand-charcoal font-medium">
                    Fashion For Your Story
                  </span>
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                </div>

                {/* Floating Bottom Tag */}
                <div className="absolute bottom-4 inset-x-4 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-brand-nude/30 shadow-md flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-serif font-bold text-brand-charcoal">
                      Barkha Festive Edit &apos;26
                    </h3>
                    <p className="text-[10px] text-brand-gray">Handcrafted 3-Piece Stitched Doria</p>
                  </div>
                  <span className="text-xs font-serif font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    Rs 2,700
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
