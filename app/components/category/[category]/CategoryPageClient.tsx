'use client';

import { useEffect, useState, useCallback } from 'react';
import { Components } from '@/lib/types';
import { ComponentsHeader } from '../../components/ComponentsHeader';
import { ComponentsFilters } from '../../components/ComponentsFilters';
import { ComponentsGrid } from '../../components/ComponentsGrid';
import { ComponentCategoryList } from '@/components/ComponentCategoryList';
import { debounce } from 'lodash';
import { Button } from '@/components/ui/button';
import { EmptyState as EmptyStateIcon } from '@/components/Svgs';
import Link from 'next/link';

interface CategoryPageClientProps {
	initialComponents: Components[];
	category: string;
}

export default function CategoryPageClient({
	initialComponents,
	category,
}: CategoryPageClientProps) {
	const [components, setComponents] = useState<Components[]>(initialComponents);
	const [filteredComponents, setFilteredComponents] =
		useState<Components[]>(initialComponents);
	const [loading, setLoading] = useState(false); // for initial search or filters
	const [loadingMore, setLoadingMore] = useState(false); // for "Load More" only
	const [searchQuery, setSearchQuery] = useState('');
	const [skip, setSkip] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [filterType, setFilterType] = useState('all');

	// Initialize templates state based on initial data
	useEffect(() => {
		setComponents(initialComponents);
		setFilteredComponents(initialComponents);
		setHasMore(initialComponents.length === 12);
	}, [initialComponents]);

	// Filter components based on search query
	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredComponents(components);
			return;
		}

		const query = searchQuery.toLowerCase();
		const filtered = components.filter((component) => {
			return (
				component.name.toLowerCase().includes(query) ||
				component.description.toLowerCase().includes(query) ||
				component.categories.some((cat) => cat.toLowerCase().includes(query))
			);
		});
		setFilteredComponents(filtered);
	}, [searchQuery, components]);

	// Debounced handler for search input
	const debouncedSearch = useCallback(
		debounce((query: string) => {
			setSearchQuery(query);
		}, 500),
		[]
	);

	const handleSearch = (query: string) => {
		debouncedSearch(query);
	};

	const handleFilterChange = async (value: string) => {
		setFilterType(value);
		setLoading(true);
		try {
			const response = await fetch('/api/components/category', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					category: category.toLowerCase(),
					skip: 0,
					take: 12,
					filterType: value,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to fetch components');
			}

			const data = await response.json();
			setComponents(data);
			setFilteredComponents(data);
			setSkip(0);
			setHasMore(data.length === 12);
		} catch (error) {
			console.error('Error fetching components:', error);
		} finally {
			setLoading(false);
		}
	};

	const loadMore = useCallback(async () => {
		if (loadingMore || !hasMore) return;
		setLoadingMore(true);
		try {
			const nextSkip = skip + 12;
			const response = await fetch('/api/components/category', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					category: category.toLowerCase(),
					skip: nextSkip,
					take: 12,
					filterType,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to fetch components');
			}

			const newComponents = await response.json();
			if (!Array.isArray(newComponents) || newComponents.length === 0) {
				setHasMore(false);
			} else {
				setComponents((prev) => [...prev, ...newComponents]);
				setFilteredComponents((prev) => [...prev, ...newComponents]);
				setSkip(nextSkip);
				setHasMore(newComponents.length === 12);
			}
		} catch (error) {
			console.error('Error loading more components:', error);
			setHasMore(false);
		} finally {
			setLoadingMore(false);
		}
	}, [category, loadingMore, hasMore, skip, filterType]);

	return (
		<div className="min-h-screen bg-white dark:bg-background dark:text-white">
			<ComponentCategoryList />
			<ComponentsHeader onSearch={handleSearch} />

			{/* Breadcrumb */}
			<div className="container max-w-[1200px] mx-auto px-4 py-4">
				<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
					<a
						href="/components"
						className="hover:text-gray-900 dark:hover:text-white"
					>
						Components
					</a>
					<span>/</span>
					<span className="text-gray-900 dark:text-white capitalize">
						{category}
					</span>
				</div>
			</div>

			{/* Hero Section */}
			<div className="container max-w-[1200px] mx-auto px-4 py-12">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white max-w-3xl capitalize">
					{category} Components
				</h1>
				<p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
					Explore our collection of {category.toLowerCase()} components designed
					to help you build better websites.
				</p>
			</div>

			<ComponentsFilters totalComponentss={components.length} onFilterChange={handleFilterChange} />

			{/* Components Grid */}
			<div className="container max-w-[1200px] mx-auto px-4 pb-16">
				{components.length > 0 ? (
					<>
						<ComponentsGrid
							components={filteredComponents}
							loading={loading}
						/>
						{hasMore && (
							<div className="flex justify-center mt-8">
								<Button
									onClick={loadMore}
									disabled={loadingMore}
									variant="fancy"
									className="mb-10 group relative inline-flex items-center justify-center font-bold cursor-pointer overflow-hidden rounded-lg px-6 py-2 sm:px-8 sm:py-2.5 md:px-10 md:py-3 text-sm sm:text-base md:text-lg"
								>
									{loadingMore ? (
										'Loading...'
									) : (
										<>
											Load More{' '}
										</>
									)}
								</Button>
							</div>
						)}
					</>
				) : (
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<div className="mx-auto h-20 w-20 text-gray-400 mb-4">
							<EmptyStateIcon />
						</div>
						<p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
							We don't have any components in the {category} category yet. Check
							back soon or explore other categories.
						</p>
						<Link href="/components">
							<Button variant="fancy" className="px-4 py-2">
								Explore All Components
							</Button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
