import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEffectiveUserId } from '@/lib/auth-utils';

const TIER_LIMITS: Record<string, number> = {
  'free': 0,
  'pro': 10,
  'elite': 50,
  'enterprise': 1000
};

export async function GET(req: NextRequest) {
  const user = await getEffectiveUserId();
  
  const watchlists = await prisma.watchlist.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { alerts: { where: { isRead: false } } }
      }
    }
  });

  return NextResponse.json(watchlists);
}

export async function POST(req: NextRequest) {
  const user = await getEffectiveUserId();
  const { name, targetType, targetValue } = await req.json();

  if (!name || !targetType || !targetValue) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Get user plan to enforce limits
  const userRecord = await prisma.user.findUnique({
    where: { id: user.id }
  });

  const plan = userRecord?.plan || 'free';
  const limit = TIER_LIMITS[plan] || 0;

  if (limit === 0) {
    return NextResponse.json({ error: 'Watchlists are a premium feature. Upgrade to Pro required.' }, { status: 403 });
  }

  const currentCount = await prisma.watchlist.count({
    where: { userId: user.id }
  });

  if (currentCount >= limit) {
    return NextResponse.json({ error: `Watchlist limit reached for ${plan} plan (${limit}). Upgrade required.` }, { status: 403 });
  }

  const watchlist = await prisma.watchlist.create({
    data: {
      userId: user.id,
      name,
      targetType,
      targetValue,
      status: 'active'
    }
  });

  return NextResponse.json(watchlist);
}
