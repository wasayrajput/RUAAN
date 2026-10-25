'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

export const HeroBanner: React.FC = () => {

  return (
    <section className="relative overflow-hidden bg-brand-cream py-8 sm:py-16 md:py-20 lg:py-24 border-b border-brand-nude/20">
      {/* Soft Background Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-nude/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-peach/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/80 border border-brand-nude/40 text-brand-charcoal text-[11px] sm:text-xs font-semibold uppercase tracking-widest shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-nude" />
              <span>Barkha Festive Edit &apos;26</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-serif text-brand-charcoal leading-[1.18] sm:leading-tight font-medium"
            >
              Elegance Woven in <br />
              <span className="italic font-normal text-brand-nude underline decoration-brand-nude/30 underline-offset-4 sm:underline-offset-8">
                Every Thread.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm sm:text-base lg:text-lg text-brand-gray font-light max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Discover <strong className="text-brand-charcoal font-medium">RUAAN</strong>&apos;s exclusive collection of luxury doria linen, stone linen, digital viscose, dhanak, karandi, and khaddar ladies suits. Crafted with exquisite prints and tailored silhouettes.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-2 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4"
            >
              <a
                href="#catalog"
                className="w-full sm:w-auto px-4 sm:px-8 py-3.5 sm:py-4 bg-brand-charcoal text-brand-cream font-semibold rounded-full hover:bg-brand-nude hover:text-brand-charcoal transition duration-300 shadow-md flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-wider uppercase group"
              >
                <span>Shop Suits</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition transform group-hover:translate-x-1" />
              </a>

              <a
                href={BRAND_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 sm:px-8 py-3.5 sm:py-4 bg-emerald-700 text-white font-semibold rounded-full hover:bg-emerald-800 transition duration-300 shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wider uppercase"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>WhatsApp</span>
              </a>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-6 sm:pt-8 border-t border-brand-nude/30 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left"
            >
              <div>
                <p className="text-base sm:text-xl font-serif font-bold text-brand-charcoal">100%</p>
                <p className="text-[10px] sm:text-xs text-brand-gray uppercase tracking-wider">Original Fabrics</p>
              </div>
              <div>
                <p className="text-base sm:text-xl font-serif font-bold text-brand-charcoal">Stitched / Unstitched</p>
                <p className="text-[10px] sm:text-xs text-brand-gray uppercase tracking-wider">Custom Sizes</p>
              </div>
              <div>
                <p className="text-base sm:text-xl font-serif font-bold text-brand-charcoal">Express</p>
                <p className="text-[10px] sm:text-xs text-brand-gray uppercase tracking-wider">Global Shipping</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute inset-0 border-2 border-brand-nude/40 rounded-3xl transform translate-x-3 translate-y-3 -z-10"></div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop"
                  alt="RUAAN Luxury Ladies Suit"
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition duration-700"
                />
                
                {/* Floating Brand Badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-brand-nude/30 shadow-lg flex items-center gap-4"
                >
                  <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden border border-brand-nude">
                    <Image
                      src={BRAND_CONFIG.logoPng}
                      alt={BRAND_CONFIG.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-brand-charcoal uppercase tracking-widest">
                      RUAAN Signature Edition
                    </h3>
                    <p className="text-[11px] text-brand-gray">Luxury Fabrics • Stitched &amp; Unstitched Variety</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
