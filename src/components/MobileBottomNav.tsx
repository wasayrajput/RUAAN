'use client';

import React from 'react';
import { Home, Layers, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';
import { useCart } from '@/context/CartContext';

interface MobileBottomNavProps {
  onOpenWishlist: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenWishlist }) => {
  const { totalItems, setIsCartOpen, wishlist } = useCart();

  const scrollToCatalog = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-nude/30 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden transition-all duration-300"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1 max-w-lg mx-auto">
        
        {/* 1. Home */}
        <button
          onClick={scrollToTop}
          type="button"
          className="flex flex-col items-center justify-center gap-1 text-brand-charcoal hover:text-brand-nude transition active:scale-95 py-1"
        >
          <Home className="w-5 h-5 text-brand-charcoal" />
          <span className="text-[10px] font-medium tracking-tight">Home</span>
        </button>

        {/* 2. Collection / Shop */}
        <button
          onClick={scrollToCatalog}
          type="button"
          className="flex flex-col items-center justify-center gap-1 text-brand-charcoal hover:text-brand-nude transition active:scale-95 py-1"
        >
          <Layers className="w-5 h-5 text-brand-charcoal" />
          <span className="text-[10px] font-medium tracking-tight">Suits</span>
        </button>

        {/* 3. Center Action: Quick Order / Shop */}
        <button
          onClick={scrollToCatalog}
          type="button"
          className="flex flex-col items-center justify-center -mt-3.5 group active:scale-95 transition"
          aria-label="Shop Suits"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#9B1C3C] to-[#B57C53] text-white flex items-center justify-center shadow-md shadow-[#9B1C3C]/30 group-hover:scale-105 transition ring-3 ring-white">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-semibold text-[#9B1C3C] tracking-tight mt-0.5">Order</span>
        </button>

        {/* 4. Wishlist */}
        <button
          onClick={onOpenWishlist}
          type="button"
          className="relative flex flex-col items-center justify-center gap-1 text-brand-charcoal hover:text-brand-nude transition active:scale-95 py-1"
        >
          <div className="relative">
            <Heart className="w-5 h-5 text-brand-charcoal" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">Saved</span>
        </button>

        {/* 5. Cart Drawer */}
        <button
          onClick={() => setIsCartOpen(true)}
          type="button"
          className="relative flex flex-col items-center justify-center gap-1 text-brand-charcoal hover:text-brand-nude transition active:scale-95 py-1"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-brand-charcoal" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 bg-brand-charcoal text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-1 ring-white">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">Cart</span>
        </button>

      </div>
    </nav>
  );
};
