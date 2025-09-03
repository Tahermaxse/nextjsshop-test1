import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';

export async function POST(
  request: Request,
  context: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await context.params;
    if (!name) {
      return NextResponse.json(
        { error: "Component name is required" },
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

    // First find the component by urlname or name
    const component = await prisma.components.findFirst({
      where: {
        OR: [
          { urlname: { in: nameVariations } },
          { name: { in: nameVariations } }
        ]
      }
    });

    if (!component) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      );
    }

    try {
      // Update the view count
      const updatedComponent = await prisma.components.update({
        where: {
          id: component.id
        },
        data: {
          views: {
            increment: 1
          }
        }
      });

      return NextResponse.json({ 
        success: true,
        views: updatedComponent.views 
      });
    } catch (prismaError) {
      console.error("Prisma error updating views:", prismaError);
      if (prismaError instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json(
          { error: "Database error updating views", code: prismaError.code },
          { status: 500 }
        );
      }
      throw prismaError;
    }
  } catch (error) {
    console.error("Error incrementing component views:", error);
    return NextResponse.json(
      { error: "Failed to increment component views" },
      { status: 500 }
    );
  }
} 