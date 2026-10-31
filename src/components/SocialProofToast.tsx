'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import productsData from '@/data/products.json';

const FAKE_ORDERS = [
  { name: 'Ayeshaa K.', city: 'Lahore', time: '2 mins ago' },
  { name: 'Fatima M.', city: 'Karachi', time: '5 mins ago' },
  { name: 'Zainab R.', city: 'Islamabad', time: '8 mins ago' },
  { name: 'Sania P.', city: 'Faisalabad', time: '12 mins ago' },
  { name: 'Mahnoor S.', city: 'Multan', time: '15 mins ago' }
];

export const SocialProofToast: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<{
    order: typeof FAKE_ORDERS[0];
    product: typeof productsData[0];
  } | null>(null);

  useEffect(() => {
    // Only run on desktop/laptop screens to keep mobile clean & battery-friendly
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    const showRandomOrder = () => {
      const randomOrder = FAKE_ORDERS[Math.floor(Math.random() * FAKE_ORDERS.length)];
      const randomProduct = productsData[Math.floor(Math.random() * productsData.length)];
      setCurrentNotification({ order: randomOrder, product: randomProduct });

      setTimeout(() => {
        setCurrentNotification(null);
      }, 5000);
    };

    // First popup after 4s, then loop every 18s
    const initialTimer = setTimeout(showRandomOrder, 4000);
    const interval = setInterval(showRandomOrder, 18000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {currentNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="hidden md:flex fixed bottom-6 left-6 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-brand-nude/40 items-center gap-3.5 max-w-xs sm:max-w-sm pointer-events-none"
        >
          <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-brand-cream flex-shrink-0 border border-brand-nude/30">
            <Image
              src={currentNotification.product.mainImage}
              alt={currentNotification.product.title}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Direct Online Order</span>
            </div>
            <p className="text-xs font-serif font-bold text-brand-charcoal truncate">
              {currentNotification.product.title}
            </p>
            <p className="text-[10px] text-brand-gray">
              Purchased by <strong className="text-brand-charcoal">{currentNotification.order.name}</strong> from {currentNotification.order.city} ({currentNotification.order.time})
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
