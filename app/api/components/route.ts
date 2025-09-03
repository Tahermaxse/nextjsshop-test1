import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  // Rate limiting
  const ip = getIp(request);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const body = await request.json();
    const { search = "", skip = 0, take = 12, filterType = "all" } = body;

    // Create variations of the search query for case-insensitive matching
    const searchVariations = [
      search.toLowerCase(),
      search.toUpperCase(),
      search.charAt(0).toUpperCase() + search.slice(1).toLowerCase(),
      search
    ];

    // Build dynamic filtering conditions
    const where: any = {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          categories: {
            hasSome: searchVariations,
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };

    // Add filter type conditions
    let orderBy: any = { updatedAt: 'desc' };
    if (filterType === "recent") {
      orderBy = { updatedAt: 'desc' };
    } else if (filterType === "most-used") {
      orderBy = { views: 'desc' };
    }

    const components = await prisma.components.findMany({
      take,
      skip,
      where,
      include: {
        features: true,
        videos: true,
      },
      orderBy,
    });

    return NextResponse.json(components);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Components" }, { status: 500 });
  }
}