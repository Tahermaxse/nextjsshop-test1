import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getIp(request);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { purchaseId, type } = body;

    if (!purchaseId || !type) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const userId = parseInt(session.user.id);
    // Fetch purchase details based on type
    let purchase;
    if (type === "template") {
      purchase = await prisma.templatePurchase.findFirst({
        where: { 
          id: parseInt(purchaseId), // Keep as parseInt since TemplatePurchase still uses Int ID
          userId: userId 
        },
        include: {
          template: true,
          user: true,
        },
      });
    } else {
      purchase = await prisma.componentPurchase.findFirst({
        where: { 
          id: parseInt(purchaseId), // Keep as parseInt since ComponentPurchase still uses Int ID
          userId: userId 
        },
        include: {
          component: true,
          user: true,
        },
      });
    }

    if (!purchase) {
      return NextResponse.json(
        { error: "Purchase not found" },
        { status: 404 }
      );
    }

    const today = new Date();
    // Generate invoice data
    const invoiceData = {
      invoiceNumber: `INV-${purchaseId}${Math.floor(1000 + Math.random() * 9000)}-${type.toUpperCase()}`,
      invoiceDate:  format(today, "MMM dd, yyyy"),
      paymentDate: format(new Date(purchase.purchaseDate), "MMM dd, yyyy"),
      paymentMethod: "Razorpay",
      paymentId: purchase.razorpayPaymentId,
      orderId: purchase.razorpayOrderId,
      amount: purchase.amount,
      // Fix: Use the correct field name from database
      currency: (purchase as any).curreny || "USD", // Changed from 'currency' to 'curreny'
      status: purchase.status,
      item: type === "template"
        ? (purchase as { template: any }).template
        : (purchase as { component: any }).component,
      customer: {
        name: purchase.user.name,
        email: purchase.user.email,
      },
      seller: {
        name: "Nextjsshop",
        email: "support@nextjsshop.com",
        address: "123 Business Street, City, Country",
        taxId: "GST123456789",
      },
    };

    return NextResponse.json(invoiceData);
  } catch (error) {
    console.error("Error generating invoice:", error);
    return NextResponse.json(
      { error: "Failed to generate invoice" },
      { status: 500 }
    );
  }
}