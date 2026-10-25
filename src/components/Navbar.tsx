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
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200/80 shadow-xs transition-all">
      {/* Top Announcement Bar (Reference Clean Ticker) */}
      <div className="bg-brand-charcoal text-brand-cream text-[11px] py-1.5 px-4 flex items-center justify-between">
        <div className="hidden md:block text-[10px] text-brand-cream/70 font-light">
          Official Store • 100% Original Fabrics
        </div>

        <div className="text-center flex-1">
          <p className="tracking-wide">
            ✨ Free Nationwide Shipping on Orders Over Rs 5,000 | Cash on Delivery
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 text-[10px]">
          <a
            href={BRAND_CONFIG.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-nude flex items-center gap-1 transition text-emerald-400 font-medium"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp Support</span>
          </a>
        </div>
      </div>

      {/* Main Navbar Bar (Reference Exact Layout: Left Logo, Center Links with Underline, Right 4 Icons) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Left Brand Logo (Reference Style: Icon + Brand Name) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 -ml-1 text-brand-charcoal hover:text-brand-nude md:hidden focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-brand-nude/40 shadow-xs bg-brand-cream flex items-center justify-center">
              <Image
                src={BRAND_CONFIG.logoPng}
                alt={BRAND_CONFIG.name}
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-brand-charcoal leading-none">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-brand-nude font-semibold">
                Luxury Pret
              </span>
            </div>
          </Link>
        </div>

        {/* Center Desktop Navigation (Reference Style with Active Underline Indicator) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold tracking-wide text-brand-charcoal">
          <button
            onClick={() => {
              setActiveTab('Home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="relative py-2 hover:text-brand-nude transition"
          >
            <span>Home</span>
            {activeTab === 'Home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => scrollToSection('catalog', 'Shop')}
            className="relative py-2 hover:text-brand-nude transition"
          >
            <span>Shop</span>
            {activeTab === 'Shop' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => scrollToSection('catalog', 'New Arrivals')}
            className="relative py-2 hover:text-brand-nude transition"
          >
            <span>New Arrivals</span>
            {activeTab === 'New Arrivals' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => scrollToSection('categories', 'Categories')}
            className="relative py-2 hover:text-brand-nude transition"
          >
            <span>Categories</span>
            {activeTab === 'Categories' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('About');
              onOpenCareGuide();
            }}
            className="relative py-2 hover:text-brand-nude transition"
          >
            <span>About</span>
            {activeTab === 'About' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
            )}
          </button>

          <a
            href={BRAND_CONFIG.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setActiveTab('Contact')}
            className="relative py-2 hover:text-brand-nude transition"
          >
            <span>Contact</span>
            {activeTab === 'Contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
            )}
          </a>
        </nav>

        {/* Right 4 Icons (Reference Exact Style: Search, User, Wishlist, Cart) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* 1. Search */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-brand-charcoal hover:text-rose-700 transition"
            aria-label="Search"
            title="Search suits"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* 2. User / Profile / WhatsApp Concierge */}
          <a
            href={BRAND_CONFIG.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex p-2 text-brand-charcoal hover:text-rose-700 transition"
            aria-label="Account / Support"
            title="Customer Concierge"
          >
            <User className="w-5 h-5 stroke-[1.75]" />
          </a>

          {/* 3. Wishlist Heart */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-brand-charcoal hover:text-rose-700 transition"
            aria-label="Wishlist"
            title="Saved Favorites"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* 4. Cart Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-brand-charcoal hover:text-rose-700 transition"
            aria-label="Cart Bag"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-brand-charcoal text-white text-[9px] font-bold rounded-full flex items-center justify-center">
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
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search by fabric (linen, khaddar, viscose) or design..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-brand-nude/40 rounded-full focus:outline-none focus:border-brand-charcoal shadow-xs"
                autoFocus
              />
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-brand-gray" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
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
              className="block text-xs font-semibold text-brand-charcoal uppercase hover:text-rose-600 text-left w-full"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('catalog', 'Shop')}
              className="block text-xs font-semibold text-brand-charcoal uppercase hover:text-rose-600 text-left w-full"
            >
              Shop All Suits
            </button>
            <button
              onClick={() => scrollToSection('catalog', 'New Arrivals')}
              className="block text-xs font-semibold text-brand-charcoal uppercase hover:text-rose-600 text-left w-full"
            >
              New Arrivals
            </button>
            <button
              onClick={() => scrollToSection('categories', 'Categories')}
              className="block text-xs font-semibold text-brand-charcoal uppercase hover:text-rose-600 text-left w-full"
            >
              Shop by Category
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCareGuide();
              }}
              className="block text-xs font-semibold text-brand-charcoal uppercase hover:text-rose-600 text-left w-full"
            >
              About / Fabric Care
            </button>
            <a
              href={BRAND_CONFIG.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs font-semibold text-emerald-700 uppercase hover:underline text-left w-full"
            >
              WhatsApp Support
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
