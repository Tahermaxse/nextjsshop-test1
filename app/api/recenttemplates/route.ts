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
    // Fetch last 4 templates only
    const templates = await prisma.template.findMany({
      orderBy: {
        id: "desc", 
      },
      take: 4,
      include: {
        features: true,
        images: true,
      },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 });
  }
}
