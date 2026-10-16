'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, MessageCircle, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { BRAND_CONFIG } from '@/config/brand';
import { CustomerDetails, getProductArticleCode } from '@/types/product';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
    generateWhatsAppOrderUrl,
    clearCart,
    formatPrice,
    checkoutStep: step,
    setCheckoutStep: setStep,
  } = useCart();

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('ruaan_customer_details');
      if (saved) {
        setCustomerDetails(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  if (!isCartOpen) return null;

  const isFreeShipping = subtotal >= BRAND_CONFIG.shippingThresholdFree;
  const shippingCost = isFreeShipping ? 0 : BRAND_CONFIG.standardDeliveryFee;
  const grandTotal = subtotal + shippingCost;
  const freeShippingProgress = Math.min(100, (subtotal / BRAND_CONFIG.shippingThresholdFree) * 100);

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerDetails.fullName || !customerDetails.phone || !customerDetails.address) {
      alert('Please fill in your Name, Phone Number, and Address to proceed.');
      return;
    }
    try {
      localStorage.setItem('ruaan_customer_details', JSON.stringify(customerDetails));
    } catch (e) {}
    const whatsappUrl = generateWhatsAppOrderUrl(customerDetails);
    window.open(whatsappUrl, '_blank');
    setIsOrderPlaced(true);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setStep('cart');
    setIsOrderPlaced(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={handleClose} />

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
                <div className="p-2 bg-brand-charcoal text-brand-cream rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-brand-charcoal">
                    {step === 'cart' ? 'Your Shopping Bag' : 'Shipping & Checkout'}
                  </h3>
                  <p className="text-xs text-brand-gray">{totalItems} suits selected</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-brand-charcoal hover:bg-white rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Shipping Progress */}
            <div className="bg-brand-cream/60 px-6 py-2.5 border-b border-brand-nude/20">
              <div className="flex items-center justify-between text-xs text-brand-charcoal mb-1.5">
                <span className="flex items-center gap-1 font-medium">
                  <Truck className="w-3.5 h-3.5 text-brand-nude" />
                  {isFreeShipping ? (
                    <span className="text-emerald-700 font-bold">Free Nationwide Shipping Unlocked! 🎉</span>
                  ) : (
                    <span>Add {formatPrice(BRAND_CONFIG.shippingThresholdFree - subtotal)} for Free Shipping</span>
                  )}
                </span>
              </div>
              <div className="w-full bg-brand-nude/20 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-nude h-full transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {isOrderPlaced ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-brand-charcoal">
                    WhatsApp Order Initiated!
                  </h4>
                  <p className="text-xs text-brand-gray leading-relaxed max-w-xs mx-auto">
                    Your formatted order message has been dispatched to our WhatsApp team. Please send the message on WhatsApp to complete your order dispatch!
                  </p>
                  <button
                    onClick={() => {
                      clearCart();
                      handleClose();
                    }}
                    className="px-6 py-3 bg-brand-charcoal text-white text-xs font-semibold rounded-full hover:bg-brand-nude transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-brand-nude mx-auto opacity-50" />
                  <p className="text-base font-serif text-brand-charcoal">Your bag is empty.</p>
                  <p className="text-xs text-brand-gray">Explore RUAAN&apos;s latest suit collection.</p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-brand-charcoal text-brand-cream text-xs font-semibold rounded-full hover:bg-brand-nude transition"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : step === 'cart' ? (
                // Step 1: Items
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex gap-4 p-3 bg-brand-cream/40 rounded-2xl border border-brand-nude/20 items-center"
                    >
                      <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0">
                        <Image
                          src={item.selectedColor ? item.selectedColor.image : item.product.mainImage}
                          alt={item.product.title}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-serif font-semibold text-brand-charcoal truncate">
                            {item.product.title}
                          </h4>
                          <span className="font-mono font-bold text-[10px] bg-brand-charcoal text-amber-200 px-1.5 py-0.5 rounded flex-shrink-0">
                            {getProductArticleCode(item.product, item.selectedColor)}
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-gray">
                          Fabric: {item.product.fabric} | Size: <strong className="text-brand-charcoal">{item.selectedSize}</strong>
                        </p>
                        {item.selectedColor && (
                          <p className="text-[10px] text-brand-nude">Color: {item.selectedColor.name}</p>
                        )}
                        <p className="text-xs font-serif font-bold text-brand-charcoal mt-1">
                          {formatPrice(item.product.price)}
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-brand-nude/40 rounded-md bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                              className={`px-2 py-0.5 text-xs text-brand-charcoal font-bold transition ${
                                item.quantity <= 1
                                  ? 'opacity-30 cursor-not-allowed'
                                  : 'hover:bg-brand-cream cursor-pointer'
                              }`}
                              title={item.quantity <= 1 ? "Minimum quantity is 1 (use trash icon to delete)" : "Decrease quantity"}
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-semibold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-brand-charcoal font-bold hover:bg-brand-cream cursor-pointer"
                              title="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-rose-600 hover:text-rose-800 text-[11px] flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Step 2: Shipping Form
                <div className="space-y-4">
                  {/* Selected Suits Preview */}
                  <div className="bg-brand-cream/60 rounded-xl p-3 border border-brand-nude/30 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-brand-gray font-semibold uppercase tracking-wider">
                      <span>Suits in this order ({cart.length})</span>
                      <button
                        type="button"
                        onClick={() => setStep('cart')}
                        className="text-brand-nude hover:underline text-[10px] lowercase font-normal"
                      >
                        edit bag
                      </button>
                    </div>
                    <div className="space-y-2 max-h-36 overflow-y-auto no-scrollbar">
                      {cart.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-brand-nude/20">
                          <div className="relative w-10 h-12 rounded overflow-hidden flex-shrink-0 bg-brand-cream">
                            <Image
                              src={item.selectedColor?.image || item.product.mainImage}
                              alt={item.product.title}
                              fill
                              className="object-cover object-top"
                            />
                          </div>
                          <div className="flex-1 min-w-0 text-xs">
                            <p className="font-serif font-semibold text-brand-charcoal truncate">
                              {item.product.title}
                            </p>
                            <p className="text-[10px] text-brand-gray">
                              <span className="font-mono font-bold text-stone-800 bg-stone-100 px-1 py-0.2 rounded border border-stone-200 mr-1">
                                {getProductArticleCode(item.product, item.selectedColor)}
                              </span>
                              Size: {item.selectedSize} &bull; Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right text-xs font-semibold text-brand-charcoal flex-shrink-0">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleWhatsAppCheckout} id="checkout-form" className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-brand-charcoal uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayesha Khan"
                      value={customerDetails.fullName}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, fullName: e.target.value })}
                      className="w-full p-3 bg-brand-cream/50 border border-brand-nude/40 rounded-xl focus:outline-none focus:border-brand-nude"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-brand-charcoal uppercase tracking-wider">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0300 1234567"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                      className="w-full p-3 bg-brand-cream/50 border border-brand-nude/40 rounded-xl focus:outline-none focus:border-brand-nude"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-brand-charcoal uppercase tracking-wider">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Lahore / Karachi..."
                      value={customerDetails.city}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
                      className="w-full p-3 bg-brand-cream/50 border border-brand-nude/40 rounded-xl focus:outline-none focus:border-brand-nude"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-brand-charcoal uppercase tracking-wider">
                      Complete Shipping Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House/Street #, Sector/Area..."
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                      className="w-full p-3 bg-brand-cream/50 border border-brand-nude/40 rounded-xl focus:outline-none focus:border-brand-nude"
                    ></textarea>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-brand-charcoal uppercase tracking-wider">
                      Special Order Instructions
                    </label>
                    <input
                      type="text"
                      placeholder="Special delivery instructions..."
                      value={customerDetails.notes}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, notes: e.target.value })}
                      className="w-full p-3 bg-brand-cream/50 border border-brand-nude/40 rounded-xl focus:outline-none focus:border-brand-nude"
                    />
                  </div>
                </form>
              </div>
            )}
            </div>

            {/* Footer */}
            {cart.length > 0 && !isOrderPlaced && (
              <div className="p-6 bg-brand-cream border-t border-brand-nude/30 space-y-4">
                <div className="space-y-2 text-xs text-brand-charcoal">
                  <div className="flex justify-between">
                    <span className="text-brand-gray">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray">Estimated Delivery</span>
                    <span>{isFreeShipping ? 'FREE' : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-brand-nude/30 font-serif font-bold text-base">
                    <span>Grand Total</span>
                    <span className="text-brand-charcoal">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {step === 'cart' ? (
                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full py-3.5 bg-brand-charcoal text-brand-cream font-semibold text-xs rounded-xl hover:bg-brand-nude hover:text-brand-charcoal transition flex items-center justify-center gap-2 shadow"
                  >
                    <span>Proceed to Shipping</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      type="submit"
                      form="checkout-form"
                      className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Place Order via WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('cart')}
                      className="w-full py-2 text-xs text-brand-gray hover:text-brand-charcoal text-center"
                    >
                      Back to Shopping Bag
                    </button>
                  </div>
                )}
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
