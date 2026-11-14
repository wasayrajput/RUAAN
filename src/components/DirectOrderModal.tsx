'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Truck, ShieldCheck, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { BRAND_CONFIG } from '@/config/brand';
import { CustomerDetails, SizeOption, getProductArticleCode } from '@/types/product';
import {
  calculateDeliveryRate,
  POPULAR_CITIES,
} from '@/utils/delivery';

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
  const [whatsappUrl, setWhatsappUrl] = useState('');

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
  const deliveryInfo = calculateDeliveryRate(customerDetails.city, itemTotal);
  const isFreeShipping = deliveryInfo.isFree;
  const shippingCost = deliveryInfo.fee;
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
      const orderNum = (data.success && data.order?.orderNumber) 
        ? data.order.orderNumber 
        : `#RN-${Math.floor(1000 + Math.random() * 9000)}`;
      setPlacedOrderNumber(orderNum);

      // Prepare instant WhatsApp order confirmation message
      const brandWaNumber = BRAND_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
      let waMessage = `✦ *NEW WEBSITE ORDER - ${BRAND_CONFIG.name}*\n`;
      waMessage += `Order ID: *${orderNum}*\n\n`;
      waMessage += `*Customer Details:*\n`;
      waMessage += `• Name: ${customerDetails.fullName}\n`;
      waMessage += `• Phone: ${customerDetails.phone}\n`;
      waMessage += `• City: ${customerDetails.city || 'Pakistan'}\n`;
      waMessage += `• Delivery Address: ${customerDetails.address}\n`;
      if (customerDetails.notes) {
        waMessage += `• Special Notes: ${customerDetails.notes}\n`;
      }
      waMessage += `\n*Suit Ordered:*\n`;
      waMessage += `• Design: ${product.title} (*${articleCode}*)\n`;
      waMessage += `• Fabric: ${product.fabric} (${product.stitchType})\n`;
      waMessage += `• Size: ${selectedSize}${selectedColor ? ` | Color: ${selectedColor.name}` : ''}\n`;
      waMessage += `• Quantity: ${quantity} x Rs. ${product.price.toLocaleString()}\n`;
      waMessage += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
      waMessage += `Subtotal: Rs. ${itemTotal.toLocaleString()}\n`;
      waMessage += `Delivery Charges: ${isFreeShipping ? 'FREE Delivery' : `Rs. ${shippingCost}`}\n`;
      waMessage += `*Grand Total: Rs. ${grandTotal.toLocaleString()} (Cash on Delivery)*\n\n`;
      waMessage += `Please confirm my order and share parcel dispatch timeline. Thank you!`;

      const generatedWaUrl = `https://wa.me/${brandWaNumber}?text=${encodeURIComponent(waMessage)}`;
      setWhatsappUrl(generatedWaUrl);

      // Save locally as fallback
      if (data.success && data.order) {
        try {
          const raw = localStorage.getItem('ruaan_admin_orders');
          const list = raw ? JSON.parse(raw) : [];
          const updated = [data.order, ...list.filter((o: any) => o.id !== data.order.id && o.orderNumber !== data.order.orderNumber)];
          localStorage.setItem('ruaan_admin_orders', JSON.stringify(updated));
        } catch (e) {}
      }

      // Automatically open WhatsApp in a new tab/app
      try {
        if (typeof window !== 'undefined') {
          window.open(generatedWaUrl, '_blank');
        }
      } catch (err) {}

      setIsSubmitted(true);
    } catch (err) {
      console.error('Direct order submission error:', err);
      // Even if network fails, still give customer the WhatsApp link!
      const fallbackNum = `#RN-${Math.floor(1000 + Math.random() * 9000)}`;
      setPlacedOrderNumber(fallbackNum);
      const brandWaNumber = BRAND_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
      const emergencyWa = `https://wa.me/${brandWaNumber}?text=${encodeURIComponent(`✦ *NEW WEBSITE ORDER - ${BRAND_CONFIG.name}*\nOrder ID: *${fallbackNum}*\nName: ${customerDetails.fullName}\nPhone: ${customerDetails.phone}\nAddress: ${customerDetails.address}, ${customerDetails.city}\nSuit: ${product.title} (${articleCode}) - ${selectedSize} x ${quantity}\nTotal: Rs. ${grandTotal.toLocaleString()} COD`)}`;
      setWhatsappUrl(emergencyWa);
      setIsSubmitted(true);
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
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-brand-charcoal">
                    Order Booked Successfully!
                  </h4>
                  {placedOrderNumber && (
                    <div className="inline-block mt-2 bg-brand-cream border border-brand-nude/40 rounded-full px-4 py-1 text-xs font-mono font-bold text-brand-charcoal">
                      Order ID: {placedOrderNumber}
                    </div>
                  )}
                </div>

                {/* Instant WhatsApp Confirmation Card */}
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                    <MessageCircle className="w-4 h-4 fill-emerald-600 text-white shrink-0" />
                    <span>WhatsApp Order Confirmation</span>
                  </div>
                  <p className="text-[11px] text-emerald-900/80 leading-relaxed">
                    Aapka order record ho gaya hai! Super-fast parcel dispatch aur tracking ke liye button par click karke WhatsApp par receipt send karein:
                  </p>
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Confirm on WhatsApp (Official)</span>
                    </a>
                  )}
                </div>

                <p className="text-[11px] text-brand-gray leading-relaxed max-w-xs mx-auto">
                  Thank you <strong>{customerDetails.fullName}</strong>! Our customer care representative will also call on <strong>{customerDetails.phone}</strong> before dispatching your COD parcel.
                </p>

                <button
                  type="button"
                  onClick={closeDirectOrder}
                  className="w-full py-2.5 bg-brand-cream hover:bg-brand-nude/20 text-brand-charcoal text-xs font-semibold rounded-xl border border-brand-nude/30 transition cursor-pointer"
                >
                  Done &amp; Continue Shopping
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
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-brand-charcoal uppercase tracking-wider text-[11px]">
                      City *
                    </label>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                      deliveryInfo.zone === 'lahore'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : deliveryInfo.zone === 'punjab'
                        ? 'bg-blue-50 text-blue-900 border border-blue-200'
                        : 'bg-stone-100 text-stone-800 border border-stone-200'
                    }`}>
                      {deliveryInfo.badgeText} ({deliveryInfo.isFree ? 'FREE' : `Rs. ${deliveryInfo.originalFee}`})
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    list="direct-popular-cities"
                    placeholder="e.g. Lahore / Faisalabad / Karachi"
                    value={customerDetails.city}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
                    className="w-full p-2.5 bg-brand-cream/40 border border-brand-nude/40 rounded-xl focus:outline-none focus:border-brand-nude"
                  />
                  <datalist id="direct-popular-cities">
                    {POPULAR_CITIES.map((c) => (
                      <option key={c.name} value={c.name} />
                    ))}
                  </datalist>
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
                    Delivery ({deliveryInfo.badgeText})
                  </span>
                  <div>
                    {deliveryInfo.isFree ? (
                      <span className="flex items-center gap-1.5">
                        <span className="line-through text-stone-400 text-[11px]">Rs. {deliveryInfo.originalFee}</span>
                        <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          FREE
                        </span>
                      </span>
                    ) : (
                      <span className="font-semibold text-brand-charcoal">{formatPrice(shippingCost)}</span>
                    )}
                  </div>
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
                    <span>Confirm Order</span>
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
