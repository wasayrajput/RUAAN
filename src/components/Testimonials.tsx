'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah Khan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      comment: 'Amazing quality and super fast delivery! I love my new dress. Definitely shopping again!',
      rating: '5.0',
    },
    {
      name: 'Tania Rahman',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      comment: 'The styles are so unique and comfortable. This is my new favorite store!',
      rating: '4.9',
    },
    {
      name: 'Nusrat Jahan',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      comment: 'Great customer service and beautiful outfits. Highly recommended!',
      rating: '5.0',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Reference Exact Style) */}
        <div className="text-center space-y-1 mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Real women. Real stories.
          </p>
        </div>

        {/* 3 Testimonial Cards (Reference Exact Layout: Avatar -> Quote -> Name -> Rating) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 text-center items-center"
            >
              {/* Customer Avatar Circle */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-stone-200 shadow-xs">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Review Quote Text */}
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed italic px-2">
                &ldquo;{item.comment}&rdquo;
              </p>

              {/* Customer Name & Rating */}
              <div className="pt-2 border-t border-stone-100 w-full space-y-1">
                <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                  {item.name}
                </h3>
                <div className="flex items-center justify-center gap-1 text-[11px] text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-stone-700">{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
