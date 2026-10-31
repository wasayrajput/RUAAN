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
    <section className="py-6 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deep Dark Container (Reference Exact Style: Model on Left + Community Signup on Right) */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#21171D] via-[#2B2A29] to-[#1C1917] text-white p-5 sm:p-8 lg:p-10 shadow-xl border border-white/10">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#F2CBAC]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand-peach/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center">
            
            {/* Left Model Photo in Circular Cutout */}
            <div className="md:col-span-4 flex justify-center md:justify-start">
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 sm:border-4 border-white/20 shadow-xl bg-stone-800">
                <Image
                  src="/products/SL04.jpg"
                  alt="Join Our Style Community"
                  fill
                  sizes="(max-width: 640px) 120px, 200px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Text & Email Input */}
            <div className="md:col-span-8 space-y-2 sm:space-y-3 text-center md:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">
                Join Our Style Community
              </h2>

              <p className="text-[11px] sm:text-xs text-stone-300 font-light max-w-md mx-auto md:mx-0 leading-relaxed">
                Get exclusive offers, new arrivals &amp; style tips delivered directly to your inbox.
              </p>

              {/* Email Form */}
              {isSubscribed ? (
                <div className="inline-flex items-center gap-2 p-2.5 bg-emerald-900/60 border border-emerald-500/40 rounded-full text-emerald-200 text-xs font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Welcome to RUAAN Community!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 pt-1 max-w-md mx-auto md:mx-0">
                  <div className="relative w-full flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white text-stone-900 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F2CBAC] placeholder:text-stone-400 shadow-inner"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#B57C53] hover:bg-[#F2CBAC] hover:text-stone-900 text-white text-xs font-semibold rounded-full transition-all duration-300 shadow-md active:scale-95 uppercase tracking-wider shrink-0 cursor-pointer"
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
