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

    // Check if user is authenticated
    if (!session?.user) {
      return new NextResponse('Unauthorized - No session', { status: 401 });
    }

    // Double check user role from database
    const currentUser = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
      select: { role: true },
    });

    if (!currentUser || currentUser.role !== 'admin') {
      return new NextResponse('Unauthorized - Not an admin', { status: 401 });
    }

    const body = await req.json();
    const { userId, role } = body;

    if (!userId || !role || !['admin', 'user'].includes(role)) {
      return new NextResponse('Invalid request data', { status: 400 });
    }

    // Prevent self-role change
    if (userId === session.user.id) {
      return new NextResponse('Cannot change your own role', { status: 400 });
    }

    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('[ROLE_UPDATE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 