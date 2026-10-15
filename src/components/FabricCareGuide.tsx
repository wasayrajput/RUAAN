'use client';

import React from 'react';
import { X, ShieldCheck, Droplets, Sun, Flame } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

interface FabricCareGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FabricCareGuide: React.FC<FabricCareGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const fabricsGuide = [
    {
      fabric: "Doria Linen & Stone Linen",
      icon: "🌿",
      wash: "Cold hand wash or gentle machine cycle in mild detergent.",
      dry: "Dry in shade inside-out to maintain vivid print brilliance.",
      iron: "Medium heat iron while slightly damp for crisp finish."
    },
    {
      fabric: "Digital Viscose & Viscose Linen",
      icon: "✨",
      wash: "Soft dip hand-wash only; do not wring or scrub vigorously.",
      dry: "Flat drip dry in shade to preserve soft fabric fall.",
      iron: "Low heat setting without steam direct contact."
    },
    {
      fabric: "Winter Khaddar & Dhanak",
      icon: "❄️",
      wash: "Gentle wash in cold water using gentle wool/winter detergent.",
      dry: "Dry flat away from harsh direct sunlight.",
      iron: "Warm iron with light steam."
    },
    {
      fabric: "Textured Karandi",
      icon: "💎",
      wash: "Cold hand wash or dry clean recommended for longevity.",
      dry: "Dry in shade on hanger.",
      iron: "Medium heat iron on reverse side."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-brand-nude/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-brand-charcoal hover:bg-brand-cream rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cream border border-brand-nude/30 rounded-full text-brand-charcoal text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-nude" />
            <span>Garment Longevity</span>
          </div>
          <h3 className="text-2xl font-serif font-semibold text-brand-charcoal">
            Fabric & Wash Care Instructions
          </h3>
          <p className="text-xs text-brand-gray">
            Ensure your RUAAN suits remain vibrant and luxurious for years with these care tips.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fabricsGuide.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-brand-cream/50 rounded-2xl border border-brand-nude/30 space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.icon}</span>
                <h4 className="font-serif font-semibold text-brand-charcoal text-sm">{item.fabric}</h4>
              </div>
              <ul className="space-y-1.5 text-xs text-brand-gray">
                <li className="flex items-start gap-2">
                  <Droplets className="w-3.5 h-3.5 text-brand-nude flex-shrink-0 mt-0.5" />
                  <span><strong>Washing:</strong> {item.wash}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sun className="w-3.5 h-3.5 text-brand-nude flex-shrink-0 mt-0.5" />
                  <span><strong>Drying:</strong> {item.dry}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Flame className="w-3.5 h-3.5 text-brand-nude flex-shrink-0 mt-0.5" />
                  <span><strong>Ironing:</strong> {item.iron}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Guarantee */}
        <div className="mt-6 pt-4 border-t border-brand-nude/30 text-center">
          <p className="text-xs text-brand-gray">
            Questions regarding suit tailoring or fabric maintenance? Contact our WhatsApp concierge at{' '}
            <strong className="text-brand-charcoal">{BRAND_CONFIG.whatsappFormatted}</strong>
          </p>
        </div>

      </div>
    </div>
  );
};
