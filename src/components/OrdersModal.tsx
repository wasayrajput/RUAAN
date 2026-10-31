'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, PackageCheck, Phone, MapPin, Calendar, Clock, Trash2, ExternalLink } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

interface OrderItem {
  id: string;
  designCode?: string;
  title: string;
  fabric: string;
  stitchType: string;
  size: string;
  color?: string;
  quantity: number;
  price: number;
  image: string;
}

interface PlacedOrder {
  orderId: string;
  date: string;
  customer: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  };
  items: OrderItem[];
  total: number;
  isFreeShipping: boolean;
}

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<PlacedOrder[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('ruaan_placed_orders');
        if (stored) {
          setOrders(JSON.parse(stored));
        } else {
          setOrders([]);
        }
      } catch (e) {
        console.error('Error reading orders:', e);
      }
    }
  }, [isOpen]);

  const handleClearOrders = () => {
    if (confirm('Are you sure you want to clear all order logs from this device?')) {
      localStorage.removeItem('ruaan_placed_orders');
      setOrders([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-brand-nude/40 my-auto z-10 max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-brand-nude/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-charcoal text-white rounded-2xl">
              <PackageCheck className="w-5 h-5 text-brand-nude" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-brand-charcoal">
                Store Orders Log ({orders.length})
              </h2>
              <p className="text-xs text-brand-gray">
                Orders placed via website checkout on this device
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {orders.length > 0 && (
              <button
                onClick={handleClearOrders}
                className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium px-2 py-1 rounded-md hover:bg-rose-50 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-brand-charcoal hover:bg-brand-cream rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Orders List Body */}
        <div className="overflow-y-auto py-4 space-y-4 max-h-[70vh] no-scrollbar">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <PackageCheck className="w-12 h-12 text-brand-nude mx-auto opacity-50" />
              <p className="text-sm font-serif text-brand-charcoal">No orders recorded yet.</p>
              <p className="text-xs text-brand-gray max-w-sm mx-auto">
                Whenever a customer places an order via the bag checkout, the complete suit photos and customer details will appear here automatically!
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const formattedDate = new Date(order.date).toLocaleString('en-PK', {
                dateStyle: 'medium',
                timeStyle: 'short',
              });

              return (
                <div
                  key={order.orderId}
                  className="bg-brand-cream/50 rounded-2xl border border-brand-nude/30 p-4 sm:p-5 space-y-4"
                >
                  {/* Order Top Line */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-brand-nude/20">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-brand-charcoal text-white px-2.5 py-1 rounded-md">
                        #{order.orderId}
                      </span>
                      <span className="text-xs text-brand-gray flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formattedDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-serif font-bold text-brand-charcoal">
                        Rs {order.total.toLocaleString()}
                      </span>
                      <a
                        href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-full flex items-center gap-1 transition"
                      >
                        <Phone className="w-3 h-3" />
                        Contact Customer
                      </a>
                    </div>
                  </div>

                  {/* Customer Info Box */}
                  <div className="bg-white p-3 rounded-xl border border-brand-nude/20 text-xs space-y-1.5">
                    <p className="font-semibold text-brand-charcoal">
                      👤 {order.customer.fullName} &bull; 📞 {order.customer.phone}
                    </p>
                    <p className="text-brand-gray flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-brand-nude mt-0.5" />
                      <span>{order.customer.address}, {order.customer.city}</span>
                    </p>
                    {order.customer.notes && (
                      <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg mt-1">
                        📝 Note: {order.customer.notes}
                      </p>
                    )}
                  </div>

                  {/* Suits Ordered with Exact Photos */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-brand-charcoal">
                      Suits in this Order ({order.items.length}):
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 bg-white p-2.5 rounded-xl border border-brand-nude/20 items-center shadow-xs"
                        >
                          <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-brand-cream flex-shrink-0 border border-brand-nude/20">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover object-top"
                            />
                          </div>

                          <div className="flex-1 min-w-0 text-xs">
                            <h4 className="font-serif font-semibold text-brand-charcoal truncate">
                              {item.title}
                            </h4>
                            <p className="text-[11px] font-mono font-bold text-brand-charcoal bg-amber-100 px-1.5 py-0.5 rounded w-max mt-0.5">
                              Design: {item.designCode || item.id.toUpperCase()}
                            </p>
                            <p className="text-[11px] text-brand-gray mt-0.5">
                              {item.fabric} ({item.stitchType?.includes('Unstitched') ? 'Unstitched' : 'Stitched'}) &bull; Size: <strong className="text-brand-charcoal">{item.size}</strong>
                            </p>
                            <p className="text-xs font-bold text-brand-charcoal mt-1">
                              Qty: {item.quantity} &bull; Rs {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
