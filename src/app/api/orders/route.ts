import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Order and Item interface
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

export type OrderStatus = 'new' | 'pending' | 'dispatched' | 'delivered' | 'returned' | 'cancelled';
export type PaymentType = 'COD' | 'PAID' | 'PARTIAL' | 'DUAL';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  phone1: string;
  phone2?: string;
  address: string;
  city: string;
  source: 'WhatsApp' | 'Instagram' | 'Website' | 'Phone Call';
  paymentType: PaymentType;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  notes?: string;
}

// In-memory fallback
let memoryOrders: Order[] = [
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
        qty: 1,
      },
    ],
    subtotal: 3350,
    deliveryFee: 150,
    total: 3500,
    status: 'dispatched',
    notes: 'Customer said: Agr ye pasand agya to 2 suit or b select kiy hian',
  },
];

// Helper to get persistent storage file path (for local dev)
const getStoragePath = () => {
  return path.join(process.cwd(), 'src', 'data', 'orders-db.json');
};

// Permanent Upstash Redis credentials
const DEFAULT_UPSTASH_URL = 'https://sound-hookworm-243908.upstash.io';
const DEFAULT_UPSTASH_TOKEN = 'gQAAAAAAA7jEAQIgcDFhNjYzY2M4NGFkYzc0ODAwYjNmZjMyNWZiZjkzNWRkZA';

const getUpstashCredentials = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || DEFAULT_UPSTASH_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || DEFAULT_UPSTASH_TOKEN;
  return { url, token };
};

// Load orders from Upstash cloud database
async function loadOrders(): Promise<Order[]> {
  const upstash = getUpstashCredentials();
  if (upstash) {
    try {
      const res = await fetch(upstash.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${upstash.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(['GET', 'ruaan_orders']),
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
          if (Array.isArray(parsed) && parsed.length > 0) {
            memoryOrders = parsed;
            return memoryOrders;
          }
        }
      }
    } catch (e) {
      console.error('Error fetching orders from Upstash:', e);
    }
  }

  // Fallback to local file if writable
  try {
    const filePath = getStoragePath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryOrders = parsed;
        return memoryOrders;
      }
    }
  } catch (e) {
    // Readonly fallback
  }

  return memoryOrders;
}

// Save orders to Upstash cloud database
async function saveOrders(orders: Order[]): Promise<void> {
  memoryOrders = orders;

  const upstash = getUpstashCredentials();
  if (upstash) {
    try {
      const res = await fetch(upstash.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${upstash.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(['SET', 'ruaan_orders', JSON.stringify(orders)]),
      });
      if (res.ok) {
        return;
      }
    } catch (e) {
      console.error('Error saving orders to Upstash:', e);
    }
  }

  // Fallback to local file if writable
  try {
    const filePath = getStoragePath();
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (e) {
    // Readonly fallback
  }
}

// GET /api/orders - Fetch all orders in real time
export async function GET() {
  try {
    const orders = await loadOrders();
    return NextResponse.json(
      { success: true, count: orders.length, orders },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/orders - Customer places a new order from website (Defaults to 'new' status)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, phone1, phone2, address, city, items, subtotal, deliveryFee, total, notes, paymentType } = body;

    if (!customerName || !phone1 || !address || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required order fields (customerName, phone1, address, items)' },
        { status: 400 }
      );
    }

    const currentOrders = await loadOrders();

    // Generate serial order number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `#RN-${randomSuffix}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}-${randomSuffix}`,
      orderNumber,
      date: new Date().toISOString().split('T')[0],
      customerName: customerName.trim(),
      phone1: phone1.trim(),
      phone2: phone2 ? phone2.trim() : '',
      address: address.trim(),
      city: (city && city.trim()) || 'Pakistan',
      source: 'Website',
      paymentType: paymentType || 'COD',
      items: items.map((it: any, idx: number) => ({
        id: it.id || `it-${Date.now()}-${idx}`,
        code: it.code || 'SUIT',
        name: it.name || 'RUAAN Suit',
        fabric: it.fabric || 'Pure Fabric',
        stitch: it.stitch || 'Standard',
        size: it.size || 'Standard Size',
        price: Number(it.price) || 0,
        qty: Number(it.qty) || 1,
      })),
      subtotal: Number(subtotal) || 0,
      deliveryFee: Number(deliveryFee) || 0,
      total: Number(total) || 0,
      status: 'new', // Web orders land in 'new'
      notes: notes ? notes.trim() : '',
    };

    const updatedOrders = [newOrder, ...currentOrders];
    await saveOrders(updatedOrders);

    return NextResponse.json(
      {
        success: true,
        message: 'Order placed and synced to cloud database successfully!',
        order: newOrder,
      },
      {
        status: 201,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PATCH /api/orders - Update order status (e.g. from 'new' to 'pending')
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Order id and status are required' }, { status: 400 });
    }

    const currentOrders = await loadOrders();
    const orderIndex = currentOrders.findIndex((o) => o.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    currentOrders[orderIndex].status = status;
    await saveOrders(currentOrders);

    return NextResponse.json(
      {
        success: true,
        message: `Order status updated to ${status}`,
        order: currentOrders[orderIndex],
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
