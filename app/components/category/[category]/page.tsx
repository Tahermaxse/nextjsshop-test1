import { getComponentsByCategory } from '@/lib/api';
import { viewport, generateComponentCategorySEO } from '@/config/site';
import CategoryPageClient from './CategoryPageClient';

export {viewport};

// Generate metadata for the category page
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
	const { category } = await params;
	const components = await getComponentsByCategory(category);
	return generateComponentCategorySEO(category, components || []);
}

// Generate static params for all categories
export async function generateStaticParams() {
	// Define all your categories here
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

// Server Component
export default async function CategoryPage({
	params,
}: {
	params: Promise<{ category: string }>;
}) {
	const { category } = await params;

	try {
		const components = await getComponentsByCategory(category);

		return (
			<CategoryPageClient
				initialComponents={Array.isArray(components) ? components : []}
				category={category}
			/>
		);
	} catch (error) {
		console.error('Error fetching components for category:', error);
		// Return empty components array instead of showing an error page
		return (
			<CategoryPageClient
				initialComponents={[]}
				category={category}
			/>
		);
	}
}

// ISR Configuration
export const revalidate = 3600; // Revalidate every hour
