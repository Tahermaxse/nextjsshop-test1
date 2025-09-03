import React from 'react';
import { generateComponentsSEO, generateSingleComponentSEO } from '@/config/site';
import { getComponentByName, getComponents } from '@/lib/api';
import ComponentPageClient from './ComponentPageClient';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate Static Params with fallback
export async function generateStaticParams() {
	try {
		const Components = await getComponents();
		return Components.map((Component: { name: string }) => ({
			name: Component.name,
		}));
	} catch (error) {
		console.error('Error generating static params:', error);
		// Return empty array to allow fallback behavior
		return [];
	}
}

interface ComponentPageProps {
	params: Promise<{ name: string }>;
}

// Helper function to handle API failures with retry logic
async function fetchComponentWithRetry(
	name: string,
	retries = 3
): Promise<any> {
	for (let i = 0; i < retries; i++) {
		try {
			const component = await getComponentByName(name);
			return component;
		} catch (error) {
			if (i === retries - 1) throw error;
			// Wait before retrying (exponential backoff)
			await new Promise((resolve) =>
				setTimeout(resolve, Math.pow(2, i) * 1000)
			);
		}
	}
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }>  }) {
  const { name } = await params;
  const component = await getComponentByName(name);
  if (!component) return {};
  return generateSingleComponentSEO(component);
}

export default async function ComponentPage({ params }: ComponentPageProps) {
	const { name } = await params;

	if (!name) {
		notFound();
	}

	try {
		const Component = await fetchComponentWithRetry(name);

		if (!Component) {
			notFound();
		}

		return <ComponentPageClient component={Component} />;
	} catch (error) {
		console.error('Error fetching Component:', error);
		notFound();
	}
}

// Change to ISR (Incremental Static Regeneration) with fallback
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour
