'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Lock, 
  ArrowLeft,
  Package, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Truck, 
  CheckCircle, 
  RotateCcw, 
  AlertTriangle, 
  Plus, 
  Search, 
  Printer, 
  Copy, 
  Download, 
  Trash2, 
  LogOut, 
  ChevronRight, 
  ArrowUpRight, 
  Filter, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Tag, 
  Layers, 
  Clock, 
  Check, 
  Sparkles,
  BarChart3,
  Settings,
  X
} from 'lucide-react';
import productsData from '@/data/products.json';
import { BRAND_CONFIG } from '@/config/brand';

// --- TYPES ---
export type OrderStatus = 'pending' | 'dispatched' | 'delivered' | 'returned' | 'cancelled';
export type PaymentType = 'COD' | 'PAID' | 'PARTIAL';
export type OrderSource = 'WhatsApp' | 'Instagram' | 'Website' | 'Phone Call';

export interface OrderItem {
  id: string;
  code: string;
  name: string;
  fabric: string;
  stitch: string;
  size: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  phone1: string;
  phone2?: string;
  address: string;
  city: string;
  source: OrderSource;
  paymentType: PaymentType;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  notes?: string;
}

export interface InventoryItem {
  code: string;
  title: string;
  fabric: string;
  collection: string;
  retailPrice: number;
  costPrice: number;
  stock: number;
  soldCount: number;
  image: string;
  isStitched: boolean;
}

export interface AdCampaign {
  id: string;
  date: string;
  name: string;
  platform: 'Meta / Instagram' | 'TikTok' | 'Google';
  spend: number;
  leads: number;
  orders: number;
  notes?: string;
}

export default function AdminPortalPage() {
  // --- AUTHENTICATION STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [savedPin, setSavedPin] = useState<string>('2026');

  // --- NAVIGATION STATE ---
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'marketing' | 'settings'>('overview');

  // --- CORE DATA STATES ---
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>([]);

  // --- UI & MODAL STATES ---
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [collectionFilter, setCollectionFilter] = useState<string>('all');
  const [isAddOrderOpen, setIsAddOrderOpen] = useState<boolean>(false);
  const [isSlipModalOpen, setIsSlipModalOpen] = useState<boolean>(false);
  const [selectedOrderForSlip, setSelectedOrderForSlip] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Slip capture ref for html2canvas
  const slipPrintRef = useRef<HTMLDivElement>(null);

  // --- TOAST HELPER ---
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // --- INITIAL HYDRATION FROM LOCALSTORAGE ---
  useEffect(() => {
    // 1. Check Auth
    const isAuth = sessionStorage.getItem('ruaan_admin_auth');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
    const localPin = localStorage.getItem('ruaan_admin_pin');
    if (localPin) {
      setSavedPin(localPin);
    }

    // 2. Load Inventory (Seed from products.json if empty)
    const storedInventory = localStorage.getItem('ruaan_admin_inventory');
    if (storedInventory) {
      try {
        setInventory(JSON.parse(storedInventory));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed from products.json
      const initialInv: InventoryItem[] = productsData.map((p: any) => {
        const code = (p.designCode || p.id).toUpperCase().replace(/\.(JPEG|JPG|PNG|WEBP)$/i, '').trim();
        // Estimated wholesale cost: unstitched ~1500, stitched ~1700
        const isStitched = p.stitchType.includes('Stitched');
        const defaultCost = isStitched ? 1650 : 1400;
        return {
          code: code,
          title: p.title,
          fabric: p.fabric,
          collection: p.collection,
          retailPrice: p.price,
          costPrice: defaultCost,
          stock: code === 'DV03' ? 9 : (code === 'PL01' || code === 'SL02' ? 12 : 10), // DV03 1 already ordered
          soldCount: code === 'DV03' ? 1 : 0,
          image: p.mainImage || '/products/DV01.jpg',
          isStitched: isStitched,
        };
      });
      setInventory(initialInv);
      localStorage.setItem('ruaan_admin_inventory', JSON.stringify(initialInv));
    }

    // 3. Load Orders (Seed with Luqman Akram's order if empty)
    const storedOrders = localStorage.getItem('ruaan_admin_orders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error(e);
      }
    } else {
      const initialOrders: Order[] = [
        {
          id: 'ord-1048',
          orderNumber: '#RN-1048',
          date: '2026-10-20',
          customerName: 'Luqman Akram',
          phone1: '0347-4275521',
          phone2: '0308-4358336',
          address: 'Gali no 6, House no 6, Mughal Bazar, Daok Rahmanpura',
          city: 'Muridke',
          source: 'WhatsApp',
          paymentType: 'COD',
          items: [
            {
              id: 'it-1',
              code: 'DV03',
              name: 'Digital Viscose 3-Piece (Forest Teal / Emerald)',
              fabric: 'Premium Digital Viscose',
              stitch: 'Stitched Ready-to-Wear',
              size: 'Large',
              price: 3350,
              qty: 1
            }
          ],
          subtotal: 3350,
          deliveryFee: 150,
          total: 3500,
          status: 'dispatched',
          notes: 'Customer said: Agr ye pasand agya to 2 suit or b select kiy hian'
        }
      ];
      setOrders(initialOrders);
      localStorage.setItem('ruaan_admin_orders', JSON.stringify(initialOrders));
    }

    // 4. Load Ad Spend Logs (Seed sample campaign)
    const storedAds = localStorage.getItem('ruaan_admin_ads');
    if (storedAds) {
      try {
        setAdCampaigns(JSON.parse(storedAds));
      } catch (e) {
        console.error(e);
      }
    } else {
      const initialAds: AdCampaign[] = [
        {
          id: 'ad-1',
          date: '2026-10-19',
          name: 'DV03 Meta Video Ad (Launch)',
          platform: 'Meta / Instagram',
          spend: 1800,
          leads: 28,
          orders: 2,
          notes: 'High engagement on WhatsApp click ad'
        }
      ];
      setAdCampaigns(initialAds);
      localStorage.setItem('ruaan_admin_ads', JSON.stringify(initialAds));
    }
  }, []);

  // Sync to local storage
  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem('ruaan_admin_orders', JSON.stringify(updated));
  };

  const saveInventory = (updated: InventoryItem[]) => {
    setInventory(updated);
    localStorage.setItem('ruaan_admin_inventory', JSON.stringify(updated));
  };

  const saveAds = (updated: AdCampaign[]) => {
    setAdCampaigns(updated);
    localStorage.setItem('ruaan_admin_ads', JSON.stringify(updated));
  };

  // --- PIN AUTHENTICATION HANDLERS ---
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === savedPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('ruaan_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Incorrect Secret PIN. Please try again.');
      setPinInput('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ruaan_admin_auth');
    setPinInput('');
  };

  // --- INVENTORY STOCK MANAGEMENT ---
  const handleStockDelta = (code: string, delta: number) => {
    const updated = inventory.map(item => {
      if (item.code === code) {
        const newStock = Math.max(0, item.stock + delta);
        return { ...item, stock: newStock };
      }
      return item;
    });
    saveInventory(updated);
    showToast(`Stock updated for ${code}`);
  };

  // --- ORDER LIFECYCLE & AUTO-STOCK ADJUSTMENT ---
  const handleOrderStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const orderToUpdate = orders.find(o => o.id === orderId);
    if (!orderToUpdate) return;
    const oldStatus = orderToUpdate.status;

    // RULE 1: If an order transitions TO 'returned' or 'cancelled', RESTOCK the inventory (+qty)
    let invCopy = [...inventory];
    if ((newStatus === 'returned' || newStatus === 'cancelled') && (oldStatus !== 'returned' && oldStatus !== 'cancelled')) {
      orderToUpdate.items.forEach(item => {
        invCopy = invCopy.map(inv => {
          if (inv.code === item.code) {
            return {
              ...inv,
              stock: inv.stock + item.qty,
              soldCount: Math.max(0, inv.soldCount - item.qty)
            };
          }
          return inv;
        });
      });
      saveInventory(invCopy);
      showToast(`📦 Parcel Returned: Restocked ${orderToUpdate.items.length} item(s) back to inventory!`);
    }

    // RULE 2: If an order was previously 'returned' or 'cancelled', and is now reactivated to 'pending' / 'dispatched' / 'delivered', DEDUCT stock again (-qty)
    if ((oldStatus === 'returned' || oldStatus === 'cancelled') && (newStatus !== 'returned' && newStatus !== 'cancelled')) {
      orderToUpdate.items.forEach(item => {
        invCopy = invCopy.map(inv => {
          if (inv.code === item.code) {
            return {
              ...inv,
              stock: Math.max(0, inv.stock - item.qty),
              soldCount: inv.soldCount + item.qty
            };
          }
          return inv;
        });
      });
      saveInventory(invCopy);
      showToast(`📦 Order Reactivated: Deducted stock for ${orderToUpdate.items.length} item(s)`);
    }

    // Update order status
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    saveOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    const order = orders.find(o => o.id === orderId);
    if (order && order.status !== 'returned' && order.status !== 'cancelled') {
      // Prompt user whether to restock
      if (confirm('Do you want to RESTORE the stock of these items (+1 back to inventory)?')) {
        let invCopy = [...inventory];
        order.items.forEach(item => {
          invCopy = invCopy.map(inv => {
            if (inv.code === item.code) {
              return { ...inv, stock: inv.stock + item.qty, soldCount: Math.max(0, inv.soldCount - item.qty) };
            }
            return inv;
          });
        });
        saveInventory(invCopy);
      }
    }
    const updated = orders.filter(o => o.id !== orderId);
    saveOrders(updated);
    showToast('Order deleted successfully');
  };

  // --- FINANCIAL CALCULATIONS (REALTIME P&L) ---
  const financials = useMemo(() => {
    let totalGrossRevenue = 0;
    let realizedCash = 0;
    let pendingCOD = 0;
    let cogsDelivered = 0;
    let cogsAllActive = 0;
    let totalShippingCost = 0;

    orders.forEach(o => {
      if (o.status !== 'cancelled' && o.status !== 'returned') {
        totalGrossRevenue += o.total;

        // Calculate Cost of Goods Sold (COGS)
        o.items.forEach(it => {
          const invItem = inventory.find(inv => inv.code === it.code);
          const unitCost = invItem ? invItem.costPrice : 1500;
          cogsAllActive += (unitCost * it.qty);
          if (o.status === 'delivered') {
            cogsDelivered += (unitCost * it.qty);
          }
        });

        if (o.status === 'delivered') {
          realizedCash += o.total;
        } else {
          pendingCOD += o.total;
        }

        totalShippingCost += o.deliveryFee;
      }
    });

    const totalAdSpend = adCampaigns.reduce((sum, ad) => sum + ad.spend, 0);
    const totalLeads = adCampaigns.reduce((sum, ad) => sum + ad.leads, 0);

    // Pure Pocket Profit: (Realized Cash - Delivered COGS - Ad Spend)
    const netPureProfit = realizedCash - cogsDelivered - totalAdSpend;

    // Projected Profit (if all pending orders deliver)
    const projectedNetProfit = totalGrossRevenue - cogsAllActive - totalAdSpend;

    // Return Rate
    const totalCount = orders.length;
    const returnedCount = orders.filter(o => o.status === 'returned').length;
    const returnRate = totalCount > 0 ? ((returnedCount / totalCount) * 100).toFixed(1) : '0';

    return {
      totalGrossRevenue,
      realizedCash,
      pendingCOD,
      totalAdSpend,
      totalLeads,
      netPureProfit,
      projectedNetProfit,
      returnRate,
      totalCount,
      deliveredCount: orders.filter(o => o.status === 'delivered').length,
      pendingCount: orders.filter(o => o.status === 'pending').length,
      dispatchedCount: orders.filter(o => o.status === 'dispatched').length,
      returnedCount,
    };
  }, [orders, inventory, adCampaigns]);

  // --- LOW STOCK ITEMS ---
  const lowStockItems = useMemo(() => {
    return inventory.filter(item => item.stock <= 3);
  }, [inventory]);

  // --- FILTERED ORDERS ---
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phone1.includes(searchQuery) ||
        order.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(i => i.code.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  // --- SLIP IMAGE GENERATION (HTML2CANVAS) ---
  const handleDownloadSlipImage = async () => {
    if (!slipPrintRef.current) return;
    showToast('Generating High-Resolution Slip Image...');
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(slipPrintRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const link = document.createElement('a');
      const safeName = (selectedOrderForSlip?.customerName || 'Customer').replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `RUAAN_Slip_${safeName}_${selectedOrderForSlip?.orderNumber || 'Order'}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
      showToast('✅ Slip Image Downloaded Successfully!');
    } catch (e) {
      console.error(e);
      showToast('❌ Failed to export image. Use Print instead.');
    }
  };

  const handleCopyWhatsAppSlip = (order: Order) => {
    let itemsText = '';
    order.items.forEach((it, idx) => {
      itemsText += `• Suit #${idx + 1}: ${it.code} — ${it.name}\n  Type & Size: ${it.stitch} (${it.size}) ${it.qty > 1 ? `x${it.qty}` : ''} | Rs. ${(it.price * it.qty).toLocaleString()}\n`;
    });

    let payLine = `💰 Total Payable (Cash on Delivery): Rs. ${order.total.toLocaleString()}`;
    if (order.paymentType === 'PAID') {
      payLine = `💰 Payment Status: PAID ONLINE (Total: Rs. ${order.total.toLocaleString()} - Rs. 0 Collectible)`;
    } else if (order.paymentType === 'PARTIAL') {
      payLine = `💰 Balance Collectible on Delivery: Rs. ${order.total.toLocaleString()}`;
    }

    const text = `Assalam-o-Alaikum ${order.customerName}! ✨\nThank you for choosing RUAAN.\n\nAapka order successfully confirm ho chuka hai:\n\n📋 Order Details (${order.items.length} Suits):\n${itemsText}\nItems Subtotal: Rs. ${order.subtotal.toLocaleString()}\nDelivery Charges: Rs. ${order.deliveryFee.toLocaleString()}\n----------------------------------------\n${payLine}\n\n📍 Delivery Address:\n${order.customerName}\n${order.address}\nCity: ${order.city}\nContact: ${order.phone1}${order.phone2 ? ' / ' + order.phone2 : ''}\n\nParcel 2-3 working days mein deliver ho jayega. Rider aane se pehle call karega. 🚚📦`;

    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 WhatsApp Text Copied to Clipboard!');
    });
  };

  // --- EXPORT ORDERS TO CSV ---
  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = ['Order Number', 'Date', 'Customer Name', 'City', 'Phone', 'Items', 'Total (PKR)', 'Status', 'Payment Type', 'Source'];
    const rows = orders.map(o => [
      o.orderNumber,
      o.date,
      `"${o.customerName}"`,
      `"${o.city}"`,
      `"${o.phone1}"`,
      `"${o.items.map(i => `${i.code} (${i.size}) x${i.qty}`).join('; ')}"`,
      o.total,
      o.status.toUpperCase(),
      o.paymentType,
      o.source
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RUAAN_Orders_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 Orders Exported to CSV!');
  };

  // =========================================================================
  // VIEW: 1. LOCK SCREEN (PIN AUTHENTICATION)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0f12] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#161920] border border-[#2a2f3a] rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
          {/* Subtle Gold Inset Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent"></div>
          
          <div className="w-16 h-16 rounded-full bg-[#202532] border border-[#3b4354] flex items-center justify-center mx-auto mb-5 text-[#c5a059] shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-serif font-bold text-white tracking-wider uppercase mb-1">
            R U A A N
          </h2>
          <p className="text-xs uppercase tracking-widest text-[#c5a059] font-medium mb-6">
            Private Executive Portal
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Enter Secret 4-Digit PIN
              </label>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="&bull;&bull;&bull;&bull;"
                autoFocus
                className="w-full text-center text-2xl tracking-[8px] bg-[#0a0c0e] border border-[#333a48] focus:border-[#c5a059] rounded-xl py-3 text-white focus:outline-none transition"
              />
            </div>

            {pinError && (
              <p className="text-xs text-rose-400 font-medium">{pinError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] to-[#aa8222] hover:from-[#e5bf47] hover:to-[#b88d2a] text-black font-bold text-sm tracking-wider uppercase rounded-xl transition shadow-lg shadow-[#c5a059]/20"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-[#232733] text-[11px] text-gray-500">
            Protected Brand Operating System &bull; Unauthorized Access Prohibited
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: 2. MAIN DASHBOARD APPLICATION
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0d0f12] text-gray-200">
      
      {/* --- TOP BRAND APP BAR --- */}
      <header className="sticky top-0 z-40 bg-[#14171e]/95 backdrop-blur-md border-b border-[#242936] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 relative bg-white rounded-lg p-1 flex items-center justify-center shadow-xs">
            <Image 
              src="/logo.png" 
              alt="RUAAN Logo" 
              width={40} 
              height={40} 
              className="object-contain" 
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-base sm:text-lg tracking-wider text-white">
                R U A A N
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#c5a059]/20 text-[#c5a059] px-2 py-0.5 rounded-full border border-[#c5a059]/30">
                ERP System
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden sm:block">
              Business Intelligence, Stock & Delivery Pipeline
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-2 bg-[#1c202b] hover:bg-[#282f40] text-gray-300 hover:text-white text-xs font-bold rounded-lg border border-[#303748] transition shadow-xs"
            title="Go back to Customer Website"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Store</span>
          </Link>

          <button
            onClick={() => setIsAddOrderOpen(true)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#aa8222] hover:from-[#e5bf47] hover:to-[#b88d2a] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-md shadow-[#c5a059]/20"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Order</span>
          </button>

          <button
            onClick={handleLogout}
            title="Lock Portal"
            className="p-2 bg-[#202532] hover:bg-[#2c3345] text-gray-400 hover:text-white rounded-lg border border-[#32394a] transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* --- LOW STOCK ALERT STRIP --- */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-950/60 border-b border-amber-800/40 px-4 sm:px-8 py-2 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
            <span>
              <strong>Low Stock Warning:</strong> {lowStockItems.map(i => `${i.code} (${i.stock} left)`).join(', ')}.
            </span>
          </div>
          <button 
            onClick={() => setActiveTab('inventory')}
            className="underline font-semibold hover:text-amber-100 ml-4 shrink-0"
          >
            Manage Inventory &rarr;
          </button>
        </div>
      )}

      {/* --- NAVIGATION TABS --- */}
      <div className="border-b border-[#242936] bg-[#11131a] px-4 sm:px-8">
        <nav className="flex space-x-1 sm:space-x-8 overflow-x-auto py-2.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition shrink-0 ${
              activeTab === 'overview'
                ? 'bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1e28]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview & P&L</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition shrink-0 ${
              activeTab === 'orders'
                ? 'bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1e28]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders Pipeline</span>
            {financials.pendingCount > 0 && (
              <span className="bg-amber-500/20 text-amber-400 text-[10px] px-1.5 py-0.2 rounded-full font-bold border border-amber-500/30">
                {financials.pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition shrink-0 ${
              activeTab === 'inventory'
                ? 'bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1e28]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Stock & Inventory</span>
          </button>

          <button
            onClick={() => setActiveTab('marketing')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition shrink-0 ${
              activeTab === 'marketing'
                ? 'bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1e28]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Ad Spend & ROI</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition shrink-0 ${
              activeTab === 'settings'
                ? 'bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1e28]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* --- TAB CONTENT AREA --- */}
      <main className="max-w-7xl mx-auto p-4 sm:p-8">
        
        {/* =========================================================================
            TAB 1: EXECUTIVE OVERVIEW & P&L
           ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* 1. Realized Cash / In Hand */}
              <div className="bg-[#171a22] border border-[#2a2f3d] rounded-xl p-5 shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Delivered & Cash In Hand</span>
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  Rs. {financials.realizedCash.toLocaleString()}
                </div>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span>✓ {financials.deliveredCount} Orders Delivered</span>
                </p>
              </div>

              {/* 2. Projected / Gross Pipeline */}
              <div className="bg-[#171a22] border border-[#2a2f3d] rounded-xl p-5 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Pending COD In Transit</span>
                  <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-amber-300 mb-1">
                  Rs. {financials.pendingCOD.toLocaleString()}
                </div>
                <p className="text-[11px] text-gray-400">
                  {financials.dispatchedCount + financials.pendingCount} Orders currently in pipeline
                </p>
              </div>

              {/* 3. Pure Net Profit */}
              <div className="bg-[#171a22] border border-[#2a2f3d] rounded-xl p-5 shadow-lg relative">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Net Pocket Profit</span>
                  <div className="p-2 bg-[#c5a059]/10 text-[#c5a059] rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#c5a059] mb-1">
                  Rs. {financials.netPureProfit.toLocaleString()}
                </div>
                <p className="text-[11px] text-gray-400">
                  After wholesale cost & Rs. {financials.totalAdSpend.toLocaleString()} Ad spend
                </p>
              </div>

              {/* 4. Total Ad Spend & ROAS */}
              <div className="bg-[#171a22] border border-[#2a2f3d] rounded-xl p-5 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Ad Spend & Leads</span>
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  Rs. {financials.totalAdSpend.toLocaleString()}
                </div>
                <p className="text-[11px] text-blue-400">
                  {financials.totalLeads} Total WhatsApp Inquiries
                </p>
              </div>

            </div>

            {/* Pipeline Stage Funnel */}
            <div className="bg-[#151821] border border-[#262b38] rounded-xl p-6 shadow-md">
              <h3 className="font-serif font-bold text-base text-white uppercase tracking-wider mb-4">
                Orders Lifecycle Funnel
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                <div className="bg-[#1b1f2b] p-4 rounded-xl border border-[#2d3445]">
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-1">
                    <span>1. Pending Packing</span>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold text-white">{financials.pendingCount}</div>
                  <span className="text-[11px] text-gray-400">Awaiting dispatch</span>
                </div>

                <div className="bg-[#1b1f2b] p-4 rounded-xl border border-[#2d3445]">
                  <div className="flex items-center justify-between text-xs text-blue-400 font-bold mb-1">
                    <span>2. Dispatched / In Transit</span>
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold text-white">{financials.dispatchedCount}</div>
                  <span className="text-[11px] text-gray-400">With Courier</span>
                </div>

                <div className="bg-[#1b1f2b] p-4 rounded-xl border border-[#2d3445]">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-bold mb-1">
                    <span>3. Delivered & Paid</span>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold text-white">{financials.deliveredCount}</div>
                  <span className="text-[11px] text-gray-400">Cash Received</span>
                </div>

                <div className="bg-[#1b1f2b] p-4 rounded-xl border border-[#2d3445]">
                  <div className="flex items-center justify-between text-xs text-rose-400 font-bold mb-1">
                    <span>4. Returned (Restocked)</span>
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold text-white">{financials.returnedCount}</div>
                  <span className="text-[11px] text-gray-400">Return Rate: {financials.returnRate}%</span>
                </div>

              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-[#151821] border border-[#262b38] rounded-xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif font-bold text-base text-white uppercase tracking-wider">
                  Recent Orders
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#c5a059] font-bold hover:underline"
                >
                  View All Orders &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#10131a] text-gray-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Order</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Suit Articles</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#242936]">
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.id} className="hover:bg-[#1c202d] transition">
                        <td className="py-3 px-4 font-mono font-bold text-[#c5a059]">
                          {o.orderNumber}
                          <span className="block text-[10px] text-gray-400 font-sans">{o.date}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{o.customerName}</div>
                          <div className="text-[11px] text-gray-400">{o.city} &bull; {o.phone1}</div>
                        </td>
                        <td className="py-3 px-4">
                          {o.items.map(it => (
                            <span key={it.id} className="inline-block bg-[#222838] border border-[#333b50] px-2 py-0.5 rounded text-[11px] mr-1.5 mb-1 text-gray-200">
                              <strong>{it.code}</strong> ({it.size}) {it.qty > 1 ? `x${it.qty}` : ''}
                            </span>
                          ))}
                        </td>
                        <td className="py-3 px-4 font-bold text-white">
                          Rs. {o.total.toLocaleString()}
                          <span className="block text-[10px] text-gray-400 font-normal">{o.paymentType}</span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={o.status}
                            onChange={(e) => handleOrderStatusChange(o.id, e.target.value as OrderStatus)}
                            className={`text-[11px] font-bold uppercase rounded-md px-2 py-1 border transition ${
                              o.status === 'delivered' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700' :
                              o.status === 'dispatched' ? 'bg-blue-950/80 text-blue-300 border-blue-700' :
                              o.status === 'returned' ? 'bg-rose-950/80 text-rose-300 border-rose-700' :
                              'bg-amber-950/80 text-amber-300 border-amber-700'
                            }`}
                          >
                            <option value="pending">🟡 Pending</option>
                            <option value="dispatched">🔵 Dispatched</option>
                            <option value="delivered">🟢 Delivered</option>
                            <option value="returned">🔴 Returned</option>
                            <option value="cancelled">⚪ Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedOrderForSlip(o);
                              setIsSlipModalOpen(true);
                            }}
                            className="p-1.5 bg-[#252c3c] hover:bg-[#343e54] text-[#c5a059] rounded-md transition"
                            title="Generate Slip"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2: ORDERS MANAGEMENT PIPELINE
           ========================================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Header & Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <h2 className="text-xl font-serif font-bold text-white uppercase tracking-wider">
                  Orders Management Pipeline
                </h2>
                <p className="text-xs text-gray-400">
                  Total {orders.length} orders recorded across WhatsApp, Instagram, and Website
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#202534] hover:bg-[#2c3448] text-gray-200 text-xs font-bold rounded-lg border border-[#343c50] transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => setIsAddOrderOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-black text-xs font-bold uppercase rounded-lg transition"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>New Order</span>
                </button>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              
              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: 'all', label: 'All Orders' },
                  { id: 'pending', label: 'Pending' },
                  { id: 'dispatched', label: 'Dispatched' },
                  { id: 'delivered', label: 'Delivered' },
                  { id: 'returned', label: 'Returned' },
                  { id: 'cancelled', label: 'Cancelled' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition shrink-0 ${
                      statusFilter === tab.id
                        ? 'bg-[#c5a059] text-black font-extrabold'
                        : 'bg-[#181b24] text-gray-400 hover:text-white border border-[#2b3140]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customer, phone, code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#161922] border border-[#2c3242] rounded-lg text-white focus:outline-none focus:border-[#c5a059]"
                />
              </div>

            </div>

            {/* Orders Table */}
            <div className="bg-[#151821] border border-[#262b38] rounded-xl overflow-hidden shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#10131a] text-gray-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Source</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">Ordered Items</th>
                      <th className="py-3 px-4">Total Amount</th>
                      <th className="py-3 px-4">Order Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#242936]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-500">
                          No orders found matching your filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(o => (
                        <tr key={o.id} className="hover:bg-[#1a1e2b] transition">
                          
                          {/* Order ID */}
                          <td className="py-3.5 px-4 font-mono font-bold text-[#c5a059]">
                            {o.orderNumber}
                            <span className="block text-[10px] text-gray-400 font-sans">{o.date}</span>
                          </td>

                          {/* Source Badge */}
                          <td className="py-3.5 px-4">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                              o.source === 'WhatsApp' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800' :
                              o.source === 'Instagram' ? 'bg-purple-950/60 text-purple-400 border-purple-800' :
                              'bg-blue-950/60 text-blue-400 border-blue-800'
                            }`}>
                              {o.source}
                            </span>
                          </td>

                          {/* Customer Details */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white text-sm">{o.customerName}</div>
                            <div className="text-[11px] text-gray-300 line-clamp-1">{o.address}</div>
                            <div className="text-[11px] text-[#c5a059] font-medium">
                              {o.city} &bull; 📞 {o.phone1} {o.phone2 ? `| 📱 ${o.phone2}` : ''}
                            </div>
                          </td>

                          {/* Items */}
                          <td className="py-3.5 px-4">
                            {o.items.map(it => (
                              <div key={it.id} className="mb-1 last:mb-0">
                                <span className="font-bold text-white">{it.code}</span>
                                <span className="text-gray-400 text-[11px]"> &bull; {it.stitch} ({it.size})</span>
                                {it.qty > 1 && <span className="ml-1 text-[#c5a059] font-bold">x{it.qty}</span>}
                              </div>
                            ))}
                          </td>

                          {/* Total */}
                          <td className="py-3.5 px-4 font-bold text-white">
                            Rs. {o.total.toLocaleString()}
                            <span className={`block text-[10px] uppercase font-bold ${
                              o.paymentType === 'PAID' ? 'text-emerald-400' : 'text-amber-400'
                            }`}>
                              {o.paymentType === 'PAID' ? '✓ Paid Online' : 'Cash on Delivery'}
                            </span>
                          </td>

                          {/* Status Dropdown with Automatic Restocking */}
                          <td className="py-3.5 px-4">
                            <select
                              value={o.status}
                              onChange={(e) => handleOrderStatusChange(o.id, e.target.value as OrderStatus)}
                              className={`text-[11px] font-bold uppercase rounded-md px-2.5 py-1.5 border transition cursor-pointer ${
                                o.status === 'delivered' ? 'bg-emerald-950 text-emerald-300 border-emerald-600' :
                                o.status === 'dispatched' ? 'bg-blue-950 text-blue-300 border-blue-600' :
                                o.status === 'returned' ? 'bg-rose-950 text-rose-300 border-rose-600' :
                                o.status === 'cancelled' ? 'bg-gray-900 text-gray-400 border-gray-700' :
                                'bg-amber-950 text-amber-300 border-amber-600'
                              }`}
                            >
                              <option value="pending">🟡 Pending Packing</option>
                              <option value="dispatched">🔵 Dispatched (In Transit)</option>
                              <option value="delivered">🟢 Delivered & Paid</option>
                              <option value="returned">🔴 Returned (Restock +1)</option>
                              <option value="cancelled">⚪ Cancelled</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedOrderForSlip(o);
                                  setIsSlipModalOpen(true);
                                }}
                                className="p-1.5 bg-[#252c3c] hover:bg-[#343e54] text-[#c5a059] rounded-md transition"
                                title="Print / Download Slip"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleCopyWhatsAppSlip(o)}
                                className="p-1.5 bg-[#1b3323] hover:bg-[#254730] text-emerald-400 rounded-md transition"
                                title="Copy WhatsApp Text"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(o.id)}
                                className="p-1.5 bg-[#311c21] hover:bg-[#45272e] text-rose-400 rounded-md transition"
                                title="Delete Order"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 3: INVENTORY & STOCK CONTROL
           ========================================================================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <h2 className="text-xl font-serif font-bold text-white uppercase tracking-wider">
                  Live Inventory & Stock Manager
                </h2>
                <p className="text-xs text-gray-400">
                  {inventory.length} Catalog Suits &bull; Auto-decrements on order, auto-restocks on return
                </p>
              </div>

              {/* Collection Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={collectionFilter}
                  onChange={(e) => setCollectionFilter(e.target.value)}
                  className="text-xs bg-[#161922] border border-[#2c3242] rounded-lg px-3 py-2 text-white focus:outline-none"
                >
                  <option value="all">All Collections</option>
                  <option value="Stone Linen">Stone Linen</option>
                  <option value="Digital Viscose">Digital Viscose</option>
                  <option value="Dhanak">Dhanak</option>
                  <option value="Doria Linen">Doria Linen</option>
                  <option value="Plain Linen">Plain Linen</option>
                </select>
              </div>
            </div>

            {/* Inventory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inventory
                .filter(item => collectionFilter === 'all' || item.collection.toLowerCase().includes(collectionFilter.toLowerCase()) || item.fabric.toLowerCase().includes(collectionFilter.toLowerCase()))
                .map(item => (
                  <div 
                    key={item.code} 
                    className={`bg-[#161922] border rounded-xl p-4 transition shadow-md flex gap-4 ${
                      item.stock <= 3 
                        ? 'border-amber-600/50 bg-[#1c191a]' 
                        : 'border-[#272c3a] hover:border-[#383f52]'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-24 relative rounded-lg overflow-hidden shrink-0 bg-[#0d0f14] border border-[#2a2f3d]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details & Counter */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="font-mono font-bold text-sm text-[#c5a059]">
                            {item.code}
                          </span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            item.stock === 0 ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                            item.stock <= 3 ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                            'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          }`}>
                            {item.stock === 0 ? 'Out of Stock' : item.stock <= 3 ? 'Low Stock' : 'In Stock'}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white line-clamp-1 mt-0.5">{item.title}</h4>
                        <p className="text-[11px] text-gray-400">{item.fabric} &bull; Rs. {item.retailPrice.toLocaleString()}</p>
                      </div>

                      {/* Stock Adjuster Buttons */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#232733]">
                        <div className="text-[11px] text-gray-400">
                          Sold: <strong className="text-white">{item.soldCount}</strong>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStockDelta(item.code, -1)}
                            className="w-7 h-7 rounded bg-[#252b3a] hover:bg-[#343c50] text-white flex items-center justify-center font-bold text-sm transition"
                            title="Decrease Stock"
                          >
                            -
                          </button>
                          <span className="font-mono font-bold text-base text-white px-1">
                            {item.stock}
                          </span>
                          <button
                            onClick={() => handleStockDelta(item.code, +1)}
                            className="w-7 h-7 rounded bg-[#252b3a] hover:bg-[#343c50] text-white flex items-center justify-center font-bold text-sm transition"
                            title="Increase Stock"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 4: AD SPEND & MARKETING ROI TRACKER
           ========================================================================= */}
        {activeTab === 'marketing' && (
          <div className="space-y-6">
            
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-serif font-bold text-white uppercase tracking-wider">
                  Marketing & Ad Spend Tracker
                </h2>
                <p className="text-xs text-gray-400">
                  Track Facebook/Meta & TikTok ad expenditures, cost per inquiry & customer acquisition
                </p>
              </div>
            </div>

            {/* Ad Metrics Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#171a22] border border-[#2a2f3d] rounded-xl p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Ad Spend</span>
                <div className="text-2xl font-bold text-white mt-1">Rs. {financials.totalAdSpend.toLocaleString()}</div>
                <span className="text-[11px] text-gray-400">Across {adCampaigns.length} campaigns</span>
              </div>

              <div className="bg-[#171a22] border border-[#2a2f3d] rounded-xl p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Cost Per Message (CPL)</span>
                <div className="text-2xl font-bold text-blue-400 mt-1">
                  Rs. {financials.totalLeads > 0 ? (financials.totalAdSpend / financials.totalLeads).toFixed(0) : '0'}
                </div>
                <span className="text-[11px] text-gray-400">Average cost per WhatsApp inquiry</span>
              </div>

              <div className="bg-[#171a22] border border-[#2a2f3d] rounded-xl p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Return on Ad Spend (ROAS)</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1">
                  {financials.totalAdSpend > 0 ? ((financials.totalGrossRevenue / financials.totalAdSpend)).toFixed(1) : '0'}x
                </div>
                <span className="text-[11px] text-gray-400">Generated Rs. {financials.totalGrossRevenue.toLocaleString()} sales</span>
              </div>
            </div>

            {/* Campaign Logs */}
            <div className="bg-[#151821] border border-[#262b38] rounded-xl p-6 shadow-md">
              <h3 className="font-serif font-bold text-base text-white uppercase tracking-wider mb-4">
                Recorded Ad Campaigns
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#10131a] text-gray-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Campaign Name</th>
                      <th className="py-3 px-4">Platform</th>
                      <th className="py-3 px-4">Spend (PKR)</th>
                      <th className="py-3 px-4">Inquiries</th>
                      <th className="py-3 px-4">Orders</th>
                      <th className="py-3 px-4">Cost / Order</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#242936]">
                    {adCampaigns.map(ad => (
                      <tr key={ad.id} className="hover:bg-[#1a1e2b] transition">
                        <td className="py-3 px-4 text-gray-400">{ad.date}</td>
                        <td className="py-3 px-4 font-bold text-white">{ad.name}</td>
                        <td className="py-3 px-4 text-gray-300">{ad.platform}</td>
                        <td className="py-3 px-4 font-bold text-white">Rs. {ad.spend.toLocaleString()}</td>
                        <td className="py-3 px-4 text-blue-400 font-bold">{ad.leads} Leads</td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">{ad.orders} Orders</td>
                        <td className="py-3 px-4 text-gray-300">
                          Rs. {ad.orders > 0 ? (ad.spend / ad.orders).toFixed(0) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 5: SETTINGS
           ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-[#151821] border border-[#262b38] rounded-xl p-6 shadow-md">
              <h3 className="font-serif font-bold text-base text-white uppercase tracking-wider mb-4">
                Portal Security PIN
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Current Secret PIN is: <strong className="text-[#c5a059]">{savedPin}</strong>. You can update it below:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New PIN (e.g. 7860)"
                  id="newPinInput"
                  className="flex-1 bg-[#0f1115] border border-[#2e333d] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c5a059]"
                />
                <button
                  onClick={() => {
                    const el = document.getElementById('newPinInput') as HTMLInputElement;
                    if (el && el.value.trim().length >= 4) {
                      setSavedPin(el.value.trim());
                      localStorage.setItem('ruaan_admin_pin', el.value.trim());
                      showToast('✅ PIN updated successfully!');
                      el.value = '';
                    } else {
                      alert('PIN must be at least 4 digits');
                    }
                  }}
                  className="px-4 py-2 bg-[#c5a059] text-black font-bold text-xs uppercase rounded-lg"
                >
                  Update PIN
                </button>
              </div>
            </div>

            <div className="bg-[#151821] border border-[#262b38] rounded-xl p-6 shadow-md">
              <h3 className="font-serif font-bold text-base text-white uppercase tracking-wider mb-2">
                System Backup & Reset
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Export your entire orders and inventory database for offline safekeeping.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const data = { orders, inventory, adCampaigns, savedPin };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `RUAAN_Complete_Backup_${new Date().toISOString().split('T')[0]}.json`;
                    link.click();
                    showToast('✅ Full Database Backup Downloaded!');
                  }}
                  className="px-4 py-2 bg-[#252b3a] hover:bg-[#343c50] text-white text-xs font-bold rounded-lg border border-[#374055]"
                >
                  Download Full JSON Backup
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* =========================================================================
          MODAL: ADD MANUAL / WHATSAPP ORDER (Auto Stock Decrement)
         ========================================================================= */}
      {isAddOrderOpen && (
        <AddOrderModal
          inventory={inventory}
          onClose={() => setIsAddOrderOpen(false)}
          onAddOrder={(newOrder) => {
            // 1. Decrement stock for each item in the order
            let invCopy = [...inventory];
            newOrder.items.forEach(it => {
              invCopy = invCopy.map(inv => {
                if (inv.code === it.code) {
                  return {
                    ...inv,
                    stock: Math.max(0, inv.stock - it.qty),
                    soldCount: inv.soldCount + it.qty
                  };
                }
                return inv;
              });
            });
            saveInventory(invCopy);

            // 2. Save order
            saveOrders([newOrder, ...orders]);
            setIsAddOrderOpen(false);
            showToast(`✅ Order ${newOrder.orderNumber} Booked & Stock Decremented!`);
          }}
        />
      )}

      {/* =========================================================================
          MODAL: LUXURY BRAND SLIP & RECEIPT VIEWER
         ========================================================================= */}
      {isSlipModalOpen && selectedOrderForSlip && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) setIsSlipModalOpen(false); }}
        >
          <div className="max-w-lg w-full bg-[#181b22] border border-[#2e3444] rounded-2xl p-5 sm:p-6 shadow-2xl relative my-8 max-h-[92vh] overflow-y-auto">
            
            <div className="sticky top-0 bg-[#181b22] z-20 pb-3 mb-3 border-b border-[#2e3444] flex justify-between items-center">
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white uppercase tracking-wider">
                  Official Parcel Dispatch Slip
                </h3>
                <p className="text-[11px] text-gray-400">Order: {selectedOrderForSlip.orderNumber}</p>
              </div>
              <button
                onClick={() => setIsSlipModalOpen(false)}
                className="flex items-center gap-1 px-3 py-1.5 bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-700/60 rounded-lg text-xs font-bold transition"
                title="Close Slip"
              >
                <X className="w-4 h-4" />
                <span>Close (Wapas)</span>
              </button>
            </div>

            {/* Action Bar with 4 Buttons including CANCEL */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              <button
                onClick={handleDownloadSlipImage}
                className="py-2.5 px-2 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-black font-bold text-xs uppercase rounded-lg flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Download</span>
              </button>
              <button
                onClick={() => handleCopyWhatsAppSlip(selectedOrderForSlip)}
                className="py-2.5 px-2 bg-[#25d366] text-black font-bold text-xs uppercase rounded-lg flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => window.print()}
                className="py-2.5 px-2 bg-[#2a303f] hover:bg-[#384155] text-white font-bold text-xs uppercase rounded-lg flex items-center justify-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={() => setIsSlipModalOpen(false)}
                className="py-2.5 px-2 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 font-bold text-xs uppercase rounded-lg flex items-center justify-center gap-1.5 transition"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Cancel</span>
              </button>
            </div>

            {/* THE PRINTABLE SLIP CONTAINER */}
            <div className="bg-white rounded-lg overflow-hidden border border-[#e5e5e5] p-3 text-black" ref={slipPrintRef}>
              <div className="border border-[#c5a059]/40 p-4 relative">
                
                {/* Header with Official Logo */}
                <div className="text-center pb-3 border-b border-[#c5a059]/30">
                  <div className="h-16 w-auto relative mx-auto mb-1">
                    <img src="/logo.png" alt="RUAAN" className="h-16 mx-auto object-contain" />
                  </div>
                  <div className="text-[10px] tracking-[3px] uppercase text-[#8c827a] font-bold">
                    Luxury Pret & Stitched Wear
                  </div>
                  <div className="mt-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      selectedOrderForSlip.paymentType === 'PAID'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-[#2a2415] text-[#ffd700] border border-[#d4af37]'
                    }`}>
                      {selectedOrderForSlip.paymentType === 'PAID' ? 'PAID ONLINE (DO NOT COLLECT CASH)' : 'CASH ON DELIVERY (COD)'}
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex justify-between py-2 text-[11px] text-gray-600 border-b border-gray-200">
                  <span>Order: <strong>{selectedOrderForSlip.orderNumber}</strong></span>
                  <span>Date: <strong>{selectedOrderForSlip.date}</strong></span>
                </div>

                {/* Customer */}
                <div className="py-3 border-b border-dashed border-gray-300">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1">Customer / Consignee</div>
                  <div className="text-base font-bold text-black">{selectedOrderForSlip.customerName}</div>
                  <div className="text-xs text-gray-800 mt-0.5 leading-relaxed">{selectedOrderForSlip.address}</div>
                  <div className="text-xs font-bold text-black mt-1">City: {selectedOrderForSlip.city}</div>
                  <div className="flex gap-2 mt-1.5 text-xs">
                    <span className="bg-gray-100 px-2 py-0.5 rounded font-mono font-bold">📞 {selectedOrderForSlip.phone1}</span>
                    {selectedOrderForSlip.phone2 && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded font-mono font-bold">📱 {selectedOrderForSlip.phone2}</span>
                    )}
                  </div>
                </div>

                {/* Ordered Items */}
                <div className="py-3 border-b border-dashed border-gray-300">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-2">Ordered Articles</div>
                  {selectedOrderForSlip.items.map((it, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded p-2 mb-1.5 last:mb-0">
                      <div className="flex justify-between font-bold text-xs text-black">
                        <span>{it.code} &bull; {it.stitch}</span>
                        <span>Rs. {(it.price * it.qty).toLocaleString()}</span>
                      </div>
                      <div className="text-[11px] text-gray-700">{it.name}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        Fabric: <strong>{it.fabric}</strong> &bull; Size: <strong>{it.size}</strong> {it.qty > 1 ? `x${it.qty}` : ''}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Calculation */}
                <div className="py-2.5">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Items Subtotal:</span>
                    <span>Rs. {selectedOrderForSlip.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Nationwide Shipping:</span>
                    <span>Rs. {selectedOrderForSlip.deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-black pt-2 border-t-2 border-black mt-1">
                    <span>{selectedOrderForSlip.paymentType === 'PAID' ? 'Total (Paid):' : 'Total Payable (COD):'}</span>
                    <span className="text-amber-800 text-lg">
                      {selectedOrderForSlip.paymentType === 'PAID' ? `Rs. 0 (Rs. ${selectedOrderForSlip.total.toLocaleString()} Paid)` : `Rs. ${selectedOrderForSlip.total.toLocaleString()}`}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-2 border-t border-gray-200 text-[10px] text-gray-500">
                  <div className="font-bold text-black">RUAAN Customer Care: {BRAND_CONFIG.whatsappNumber}</div>
                  <div>Thank you for choosing RUAAN! Please verify parcel upon delivery.</div>
                </div>

              </div>
            </div>

            {/* Bottom Close Button */}
            <div className="mt-4 pt-3 border-t border-[#2e3444]">
              <button
                onClick={() => setIsSlipModalOpen(false)}
                className="w-full py-2.5 bg-[#252b38] hover:bg-[#31394a] text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition border border-[#394254] flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span>Close Slip &bull; Wapas Dashboard</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- FLOATING TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#10b981] text-black font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

// =========================================================================
// SUBCOMPONENT: ADD ORDER MODAL (Dynamic Multi-Item & Auto Stock)
// =========================================================================
function AddOrderModal({
  inventory,
  onClose,
  onAddOrder
}: {
  inventory: InventoryItem[];
  onClose: () => void;
  onAddOrder: (order: Order) => void;
}) {
  const [source, setSource] = useState<OrderSource>('WhatsApp');
  const [paymentType, setPaymentType] = useState<PaymentType>('COD');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone1, setPhone1] = useState<string>('');
  const [phone2, setPhone2] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [deliveryFee, setDeliveryFee] = useState<number>(150);
  const [notes, setNotes] = useState<string>('');

  // Items list
  const [items, setItems] = useState<OrderItem[]>([
    {
      id: 'it-1',
      code: 'DV03',
      name: 'Digital Viscose 3-Piece',
      fabric: 'Premium Digital Viscose',
      stitch: 'Stitched Ready-to-Wear',
      size: 'Large',
      price: 3350,
      qty: 1
    }
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: `it-${Date.now()}`,
        code: 'SL01',
        name: 'Dusty Lilac Minimalist Stone Linen 2pc',
        fabric: 'Premium Stone Linen',
        stitch: 'Stitched Ready-to-Wear',
        size: 'Medium',
        price: 2350,
        qty: 1
      }
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter(i => i.id !== id));
  };

  const handlePresetSelect = (itemId: string, selectedCode: string) => {
    const inv = inventory.find(i => i.code === selectedCode);
    if (!inv) return;
    setItems(items.map(it => {
      if (it.id === itemId) {
        return {
          ...it,
          code: inv.code,
          name: inv.title,
          fabric: inv.fabric,
          stitch: inv.isStitched ? 'Stitched Ready-to-Wear' : 'Unstitched',
          size: inv.isStitched ? 'Medium' : 'Standard Unstitched',
          price: inv.retailPrice,
        };
      }
      return it;
    }));
  };

  const subtotal = items.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone1 || !address || !city) {
      alert('Please fill customer name, phone, address, and city.');
      return;
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `#RN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      customerName,
      phone1,
      phone2,
      address,
      city,
      source,
      paymentType,
      items,
      subtotal,
      deliveryFee,
      total,
      status: 'pending',
      notes
    };

    onAddOrder(newOrder);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="max-w-xl w-full bg-[#181b22] border border-[#2e3444] rounded-2xl shadow-2xl relative my-auto max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Sticky Header */}
        <div className="flex justify-between items-center p-4 sm:p-5 pb-3 border-b border-[#282d3b] bg-[#181b22] shrink-0">
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              Book New Order
            </h3>
            <p className="text-[11px] text-gray-400">Stock will automatically decrement upon saving</p>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="p-1.5 text-gray-400 hover:text-white rounded-lg bg-[#252a36] hover:bg-[#343b4c] transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          
          {/* Order Source & Payment */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Order Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as OrderSource)}
                className="w-full bg-[#0f1115] border border-[#2e333d] rounded-lg px-3 py-2 text-xs text-white"
              >
                <option value="WhatsApp">🟢 WhatsApp Direct</option>
                <option value="Instagram">🟣 Instagram DM</option>
                <option value="Website">🔵 Website Store</option>
                <option value="Phone Call">📞 Phone Call</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Payment Method</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as PaymentType)}
                className="w-full bg-[#0f1115] border border-[#2e333d] rounded-lg px-3 py-2 text-xs text-white"
              >
                <option value="COD">Cash on Delivery (COD)</option>
                <option value="PAID">Paid Online / Prepaid</option>
                <option value="PARTIAL">Partial Advance Paid</option>
              </select>
            </div>
          </div>

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Customer Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Luqman Akram"
                className="w-full bg-[#0f1115] border border-[#2e333d] rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Primary Phone *</label>
              <input
                type="text"
                required
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
                placeholder="e.g. 0347-4275521"
                className="w-full bg-[#0f1115] border border-[#2e333d] rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">City & Area *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Muridke, Punjab"
                className="w-full bg-[#0f1115] border border-[#2e333d] rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Alternate Phone</label>
              <input
                type="text"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                placeholder="Optional backup phone"
                className="w-full bg-[#0f1115] border border-[#2e333d] rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Full Delivery Address *</label>
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House #, Street #, Mohalla, Landmark"
              className="w-full bg-[#0f1115] border border-[#2e333d] rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          {/* Ordered Items Section */}
          <div className="pt-2 border-t border-[#282d3b]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                Suits / Items ({items.length})
              </span>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs text-[#c5a059] hover:underline font-bold"
              >
                + Add Another Suit
              </button>
            </div>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {items.map((it, idx) => (
                <div key={it.id} className="bg-[#12141a] border border-[#262b37] rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold text-gray-300">Suit #{idx + 1}</span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(it.id)}
                        className="text-rose-400 text-[10px] hover:underline"
                      >
                        ✕ Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-0.5">Select Article</label>
                      <select
                        value={it.code}
                        onChange={(e) => handlePresetSelect(it.id, e.target.value)}
                        className="w-full bg-[#181b22] border border-[#2e333d] rounded px-2 py-1 text-xs text-white"
                      >
                        {inventory.map(inv => (
                          <option key={inv.code} value={inv.code}>
                            {inv.code} — {inv.title.slice(0, 20)} (Stock: {inv.stock})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 mb-0.5">Size</label>
                      <select
                        value={it.size}
                        onChange={(e) => {
                          const val = e.target.value;
                          setItems(items.map(x => x.id === it.id ? { ...x, size: val } : x));
                        }}
                        className="w-full bg-[#181b22] border border-[#2e333d] rounded px-2 py-1 text-xs text-white"
                      >
                        <option value="Large">Large</option>
                        <option value="Medium">Medium</option>
                        <option value="Small">Small</option>
                        <option value="XL">XL</option>
                        <option value="Standard Unstitched">Standard Unstitched</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-0.5">Price (PKR)</label>
                      <input
                        type="number"
                        value={it.price}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setItems(items.map(x => x.id === it.id ? { ...x, price: val } : x));
                        }}
                        className="w-full bg-[#181b22] border border-[#2e333d] rounded px-2 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-0.5">Quantity</label>
                      <input
                        type="number"
                        min={1}
                        value={it.qty}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          setItems(items.map(x => x.id === it.id ? { ...x, qty: val } : x));
                        }}
                        className="w-full bg-[#181b22] border border-[#2e333d] rounded px-2 py-1 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </form>

        {/* Sticky Action Footer - Always 100% Visible */}
        <div className="p-4 sm:p-5 pt-3 border-t border-[#282d3b] bg-[#181b22] shrink-0">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400">Shipping (Rs):</label>
              <input
                type="number"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(parseInt(e.target.value) || 0)}
                className="w-20 bg-[#0f1115] border border-[#2e333d] rounded px-2 py-1 text-xs text-white text-center"
              />
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400">Total: </span>
              <span className="text-lg font-bold text-[#c5a059]">Rs. {total.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 sm:py-3 bg-[#252b38] hover:bg-[#31394a] text-gray-300 font-bold text-xs uppercase rounded-xl transition border border-[#394254]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="col-span-2 py-2.5 sm:py-3 bg-gradient-to-r from-[#d4af37] to-[#aa8222] hover:from-[#e5bf47] hover:to-[#b88d2a] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-[#c5a059]/20"
            >
              Confirm & Book Order &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
