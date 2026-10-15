'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose, onQuickView }) => {
  const { wishlist, toggleWishlist, clearWishlist, addToCart, formatPrice } = useCart();

  if (!isOpen) return null;

  const savedProducts = (productsData as Product[]).filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={onClose} />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-brand-nude/40"
          >
            {/* Header */}
            <div className="p-6 bg-brand-cream border-b border-brand-nude/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-600 text-white rounded-xl">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-brand-charcoal">
                    Saved Favorites
                  </h3>
                  <p className="text-xs text-brand-gray">{savedProducts.length} suits in your wishlist</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {savedProducts.length > 0 && (
                  <button
                    onClick={clearWishlist}
                    className="text-xs text-rose-600 hover:underline font-medium"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-brand-charcoal hover:bg-white rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {savedProducts.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <Heart className="w-12 h-12 text-brand-nude mx-auto opacity-50" />
                  <p className="text-base font-serif text-brand-charcoal">No saved suits yet.</p>
                  <p className="text-xs text-brand-gray">Click the heart icon on any suit to save your favorites.</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-brand-charcoal text-brand-cream text-xs font-semibold rounded-full hover:bg-brand-nude transition"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3 bg-brand-cream/40 rounded-2xl border border-brand-nude/20 items-center"
                    >
                      <div
                        className="relative w-16 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0 cursor-pointer"
                        onClick={() => {
                          onQuickView(product);
                          onClose();
                        }}
                      >
                        <Image
                          src={product.mainImage}
                          alt={product.title}
                          fill
                          className="object-cover object-top"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4
                          onClick={() => {
                            onQuickView(product);
                            onClose();
                          }}
                          className="text-xs font-serif font-semibold text-brand-charcoal truncate cursor-pointer hover:text-brand-nude transition"
                        >
                          {product.title}
                        </h4>
                        <p className="text-[11px] text-brand-gray">Fabric: {product.fabric}</p>
                        <p className="text-xs font-serif font-bold text-brand-charcoal mt-1">
                          {formatPrice(product.price)}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              addToCart(product, undefined, undefined, 1);
                              toggleWishlist(product.id);
                            }}
                            className="px-3 py-1 bg-brand-charcoal text-white text-[11px] font-semibold rounded-lg hover:bg-brand-nude transition flex items-center gap-1"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Move to Bag</span>
                          </button>

                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="text-rose-600 hover:text-rose-800 text-[11px] p-1"
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {savedProducts.length > 0 && (
              <div className="p-6 bg-brand-cream border-t border-brand-nude/30">
                <button
                  onClick={onClose}
                  className="w-full py-3.5 bg-brand-charcoal text-brand-cream font-semibold text-xs rounded-xl hover:bg-brand-nude hover:text-brand-charcoal transition flex items-center justify-center gap-2 shadow"
                >
                  <span>Continue Shopping</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
