'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Template, Components } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { TemplateGrid } from '@/app/templates/components/TemplateGrid';
import { ComponentsGrid } from '@/app/components/components/ComponentsGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import toast from 'react-hot-toast';
import { TemplateGridWithInvoice } from '@/app/templates/components/TemplateGridWithInvoice';
import { ComponentsGridWithInvoice } from '@/app/components/components/ComponentsGridWithInvoice';
import { EmptyPurchases } from "@/components/Svgs";
import { EULAModal } from "@/components/EULA/EULAModal";

// Number of items to load initially and per "Load More" click
const ITEMS_PER_PAGE = 4;

export default function PurchasesPage() {
	const [templates, setTemplates] = useState<Template[]>([]);
	const [components, setComponents] = useState<Components[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [activeTab, setActiveTab] = useState('templates');
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Memoize the fetch function to prevent unnecessary re-renders
	const fetchPurchases = useCallback(
		async (pageNum: number, isInitialLoad: boolean = false) => {
			try {
				if (isInitialLoad) {
					setLoading(true);
					setError(null);
				} else {
					setLoadingMore(true);
				}

				// Use POST request instead of GET for better security
				const response = await fetch('/api/users/purchases', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						page: pageNum,
						limit: ITEMS_PER_PAGE,
					}),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				if (isInitialLoad) {
					setTemplates(data.templates || []);
					setComponents(data.components || []);
				} else {
					if (activeTab === 'templates') {
						setTemplates((prev) => [...prev, ...(data.templates || [])]);
					} else {
						setComponents((prev) => [...prev, ...(data.components || [])]);
					}
				}

				setHasMore(data.hasMore || false);
				setPage(pageNum);
			} catch (error) {
				console.error('Error fetching purchases:', error);
				setError('Failed to load purchases. Please try again later.');
				toast.error('Error fetching purchases');
			} finally {
				if (isInitialLoad) {
					setLoading(false);
				} else {
					setLoadingMore(false);
				}
			}
		},
		[activeTab]
	);

	// Initial data fetch
	useEffect(() => {
		let isMounted = true;

		const loadInitialData = async () => {
			if (isMounted) {
				await fetchPurchases(1, true);
			}
		};

		loadInitialData();

		return () => {
			isMounted = false;
		};
	}, [fetchPurchases]);

	// Handle tab change
	const handleTabChange = useCallback((value: string) => {
		setActiveTab(value);
		setPage(1); // Reset page when switching tabs
	}, []);

	// Handle load more
	const handleLoadMore = useCallback(async () => {
		if (loadingMore) return;
		await fetchPurchases(page + 1);
	}, [fetchPurchases, loadingMore, page]);

	// Skeleton loader component matching ComponentsGrid style
	const SkeletonLoader = () => (
		<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{[1, 2, 3, 4].map((n) => (
				<div
					key={n}
					className="animate-pulse"
				>
					<div className="aspect-[4/3] bg-gray-200 dark:bg-[#ffffff08] rounded-lg"></div>
					<div className="mt-4 space-y-2">
						<div className="h-4 bg-gray-200 dark:bg-[#ffffff08] rounded w-2/3"></div>
						<div className="h-4 bg-gray-200 dark:bg-[#ffffff08] rounded w-1/2"></div>
					</div>
				</div>
			))}
		</div>
	);

	return (
		<div className="min-h-screen bg-inherit dark:bg-inherit text-gray-900 dark:text-white">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-2xl font-semibold tracking-tight">
						My Purchases
					</h1>
					{(templates.length > 0 || components.length > 0) && (
						<EULAModal />
					)}
				</div>

				<Tabs
					defaultValue="templates"
					className="space-y-6"
					value={activeTab}
					onValueChange={handleTabChange}
				>
					<TabsList>
						<TabsTrigger value="templates">Templates</TabsTrigger>
						<TabsTrigger value="components">Components</TabsTrigger>
					</TabsList>

					<TabsContent value="templates">
						{loading ? (
							<SkeletonLoader />
						) : error ? (
							<div className="text-center py-12">
								<p className="text-red-500 mb-4">{error}</p>
								<Button onClick={() => fetchPurchases(1, true)}>Retry</Button>
							</div>
						) : templates.length > 0 ? (
							<>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
									{templates.map((template) => (
										<div key={template.id}>
											{template.purchaseId !== undefined ? (
												<TemplateGridWithInvoice
													templates={[template]}
													loading={false}
													purchaseId={template.purchaseId}
													type="template"
												/>
											) : (
												<TemplateGrid
													templates={[template]}
													loading={false}
												/>
											)}
										</div>
									))}
								</div>
								{hasMore && templates.length >= ITEMS_PER_PAGE && (
									<div className="mt-8 text-center">
										<Button
											onClick={handleLoadMore}
											disabled={loadingMore}
											variant="fancy"
											className="min-w-[150px]"
										>
											{loadingMore ? 'Loading...' : 'Load More'}
										</Button>
									</div>
								)}
							</>
						) : (
							<EmptyState
								title="No templates purchased"
								buttonText="Explore Templates"
								buttonLink="/templates"
							/>
						)}
					</TabsContent>

					<TabsContent value="components">
						{loading ? (
							<SkeletonLoader />
						) : error ? (
							<div className="text-center py-12">
								<p className="text-red-500 mb-4">{error}</p>
								<Button onClick={() => fetchPurchases(1, true)}>Retry</Button>
							</div>
						) : components.length > 0 ? (
							<>
								<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
									{components.map((component) => (
										<div key={component.id}>
											{component.purchaseId !== undefined ? (
												<ComponentsGridWithInvoice
													components={[component]}
													loading={false}
													purchaseId={component.purchaseId}
													type="component"
												/>
											) : (
												<ComponentsGrid
													components={[component]}
													loading={false}
												/>
											)}
										</div>
									))}
								</div>
								{hasMore && components.length >= ITEMS_PER_PAGE && (
									<div className="mt-8 text-center">
										<Button
											onClick={handleLoadMore}
											disabled={loadingMore}
											className="min-w-[150px]"
										>
											{loadingMore ? 'Loading...' : 'Load More'}
										</Button>
									</div>
								)}
							</>
						) : (
							<EmptyState
								title="No components purchased"
								buttonText="Explore Components"
								buttonLink="/components"
							/>
						)}
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

function EmptyState({
	title,
	buttonText,
	buttonLink,
}: {
	title: string;
	buttonText: string;
	buttonLink: string;
}) {
	return (
		<div className="text-center py-12">
			<div className="mx-auto h-30 w-20 text-gray-400 mb-4">
        <EmptyPurchases />
      </div>
			<h2 className="text-xl font-medium font-mono text-gray-600 dark:text-gray-400">
				{title}
			</h2>
			<Link href={buttonLink}>
				<Button className="mt-4" variant="fancy">{buttonText}</Button>
			</Link>
		</div>
	);
}
