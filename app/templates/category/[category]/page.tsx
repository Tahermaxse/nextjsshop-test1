import { getTemplatesByCategory } from '@/lib/api';
import CategoryPageClient from './CategoryPageClient';
import { notFound } from 'next/navigation';
import { generateCategoryTemplatesSEO,viewport } from '@/config/site';

// Enable ISR with a revalidation period of 60 seconds
export const revalidate = 3600;

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = [
    'landing-page',
    'portfolio',
    'ecommerce',
    'blog',
    'business',
    'saas',
    'agency',
    'personal',
    'education',
    'healthcare',
    'restaurant',
    'travel',
    'real-estate',
    'fitness',
    'music',
    'photography',
    'art',
    'fashion',
    'technology',
    'finance',
  ];

  return categories.map((category) => ({
    category,
  }));
}

// Use Next.js PageProps with explicit params type
interface CategoryPageProps {
  params: Promise<{ category: string }>; // params is a Promise in Next.js 15
}

export {viewport};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const templates = await getTemplatesByCategory(category);
  return generateCategoryTemplatesSEO(category, templates || []);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await the params to get the category
  const { category } = await params;
  
  try {
    // Fetch templates for this category on the server
    const templates = await getTemplatesByCategory(category);
    
    // Render the client component with initial templates
    return <CategoryPageClient initialTemplates={templates || []} category={category} />;
  } catch (error) {
    console.error('Error fetching templates for category:', error);
    // Render with empty templates instead of 404
    return <CategoryPageClient initialTemplates={[]} category={category} />;
  }
}