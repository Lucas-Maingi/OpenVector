import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEffectiveUserId } from '@/lib/auth-utils';

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const user = await getEffectiveUserId();
  const params = await props.params;
  const { id } = params;
  const { status, name } = await req.json();

  // Ownership verification
  const watchlist = await prisma.watchlist.findUnique({
    where: { id }
  });

  if (!watchlist || watchlist.userId !== user.id) {
    return NextResponse.json({ error: 'Watchlist not found or access denied' }, { status: 404 });
  }

  const updated = await prisma.watchlist.update({
    where: { id },
    data: {
      status: status || watchlist.status,
      name: name || watchlist.name
    }
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const user = await getEffectiveUserId();
  const params = await props.params;
  const { id } = params;

  // Ownership verification
  const watchlist = await prisma.watchlist.findUnique({
    where: { id }
  });

  if (!watchlist || watchlist.userId !== user.id) {
    return NextResponse.json({ error: 'Watchlist not found or access denied' }, { status: 404 });
  }

  await prisma.watchlist.delete({
    where: { id }
  });

  return NextResponse.json({ success: true });
}
