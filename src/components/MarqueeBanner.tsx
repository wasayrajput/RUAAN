'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_CONFIG } from '@/config/brand';

export const MarqueeBanner: React.FC = () => {
  const marqueeText = BRAND_CONFIG.marqueeItems.join('   ');

  return (
    <div className="bg-brand-charcoal text-brand-cream text-xs py-2.5 overflow-hidden whitespace-nowrap border-y border-brand-nude/20 shadow-inner">
      <motion.div
        className="inline-block font-serif tracking-widest uppercase font-light text-[11px]"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 40,
        }}
      >
        <span className="mx-4">{marqueeText}</span>
        <span className="mx-4">{marqueeText}</span>
      </motion.div>
    </div>
  );
};
