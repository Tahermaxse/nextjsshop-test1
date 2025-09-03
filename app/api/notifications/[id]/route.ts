import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    // Check if this is a quote notification
    if (id.startsWith('quote-')) {
      const quoteId = parseInt(id.replace('quote-', ''));
      
      if (isNaN(quoteId)) {
        return NextResponse.json(
          { error: "Invalid quote notification ID" },
          { status: 400 }
        );
      }

      // For quote notifications, we'll clear the admin message instead of deleting
      const updatedQuote = await prisma.quoteRequest.updateMany({
        where: {
          id: quoteId,
          userId: parseInt(session.user.id),
        },
        data: {
          adminMessage: null,
        },
      });

      if (updatedQuote.count === 0) {
        return NextResponse.json(
          { error: "Quote notification not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true });
    }

    // Handle regular notification deletion
    const notificationId = parseInt(id);
    
    if (isNaN(notificationId)) {
      return NextResponse.json(
        { error: "Invalid notification ID" },
        { status: 400 }
      );
    }

    // Delete the notification and ensure it belongs to the user
    const deletedNotification = await prisma.notification.deleteMany({
      where: {
        id: notificationId,
        userId: parseInt(session.user.id),
      },
    });

    if (deletedNotification.count === 0) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json(
      { error: "Failed to delete notification" },
      { status: 500 }
    );
  }
} 