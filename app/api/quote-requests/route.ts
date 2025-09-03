import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

const quoteRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  serviceType: z.string().min(1, "Service type is required"),
  otherService: z.string().optional(),
  budget: z.enum(['under-5k', '5k-10k', '10k-25k', '25k-50k', '50k-plus'], {
    required_error: "Please select a budget range",
  }),
  projectInfo: z.string().min(1, "Project information is required"),
});

export async function POST(req: Request) {
  // Rate limiting
  const ip = getIp(req);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = quoteRequestSchema.parse(body);

    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        ...validatedData,
        userId: parseInt(session.user.id), // Convert string to number
        status: "pending",
      },
    });

    return NextResponse.json(quoteRequest);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error creating quote request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  // Rate limiting
  const ip = getIp(req);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const quoteRequests = await prisma.quoteRequest.findMany({
      where: {
        userId: parseInt(session.user.id), // Convert string to number
      },
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(quoteRequests);
  } catch (error) {
    console.error("Error fetching quote requests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  // Rate limiting
  const ip = getIp(req);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) }, // Convert string to number
      select: { role: true },
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const quoteRequest = await prisma.quoteRequest.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(quoteRequest);
  } catch (error) {
    console.error("Error updating quote request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}