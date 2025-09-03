import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from "@/lib/rate-limit";

// Schema for updating quote request
const updateQuoteRequestSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]),
  adminMessage: z.string().optional(),
});

// ✅ GET /api/admin/quote-requests
export async function GET(req: NextRequest): Promise<NextResponse> {
  const ip = getIp(req);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return NextResponse.json(rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset));
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized - No session" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });

    if (user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized - Not admin" }, { status: 401 });
    }

    const quoteRequests = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        serviceType: true,
        otherService: true,
        budget: true,
        projectInfo: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    });

    return NextResponse.json(quoteRequests);
  } catch (error) {
    console.error("Error fetching quote requests:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
