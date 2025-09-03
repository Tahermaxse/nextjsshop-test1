import React from 'react';
import { generateTemplatesSEO, generateSingleTemplateSEO } from '@/config/site';
import { getTemplateByName, getTemplates } from '@/lib/api';
import TemplatePageClient from './TemplatePageClient';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient, Template } from '@prisma/client';

const prisma = new PrismaClient();

// Generate Static Params with fallback
export async function generateStaticParams() {
	try {
		// During build time, return empty array
		if (process.env.NODE_ENV === 'production' && process.env.IS_BUILD) {
			return [];
		}

		const templates = await getTemplates();
		return templates.map((template: { name: string }) => ({
			name: template.name,
		}));
	} catch (error) {
		console.error('Error generating static params:', error);
		return [];
	}
}

interface TemplatePageProps {
	params: Promise<{ name: string }>;
}

// Helper function to handle API failures with retry logic
async function fetchTemplateWithRetry(name: string, retries = 3): Promise<any> {
	for (let i = 0; i < retries; i++) {
		try {
			const template = await getTemplateByName(name);
			return template;
		} catch (error) {
			if (i === retries - 1) throw error;
			// Wait before retrying (exponential backoff)
			await new Promise((resolve) =>
				setTimeout(resolve, Math.pow(2, i) * 1000)
			);
		}
	}
}

async function checkUserPurchase(
	userId: number,
	templateId: string
): Promise<boolean> {
	try {
		const purchase = await prisma.templatePurchase.findUnique({
			where: {
				userId_templateId: {
					userId,
					templateId,
				},
			},
		});
		return !!purchase;
	} catch (error) {
		console.error('Error checking template purchase:', error);
		return false;
	}
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const template = await getTemplateByName(name);
  if (!template) return {};
  return generateSingleTemplateSEO(template);
}

export default async function TemplatePage({ params }: TemplatePageProps) {
	const { name } = await params;
	const session = await getServerSession(authOptions);

	if (!name) {
		notFound();
	}

	try {
		const template = await fetchTemplateWithRetry(name);

		if (!template) {
			notFound();
		}

		// Check if the user has purchased this template
		const hasPurchased = session?.user?.id
			? await checkUserPurchase(parseInt(session.user.id), template.id)
			: false;

		return (
			<TemplatePageClient
				template={template}
				hasPurchased={hasPurchased}
			/>
		);
	} catch (error) {
		console.error('Error fetching template:', error);
		notFound();
	} finally {
		await prisma.$disconnect();
	}
}

// Change to ISR (Incremental Static Regeneration) with fallback
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour
