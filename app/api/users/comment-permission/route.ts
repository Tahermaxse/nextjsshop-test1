import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

export async function PATCH(req: Request) {
  // Rate limiting
  const ip = getIp(req);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: {
        id: Number(session.user.id),
      },
      select: {
        role: true,
      },
    });

    if (adminUser?.role !== 'admin') {
      return new NextResponse('Unauthorized - Admin access required', { status: 403 });
    }

    const body = await req.json();
    const { userId, canComment } = body;

    if (!userId || typeof canComment !== 'boolean') {
      return new NextResponse('Invalid request data', { status: 400 });
    }

    // Update the user using Prisma's update method
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { canComment },
      select: {
        id: true,
        name: true,
        email: true,
        canComment: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('[COMMENT_PERMISSION_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 