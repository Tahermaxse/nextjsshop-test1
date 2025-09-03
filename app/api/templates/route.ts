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
    const { search = "", category, skip = 0, take = 12, filterType = "all" } = body;

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

    // Add category filter if specified
    if (category && category !== "all") {
      where.categories = {
        hasSome: [
          category.toLowerCase(),
          category.toUpperCase(),
          category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
          category
        ],
      };
    }

    // Add filter type conditions
    let orderBy: any = { updatedAt: 'desc' };
    if (filterType === "recent") {
      orderBy = { updatedAt: 'desc' };
    } else if (filterType === "most-used") {
      orderBy = { views: 'desc' };
    }

    const templates = await prisma.template.findMany({
      take,
      skip,
      where,
      include: {
        features: true,
        images: true,
      },
      orderBy,
    });

    if (!templates) {
      console.error("Templates is null or undefined");
      return NextResponse.json({ error: "No templates found" }, { status: 404 });
    }

    return NextResponse.json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 });
  }
}