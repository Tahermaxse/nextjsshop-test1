import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  // Rate limiting
  const ip = getIp(request);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  const body = await request.json();
  const { categories, currentTemplateId } = body;

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return NextResponse.json(
      { error: "Valid categories are required" },
      { status: 400 }
    );
  }

  try {
    // currentTemplateId is now a string (UUID), no need to convert to integer
    const similarTemplates = await prisma.template.findMany({
      where: {
        categories: {
          hasSome: categories // Now we can use the array directly
        },
        id: {
          not: currentTemplateId ?? undefined
        }
      },
      take: 4,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        author: true,
        categories: true
      }
    });

    return NextResponse.json({ template: similarTemplates });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching similar template:", error.message);
    } else {
      console.error("Error fetching similar template: Unknown error");
    }

    return NextResponse.json(
      { error: "Failed to fetch similar template" },
      { status: 500 }
    );
  }
}

// Keep the GET method for backward compatibility if needed
export async function GET(request: Request) {
  // Your original GET implementation
}