import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

interface QuoteRequest {
  id: number;
  serviceType: string;
  adminMessage: string;
  createdAt: Date;
  updatedAt: Date;
  adminMessageRead: boolean;
}

// POST notifications with pagination
export async function POST(request: Request) {
  // Rate limiting
  const ip = getIp(request);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const page = parseInt(body.page || "1");
    const limit = parseInt(body.limit || "5");
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await prisma.notification.count({
      where: {
        userId: parseInt(session.user.id),
      },
    });

    // Get paginated notifications
    const notifications = await prisma.notification.findMany({
      where: {
        userId: parseInt(session.user.id),
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    // Get quote requests with admin messages
    const quoteRequests = await prisma.quoteRequest.findMany({
      where: {
        userId: parseInt(session.user.id),
        adminMessage: {
          not: null,
        },
      },
      select: {
        id: true,
        serviceType: true,
        adminMessage: true,
        createdAt: true,
        updatedAt: true,
        adminMessageRead: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Convert quote request admin messages to notification format
    // Filter out any null adminMessage values and type assert
    const quoteNotifications = quoteRequests
      .filter((request): request is QuoteRequest => request.adminMessage !== null)
      .map((request) => ({
        id: `quote-${request.id}`,
        title: `Response to ${request.serviceType} Request`,
        message: request.adminMessage,
        type: "quote_response",
        read: request.adminMessageRead,
        createdAt: request.updatedAt,
      }));

    // Combine and sort all notifications
    const allNotifications = [...notifications, ...quoteNotifications].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Apply pagination to combined results
    const paginatedNotifications = allNotifications.slice(skip, skip + limit);

    return NextResponse.json({
      notifications: paginatedNotifications,
      hasMore: skip + paginatedNotifications.length < allNotifications.length,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

// PATCH to mark notifications as read
export async function PATCH(request: Request) {
  // Rate limiting
  const ip = getIp(request);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { notificationIds } = body;

    if (!notificationIds || !Array.isArray(notificationIds)) {
      return NextResponse.json(
        { error: "Notification IDs are required" },
        { status: 400 }
      );
    }

    // Separate regular notifications and quote notifications
    const regularNotificationIds = notificationIds
      .filter(id => !id.toString().startsWith('quote-'))
      .map(id => parseInt(id.toString()));
    const quoteNotificationIds = notificationIds
      .filter(id => id.toString().startsWith('quote-'))
      .map(id => parseInt(id.toString().replace('quote-', '')));

    // Update regular notifications
    if (regularNotificationIds.length > 0) {
      await prisma.notification.updateMany({
        where: {
          id: {
            in: regularNotificationIds,
          },
          userId: parseInt(session.user.id),
        },
        data: {
          read: true,
        },
      });
    }

    // Update quote requests (mark admin messages as read)
    if (quoteNotificationIds.length > 0) {
      await prisma.quoteRequest.updateMany({
        where: {
          id: {
            in: quoteNotificationIds,
          },
          userId: parseInt(session.user.id),
        },
        data: {
          adminMessageRead: true,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return NextResponse.json(
      { error: "Failed to mark notifications as read" },
      { status: 500 }
    );
  }
}