// @ts-nocheck
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import type { Session } from "next-auth";
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  // Rate limiting
  const ip = getIp(request);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const session = await getServerSession(authOptions) as Session | null;
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized - No session" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized - Not admin" }, { status: 401 });
    }

    const { status, adminMessage, type } = await request.json();
    const params = await context.params;
    const reportId = parseInt(params.id); // Keep as parseInt since Report still uses Int ID

    if (isNaN(reportId)) {
      return NextResponse.json({ error: "Invalid report ID" }, { status: 400 });
    }

    if (!type || !['template', 'component'].includes(type)) {
      return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
    }

    let report;
    let userId;

    if (type === 'template') {
      // Handle template report
      report = await prisma.report.update({
        where: { id: reportId },
        data: {
          status,
          adminMessage,
        },
      });
      userId = report.userId;
    } else {
      // Handle component report
      report = await prisma.reportComponent.update({
        where: { id: reportId },
        data: {
          status,
        },
      });
      userId = report.userId;
    }

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Create a notification for the user
    await prisma.notification.create({
      data: {
        userId,
        title: `Report ${status}`,
        message: `Your report has been ${status}. ${adminMessage || ''}`,
        type: "report_update",
      },
    });

    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error("Error updating report:", error);
    
    // Check if it's a Prisma error
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string; meta?: { target?: string[] } };
      if (prismaError.code === 'P2025') {
        return NextResponse.json(
          { error: "Report not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}

// DELETE a report
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  // Rate limiting
  const ip = getIp(request);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const session = await getServerSession(authOptions) as Session | null;
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized - No session" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized - Not admin" }, { status: 401 });
    }

    const params = await context.params;
    const reportId = parseInt(params.id); // Keep as parseInt since Report still uses Int ID
    const { type } = await request.json();

    if (isNaN(reportId)) {
      return NextResponse.json({ error: "Invalid report ID" }, { status: 400 });
    }

    if (!type || !['template', 'component'].includes(type)) {
      return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
    }

    let report;
    let userId;

    if (type === 'template') {
      // Handle template report
      report = await prisma.report.findUnique({
        where: { id: reportId },
      });
      if (report) {
        userId = report.userId;
        await prisma.report.delete({
          where: { id: reportId },
        });
      }
    } else {
      // Handle component report
      report = await prisma.reportComponent.findUnique({
        where: { id: reportId },
      });
      if (report) {
        userId = report.userId;
        await prisma.reportComponent.delete({
          where: { id: reportId },
        });
      }
    }

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Remove notification creation for deleted reports
    return NextResponse.json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    
    // Check if it's a Prisma error
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string; meta?: { target?: string[] } };
      if (prismaError.code === 'P2025') {
        return NextResponse.json(
          { error: "Report not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to delete report" },
      { status: 500 }
    );
  }
}
