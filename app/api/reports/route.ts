import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  // Rate limiting
  const ip = getIp(req);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }

  try {
    const data = await req.formData();
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const reason = data.get("reason") as string;
    const details = data.get("details") as string;
    const templateId = data.get("templateId") as string; // templateId is now a string
    const userId = Number(data.get("userId"));
    const file = data.get("image") as File | null;

    if (!name || !email || !reason || !details || !templateId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user is blocked from reporting
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { canReport: true }
    });

    if (!user || user.canReport === false) {
      return NextResponse.json(
        { error: "You are not allowed to submit reports" },
        { status: 403 }
      );
    }

    let imageUrl = null;

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const mimeType = file.type;
      const dataUri = `data:${mimeType};base64,${base64}`;

      const uploadResult = await cloudinary.uploader.upload(dataUri, { folder: "reports" });
      imageUrl = uploadResult.secure_url; // Save this URL
    }

    // Save report with image URL
    const report = await prisma.report.create({
      data: {
        name,
        email,
        reason,
        details,
        templateId, // templateId is now a string, no need to parse
        userId,
        imageUrl: data.get("imageUrl") as string | null,
      },
    });

    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error("Error submitting report:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
