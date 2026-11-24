'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, PackageCheck, Phone, MapPin, Clock, Trash2, Search, CheckCircle2, Truck, Copy, ExternalLink, RefreshCw } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

interface OrderItem {
  id: string;
  code?: string;
  name?: string;
  title?: string;
  fabric?: string;
  stitch?: string;
  stitchType?: string;
  size?: string;
  color?: string;
  quantity?: number;
  qty?: number;
  price?: number;
  image?: string;
  designCode?: string;
}

interface SavedOrder {
  id: string;
  orderNumber: string;
  date: string;
  customerName?: string;
  phone1?: string;
  address?: string;
  city?: string;
  notes?: string;
  customer?: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  };
  items: OrderItem[];
  total: number;
  subtotal?: number;
  deliveryFee?: number;
  status?: string;
  paymentType?: string;
  trackingNumber?: string;
  courierName?: string;
}

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [searchPhone, setSearchPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadLocalOrders = () => {
    try {
      // Check multiple keys for complete resilience
      const rawCustomer = localStorage.getItem('ruaan_customer_orders');
      const rawPlaced = localStorage.getItem('ruaan_placed_orders');
      const rawAdmin = localStorage.getItem('ruaan_admin_orders');

      const combined: SavedOrder[] = [];
      const seenIds = new Set<string>();

      const addList = (raw: string | null) => {
        if (!raw) return;
        try {
          const list = JSON.parse(raw);
          if (Array.isArray(list)) {
            for (const o of list) {
              const key = o.orderNumber || o.orderId || o.id;
              if (key && !seenIds.has(key)) {
                seenIds.add(key);
                combined.push({
                  ...o,
                  orderNumber: o.orderNumber || (o.orderId ? `#${o.orderId}` : `#RN-0000`),
                });
              }
            }
          }
        } catch (e) {}
      };

      addList(rawCustomer);
      addList(rawPlaced);
      addList(rawAdmin);

      // Sort newest first
      combined.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
      setOrders(combined);
    } catch (e) {
      console.error('Error reading local orders:', e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadLocalOrders();
      setSearchMessage('');
    }
  }, [isOpen]);

  // Listen for live order placement events
  useEffect(() => {
    const handleUpdate = () => {
      loadLocalOrders();
    };
    window.addEventListener('ruaan_orders_updated', handleUpdate);
    return () => window.removeEventListener('ruaan_orders_updated', handleUpdate);
  }, []);

  const handleCopyOrderId = (orderNumber: string) => {
    navigator.clipboard.writeText(orderNumber);
    setCopiedId(orderNumber);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSearchByPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchPhone.trim();
    if (!query) return;

    try {
      setIsSearching(true);
      setSearchMessage('');
      const isNum = query.startsWith('#') || query.toUpperCase().startsWith('RN-');
      const param = isNum ? `orderNumber=${encodeURIComponent(query)}` : `phone=${encodeURIComponent(query)}`;
      const res = await fetch(`/api/orders?${param}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.orders) && data.orders.length > 0) {
        setSearchMessage(`Found ${data.orders.length} order(s) for "${query}"!`);
        // Merge with existing
        const seen = new Set(orders.map(o => o.orderNumber || o.id));
        const merged = [...orders];
        for (const found of data.orders) {
          if (!seen.has(found.orderNumber || found.id)) {
            merged.unshift(found);
            seen.add(found.orderNumber || found.id);
          }
        }
        setOrders(merged);
        try {
          localStorage.setItem('ruaan_customer_orders', JSON.stringify(merged));
        } catch (e) {}
      } else {
        setSearchMessage(`No orders found matching "${query}". Please check the number.`);
      }
    } catch (err) {
      setSearchMessage('Could not connect to tracking server. Please check internet.');
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'dispatched':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
            <Truck className="w-3 h-3 text-amber-700" />
            Dispatched / On the Way
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            Delivered Successfully
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-900 border border-rose-200">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Order Confirmed &amp; In Process
          </span>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
      <div className="hidden sm:block absolute inset-0" onClick={onClose} />

      <div
        className="relative bg-white w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-3xl sm:rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-800 rounded-xl text-amber-300">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                <span>My Orders &amp; Tracking</span>
                <span className="text-xs bg-amber-400 text-stone-950 font-sans font-bold px-2 py-0.2 rounded-full">
                  {orders.length}
                </span>
              </h2>
              <p className="text-[11px] text-stone-300">
                View your confirmed suit orders, receipts &amp; dispatch status
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Tracking Search Bar (Lookup by phone number or Order ID) */}
        <div className="bg-[#FAF8F5] p-3.5 sm:p-4 border-b border-stone-200">
          <form onSubmit={handleSearchByPhone} className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter your Phone Number (03xx-xxxxxxx) or #Order ID..."
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 shadow-2xs"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition disabled:opacity-50 cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              <span>Track</span>
            </button>
          </form>
          {searchMessage && (
            <p className="text-[11px] text-center text-stone-600 mt-2 font-medium">
              {searchMessage}
            </p>
          )}
        </div>

        {/* Orders List Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 no-scrollbar">
          {orders.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                <PackageCheck className="w-8 h-8" />
              </div>
              <h3 className="text-base font-serif font-bold text-stone-800">No Orders Found on This Device</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                If you already placed an order, enter your phone number above to find your order receipt and tracking status anytime.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-full hover:bg-stone-800 transition"
              >
                Browse Suits Collection
              </button>
            </div>
          ) : (
            orders.map((order, idx) => {
              const customerName = order.customerName || order.customer?.fullName || 'Valued Customer';
              const customerPhone = order.phone1 || order.customer?.phone || '';
              const customerAddress = order.address || order.customer?.address || '';
              const customerCity = order.city || order.customer?.city || 'Pakistan';
              const orderDate = order.date ? new Date(order.date).toLocaleDateString('en-PK', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              }) : 'Recently Placed';

              return (
                <div
                  key={order.id || order.orderNumber || idx}
                  className="bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-5 space-y-3.5"
                >
                  {/* Top Bar: Order ID + Status Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-stone-900 text-white px-2.5 py-1 rounded-md flex items-center gap-1.5">
                        <span>{order.orderNumber}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyOrderId(order.orderNumber)}
                          className="text-stone-300 hover:text-white"
                          title="Copy Order ID"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </span>
                      {copiedId === order.orderNumber && (
                        <span className="text-[10px] text-emerald-600 font-semibold animate-pulse">Copied!</span>
                      )}
                      <span className="text-xs text-stone-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {orderDate}
                      </span>
                    </div>

                    <div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  {/* Suits Ordered */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                      Suits in this Order ({order.items ? order.items.length : 1}):
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {order.items && order.items.map((item, itemIdx) => {
                        const itemTitle = item.name || item.title || 'RUAAN Suit';
                        const itemCode = item.code || item.designCode || '';
                        const itemImage = item.image || '/products/FL01.jpg';
                        const itemQty = item.qty || item.quantity || 1;
                        const itemPrice = item.price || 0;

                        return (
                          <div
                            key={itemIdx}
                            className="flex gap-3 bg-stone-50/80 p-2.5 rounded-xl border border-stone-200/60 items-center"
                          >
                            <div className="relative w-14 h-18 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                              <Image
                                src={itemImage}
                                alt={itemTitle}
                                fill
                                className="object-contain"
                              />
                            </div>

                            <div className="flex-1 min-w-0 text-xs">
                              <h4 className="font-serif font-bold text-stone-900 truncate">
                                {itemTitle}
                              </h4>
                              {itemCode && (
                                <span className="inline-block text-[10px] font-mono font-bold text-amber-900 bg-amber-100 px-1.5 py-0.2 rounded mt-0.5">
                                  {itemCode}
                                </span>
                              )}
                              <p className="text-[11px] text-stone-500 mt-0.5">
                                {item.fabric || 'Pure Fabric'} &bull; {item.size || 'Unstitched'}
                              </p>
                              <p className="text-xs font-bold text-stone-900 mt-0.5">
                                Qty: {itemQty} &bull; Rs. {(itemPrice * itemQty).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Leopards Courier Live Tracking Link if Dispatched */}
                  {order.trackingNumber && (
                    <div className="bg-amber-50 p-2.5 sm:p-3 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                        <div>
                          <p className="font-bold text-amber-950">Dispatched via Leopards Courier</p>
                          <p className="font-mono text-[11px] text-amber-900 font-semibold">
                            CN / Tracking: {order.trackingNumber}
                          </p>
                        </div>
                      </div>
                      <a
                        href={`https://track.leopardscourier.com/tracking?track_numbers=${order.trackingNumber.trim()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-3.5 py-1.5 bg-[#9B1C3C] hover:bg-[#801430] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Track Live on Leopards Website</span>
                      </a>
                    </div>
                  )}

                  {/* Delivery & Total Summary */}
                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-stone-800">
                        Deliver To: <strong>{customerName}</strong> ({customerPhone})
                      </p>
                      <p className="text-stone-500 flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                        <span>{customerAddress}, {customerCity}</span>
                      </p>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <span className="text-[11px] text-stone-500 block">Total Payable on Delivery:</span>
                      <span className="text-base font-serif font-bold text-stone-900">
                        Rs. {order.total ? order.total.toLocaleString() : '0'}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-dashed border-stone-200 text-xs">
                    <span className="text-[11px] text-stone-400">Payment: Cash on Delivery (COD)</span>
                    {customerPhone && (
                      <a
                        href={`https://wa.me/${BRAND_CONFIG.socials.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Assalam-o-Alaikum RUAAN Team, I would like an update on my Order ${order.orderNumber} placed for ${customerName}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-medium text-[11px] flex items-center gap-1.5 transition"
                      >
                        <Phone className="w-3 h-3" />
                        <span>WhatsApp Help</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <p className="text-[11px] text-stone-500">
            Official RUAAN Customer Order Portal
          </p>
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
