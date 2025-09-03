import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await context.params;
    if (!name) {
      return NextResponse.json({ error: "Template name is required" }, { status: 400 });
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

    const template = await prisma.template.findFirst({
      where: {
        OR: [
          { urlname: { in: nameVariations } },
          { name: { in: nameVariations } }
        ]
      },
      include: {
        features: true,
        images: true,
      }
    });

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error("Error fetching template:", error);
    return NextResponse.json(
      { error: "Failed to fetch template" },
      { status: 500 }
    );
  }
}