import { NextResponse,NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { ratelimit, strictRatelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

export async function GET(req: Request) {
  // Rate limiting
  const ip = getIp(req);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        emailVerified: true,
        canComment: true,
        canReport: true,
        orders: {
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            createdAt: true,
            template: {
              select: {
                name: true,
                price: true,
              }
            },
            component: {
              select: {
                name: true,
                price: true,
              }
            }
          }
        },
        templatePurchases: {
          select: {
            id: true,
            purchaseDate: true,
            amount: true,
            status: true,
            template: {
              select: {
                name: true,
                price: true,
              }
            }
          }
        },
        componentPurchases: {
          select: {
            id: true,
            purchaseDate: true,
            amount: true,
            status: true,
            component: {
              select: {
                name: true,
                price: true,
              }
            }
          }
        }
      }
    });

    // Transform the data to match the expected format
    const transformedUsers = users.map(user => ({
      ...user,
      // Default to placeholder image if user image is null
      image: user.image || '/api/placeholder/32/32',
      // Add status based on emailVerified
      status: user.emailVerified ? 'Active' : 'Inactive',
      // Add verified based on emailVerified
      verified: Boolean(user.emailVerified),
      // Ensure boolean fields are properly set
      canComment: Boolean(user.canComment),
      canReport: Boolean(user.canReport),
      // Ensure arrays are never null
      orders: user.orders || [],
      templatePurchases: user.templatePurchases || [],
      componentPurchases: user.componentPurchases || []
    }));

    return NextResponse.json(transformedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Stricter rate limiting
  const ip = getIp(request);
  const rate = await safeRateLimit(strictRatelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
    try {
      // Parse the request body to get the user IDs to delete
      const body = await request.json();
      const { ids } = body;
  
      // Validate that ids is provided and is an array
      if (!ids || !Array.isArray(ids)) {
        return NextResponse.json(
          { error: 'Invalid request: ids array is required' },
          { status: 400 }
        );
      }
  
      // Delete related records first to maintain referential integrity
      // Delete orders
      await prisma.order.deleteMany({
        where: {
          userId: {
            in: ids
          }
        }
      });
  
      // Delete template purchases
      await prisma.templatePurchase.deleteMany({
        where: {
          userId: {
            in: ids
          }
        }
      });
  
      // Delete component purchases
      await prisma.componentPurchase.deleteMany({
        where: {
          userId: {
            in: ids
          }
        }
      });
  
      // Finally, delete the users
      await prisma.user.deleteMany({
        where: {
          id: {
            in: ids
          }
        }
      });
  
      return NextResponse.json(
        { message: 'Users deleted successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting users:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }