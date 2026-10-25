'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, RotateCcw, ShieldCheck, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] py-8 sm:py-12 lg:py-14 border-b border-brand-nude/30">
      
      {/* RUAAN Signature Warm Sand & Nude Ambient Blobs */}
      <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-[540px] h-[540px] bg-brand-nude/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-brand-peach/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content (RUAAN Main Palette: Charcoal, Nude, Cream) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left"
          >
            {/* Pre-title Text */}
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-nude">
              Style That Feels Like You
            </p>

            {/* Headline (RUAAN Charcoal + Italic Warm Nude) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-charcoal leading-[1.1] tracking-tight">
              Trendy Outfits <br />
              <span className="font-normal italic text-brand-nude">
                for Every You
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-stone-600 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Discover <strong className="text-brand-charcoal font-medium">RUAAN</strong>&apos;s exclusive collection of luxury ladies suits — from everyday breathable linen to regal festive 3-piece sets.
            </p>

            {/* CTA Buttons (RUAAN Main Color: Deep Charcoal Black + Warm Nude Hover + Emerald WhatsApp) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href="#catalog"
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-charcoal hover:bg-brand-nude text-brand-cream hover:text-brand-charcoal text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={BRAND_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-full transition duration-300 shadow-sm flex items-center justify-center gap-2 active:scale-95 uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* 3 Inline Trust Items (RUAAN Warm Palette) */}
            <div className="pt-8 border-t border-brand-nude/30 grid grid-cols-3 divide-x divide-brand-nude/30 text-left">
              <div className="pr-3 flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-brand-nude shrink-0 stroke-[1.75]" />
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-brand-charcoal leading-tight">Free Shipping</h4>
                  <p className="text-[10px] text-stone-500 font-light">On orders over Rs 5,000</p>
                </div>
              </div>

              <div className="px-3 flex items-center gap-2.5">
                <RotateCcw className="w-5 h-5 text-brand-nude shrink-0 stroke-[1.75]" />
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-brand-charcoal leading-tight">Easy Returns</h4>
                  <p className="text-[10px] text-stone-500 font-light">Within 7 days hassle-free</p>
                </div>
              </div>

              <div className="pl-3 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-nude shrink-0 stroke-[1.75]" />
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-brand-charcoal leading-tight">Secure Payment</h4>
                  <p className="text-[10px] text-stone-500 font-light">100% safe &amp; COD</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Editorial Model Photo (Warm Sand / Nude Frame + Charcoal Script) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4]">
              
              {/* Soft Warm Sand Arch Background */}
              <div className="absolute inset-0 bg-[#F5EBE1] rounded-t-full rounded-b-3xl -z-10 transform scale-95 translate-y-2 border border-brand-nude/40 shadow-xs" />

              {/* Model Cutout Image */}
              <div className="relative w-full h-full rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl bg-white border border-brand-nude/30">
                <Image
                  src="/products/DL05.jpg"
                  alt="RUAAN Model"
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />

                {/* Handwritten Chic Script Annotation (Charcoal & Nude Gold Accent) */}
                <div className="absolute top-6 right-6 text-right select-none pointer-events-none drop-shadow-sm">
                  <p className="font-serif italic font-semibold text-sm sm:text-base text-brand-charcoal leading-none">
                    Fashion
                  </p>
                  <p className="font-serif italic font-semibold text-xs sm:text-sm text-brand-charcoal leading-tight">
                    For Your
                  </p>
                  <p className="font-serif italic font-semibold text-base sm:text-lg text-brand-charcoal leading-none flex items-center justify-end gap-1">
                    Story <span className="text-brand-nude text-xs font-sans">♥</span>
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
