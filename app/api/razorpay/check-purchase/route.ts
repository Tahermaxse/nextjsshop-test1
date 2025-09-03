import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    // Rate limiting
    const ip = getIp(req);
    const rate = await safeRateLimit(ratelimit, ip);
    if (!rate.success) {
      return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
    }
    try {
        // Get session from the server
        const session = await getServerSession(authOptions);

        // Check if user is authenticated
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get data from request body instead of URL parameters
        const data = await req.json();
        const { componentId, templateId } = data;

        // Use the userId from the session, not from the request parameters
        const userId = session.user.id;

        if (!userId) {
            return NextResponse.json({ error: "Missing user information" }, { status: 400 });
        }

        if (!templateId && !componentId) {
            return NextResponse.json({ error: "Missing templateId or componentId parameter" }, { status: 400 });
        }

        const parsedUserId = parseInt(userId.toString());
        // templateId and componentId are now strings, no need to parse
        const parsedTemplateId = templateId || null;
        const parsedComponentId = componentId || null;

        if (isNaN(parsedUserId)) {
            return NextResponse.json({ error: "Invalid userId format" }, { status: 400 });
        }

        // Check for existing purchase (either template or component)
        const templatePurchase = parsedTemplateId
            ? await prisma.templatePurchase.findFirst({
                where: { userId: parsedUserId, templateId: parsedTemplateId, status: "PAID" },
            })
            : null;

        const componentPurchase = parsedComponentId
            ? await prisma.componentPurchase.findFirst({
                where: { userId: parsedUserId, componentId: parsedComponentId, status: "PAID" },
            })
            : null;

        return NextResponse.json({ purchased: !!(templatePurchase || componentPurchase) });
    } catch (error: any) {
        console.error("Error checking purchase:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}

// Also allow OPTIONS method for CORS preflight requests
export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}