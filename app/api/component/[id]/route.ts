// app/api/components/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    
    if (!params?.id) {
      return NextResponse.json(
        { message: 'Component ID is required' },
        { status: 400 }
      );
    }

    const id = params.id; // Use string directly since Components now uses String ID

    const components = await prisma.components.findUnique({
      where: { id },
      include: {
        features: true,
        videos: true,
        images: true,
      },
    });

    if (!components) {
      return NextResponse.json(
        { message: 'Component not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(components);
  } catch (error) {
    console.error('Error fetching components:', error);
    return NextResponse.json(
      { message: 'Failed to fetch components', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id; // Use string directly since Components now uses String ID
    
    // First, delete all related records
    await prisma.$transaction([
      // Delete component purchases
      prisma.componentPurchase.deleteMany({
        where: { componentId: id },
      }),
      // Delete component comments and their reactions
      prisma.commentReaction.deleteMany({
        where: { comment: { componentId: id } },
      }),
      prisma.commentImage.deleteMany({
        where: { comment: { componentId: id } },
      }),
      prisma.comment.deleteMany({
        where: { componentId: id },
      }),
      // Delete component reports
      prisma.reportComponent.deleteMany({
        where: { componentId: id },
      }),
      // Delete orders
      prisma.order.deleteMany({
        where: { componentId: id },
      }),
      // Delete features
      prisma.feature.deleteMany({
        where: { componentId: id },
      }),
      // Delete videos
      prisma.video.deleteMany({
        where: { componentId: id },
      }),
      // Delete images
      prisma.image.deleteMany({
        where: { componentId: id },
      }),
      // Finally delete the component
      prisma.components.delete({
        where: { id },
      }),
    ]);
    
    return NextResponse.json({ message: 'Component deleted successfully' });
  } catch (error) {
    console.error('Error deleting components:', error);
    return NextResponse.json(
      { message: 'Failed to delete components', error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id; // Use string directly since Components now uses String ID
    const body = await request.json();
    
    const { features, videos,images, ...componentsData } = body;
    
    // Use a more robust transaction approach
    const updatedComponent = await prisma.$transaction(async (tx) => {
      // Update the main component
      await tx.components.update({
        where: { id },
        data: {
          ...componentsData,
          updatedAt: new Date(),
        },
      });
      
      // Handle features
      if (features) {
        await tx.feature.deleteMany({
          where: { componentId: id },
        });
        
        if (features.length > 0) {
          await tx.feature.createMany({
            data: features.map((feature: any) => ({
              ...feature,
              componentId: id,
            })),
          });
        }
      }
      
      // Handle videos
      if (videos) {
        await tx.video.deleteMany({
          where: { componentId: id },
        });
        
        if (videos.length > 0) {
          await tx.video.createMany({
            data: videos.map((video: any) => ({
              ...video,
              componentId: id,
            })),
          });
        }
      }

      // Handle images
      if (images) {
        await tx.image.deleteMany({
          where: { componentId: id },
        });
        
        if (images.length > 0) {
          await tx.image.createMany({
            data: images.map((image: any) => ({
              ...image,
              componentId: id,
            })),
          });
        }
      }
      
      // Return the updated component with relations
      return await tx.components.findUnique({
        where: { id },
        include: {
          features: true,
          videos: true,
          images: true,
        },
      });
    }, {
      timeout: 15000, // Increase timeout to 15 seconds
      maxWait: 15000, // Maximum time to wait for a transaction
      isolationLevel: 'ReadCommitted', // Use a more permissive isolation level
    });
    
    return NextResponse.json({ 
      message: 'Component updated successfully', 
      components: updatedComponent 
    });
  } catch (error) {
    console.error('Error updating components:', error);
    return NextResponse.json(
      { message: 'Failed to update components', error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}