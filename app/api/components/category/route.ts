import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

// Helper function to generate category variations for case-insensitive matching
function getCategoryVariations(category: string): string[] {
    return [
        category.toLowerCase(),
        category.toUpperCase(),
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
        decodeURIComponent(category),
    ];
}

// POST handler for /api/components/category
export async function POST(request: NextRequest) {
    // Rate limiting
    const ip = getIp(request);
    const rate = await safeRateLimit(ratelimit, ip);
    if (!rate.success) {
      return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
    }
    try {
        const body = await request.json();
        const { category = "", skip = 0, take = 12, filterType = "all" } = body;

        if (!category) {
            return NextResponse.json(
                { error: "Category is required" },
                { status: 400 }
            );
        }

        const categoryVariations = getCategoryVariations(category);

        const components = await prisma.components.findMany({
            take,
            skip,
            where: {
                OR: [
                    {
                        name: {
                            contains: category,
                            mode: "insensitive",
                        },
                    },
                    {
                        categories: {
                            hasSome: categoryVariations,
                        },
                    },
                    {
                        description: {
                            contains: category,
                            mode: "insensitive",
                        },
                    },
                ],
            },
            include: {
                features: true,
                images: true,
                videos: true,
            },
            orderBy: filterType === "recent" 
                ? { updatedAt: "desc" }
                : filterType === "most-used"
                ? { views: "desc" }
                : { updatedAt: "desc" },
        });

        return NextResponse.json(components);
    } catch (error) {
        console.error("Error fetching components:", error);
        return NextResponse.json(
            { error: "Failed to fetch components" },
            { status: 500 }
        );
    }
}