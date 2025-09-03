// @ts-nocheck
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Session } from "next-auth";
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

// GET all reports
export async function GET(req: Request) {
  // Rate limiting
  const ip = getIp(req);
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

    // Fetch both template and component reports
    const [templateReports, componentReports] = await Promise.all([
      prisma.report.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          },
          template: {
            select: {
              name: true,
              image: true,
              author: true
            }
          }
        }
      }),
      prisma.reportComponent.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          },
          component: {
            select: {
              name: true,
              image: true,
              author: true
            }
          }
        }
      })
    ]);

    // Combine and transform the reports
    const allReports = [
      ...templateReports.map(report => ({
        ...report,
        type: 'template',
        item: report.template
      })),
      ...componentReports.map(report => ({
        ...report,
        type: 'component',
        item: report.component
      }))
    ];

    return NextResponse.json(allReports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}
