'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, Youtube } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

interface FooterProps {
  onOpenCareGuide: () => void;
  onOpenSizeChart: () => void;
  onOpenOrders?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCareGuide, onOpenSizeChart, onOpenOrders }) => {
  return (
    <footer className="bg-[#21171D] text-white pt-16 pb-8 relative overflow-hidden">
      
      {/* Subtle Decorative Botanical Leaf Background (Reference Style) */}
      <div className="absolute right-0 bottom-0 text-white/5 select-none pointer-events-none">
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 220C80 180 160 140 100 40C80 20 120 10 180 10" stroke="currentColor" strokeWidth="2" />
          <path d="M110 130C150 110 180 120 190 140C150 150 120 145 110 130Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* 4 Footer Columns (Reference Exact Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center">
                <Image
                  src={BRAND_CONFIG.logoPng}
                  alt={BRAND_CONFIG.name}
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <span className="font-serif font-bold text-lg tracking-wider text-white">
                {BRAND_CONFIG.name}
              </span>
            </div>

            <p className="text-xs text-white/70 font-light leading-relaxed max-w-xs">
              Fashion for every chapter of your life. Handcrafted ladies luxury suits, fine linens &amp; festive couture.
            </p>

            {/* Social Icons in Small Circular Outlines (Reference Exact Style) */}
            <div className="pt-1 flex items-center gap-2.5">
              <a
                href={BRAND_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-stone-900 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-stone-900 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 transition"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-rose-600 hover:border-rose-600 transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-light">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="#catalog" className="hover:text-white transition">Shop</a></li>
              <li><a href="#catalog" className="hover:text-white transition">New Arrivals</a></li>
              <li><a href="#categories" className="hover:text-white transition">Categories</a></li>
              <li><button onClick={onOpenCareGuide} className="hover:text-white transition">About Us</button></li>
              <li><a href={BRAND_CONFIG.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Service
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-light">
              <li><a href="#catalog" className="hover:text-white transition">Shipping Policy</a></li>
              <li><a href="#catalog" className="hover:text-white transition">Return &amp; Exchange</a></li>
              <li><button onClick={onOpenSizeChart} className="hover:text-white transition">Size Guide</button></li>
              <li><button onClick={onOpenCareGuide} className="hover:text-white transition">Fabric Care FAQs</button></li>
              <li><a href={BRAND_CONFIG.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Track Order</a></li>
              {onOpenOrders && (
                <li>
                  <button onClick={onOpenOrders} className="text-amber-300 hover:underline">
                    Store Owner Portal
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-light">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                <span>{BRAND_CONFIG.whatsappFormatted}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                <span>{BRAND_CONFIG.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-300 shrink-0 mt-0.5" />
                <span>RUAAN Flagship Boutique, Lahore, Pakistan</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges (Reference Exact Style) */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.name} Official. All rights reserved.</p>
          
          <div className="flex items-center gap-1.5 text-[10px] text-white/80 font-medium">
            <span className="px-2 py-0.5 bg-white/10 rounded border border-white/10">Cash on Delivery</span>
            <span className="px-2 py-0.5 bg-white/10 rounded border border-white/10">JazzCash</span>
            <span className="px-2 py-0.5 bg-white/10 rounded border border-white/10">EasyPaisa</span>
            <span className="px-2 py-0.5 bg-white/10 rounded border border-white/10">Visa / Mastercard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
