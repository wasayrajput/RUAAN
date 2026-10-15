'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Dr. Ayesha Alvi",
      city: "Lahore",
      suit: "Doria Linen Stitched Allover",
      rating: 5,
      comment: "RUAAN's doria linen quality is exceptional! The fabric fall and stitching finish are so refined. Received so many compliments!"
    },
    {
      name: "Saman Tariq",
      city: "Karachi",
      suit: "Stone Linen Stitched 2-Piece",
      rating: 5,
      comment: "I ordered via WhatsApp. The stone linen print looks so rich in real life and delivery took only 2 days. Highly recommended!"
    },
    {
      name: "Zoya Malik",
      city: "Islamabad",
      suit: "Digital Viscose 3-Piece",
      rating: 5,
      comment: "The digital viscose fabric is super soft and vibrant. Stitched Large sizing was spot on! Will definitely order again."
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-brand-nude/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-semibold text-brand-nude uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-brand-nude text-brand-nude" />
            Client Love & Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-brand-charcoal">
            What Our Patrons Say
          </h2>
          <div className="w-16 h-0.5 bg-brand-nude mx-auto"></div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="bg-brand-cream/40 p-6 rounded-3xl border border-brand-nude/30 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-brand-nude/40" />

                <p className="text-xs text-brand-charcoal font-light leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-brand-nude/20 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-serif font-semibold text-brand-charcoal flex items-center gap-1">
                    {review.name}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <p className="text-[11px] text-brand-gray">{review.city} • Verified Buyer</p>
                </div>
                <span className="text-[10px] font-semibold bg-brand-nude/20 text-brand-charcoal px-2.5 py-1 rounded-full">
                  {review.suit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
