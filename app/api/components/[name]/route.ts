import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from '@prisma/client';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await context.params;
    if (!name) {
      return NextResponse.json(
        { error: "Name parameter is required" },
        { status: 400 }
      );
    }

    // Create variations of the name for more flexible matching
    const nameVariations = [
      name.toLowerCase().replace(/\s+/g, "-"),
      name.toLowerCase(),
      name,
      name.replace(/-/g, " "),
      name.replace(/-/g, " ").toLowerCase(),
      name.replace(/-/g, " ").toUpperCase()
    ];

    try {
      const component = await prisma.components.findFirst({
        where: {
          OR: [
            { urlname: { in: nameVariations } },
            { name: { in: nameVariations } }
          ]
        },
        include: {
          features: true,
          images: true,
          videos: true,
        },
      });

      if (!component) {
        return NextResponse.json(
          { error: "Component not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(component);
    } catch (prismaError) {
      console.error("Prisma error:", prismaError);
      if (prismaError instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json(
          { error: "Database error", code: prismaError.code },
          { status: 500 }
        );
      }
      throw prismaError;
    }
  } catch (error) {
    console.error("Error fetching Component:", error);
    return NextResponse.json(
      { error: "Failed to fetch Component" },
      { status: 500 }
    );
  }
}