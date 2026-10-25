'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, RotateCcw, ShieldCheck, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] py-10 sm:py-16 lg:py-20 border-b border-stone-200/80">
      
      {/* Background Soft Pastel Blobs (Reference Style) */}
      <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-[520px] h-[520px] bg-[#F7E7E2]/60 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-[#F2EAE1]/70 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content (Reference Exact Style) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left"
          >
            {/* Pre-title Text (Reference: Clean subtle font, not a badge) */}
            <p className="text-xs sm:text-sm font-medium tracking-wide text-brand-charcoal/80">
              Style That Feels Like You
            </p>

            {/* Headline (Reference Exact: 2 Lines Serif Display) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-charcoal leading-[1.1] tracking-tight">
              Trendy Outfits <br />
              <span className="font-normal italic text-brand-nude">
                for Every You
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-stone-600 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Discover the latest women&apos;s luxury fashion — from casual daily wear to elegant festive looks, all in one place.
            </p>

            {/* CTA Buttons (Reference: Wine/Charcoal Pill Button with Arrow) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href="#catalog"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#9B1C3C] hover:bg-[#801430] text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={BRAND_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-full transition duration-300 shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* 3 Inline Trust Items (Reference Exact: Truck, Box/Rotate, Shield in 1 Row with Dividers) */}
            <div className="pt-8 border-t border-stone-200 grid grid-cols-3 divide-x divide-stone-200 text-left">
              <div className="pr-3 flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-stone-600 shrink-0 stroke-[1.5]" />
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-brand-charcoal leading-tight">Free Shipping</h4>
                  <p className="text-[10px] text-stone-500 font-light">On orders over Rs 5,000</p>
                </div>
              </div>

              <div className="px-3 flex items-center gap-2.5">
                <RotateCcw className="w-5 h-5 text-stone-600 shrink-0 stroke-[1.5]" />
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-brand-charcoal leading-tight">Easy Returns</h4>
                  <p className="text-[10px] text-stone-500 font-light">Within 7 days hassle-free</p>
                </div>
              </div>

              <div className="pl-3 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-stone-600 shrink-0 stroke-[1.5]" />
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-brand-charcoal leading-tight">Secure Payment</h4>
                  <p className="text-[10px] text-stone-500 font-light">100% safe &amp; COD</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Editorial Model Photo (Reference Exact: Standing Model in Arched/Cutout Container with Cursive Script) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4]">
              
              {/* Soft Pastel Arch Background */}
              <div className="absolute inset-0 bg-[#FCECE8] rounded-t-full rounded-b-3xl -z-10 transform scale-95 translate-y-2 border border-brand-nude/30" />

              {/* Model Cutout Image */}
              <div className="relative w-full h-full rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl bg-white border border-stone-200/80">
                <Image
                  src="/products/DL05.jpg"
                  alt="RUAAN Model"
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />

                {/* Handwritten Chic Script Annotation (Reference Exact: "Fashion For Your Story ♡" in top-right) */}
                <div className="absolute top-6 right-6 text-right select-none pointer-events-none drop-shadow-sm">
                  <p className="font-serif italic font-semibold text-sm sm:text-base text-[#9B1C3C] leading-none">
                    Fashion
                  </p>
                  <p className="font-serif italic font-semibold text-xs sm:text-sm text-[#9B1C3C] leading-tight">
                    For Your
                  </p>
                  <p className="font-serif italic font-semibold text-base sm:text-lg text-[#9B1C3C] leading-none flex items-center justify-end gap-1">
                    Story <span className="text-rose-500 text-xs font-sans">♥</span>
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
