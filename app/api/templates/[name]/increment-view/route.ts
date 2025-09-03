import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await context.params;
    if (!name) {
      return NextResponse.json({ error: "Template name is required" }, { status: 400 });
    }

    const formattedName = name.toLowerCase().replace(/\s+/g, "-");
    
    // First find the template by urlname
    const template = await prisma.template.findFirst({
      where: {
        OR: [
          { urlname: formattedName },
          { urlname: name }
        ]
      }
    });

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    // Then update using the template's ID
    const updatedTemplate = await prisma.template.update({
      where: {
        id: template.id
      },
      data: {
        views: {
          increment: 1
        }
      }
    });

    return NextResponse.json({ success: true, views: updatedTemplate.views });
  } catch (error) {
    console.error("Error incrementing template views:", error);
    return NextResponse.json(
      { error: "Failed to increment template views" },
      { status: 500 }
    );
  }
} 