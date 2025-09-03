import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Schema for updating quote request
const updateQuoteRequestSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]),
  adminMessage: z.string().optional(),
});

// PATCH /api/admin/quote-requests/[id]
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized - No session" },
        { status: 401 }
      );
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });

    if (user?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Not admin" },
        { status: 401 }
      );
    }

    // Await the params promise
    const { id } = await params;

    const body = await request.json();
    const validatedData = updateQuoteRequestSchema.parse(body);

    const quoteRequest = await prisma.quoteRequest.update({
      where: {
        id: parseInt(id), // Keep as parseInt since QuoteRequest still uses Int ID
      },
      data: {
        status: validatedData.status,
        adminMessage: validatedData.adminMessage,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(quoteRequest);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating quote request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/quote-requests/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });

    if (user?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Await the params promise
    const { id } = await params;

    await prisma.quoteRequest.delete({
      where: {
        id: parseInt(id), // Keep as parseInt since QuoteRequest still uses Int ID
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting quote request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}