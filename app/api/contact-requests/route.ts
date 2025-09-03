import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

const contactRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  serviceType: z.enum(["web", "desktop", "mobile", "other"], {
    required_error: "Please select a service type",
  }),
  otherService: z.string().optional(),
  budget: z.enum(["under-5k", "5k-10k", "10k-25k", "25k-50k", "50k-plus"], {
    required_error: "Please select a budget range",
  }),
  projectInfo: z.string().min(10, "Project information must be at least 10 characters"),
})

export async function POST(req: Request) {
  // Rate limiting
  const ip = getIp(req);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }

  try {
    const body = await req.json()
    const validatedData = contactRequestSchema.parse(body)

    // Get session to check if user is logged in (optional)
    const session = await getServerSession(authOptions)

    // Create contact request - userId is optional for non-authenticated users
    const contactRequest = await prisma.quoteRequest.create({
      data: {
        ...validatedData,
        status: "pending",
        source: "contact_form", // You might need to add this field to your schema
        user: session?.user
          ? { connect: { id: Number.parseInt(session.user.id) } }
          : undefined,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Contact request submitted successfully!",
      id: contactRequest.id,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            message: "Validation failed",
            details: error.errors,
          },
        },
        { status: 400 },
      )
    }
    console.error("Error creating contact request:", error)
    return NextResponse.json(
      {
        error: { message: "Internal Server Error" },
      },
      { status: 500 },
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin to view all contact requests
    const user = await prisma.user.findUnique({
      where: { id: Number.parseInt(session.user.id) },
      select: { role: true },
    })

    let whereClause = {}

    if (user?.role === "ADMIN") {
      // Admin can see all contact requests
      whereClause = {
        OR: [
          { source: "contact_form" },
          { userId: null }, // Legacy contact requests without source field
        ],
      }
    } else {
      // Regular users can only see their own contact requests
      whereClause = {
        userId: Number.parseInt(session.user.id),
        OR: [{ source: "contact_form" }, { userId: null }],
      }
    }

    const contactRequests = await prisma.quoteRequest.findMany({
      where: whereClause,
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
        source: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(contactRequests)
  } catch (error) {
    console.error("Error fetching contact requests:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: Number.parseInt(session.user.id) },
      select: { role: true },
    })

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const contactRequest = await prisma.quoteRequest.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: "Contact request status updated successfully",
      data: contactRequest,
    })
  } catch (error) {
    console.error("Error updating contact request:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
