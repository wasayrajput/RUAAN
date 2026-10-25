'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah Khan',
      city: 'Lahore',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      comment: 'Amazing quality and super fast delivery! The stone linen fall and tailoring is so graceful. Definitely shopping again!',
      rating: 5.0,
    },
    {
      name: 'Tania Rahman',
      city: 'Karachi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      comment: 'The festive doria linen 3-piece looks exactly like the photos. The colors are vibrant and breathable for all occasions.',
      rating: 5.0,
    },
    {
      name: 'Nusrat Jahan',
      city: 'Islamabad',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      comment: 'Great customer service and direct WhatsApp order assistance! The stitched fit was immaculate. Highly recommended brand.',
      rating: 5.0,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-brand-nude/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Reference Style) */}
        <div className="text-center space-y-1 mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-brand-charcoal">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-brand-gray font-light">
            Real women. Real stories.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-brand-nude/30 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 text-center items-center"
            >
              {/* Customer Avatar */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-nude/40 shadow-xs">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Review Quote */}
              <p className="text-xs sm:text-sm text-brand-gray font-light leading-relaxed italic px-2">
                &ldquo;{item.comment}&rdquo;
              </p>

              {/* Customer Name & Rating */}
              <div className="pt-2 border-t border-brand-nude/20 w-full space-y-1">
                <h3 className="text-xs sm:text-sm font-serif font-semibold text-brand-charcoal">
                  {item.name}
                </h3>
                <div className="flex items-center justify-center gap-1 text-[11px] text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.rating.toFixed(1)}</span>
                  <span className="text-stone-400 font-normal">({item.city})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
