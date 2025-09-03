'use client';

import { useState, useCallback, useEffect } from 'react';
import { Template } from '@/lib/types';
import { TemplateHeader } from '../../components/TemplateHeader';
import { TemplateFilters } from '../../components/TemplateFilters';
import { TemplateGrid } from '../../components/TemplateGrid';
import { CategoryList } from '@/components/CategoryList';
import { debounce } from 'lodash';
import Link from 'next/link';
import { EmptyState as EmptyStateIcon } from '@/components/Svgs';
import { Button } from '@/components/ui/button';

interface CategoryPageClientProps {
	initialTemplates: Template[];
	category: string;
}

export default function CategoryPageClient({
	initialTemplates,
	category,
}: CategoryPageClientProps) {
	const [templates, setTemplates] = useState<Template[]>(initialTemplates);
	const [filteredTemplates, setFilteredTemplates] =
		useState<Template[]>(initialTemplates);
	const [loading, setLoading] = useState(false); // for general loading like search
	const [loadingMore, setLoadingMore] = useState(false); // specific to "Load More"
	const [searchQuery, setSearchQuery] = useState('');
	const [skip, setSkip] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [filterType, setFilterType] = useState('all');

	// Initialize templates state based on initial data
	useEffect(() => {
		setTemplates(initialTemplates);
		setFilteredTemplates(initialTemplates);
		setHasMore(initialTemplates.length === 12);
	}, [initialTemplates]);

	// Filter templates based on search query
	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredTemplates(templates);
			return;
		}

		const query = searchQuery.toLowerCase();
		const filtered = templates.filter((template) => {
			return (
				template.name.toLowerCase().includes(query) ||
				template.description.toLowerCase().includes(query) ||
				template.categories.some((cat) => cat.toLowerCase().includes(query))
			);
		});
		setFilteredTemplates(filtered);
	}, [searchQuery, templates]);

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
			const response = await fetch('/api/templates/category', {
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
				throw new Error('Failed to fetch templates');
			}

			const data = await response.json();
			setTemplates(data);
			setFilteredTemplates(data);
			setSkip(0);
			setHasMore(data.length === 12);
		} catch (error) {
			console.error('Error fetching templates:', error);
		} finally {
			setLoading(false);
		}
	};

	const loadMore = useCallback(async () => {
		if (loadingMore || !hasMore) return;
		setLoadingMore(true);
		try {
			const nextSkip = skip + 12;
			const response = await fetch('/api/templates/category', {
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
				throw new Error('Failed to fetch templates');
			}

			const newTemplates = await response.json();
			if (!Array.isArray(newTemplates) || newTemplates.length === 0) {
				setHasMore(false);
			} else {
				setTemplates((prev) => [...prev, ...newTemplates]);
				setFilteredTemplates((prev) => [...prev, ...newTemplates]);
				setSkip(nextSkip);
				setHasMore(newTemplates.length === 12);
			}
		} catch (error) {
			console.error('Error loading more templates:', error);
			setHasMore(false);
		} finally {
			setLoadingMore(false);
		}
	}, [category, loadingMore, hasMore, skip, filterType]);

	return (
		<div className="min-h-screen bg-white dark:bg-background dark:text-white">
			<CategoryList />
			<TemplateHeader onSearch={handleSearch} />

			{/* Breadcrumb */}
			<div className="container max-w-[1200px] mx-auto px-4 py-4">
				<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
					<Link
						href="/templates"
						className="hover:text-gray-900 dark:hover:text-white"
					>
						Templates
					</Link>
					<span>/</span>
					<span className="text-gray-900 dark:text-white capitalize">
						{category}
					</span>
				</div>
			</div>

			{/* Hero Section */}
			<div className="container max-w-[1200px] mx-auto px-4 py-12">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white max-w-3xl capitalize">
					{category} Templates
				</h1>
				<p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
					Explore our collection of {category.toLowerCase()} templates designed
					to help you build better websites.
				</p>
			</div>

			<TemplateFilters totalTemplates={templates.length} onFilterChange={handleFilterChange} />

			{/* Template Grid */}
			<div className="container max-w-[1200px] mx-auto px-4 pb-16">
				{templates.length > 0 ? (
					<>
						<TemplateGrid
							templates={filteredTemplates}
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
							We don't have any templates in the {category} category yet. Check
							back soon or explore other categories.
						</p>
						<Link
							href="/templates"
							className=""
						>
							<Button variant="fancy" className="px-4 py-2">
								Explore All Templates
							</Button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
