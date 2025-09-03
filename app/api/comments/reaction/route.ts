import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

// POST: Add or update a reaction (like/dislike)
export async function POST(req: Request) {
  // Rate limiting
  const ip = getIp(req);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { commentId, type } = await req.json(); // type: 'like' | 'dislike'
    if (!commentId || !type) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    // Upsert reaction
    const reaction = await prisma.commentReaction.upsert({
      where: {
        userId_commentId: {
          userId: parseInt(session.user.id),
          commentId: parseInt(commentId),
        },
      },
      update: { type },
      create: {
        type,
        userId: parseInt(session.user.id),
        commentId: parseInt(commentId),
      },
    });
    return NextResponse.json(reaction);
  } catch (error) {
    console.error('Error adding reaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE: Remove a reaction
export async function DELETE(req: Request) {
  // Rate limiting
  const ip = getIp(req);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { commentId } = await req.json();
    if (!commentId) {
      return NextResponse.json({ error: 'Missing commentId' }, { status: 400 });
    }
    await prisma.commentReaction.delete({
      where: {
        userId_commentId: {
          userId: parseInt(session.user.id),
          commentId: parseInt(commentId),
        },
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing reaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 