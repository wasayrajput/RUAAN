import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export type AdTransactionType = 'RECEIVED' | 'DEDUCTION';

export interface AdTransaction {
  id: string;
  date: string;
  type: AdTransactionType;
  amount: number;
  sourceOrPlatform: string;
  campaignName?: string;
  notes?: string;
  addedAt: string;
}

let memoryTransactions: AdTransaction[] = [];

const getStoragePath = () => {
  return path.join(process.cwd(), 'src', 'data', 'ad-budget-db.json');
};

const getUpstashCredentials = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
};

async function loadTransactions(): Promise<AdTransaction[]> {
  const upstash = getUpstashCredentials();
  if (upstash) {
    try {
      const res = await fetch(upstash.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${upstash.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(['GET', 'ruaan_ad_budget']),
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
          if (Array.isArray(parsed)) {
            memoryTransactions = parsed;
            return memoryTransactions;
          }
        }
      }
    } catch (e) {
      console.error('Error fetching ad budget from Upstash:', e);
    }
  }

  try {
    const filePath = getStoragePath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        memoryTransactions = parsed;
        return memoryTransactions;
      }
    }
  } catch (e) {
    // Readonly fallback
  }

  return memoryTransactions;
}

async function saveTransactions(transactions: AdTransaction[]): Promise<void> {
  memoryTransactions = transactions;

  const upstash = getUpstashCredentials();
  if (upstash) {
    try {
      await fetch(upstash.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${upstash.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(['SET', 'ruaan_ad_budget', JSON.stringify(transactions)]),
      });
      return;
    } catch (e) {
      console.error('Error saving ad budget to Upstash:', e);
    }
  }

  try {
    const filePath = getStoragePath();
    fs.writeFileSync(filePath, JSON.stringify(transactions, null, 2), 'utf-8');
  } catch (e) {
    // Readonly fallback
  }
}

// GET /api/ad-budget
export async function GET() {
  try {
    const transactions = await loadTransactions();
    return NextResponse.json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch ad budget' }, { status: 500 });
  }
}

// POST /api/ad-budget - Add transaction
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const transactions = await loadTransactions();

    const newTx: AdTransaction = {
      id: body.id || `ad-tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: body.date || new Date().toISOString().split('T')[0],
      type: body.type === 'RECEIVED' ? 'RECEIVED' : 'DEDUCTION',
      amount: Number(body.amount) || 0,
      sourceOrPlatform: body.sourceOrPlatform || (body.type === 'RECEIVED' ? 'Owner Deposit' : 'Meta Ads'),
      campaignName: body.campaignName || '',
      notes: body.notes || '',
      addedAt: new Date().toISOString(),
    };

    transactions.unshift(newTx);
    await saveTransactions(transactions);

    return NextResponse.json({ success: true, transaction: newTx, transactions });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add ad transaction' }, { status: 500 });
  }
}

// PUT /api/ad-budget - Bulk update
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!Array.isArray(body.transactions)) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    await saveTransactions(body.transactions);
    return NextResponse.json({ success: true, count: body.transactions.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update ad budget' }, { status: 500 });
  }
}

// DELETE /api/ad-budget?id=...
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing transaction id' }, { status: 400 });
    }

    const transactions = await loadTransactions();
    const updated = transactions.filter((t) => t.id !== id);
    await saveTransactions(updated);

    return NextResponse.json({ success: true, deletedId: id, remaining: updated.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete transaction' }, { status: 500 });
  }
}
