'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Check, Sparkles } from 'lucide-react';

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
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Card (Reference Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border border-brand-nude/30 shadow-lg bg-[#FAF5EE]">
          
          {/* Left Arched Model Photo */}
          <div className="md:col-span-5 relative min-h-[260px] sm:min-h-[320px] bg-stone-200 overflow-hidden flex items-center justify-center p-4">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/products/SL04.jpg"
                alt="RUAAN Club Newsletter"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Newsletter Signup Box */}
          <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cream border border-brand-nude/40 text-brand-charcoal text-xs font-semibold uppercase tracking-wider self-center md:self-start">
              <Sparkles className="w-3.5 h-3.5 text-brand-nude" />
              <span>Join The Circle</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-brand-charcoal">
              Be the First to Know
            </h2>

            <p className="text-xs sm:text-sm text-brand-gray font-light max-w-md">
              Receive early access to seasonal festive drops, private sales, and styling guides delivered right to your inbox.
            </p>

            {isSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm font-medium flex items-center justify-center md:justify-start gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Thank you! You are now subscribed to RUAAN updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 pt-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white text-xs sm:text-sm text-brand-charcoal border border-brand-nude/40 rounded-full focus:outline-none focus:border-brand-charcoal transition"
                  />
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-brand-gray" />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-charcoal hover:bg-brand-nude text-white text-xs sm:text-sm font-semibold rounded-full transition shadow-sm uppercase tracking-wider active:scale-95 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-[10px] text-brand-gray/60 font-light">
              By subscribing, you agree to receive RUAAN promotional emails. Unsubscribe anytime.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
