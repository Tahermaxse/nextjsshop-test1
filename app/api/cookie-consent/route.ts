import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/auth';
import prisma from '@/lib/prisma';
import { getIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { consent, userAgent, ipAddress, country, currency } = body;

    if (!consent || !['accepted', 'rejected'].includes(consent)) {
      return NextResponse.json(
        { success: false, error: 'Invalid consent value' },
        { status: 400 }
      );
    }

    // Get user session if available
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ? parseInt(session.user.id) : null;

    // Get IP address if not provided
    const clientIp = ipAddress || getIp(request);
    console.log('Cookie consent request from IP:', clientIp);

    // Store cookie consent in database
    const cookieConsent = await prisma.cookieConsent.create({
      data: {
        userId,
        consent,
        userAgent: userAgent || request.headers.get('user-agent') || null,
        ipAddress: clientIp,
        country: country || null,
        currency: currency || null,
      },
    });

    console.log('Cookie consent stored:', {
      id: cookieConsent.id,
      userId: cookieConsent.userId,
      consent: cookieConsent.consent,
      ipAddress: cookieConsent.ipAddress,
      country: cookieConsent.country,
      currency: cookieConsent.currency,
    });

    return NextResponse.json({
      success: true,
      data: cookieConsent,
    });

  } catch (error) {
    console.error('Error storing cookie consent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to store cookie consent' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ? parseInt(session.user.id) : null;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Get user's latest cookie consent
    const latestConsent = await prisma.cookieConsent.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: latestConsent,
    });

  } catch (error) {
    console.error('Error fetching cookie consent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cookie consent' },
      { status: 500 }
    );
  }
}