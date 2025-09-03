import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

export async function GET(req: Request) {
  // Rate limiting
  const ip = getIp(req);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    // Get all users with their purchase data
    const users = await prisma.user.findMany({
      select: {
        id: true,
        orders: {
          select: {
            amount: true,
            template: {
              select: {
                price: true,
              }
            },
            component: {
              select: {
                price: true,
              }
            }
          }
        },
        templatePurchases: {
          select: {
            amount: true,
            status: true,
          }
        },
        componentPurchases: {
          select: {
            amount: true,
            status: true,
          }
        }
      }
    });

    // Calculate statistics
    const stats = {
      totalUsers: users.length,
      totalAmount: 0,
      templateAmount: 0,
      componentAmount: 0
    };

    // Process each user's purchases
    users.forEach(user => {
      // Sum template purchases
      const templateTotal = user.templatePurchases
        .filter(purchase => purchase.status === 'PAID')
        .reduce((sum, purchase) => sum + (purchase.amount || 0), 0);
      
      // Sum component purchases
      const componentTotal = user.componentPurchases
        .filter(purchase => purchase.status === 'PAID')
        .reduce((sum, purchase) => sum + (purchase.amount || 0), 0);

      // Sum orders
      const ordersTotal = user.orders
        .reduce((sum, order) => sum + (order.amount || 0), 0);

      stats.templateAmount += templateTotal;
      stats.componentAmount += componentTotal;
      stats.totalAmount += templateTotal + componentTotal + ordersTotal;
    });

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching purchase statistics:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}