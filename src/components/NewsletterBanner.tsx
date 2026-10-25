'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Check } from 'lucide-react';

export const NewsletterBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section className="py-10 sm:py-16 bg-white border-b border-stone-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Card (Reference Exact Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border border-stone-200 shadow-lg bg-[#FAF0F2]">
          
          {/* Left Model Photo (Portrait with flowers & hat) */}
          <div className="md:col-span-5 relative min-h-[260px] sm:min-h-[320px] bg-stone-100 overflow-hidden">
            <Image
              src="/products/SL04.jpg"
              alt="Be the First to Know"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Right Newsletter Signup Box (Reference Exact Style) */}
          <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center text-center md:text-left space-y-3 sm:space-y-4">
            
            {/* Small Pink Circle with Mail Icon */}
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center self-center md:self-start">
              <Mail className="w-5 h-5 text-[#9B1C3C]" />
            </div>

            {/* Headline (Reference Exact: "Be the First to Know") */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900">
              Be the First to Know
            </h2>

            {/* Subtext */}
            <p className="text-xs sm:text-sm text-stone-600 font-light max-w-md">
              Get the latest trends, exclusive offers, and style inspiration.
            </p>

            {/* Input Form */}
            {isSubmitted ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm font-medium flex items-center justify-center md:justify-start gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 pt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 bg-white text-xs sm:text-sm text-stone-800 border border-stone-300 rounded-full focus:outline-none focus:border-[#9B1C3C] transition shadow-2xs"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#9B1C3C] hover:bg-[#801430] text-white text-xs sm:text-sm font-semibold rounded-full transition shadow-sm active:scale-95 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
