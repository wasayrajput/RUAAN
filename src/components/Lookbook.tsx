'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export const Lookbook: React.FC = () => {
  const lookbookItems = [
    {
      title: "Doria Linen Stitched Allover",
      season: "Autumn / Winter '26",
      image: "/products/DL01.jpg",
      span: "col-span-1 md:col-span-2 row-span-2",
      description: "Premium stitched 2-piece ready-to-wear doria linen suits with refined tailoring."
    },
    {
      title: "Stone Linen Stitched Edit",
      season: "Luxury Pret '26",
      image: "/products/SL01.jpg",
      span: "col-span-1",
      description: "Contemporary digital printed stone linen 2-piece stitched ensemble."
    },
    {
      title: "Digital Viscose & Khaddar",
      season: "Winter Vol 1",
      image: "/products/DV01.jpg",
      span: "col-span-1",
      description: "Exquisite 3-piece digital viscose prints and pure winter khaddar."
    }
  ];

  return (
    <section id="lookbook" className="py-20 bg-brand-cream/60 border-t border-b border-brand-nude/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-brand-nude uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Editorial Campaign
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-brand-charcoal">
              RUAAN Seasonal Lookbook
            </h2>
          </div>
          <p className="text-xs text-brand-gray max-w-md font-light">
            Step into the artistic vision of RUAAN. Explore how our doria linen, stone linen, digital viscose, and warm winter fabrics unfold in real light.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {lookbookItems.map((item, idx) => (
            <div
              key={idx}
              className={`group relative rounded-3xl overflow-hidden shadow-lg aspect-[3/4] bg-white border border-brand-nude/30 ${item.span}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-peach bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                  {item.season}
                </span>
                <h3 className="text-xl font-serif font-semibold leading-tight">{item.title}</h3>
                <p className="text-xs text-white/80 line-clamp-2 font-light">{item.description}</p>
                <a
                  href="#catalog"
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-peach hover:text-white transition pt-1"
                >
                  <span>Explore Outfits</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
