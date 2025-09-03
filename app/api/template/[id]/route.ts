// app/api/template/[id]/route.ts
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
        { message: 'Template ID is required' },
        { status: 400 }
      );
    }

    const id = params.id; // Use string directly since Template now uses String ID

    const template = await prisma.template.findUnique({
      where: { id },
      include: {
        features: true,
        images: true,
      },
    });

    if (!template) {
      return NextResponse.json(
        { message: 'Template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json(
      { message: 'Failed to fetch template', error: error instanceof Error ? error.message : 'Unknown error' },
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
    const id = params.id; // Use string directly since Template now uses String ID
    
    // First, delete all related records
    await prisma.$transaction([
      // Delete template purchases
      prisma.templatePurchase.deleteMany({
        where: { templateId: id },
      }),
      // Delete template comments and their reactions
      prisma.templateCommentReaction.deleteMany({
        where: { comment: { templateId: id } },
      }),
      prisma.templateComment.deleteMany({
        where: { templateId: id },
      }),
      // Delete reports
      prisma.report.deleteMany({
        where: { templateId: id },
      }),
      // Delete orders
      prisma.order.deleteMany({
        where: { templateId: id },
      }),
      // Delete features
      prisma.feature.deleteMany({
        where: { templateId: id },
      }),
      // Delete images
      prisma.image.deleteMany({
        where: { templateId: id },
      }),
      // Finally delete the template
      prisma.template.delete({
        where: { id },
      }),
    ]);
    
    return NextResponse.json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json(
      { message: 'Failed to delete template', error: error instanceof Error ? error.message : 'Unknown error' }, 
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
    const id = params.id; // Use string directly since Template now uses String ID
    const body = await request.json();
    
    const { features, images, ...templateData } = body;
    
    // Use a more robust transaction approach
    const updatedTemplate = await prisma.$transaction(async (tx) => {
      // Update the main template
      await tx.template.update({
        where: { id },
        data: {
          ...templateData,
          updatedAt: new Date(),
        },
      });
      
      // Handle features
      if (features) {
        await tx.feature.deleteMany({
          where: { templateId: id },
        });
        
        if (features.length > 0) {
          await tx.feature.createMany({
            data: features.map((feature: any) => ({
              ...feature,
              templateId: id,
            })),
          });
        }
      }
      
      // Handle images
      if (images) {
        await tx.image.deleteMany({
          where: { templateId: id },
        });
        
        if (images.length > 0) {
          await tx.image.createMany({
            data: images.map((image: any) => ({
              ...image,
              templateId: id,
            })),
          });
        }
      }
      
      // Return the updated template with relations
      return await tx.template.findUnique({
        where: { id },
        include: {
          features: true,
          images: true,
        },
      });
    }, {
      timeout: 15000, // Increase timeout to 15 seconds
      maxWait: 15000, // Maximum time to wait for a transaction
      isolationLevel: 'ReadCommitted', // Use a more permissive isolation level
    });
    
    return NextResponse.json({ 
      message: 'Template updated successfully', 
      template: updatedTemplate 
    });
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json(
      { message: 'Failed to update template', error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}