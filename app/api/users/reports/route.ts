import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

export async function GET(request: Request) {
  // Rate limiting
  const ip = getIp(request);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = parseInt(session.user.id as string, 10);

    // Fetch both template and component reports
    const [templateReports, componentReports] = await Promise.all([
      prisma.report.findMany({
        where: { userId },
        include: {
          template: {
            select: {
              name: true,
              image: true,
              author: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.reportComponent.findMany({
        where: { userId },
        include: {
          component: {
            select: {
              name: true,
              image: true,
              author: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return NextResponse.json({ templateReports, componentReports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
