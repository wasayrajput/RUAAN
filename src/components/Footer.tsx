'use client';

import React from 'react';
import Image from 'next/image';
import { PhoneCall, Mail, MapPin, Instagram, Facebook, MessageCircle, Heart } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

interface FooterProps {
  onOpenCareGuide: () => void;
  onOpenSizeChart: () => void;
  onOpenOrders?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCareGuide, onOpenSizeChart, onOpenOrders }) => {
  return (
    <footer className="bg-brand-charcoal text-brand-cream pt-16 pb-8 border-t border-brand-nude/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative w-40 h-12 bg-white rounded-xl p-2 shadow-xs border border-brand-nude/30">
              <Image
                src={BRAND_CONFIG.logoPng}
                alt={BRAND_CONFIG.name}
                fill
                className="object-contain p-1"
              />
            </div>
            <p className="text-xs text-brand-cream/70 font-light max-w-sm leading-relaxed">
              {BRAND_CONFIG.name} is a premier luxury clothing brand dedicated to high-end ladies suits. Celebrating timeless Eastern elegance with premium doria linen, stone linen, digital viscose, dhanak, karandi, and khaddar fabrics.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={BRAND_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-brand-nude hover:text-brand-charcoal transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-brand-nude hover:text-brand-charcoal transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-emerald-600 rounded-full text-white hover:bg-emerald-700 transition"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Shop Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-semibold tracking-wider text-brand-nude uppercase">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-brand-cream/70">
              <li><a href="#catalog" className="hover:text-brand-nude transition">Doria Linen Stitched</a></li>
              <li><a href="#catalog" className="hover:text-brand-nude transition">Stone Linen Stitched</a></li>
              <li><a href="#catalog" className="hover:text-brand-nude transition">Digital Viscose 3-Piece</a></li>
              <li><a href="#catalog" className="hover:text-brand-nude transition">Karandi & Dhanak Allover</a></li>
              <li><a href="#catalog" className="hover:text-brand-nude transition">Winter Khaddar Edition</a></li>
            </ul>
          </div>

          {/* Col 4: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-semibold tracking-wider text-brand-nude uppercase">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-brand-cream/70">
              <li><button onClick={onOpenSizeChart} className="hover:text-brand-nude transition">Size Measurement Guide</button></li>
              <li><button onClick={onOpenCareGuide} className="hover:text-brand-nude transition">Fabric Wash & Care</button></li>
              <li><a href={BRAND_CONFIG.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-brand-nude transition">WhatsApp Order Status</a></li>
              <li><a href="#catalog" className="hover:text-brand-nude transition">Shipping & Delivery Policy</a></li>
              {onOpenOrders && (
                <li>
                  <button onClick={onOpenOrders} className="hover:text-amber-300 transition text-amber-200/90 font-medium flex items-center gap-1">
                    📦 Orders Log (Store Owner)
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-semibold tracking-wider text-brand-nude uppercase">
              Get in Touch
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-cream/70">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-brand-nude" />
                <span>{BRAND_CONFIG.whatsappFormatted}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-nude" />
                <span>{BRAND_CONFIG.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-nude flex-shrink-0 mt-0.5" />
                <span>RUAAN Flagship Boutique, Lahore, Pakistan</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-cream/60 gap-4">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.name} Official. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Ladies Suit Couture
          </p>
        </div>

      </div>
    </footer>
  );
};
