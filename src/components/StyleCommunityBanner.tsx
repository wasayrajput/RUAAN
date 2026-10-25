'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

export const StyleCommunityBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deep Dark Container (Reference Exact Style: Model on Left + Community Signup on Right) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#21171D] via-[#2B2A29] to-[#1C1917] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-white/10">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#F2CBAC]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand-peach/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Model Photo in Circular/Arched Cutout (Reference Exact Style) */}
            <div className="md:col-span-4 flex justify-center md:justify-start">
              <div className="relative w-40 sm:w-48 lg:w-56 aspect-square rounded-full overflow-hidden border-4 border-white/15 shadow-2xl bg-stone-800">
                <Image
                  src="/products/SL04.jpg"
                  alt="Join Our Style Community"
                  fill
                  sizes="240px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Text & Email Input (Reference Exact Style) */}
            <div className="md:col-span-8 space-y-3 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
                Join Our Style Community
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 font-light max-w-lg mx-auto md:mx-0">
                Get exclusive offers, new arrivals &amp; style tips delivered directly to your inbox.
              </p>

              {/* Email Form */}
              {isSubscribed ? (
                <div className="inline-flex items-center gap-2 p-3 bg-emerald-900/60 border border-emerald-500/40 rounded-full text-emerald-200 text-xs sm:text-sm font-medium">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Welcome to the RUAAN Community! Check your email soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 pt-2 max-w-md mx-auto md:mx-0">
                  <div className="relative w-full flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-5 py-3 text-xs sm:text-sm bg-white text-stone-900 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F2CBAC] placeholder:text-stone-400 shadow-inner"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 bg-[#B57C53] hover:bg-[#F2CBAC] hover:text-stone-900 text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 shadow-md active:scale-95 uppercase tracking-wider shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
