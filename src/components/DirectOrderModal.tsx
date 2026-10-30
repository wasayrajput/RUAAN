'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Truck, ShieldCheck, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { BRAND_CONFIG } from '@/config/brand';
import { CustomerDetails, SizeOption, getProductArticleCode } from '@/types/product';

export const DirectOrderModal: React.FC = () => {
  const { directOrder, closeDirectOrder, formatPrice } = useCart();

  const [selectedSize, setSelectedSize] = useState<SizeOption>('Unstitched');
  const [quantity, setQuantity] = useState(1);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState('');

  // Sync state whenever directOrder opens
  useEffect(() => {
    if (directOrder) {
      setSelectedSize(directOrder.selectedSize);
      setQuantity(directOrder.quantity || 1);
      try {
        const saved = localStorage.getItem('ruaan_customer_details');
        if (saved) {
          setCustomerDetails(JSON.parse(saved));
        }
      } catch (e) {}
    }
  }, [directOrder]);

  if (!directOrder) return null;

  const { product, selectedColor } = directOrder;
  const articleCode = getProductArticleCode(product, selectedColor);
  const itemTotal = product.price * quantity;
  const isFreeShipping = itemTotal >= BRAND_CONFIG.shippingThresholdFree;
  const shippingCost = isFreeShipping ? 0 : BRAND_CONFIG.standardDeliveryFee;
  const grandTotal = itemTotal + shippingCost;
  const photoUrl = selectedColor?.image || product.mainImage;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerDetails.fullName || !customerDetails.phone || !customerDetails.address) {
      alert('Please fill in your Name, Phone Number, and Address to proceed.');
      return;
    }

    try {
      setIsSubmitting(true);
      localStorage.setItem('ruaan_customer_details', JSON.stringify(customerDetails));

      const payload = {
        customerName: customerDetails.fullName,
        phone1: customerDetails.phone,
        city: customerDetails.city || 'Pakistan',
        address: customerDetails.address,
        notes: customerDetails.notes,
        paymentType: 'COD',
        subtotal: itemTotal,
        deliveryFee: shippingCost,
        total: grandTotal,
        items: [
          {
            id: product.id,
            code: articleCode,
            name: product.title,
            fabric: product.fabric,
            stitch: product.stitchType,
            size: selectedSize,
            price: product.price,
            qty: quantity,
          },
        ],
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.order) {
        setPlacedOrderNumber(data.order.orderNumber);
        setIsSubmitted(true);
      } else {
        alert(data.error || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      console.error('Direct order submission error:', err);
      alert('Order could not be sent. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={closeDirectOrder} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-brand-nude/40 z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-brand-cream border-b border-brand-nude/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-brand-charcoal text-white rounded-xl shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-serif font-semibold text-brand-charcoal">
                  Direct Suit Order
                </h3>
                <p className="text-[11px] text-brand-gray">Fast Dispatch &bull; Cash on Delivery</p>
              </div>
            </div>
            <button
              onClick={closeDirectOrder}
              className="p-2 text-brand-charcoal hover:bg-white rounded-full transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 no-scrollbar">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-serif font-bold text-brand-charcoal">
                  Order Booked Successfully!
                </h4>
                {placedOrderNumber && (
                  <div className="inline-block bg-brand-cream border border-brand-nude/40 rounded-full px-4 py-1.5 text-xs font-mono font-bold text-brand-charcoal">
                    Order ID: {placedOrderNumber}
                  </div>
                )}
                <p className="text-xs text-brand-gray leading-relaxed max-w-xs mx-auto">
                  Thank you {customerDetails.fullName}! Your order has been placed directly. Our customer care team will call you to confirm your address before dispatch.
                </p>
                <button
                  type="button"
                  onClick={closeDirectOrder}
                  className="px-6 py-3 bg-brand-charcoal text-white text-xs font-semibold rounded-full hover:bg-brand-nude transition cursor-pointer uppercase tracking-wider"
                >
                  Done & Continue Shopping
                </button>
              </div>
            ) : (
              <>
            {/* Suit Summary Box */}
            <div className="flex gap-3 bg-brand-cream/60 p-3 rounded-2xl border border-brand-nude/30 items-center">
              <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-brand-cream flex-shrink-0 border border-brand-nude/20">
                <Image
                  src={photoUrl}
                  alt={product.title}
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="flex-1 min-w-0 text-xs space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-mono font-bold text-[10px] text-brand-charcoal bg-amber-100 px-1.5 py-0.5 rounded border border-amber-200">
                    {articleCode}
                  </span>
                  <span className="font-semibold text-brand-nude text-[11px] uppercase">
                    {product.fabric}
                  </span>
                  <span className="text-[10px] text-stone-500 bg-white px-1.5 py-0.5 rounded border border-stone-200">
                    {product.stitchType.includes('Unstitched') ? 'Unstitched' : 'Stitched'}
                  </span>
                </div>

                <h4 className="font-serif font-semibold text-brand-charcoal truncate text-sm">
                  {product.title}
                </h4>

                {/* Size Selector if multiple sizes */}
                {product.availableSizes && product.availableSizes.length > 1 ? (
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="text-[11px] text-brand-gray">Size:</span>
                    <div className="flex gap-1">
                      {product.availableSizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`px-2 py-0.5 text-[11px] font-semibold rounded-md border transition cursor-pointer ${
                            selectedSize === s
                              ? 'bg-brand-charcoal text-white border-brand-charcoal'
                              : 'bg-white text-stone-700 border-brand-nude/40 hover:border-brand-charcoal'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-brand-gray">
                    Size: <strong className="text-brand-charcoal">{selectedSize}</strong>
                  </p>
                )}

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center border border-brand-nude/40 rounded-md bg-white">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className={`px-2 py-0.5 text-xs text-brand-charcoal font-bold transition ${
                        quantity <= 1
                          ? 'opacity-30 cursor-not-allowed'
                          : 'hover:bg-brand-cream cursor-pointer'
                      }`}
                    >
                      -
                    </button>
                    <span className="px-2 py-0.5 text-xs font-semibold">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 py-0.5 text-xs text-brand-charcoal font-bold hover:bg-brand-cream cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-serif font-bold text-sm text-brand-charcoal">
                    {formatPrice(itemTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Form */}
            <form onSubmit={handleSubmit} id="direct-order-form" className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-brand-charcoal uppercase tracking-wider text-[11px]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Khan"
                  value={customerDetails.fullName}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, fullName: e.target.value })}
                  className="w-full p-2.5 bg-brand-cream/40 border border-brand-nude/40 rounded-xl focus:outline-none focus:border-brand-nude"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-brand-charcoal uppercase tracking-wider text-[11px]">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0300 1234567"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                    className="w-full p-2.5 bg-brand-cream/40 border border-brand-nude/40 rounded-xl focus:outline-none focus:border-brand-nude"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-brand-charcoal uppercase tracking-wider text-[11px]">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lahore / Karachi"
                    value={customerDetails.city}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
                    className="w-full p-2.5 bg-brand-cream/40 border border-brand-nude/40 rounded-xl focus:outline-none focus:border-brand-nude"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-brand-charcoal uppercase tracking-wider text-[11px]">
                  Complete Shipping Address *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House/Street #, Sector/Area, Landmark..."
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                  className="w-full p-2.5 bg-brand-cream/40 border border-brand-nude/40 rounded-xl focus:outline-none focus:border-brand-nude"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-brand-charcoal uppercase tracking-wider text-[11px]">
                  Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Any delivery preferences or size notes..."
                  value={customerDetails.notes}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, notes: e.target.value })}
                  className="w-full p-2.5 bg-brand-cream/40 border border-brand-nude/40 rounded-xl focus:outline-none focus:border-brand-nude"
                />
              </div>
            </form>
            </>
            )}
          </div>

          {/* Footer & Pricing Breakdown */}
          {!isSubmitted && (
            <div className="p-4 sm:p-5 bg-brand-cream border-t border-brand-nude/30 space-y-3">
              <div className="space-y-1 text-xs text-brand-charcoal">
                <div className="flex justify-between">
                  <span className="text-brand-gray">Subtotal</span>
                  <span>{formatPrice(itemTotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brand-gray flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-brand-nude" />
                    Delivery Charges
                  </span>
                  <span className={isFreeShipping ? 'text-emerald-700 font-semibold' : ''}>
                    {isFreeShipping ? 'FREE Delivery' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-brand-nude/30 font-serif font-bold text-sm sm:text-base">
                  <span>Grand Total</span>
                  <span className="text-brand-charcoal">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="direct-order-form"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-brand-charcoal hover:bg-[#2b2b2d] text-white font-semibold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50 uppercase tracking-wider"
              >
                {isSubmitting ? (
                  <span>Placing Order...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                    <span>Confirm Order (Cash on Delivery)</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-brand-gray flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Verified 100% Original Brand Suits &bull; Official RUAAN Store</span>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
