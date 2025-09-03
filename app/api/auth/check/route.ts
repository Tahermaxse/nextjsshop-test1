import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/auth";
import { ratelimit, getIp, rateLimitResponse } from "@/lib/rate-limit";

export async function GET(request: Request) {
  try {
    // Apply rate limiting
    const ip = getIp(request);
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);
    
    if (!success) {
      return rateLimitResponse(ip, limit, remaining, reset);
    }

    const session = await getServerSession(authOptions);
    return NextResponse.json({
      authenticated: !!session,
      user: session?.user,
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: "Failed to check authentication" },
      { status: 500 }
    );
  }
}
