import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Session } from 'next-auth';
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    // Apply rate limiting
    const ip = getIp(req);
    const { success, limit: rateLimit, remaining, reset } = await safeRateLimit(ratelimit, ip);
    
    if (!success) {
      return rateLimitResponse(ip, rateLimit, remaining, reset);
    }

    const session = await getServerSession(authOptions) as Session & {
      user: {
        id: string;
        role: string;
      }
    };
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is allowed to comment
    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
      select: { canComment: true }
    });

    if (!user?.canComment) {
      return NextResponse.json({ error: 'You have been blocked from commenting' }, { status: 403 });
    }

    const { templateId, content, parentId } = await req.json();

    if (!templateId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const comment = await prisma.templateComment.create({
      data: {
        content,
        templateId: templateId, // templateId is now a string, no need to parse
        userId: parseInt(session.user.id),
        parentId: parentId ? parseInt(parentId) : null,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error creating template comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Apply rate limiting
    const ip = getIp(req);
    const { success, limit: rateLimit, remaining, reset } = await safeRateLimit(ratelimit, ip);
    
    if (!success) {
      return rateLimitResponse(ip, rateLimit, remaining, reset);
    }

    const { searchParams } = new URL(req.url);
    const templateId = searchParams.get('templateId');
    const limit = parseInt(searchParams.get('limit') || '4');
    const cursor = searchParams.get('cursor'); // comment id to start after

    if (!templateId) {
      return NextResponse.json({ error: 'Template ID is required' }, { status: 400 });
    }

    // Fetch all comments for the template (for nesting)
    const allComments = await prisma.templateComment.findMany({
      where: { templateId: templateId }, // templateId is now a string, no need to parse
      include: {
        user: { select: { id: true, name: true, image: true, role: true } },
        reactions: { include: { user: { select: { id: true, name: true } } } },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Fetch paginated top-level comments
    const topLevelWhere = {
      templateId: templateId, // templateId is now a string, no need to parse
      parentId: { equals: null },
    };
    const topLevelComments = await prisma.templateComment.findMany({
      where: topLevelWhere,
      orderBy: { createdAt: 'desc' },
      take: limit + 1,
      ...(cursor ? { skip: 1, cursor: { id: parseInt(cursor) } } : {}),
      include: {
        user: { select: { id: true, name: true, image: true, role: true } },
        reactions: { include: { user: { select: { id: true, name: true } } } },
      },
    });

    let hasMore = false;
    let paginatedTopLevel = topLevelComments;
    if (topLevelComments.length > limit) {
      hasMore = true;
      paginatedTopLevel = topLevelComments.slice(0, limit);
    }

    return NextResponse.json({
      allComments,
      topLevel: paginatedTopLevel,
      hasMore,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session & {
      user: {
        id: string;
        role: string;
      }
    };
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { commentId } = await req.json();
    if (!commentId) {
      return NextResponse.json({ error: 'Missing commentId' }, { status: 400 });
    }
    // Fetch comment and user
    const comment = await prisma.templateComment.findUnique({
      where: { id: parseInt(commentId) },
      include: { user: true },
    });
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }
    // Check if user is author or admin
    if (
      parseInt(session.user.id) !== comment.userId &&
      session.user.role !== 'admin'
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    // First delete all reactions associated with the comment
    await prisma.templateCommentReaction.deleteMany({
      where: { commentId: parseInt(commentId) }
    });
    // Then delete the comment
    await prisma.templateComment.delete({ where: { id: parseInt(commentId) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
} 