'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, Menu, X, User, MessageCircle } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'Home' | 'Shop' | 'New Arrivals' | 'Categories' | 'About' | 'Contact'>('Home');

  const scrollToSection = (id: string, tab: any) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs transition-all">
      {/* Top Announcement Bar (Clean Luxury Ticker) */}
      <div className="bg-brand-charcoal text-brand-cream text-xs py-2 px-4 sm:px-6 flex items-center justify-between">
        <div className="hidden md:block text-[11px] text-brand-cream/80 font-light tracking-wide">
          Official Store • 100% Original Fabrics
        </div>

        <div className="text-center flex-1">
          <p className="text-[11px] sm:text-xs font-light tracking-wider">
            ✨ Free Nationwide Shipping on Orders Over Rs 5,000 | Cash on Delivery
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 text-xs">
          <a
            href={BRAND_CONFIG.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-300 flex items-center gap-1.5 transition text-emerald-400 font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </div>

      {/* Main Navbar Bar (Spacious Luxury Height: h-24 / 96px with Original Non-Round Logo) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-22 sm:h-24 flex items-center justify-between">
        
        {/* Left: Original Rectangular RUAAN Brand Logo (NOT Round, Fully Uncropped) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-2 text-brand-charcoal hover:text-rose-600 md:hidden focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/" className="inline-block relative group py-1">
            <Image
              src={BRAND_CONFIG.logoPng}
              alt={BRAND_CONFIG.name}
              width={160}
              height={56}
              priority
              className="h-12 sm:h-14 w-auto object-contain transition transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Center Desktop Navigation (Clean, Spacious, Elegant) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium tracking-wide text-brand-charcoal">
          <button
            onClick={() => {
              setActiveTab('Home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="relative py-2 hover:text-[#9B1C3C] transition cursor-pointer"
          >
            <span>Home</span>
            {activeTab === 'Home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9B1C3C] rounded-full" />
            )}
          </button>

          <button
            onClick={() => scrollToSection('catalog', 'Shop')}
            className="relative py-2 hover:text-[#9B1C3C] transition cursor-pointer"
          >
            <span>Shop</span>
            {activeTab === 'Shop' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9B1C3C] rounded-full" />
            )}
          </button>

          <button
            onClick={() => scrollToSection('catalog', 'New Arrivals')}
            className="relative py-2 hover:text-[#9B1C3C] transition cursor-pointer"
          >
            <span>New Arrivals</span>
            {activeTab === 'New Arrivals' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9B1C3C] rounded-full" />
            )}
          </button>

          <button
            onClick={() => scrollToSection('categories', 'Categories')}
            className="relative py-2 hover:text-[#9B1C3C] transition cursor-pointer"
          >
            <span>Categories</span>
            {activeTab === 'Categories' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9B1C3C] rounded-full" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('About');
              onOpenCareGuide();
            }}
            className="relative py-2 hover:text-[#9B1C3C] transition cursor-pointer"
          >
            <span>About</span>
            {activeTab === 'About' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9B1C3C] rounded-full" />
            )}
          </button>

          <a
            href={BRAND_CONFIG.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setActiveTab('Contact')}
            className="relative py-2 hover:text-[#9B1C3C] transition cursor-pointer"
          >
            <span>Contact</span>
            {activeTab === 'Contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9B1C3C] rounded-full" />
            )}
          </a>
        </nav>

        {/* Right 4 Utility Icons (Search, User, Wishlist, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 1. Search (Toggles to Cross X when open) */}
          <button
            onClick={() => {
              if (isSearchOpen && onSearchChange) {
                onSearchChange('');
              }
              setIsSearchOpen(!isSearchOpen);
            }}
            className="p-2.5 text-brand-charcoal hover:text-[#9B1C3C] transition rounded-full hover:bg-stone-50 cursor-pointer"
            aria-label={isSearchOpen ? 'Close Search' : 'Search'}
            title={isSearchOpen ? 'Close search' : 'Search suits'}
          >
            {isSearchOpen ? (
              <X className="w-5 h-5 stroke-[1.75]" />
            ) : (
              <Search className="w-5 h-5 stroke-[1.75]" />
            )}
          </button>

          {/* 2. User / WhatsApp Concierge */}
          <a
            href={BRAND_CONFIG.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex p-2.5 text-brand-charcoal hover:text-[#9B1C3C] transition rounded-full hover:bg-stone-50"
            aria-label="Concierge Support"
            title="Customer Concierge"
          >
            <User className="w-5 h-5 stroke-[1.75]" />
          </a>

          {/* 3. Wishlist Heart (Desktop only; on mobile it is in MobileBottomNav) */}
          <button
            onClick={onOpenWishlist}
            className="hidden md:inline-flex relative p-2.5 text-brand-charcoal hover:text-[#9B1C3C] transition rounded-full hover:bg-stone-50 cursor-pointer"
            aria-label="Wishlist"
            title="Saved Favorites"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-[#9B1C3C] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* 4. Cart Bag (Desktop only; on mobile it is in MobileBottomNav) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="hidden md:inline-flex relative p-2.5 text-brand-charcoal hover:text-[#9B1C3C] transition rounded-full hover:bg-stone-50 cursor-pointer"
            aria-label="Cart Bag"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-stone-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Desktop Search Bar Dropdown */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 sm:p-4 bg-brand-cream border-t border-stone-200 overflow-hidden"
          >
            <div className="max-w-2xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by fabric (linen, khaddar, viscose) or design..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm bg-white border border-brand-nude/40 rounded-full focus:outline-none focus:border-brand-charcoal shadow-xs"
                  autoFocus
                />
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange && onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-brand-charcoal hover:bg-stone-100 rounded-full transition cursor-pointer"
                    aria-label="Clear search text"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {/* Close search button */}
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  if (onSearchChange) onSearchChange('');
                }}
                className="p-2 sm:p-2.5 text-stone-500 hover:text-[#9B1C3C] hover:bg-white rounded-full transition cursor-pointer flex-shrink-0"
                aria-label="Close search"
                title="Close search"
              >
                <X className="w-5 h-5 stroke-[1.75]" />
              </button>
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
            className="md:hidden bg-white border-b border-stone-200 py-4 px-6 space-y-3 shadow-lg"
          >
            <button
              onClick={() => {
                setActiveTab('Home');
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="block text-sm font-semibold text-brand-charcoal uppercase hover:text-[#9B1C3C] text-left w-full"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('catalog', 'Shop')}
              className="block text-sm font-semibold text-brand-charcoal uppercase hover:text-[#9B1C3C] text-left w-full"
            >
              Shop All Suits
            </button>
            <button
              onClick={() => scrollToSection('catalog', 'New Arrivals')}
              className="block text-sm font-semibold text-brand-charcoal uppercase hover:text-[#9B1C3C] text-left w-full"
            >
              New Arrivals
            </button>
            <button
              onClick={() => scrollToSection('categories', 'Categories')}
              className="block text-sm font-semibold text-brand-charcoal uppercase hover:text-[#9B1C3C] text-left w-full"
            >
              Shop by Category
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCareGuide();
              }}
              className="block text-sm font-semibold text-brand-charcoal uppercase hover:text-[#9B1C3C] text-left w-full"
            >
              About / Fabric Care
            </button>
            <a
              href={BRAND_CONFIG.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-semibold text-emerald-700 uppercase hover:underline text-left w-full"
            >
              WhatsApp Support
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
