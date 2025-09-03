import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { z } from 'zod';

// Define the Zod schema for validation
const FeatureSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
});

const VideoSchema = z.object({
  src: z.string().url('Must be a valid URL'),
  alt: z.string().min(1, 'Alt text is required'),
});

const ImageSchema = z.object({
  src: z.string().url('Must be a valid URL'),
  alt: z.string().min(1, 'Alt text is required'),
});

const TemplateSchema = z.object({
  urlname: z.string().min(1, 'URL name is required'),
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  author: z.string().min(1, 'Author is required'),
  authorUrl: z.string().url('Author URL must be a valid URL'),
  image: z.string().url('Image must be a valid URL'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  views: z.number().int().min(0, 'Views must be a non-negative integer'),
  pages: z.number().int().min(1, 'Must have at least one page'),
  categories: z.array(z.string().min(1)).min(1, 'At least one category is required'),
  pagesList: z.array(z.string().min(1)).min(1, 'At least one page is required'),
  preview: z.string().url('Preview URL must be a valid URL'),
  zip: z.string().url('Zip URL must be a valid URL'),
  paragraph1: z.string().min(10, 'Paragraph 1 must be at least 10 characters'),
  paragraph2: z.string().min(10, 'Paragraph 2 must be at least 10 characters'),
  features: z.array(FeatureSchema).min(1, 'At least one feature is required'),
  videos: z.array(VideoSchema).optional().default([]),
  images: z.array(ImageSchema).min(1, 'At least one image is required'),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validate the request body
    const validationResult = TemplateSchema.safeParse(data);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          message: 'Validation error', 
          errors: validationResult.error.errors 
        }, 
        { status: 400 }
      );
    }
    
    const {
      urlname,
      name,
      price,
      author,
      authorUrl,
      image,
      description,
      views,
      pages,
      categories,
      pagesList,
      preview,
      zip,
      paragraph1,
      paragraph2,
      features,
      videos,
      images,
    } = validationResult.data;
    
    // Create the template with related data
    const component = await prisma.components.create({
      data: {
        urlname,
        name,
        price,
        author,
        authorUrl,
        image,
        description,
        updatedAt: new Date(),
        views,
        pages,
        categories,
        pagesList,
        preview,
        zip,
        paragraph1,
        paragraph2,
        features: {
          create: features,
        },
        videos: {
          create: videos,
        },
        images: {
          create: images,
        },
      },
      include: {
        features: true,
        videos: true,
        images: true,
      },
    });
    
    return NextResponse.json({ message: 'Component added successfully', component }, { status: 201 });
  } catch (error) {
    console.error('Error adding component:', error);
    return NextResponse.json({ message: 'Failed to add component', error }, { status: 500 });
  }
}