'use client';

import React from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-brand-nude/40"
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
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cream border border-brand-nude/30 rounded-full text-brand-charcoal text-xs font-semibold uppercase tracking-wider">
            <Ruler className="w-3.5 h-3.5 text-brand-nude" />
            <span>RUAAN Size Guide</span>
          </div>
          <h3 className="text-2xl font-serif font-semibold text-brand-charcoal">
            Stitched Suit Measurement Chart
          </h3>
          <p className="text-xs text-brand-gray">All measurements are in inches (Inches)</p>
        </div>

        {/* Measurements Table */}
        <div className="overflow-x-auto rounded-2xl border border-brand-nude/30">
          <table className="w-full text-left text-xs text-brand-charcoal">
            <thead className="bg-brand-cream font-serif font-bold text-brand-charcoal border-b border-brand-nude/30 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Size Tag</th>
                <th className="py-3 px-4">Chest</th>
                <th className="py-3 px-4">Shoulder</th>
                <th className="py-3 px-4">Waist</th>
                <th className="py-3 px-4">Shirt Length</th>
                <th className="py-3 px-4">Trouser Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-nude/20">
              <tr className="hover:bg-brand-cream/40 transition">
                <td className="py-3 px-4 font-bold text-brand-nude">Small (S)</td>
                <td className="py-3 px-4">19.0&quot;</td>
                <td className="py-3 px-4">14.0&quot;</td>
                <td className="py-3 px-4">17.5&quot;</td>
                <td className="py-3 px-4">39.0&quot;</td>
                <td className="py-3 px-4">38.0&quot;</td>
              </tr>
              <tr className="hover:bg-brand-cream/40 transition bg-brand-cream/20">
                <td className="py-3 px-4 font-bold text-brand-nude">Medium (M)</td>
                <td className="py-3 px-4">21.0&quot;</td>
                <td className="py-3 px-4">15.0&quot;</td>
                <td className="py-3 px-4">19.5&quot;</td>
                <td className="py-3 px-4">40.0&quot;</td>
                <td className="py-3 px-4">38.5&quot;</td>
              </tr>
              <tr className="hover:bg-brand-cream/40 transition">
                <td className="py-3 px-4 font-bold text-brand-nude">Large (L)</td>
                <td className="py-3 px-4">23.0&quot;</td>
                <td className="py-3 px-4">16.0&quot;</td>
                <td className="py-3 px-4">21.5&quot;</td>
                <td className="py-3 px-4">41.0&quot;</td>
                <td className="py-3 px-4">39.0&quot;</td>
              </tr>
              <tr className="hover:bg-brand-cream/40 transition bg-brand-cream/20">
                <td className="py-3 px-4 font-bold text-brand-nude">Extra Large (XL)</td>
                <td className="py-3 px-4">25.0&quot;</td>
                <td className="py-3 px-4">17.0&quot;</td>
                <td className="py-3 px-4">23.5&quot;</td>
                <td className="py-3 px-4">42.0&quot;</td>
                <td className="py-3 px-4">40.0&quot;</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note Box */}
        <div className="mt-6 p-4 bg-brand-cream/50 rounded-2xl border border-brand-nude/30 text-xs text-brand-gray space-y-1">
          <p className="font-semibold text-brand-charcoal flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-nude" />
            Unstitched Suit Note:
          </p>
          <p>
            Unstitched suits come with standard fabric length (Shirt 3.0m, Dupatta 2.5m, Trouser 2.5m) suitable for tailoring into any custom size or flared Anarkali/Kurti design.
          </p>
        </div>
      </div>
    </div>
  );
};
