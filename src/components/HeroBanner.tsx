'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, RotateCcw, ShieldCheck, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FDF6F0] via-[#F7E7DC] to-[#F2CBAC]/50 py-8 sm:py-12 lg:py-14 border-b border-[#E8C2A5]/50">
      
      {/* Background Soft Glows (Using Exact Logo Colors: #F2CBAC & #F5DCD0) */}
      <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-[550px] h-[550px] bg-[#F2CBAC]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#F2CBAC]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left"
          >
            {/* Pre-title Text (Logo Warm Nude Accent) */}
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#B57C53]">
              Style That Feels Like You
            </p>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#4B4B4D] leading-[1.15] tracking-tight">
              Trendy Outfits <br />
              <span className="font-normal italic text-[#C98A61]">
                for Every You
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-[#68676B] font-light max-w-md mx-auto lg:mx-0 leading-relaxed">
              Discover <strong className="text-[#4B4B4D] font-medium">RUAAN</strong>&apos;s exclusive collection of luxury ladies suits — from everyday breathable linen to regal festive 3-piece sets.
            </p>

            {/* CTA Buttons: Symmetrical 2 Columns on Mobile */}
            <div className="pt-2 flex items-center justify-center lg:justify-start">
              <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm sm:max-w-none sm:w-auto sm:flex sm:flex-row sm:gap-3">
                <a
                  href="#catalog"
                  className="px-4 sm:px-8 py-2.5 sm:py-3.5 bg-[#4B4B4D] hover:bg-[#F2CBAC] text-white hover:text-[#4B4B4D] text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 group active:scale-95 cursor-pointer uppercase tracking-wider text-center"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#catalog"
                  className="px-4 sm:px-7 py-2.5 sm:py-3.5 bg-[#B57C53] hover:bg-[#9B1C3C] text-white text-xs sm:text-sm font-semibold rounded-full transition duration-300 shadow-sm flex items-center justify-center gap-1.5 active:scale-95 uppercase tracking-wider text-center"
                >
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Direct Order</span>
                </a>
              </div>
            </div>

            {/* 3 Inline Trust Items */}
            <div className="pt-5 sm:pt-8 border-t border-[#E8C2A5]/60 grid grid-cols-3 divide-x divide-[#E8C2A5]/60 text-center sm:text-left">
              <div className="px-1 sm:pr-3 flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2.5">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#B57C53] shrink-0" />
                <div>
                  <h4 className="text-[10px] sm:text-xs font-semibold text-[#4B4B4D] leading-tight">Free Shipping</h4>
                  <p className="text-[9px] sm:text-[10px] text-[#7A787D] font-light hidden sm:block">Over Rs 5,000</p>
                </div>
              </div>

              <div className="px-1 sm:px-3 flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2.5">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-[#B57C53] shrink-0" />
                <div>
                  <h4 className="text-[10px] sm:text-xs font-semibold text-[#4B4B4D] leading-tight">Easy Returns</h4>
                  <p className="text-[9px] sm:text-[10px] text-[#7A787D] font-light hidden sm:block">Within 7 days</p>
                </div>
              </div>

              <div className="px-1 sm:pl-3 flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2.5">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#B57C53] shrink-0" />
                <div>
                  <h4 className="text-[10px] sm:text-xs font-semibold text-[#4B4B4D] leading-tight">COD Available</h4>
                  <p className="text-[9px] sm:text-[10px] text-[#7A787D] font-light hidden sm:block">100% Safe</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Editorial Model Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center pt-2 sm:pt-0"
          >
            <div className="relative w-full max-w-[240px] sm:max-w-md aspect-[3/4]">
              
              {/* Exact Logo Peach Nude Arch Container (#F2CBAC) */}
              <div className="absolute inset-0 bg-[#F2CBAC] rounded-t-full rounded-b-3xl -z-10 transform scale-95 translate-y-2 shadow-sm border border-[#E8C2A5]" />

              {/* Model Cutout Image */}
              <div className="relative w-full h-full rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl bg-white border border-[#E8C2A5]/60">
                <Image
                  src="/products/DL05.jpg"
                  alt="RUAAN Model"
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />

                {/* Handwritten Chic Script Annotation (Charcoal & Warm Peach) */}
                <div className="absolute top-6 right-6 text-right select-none pointer-events-none drop-shadow-sm">
                  <p className="font-serif italic font-semibold text-sm sm:text-base text-[#4B4B4D] leading-none">
                    Fashion
                  </p>
                  <p className="font-serif italic font-semibold text-xs sm:text-sm text-[#4B4B4D] leading-tight">
                    For Your
                  </p>
                  <p className="font-serif italic font-semibold text-base sm:text-lg text-[#4B4B4D] leading-none flex items-center justify-end gap-1">
                    Story <span className="text-[#C98A61] text-xs font-sans">♥</span>
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
