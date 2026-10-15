'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, Menu, X, PhoneCall } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
  onOpenCareGuide: () => void;
  onOpenWishlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearchChange,
  searchQuery = '',
  onOpenCareGuide,
  onOpenWishlist,
}) => {
  const { totalItems, setIsCartOpen, wishlist } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-nude/30 shadow-xs transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-brand-charcoal text-brand-cream text-xs py-2 px-4 flex items-center justify-between">
        <div className="hidden md:block w-32"></div>

        {/* Center Ticker Notice */}
        <div className="text-center flex-1">
          <p className="text-[11px] font-light tracking-wider animate-pulse">
            ✨ Free Nationwide Shipping on Orders Over Rs 5,000 | Direct WhatsApp Ordering
          </p>
        </div>

        {/* Right WhatsApp Support */}
        <div className="flex items-center gap-4 text-xs">
          <a
            href={BRAND_CONFIG.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-nude flex items-center gap-1 transition"
          >
            <PhoneCall className="w-3 h-3 text-brand-nude" />
            <span className="hidden md:inline">WhatsApp Concierge</span>
          </a>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Mobile Menu & Search Trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-brand-charcoal hover:text-brand-nude focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-brand-charcoal hover:text-brand-nude"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase text-brand-charcoal">
          <a href="#catalog" className="hover:text-brand-nude transition">Shop All</a>
          <a href="#collections" className="hover:text-brand-nude transition">Collections</a>
          <a href="#lookbook" className="hover:text-brand-nude transition">Lookbook</a>
          <button onClick={onOpenCareGuide} className="hover:text-brand-nude transition uppercase">
            Care Guide
          </button>
        </nav>

        {/* Brand Logo */}
        <div className="flex-1 md:flex-initial text-center">
          <Link href="/" className="inline-block relative group">
            <Image
              src={BRAND_CONFIG.logoPng}
              alt={BRAND_CONFIG.name}
              width={140}
              height={50}
              priority
              className="h-12 w-auto object-contain transition transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center relative">
            <input
              type="text"
              placeholder="Search linen, khaddar, viscose..."
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-48 xl:w-60 pl-9 pr-4 py-1.5 text-xs bg-brand-cream/80 border border-brand-nude/40 rounded-full focus:outline-none focus:border-brand-nude transition"
            />
            <Search className="w-3.5 h-3.5 absolute left-3 text-brand-gray" />
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-brand-charcoal hover:text-brand-nude transition cursor-pointer"
            aria-label="View Saved Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 bg-brand-charcoal text-brand-cream rounded-full hover:bg-brand-nude hover:text-brand-charcoal transition shadow-sm flex items-center gap-2 group cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-semibold px-1">{totalItems}</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-brand-cream border-t border-brand-nude/30 lg:hidden overflow-hidden"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search suits, fabrics..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-brand-nude rounded-lg focus:outline-none"
                autoFocus
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-brand-gray" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-brand-nude/40 py-4 px-6 space-y-4 shadow-lg"
          >
            <a
              href="#catalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold text-brand-charcoal uppercase hover:text-brand-nude"
            >
              Shop All Suits
            </a>
            <a
              href="#collections"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold text-brand-charcoal uppercase hover:text-brand-nude"
            >
              Festive Collections
            </a>
            <a
              href="#lookbook"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold text-brand-charcoal uppercase hover:text-brand-nude"
            >
              Seasonal Lookbook
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenWishlist();
              }}
              className="block text-sm font-semibold text-brand-charcoal uppercase hover:text-brand-nude text-left w-full"
            >
              Saved Favorites ({wishlist.length})
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCareGuide();
              }}
              className="block text-sm font-semibold text-brand-charcoal uppercase hover:text-brand-nude text-left w-full"
            >
              Fabric & Care Guide
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
