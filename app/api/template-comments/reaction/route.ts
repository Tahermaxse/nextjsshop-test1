import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Session } from 'next-auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session & {
      user: {
        id: string;
      }
    };
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { commentId, type } = await req.json();

    if (!commentId || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user already reacted to this comment
    const existingReaction = await prisma.templateCommentReaction.findUnique({
      where: {
        userId_commentId: {
          userId: parseInt(session.user.id),
          commentId: parseInt(commentId),
        },
      },
    });

    if (existingReaction) {
      // Update existing reaction
      const reaction = await prisma.templateCommentReaction.update({
        where: {
          userId_commentId: {
            userId: parseInt(session.user.id),
            commentId: parseInt(commentId),
          },
        },
        data: { type },
        include: { user: { select: { id: true, name: true } } },
      });
      return NextResponse.json(reaction);
    } else {
      // Create new reaction
      const reaction = await prisma.templateCommentReaction.create({
        data: {
          type,
          userId: parseInt(session.user.id),
          commentId: parseInt(commentId),
        },
        include: { user: { select: { id: true, name: true } } },
      });
      return NextResponse.json(reaction);
    }
  } catch (error) {
    console.error('Error creating reaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session & {
      user: {
        id: string;
      }
    };
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { commentId } = await req.json();

    if (!commentId) {
      return NextResponse.json({ error: 'Missing commentId' }, { status: 400 });
    }

    await prisma.templateCommentReaction.delete({
      where: {
        userId_commentId: {
          userId: parseInt(session.user.id),
          commentId: parseInt(commentId),
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting reaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 