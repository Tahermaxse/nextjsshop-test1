import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import crypto from "crypto";
import { strictRatelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  // Stricter rate limiting
  const ip = getIp(req);
  const rate = await safeRateLimit(strictRatelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const body = await req.json();

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, componentId, userId, amount, currency = "USD" } = body;

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment details" }, { status: 400 });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Razorpay secret key not found" }, { status: 500 });
    }

    // Convert data types
    const parsedUserId = parseInt(userId);
    // componentId is now a string, no need to parse
    const parsedComponentId = componentId;
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedUserId) || !parsedComponentId || isNaN(parsedAmount)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // ✅ Ensure user exists
    const userExists = await prisma.user.findUnique({
      where: { id: parsedUserId },
    });

    if (!userExists) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // ✅ Ensure component exists
    const componentExists = await prisma.components.findUnique({
      where: { id: parsedComponentId },
    });

    if (!componentExists) {
      return NextResponse.json({ error: "Component does not exist" }, { status: 400 });
    }

    // Check if purchase already exists
    const existingPurchase = await prisma.componentPurchase.findFirst({
      where: {
        userId: parsedUserId,
        componentId: parsedComponentId,
      },
    });

    if (existingPurchase) {
      return NextResponse.json({ success: true, message: "Payment already recorded" });
    }

    // Verify Razorpay Signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 400 });
    }

    // ✅ Use a transaction to store payment securely
    const purchase = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      return await tx.componentPurchase.create({
        data: {
          userId: parsedUserId,
          componentId: parsedComponentId,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          amount: parsedAmount,
          currency: currency,
          status: "PAID",
        },
      });
    }, {
      timeout: 10000, // 10 seconds timeout
      maxWait: 10000, // Maximum time to wait for a transaction
    });

    return NextResponse.json({ success: true, message: "Payment verified and saved" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}