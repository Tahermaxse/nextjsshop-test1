import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

export async function GET(request: Request) {
  // Rate limiting
  const ip = getIp(request);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    // Fetch last 4 components only
    const components = await prisma.components.findMany({
      orderBy: {
        id: "desc", 
      },
      take: 4,
      include: {
        features: true,
        images: true,
      },
    });

    return NextResponse.json(components);
  } catch (error) {
    console.error("Error fetching components:", error);
    return NextResponse.json({ error: "Failed to fetch components" }, { status: 500 });
  }
}