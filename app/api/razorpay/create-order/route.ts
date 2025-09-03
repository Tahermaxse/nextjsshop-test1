import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  // Rate limiting
  const ip = getIp(req);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const { amount, currency = "USD", templateId, componentId } = await req.json();

    // Convert USD amount to requested currency
    let finalAmount = amount;
    let finalCurrency = currency;

    if (currency === "INR") {
      // Convert USD to INR (using approximate rate of 83)
      finalAmount = Math.round(amount * 83);
      finalCurrency = "INR";
    } else {
      // Keep USD as is
      finalAmount = amount;
      finalCurrency = "USD";
    }

    // Generate a shorter receipt ID (max 40 characters as required by Razorpay)
    const itemType = templateId ? 't' : 'c'; // 't' for template, 'c' for component
    const itemId = (templateId || componentId).slice(-8); // Take last 8 characters of UUID
    const timestamp = Date.now().toString().slice(-8); // Take last 8 digits of timestamp
    const receipt = `${itemType}${itemId}${timestamp}`; // Format: t12345678 + 87654321 = 16 chars

    const options = {
      amount: finalCurrency === "INR" ? finalAmount * 100 : finalAmount * 100, // Razorpay expects amount in smallest currency unit
      currency: finalCurrency,
      receipt: receipt,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      originalAmount: amount, // Keep original USD amount for reference
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Unable to create order" }, { status: 500 });
  }
}