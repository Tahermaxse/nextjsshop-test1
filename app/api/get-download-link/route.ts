import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
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
        const { templateId, templateName, componentId, componentName } = await req.json();

        if (!templateId && !componentId) {
            return NextResponse.json({ error: "Either templateId or componentId is required" }, { status: 400 });
        }

        let zipLink: string | null = null;

        // ✅ Fetch template if `templateId` is provided
        if (templateId) {
            const template = await prisma.template.findUnique({
                where: { id: templateId, name: templateName }, // templateId is now a string
                select: { zip: true },
            });

            if (template?.zip) {
                zipLink = template.zip;
            }
        }

        // ✅ Fetch component if `componentId` is provided
        if (componentId) {
            const component = await prisma.components.findUnique({
                where: { id: componentId, name: componentName }, // componentId is now a string
                select: { zip: true },
            });

            if (component?.zip) {
                zipLink = component.zip;
            }
        }

        // ✅ If no valid `zip` link is found, return an error
        if (!zipLink) {
            return NextResponse.json({ error: "Download link not found" }, { status: 404 });
        }

        // ✅ Extract Google Drive File ID
        const match = zipLink.match(/[-\w]{25,}/);
        if (!match) {
            return NextResponse.json({ error: "Invalid Google Drive link" }, { status: 400 });
        }

        const fileId = match[0];
        const directDownloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;

        return NextResponse.json({ downloadLink: directDownloadLink });
    } catch (error: any) {
        console.error("Error fetching download link:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}