import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { z } from 'zod';
import { ratelimit, getIp, rateLimitResponse, safeRateLimit } from '@/lib/rate-limit';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define validation schema
const profileUpdateSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Name can only contain letters, numbers, spaces, hyphens and underscores")
    .optional(),
  image: z.any().optional(),
}).refine(
  (data) => {
    // If image is provided, validate it
    if (data.image instanceof File) {
      return (
        data.image.size <= 5 * 1024 * 1024 &&
        ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(data.image.type)
      );
    }
    return true;
  },
  {
    message: "Image must be less than 5MB and in .jpg, .png, .gif or .webp format",
    path: ["image"],
  }
);

export async function PUT(req: Request) {
  // Rate limiting
  const ip = getIp(req);
  const rate = await safeRateLimit(ratelimit, ip);
  if (!rate.success) {
    return rateLimitResponse(ip, rate.limit, rate.remaining, rate.reset);
  }
  try {
    const session = await getServerSession(authOptions);
    console.log('Session data:', session); // Debug log

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const image = formData.get('image') as File;
    const removeImage = formData.get('removeImage');

    const userId = parseInt(session.user.id);
    console.log('Attempting to find user with ID:', userId); // Debug log

    // Handle remove image request
    if (removeImage === "true") {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          image: "", // or "/default-avatar.png"
        },
      });
      return NextResponse.json({
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          image: updatedUser.image,
          email: updatedUser.email,
        },
      });
    }

    // Validate the input (only if not removing image)
    try {
      await profileUpdateSchema.parseAsync({ name, image });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ 
          error: 'Validation failed', 
          details: error.errors 
        }, { status: 400 });
      }
      throw error;
    }

    let imageUrl = session.user.image;

    // If there's a new image, upload it to Cloudinary
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Convert buffer to base64
      const base64Image = buffer.toString('base64');
      const dataURI = `data:${image.type};base64,${base64Image}`;

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(dataURI, {
          folder: 'profile_pictures',
          resource_type: 'auto',
        }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
      });

      imageUrl = (result as any).secure_url;
    }

    // First check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    console.log('Existing user:', existingUser); // Debug log

    if (!existingUser) {
      return NextResponse.json({ 
        error: 'User not found',
        details: {
          requestedId: userId,
          sessionId: session.user.id
        }
      }, { status: 404 });
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || undefined,
        image: imageUrl,
      },
    });

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        image: updatedUser.image,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error },
      { status: 500 }
    );
  }
} 