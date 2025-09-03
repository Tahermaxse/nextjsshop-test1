import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Add this new POST handler
export async function POST(request: Request) {
  const body = await request.json();
  const { categories, currentComponentId } = body;

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return NextResponse.json(
      { error: "Valid categories are required" },
      { status: 400 }
    );
  }

  try {
    // currentComponentId is now a string (UUID), no need to convert to integer
    const similarComponents = await prisma.components.findMany({
      where: {
        categories: {
          hasSome: categories
        },
        id: {
          not: currentComponentId ?? undefined
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

    return NextResponse.json({ components: similarComponents });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching similar components:", error.message);
    } else {
      console.error("Error fetching similar components: Unknown error");
    }

    return NextResponse.json(
      { error: "Failed to fetch similar components" },
      { status: 500 }
    );
  }
}

// Keep the original GET method for backward compatibility
export async function GET(request: Request) {
  // Your existing GET implementation
}