'use client';

import React, { useState, useCallback } from 'react';
import { type Components } from '@/lib/types';
import { ComponentsHeader } from './ComponentsHeader';
import { ComponentsFilters } from './ComponentsFilters';
import { ComponentsGrid } from './ComponentsGrid';
import { ComponentCategoryList } from '@/components/ComponentCategoryList';
import { debounce } from 'lodash';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface ComponentsPageClientProps {
  initialComponents: Components[];
}

export default function ComponentsPageClient({ initialComponents }: ComponentsPageClientProps) {
  const [components, setComponents] = useState<Components[]>(initialComponents);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(initialComponents.length >= 12);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const response = await fetch('/api/components', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search: searchQuery,
          skip: components.length,
          take: 12,
          filterType
        })
      });
      const data = await response.json();
      if (data.length < 12) {
        setHasMore(false);
      }
      setComponents([...components, ...data]);
    } catch (error) {
      console.error('Error loading more components:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Debounced handler for search input
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      try {
        const response = await fetch('/api/components', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            search: query,
            skip: 0,
            take: 12,
            filterType
          })
        });
        const data = await response.json();
        setComponents(data);
        setHasMore(data.length >= 12);
      } catch (error) {
        console.error('Error searching components:', error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [filterType]
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleFilterChange = async (value: string) => {
    setFilterType(value);
    setLoading(true);
    try {
      const response = await fetch('/api/components', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search: searchQuery,
          skip: 0,
          take: 12,
          filterType: value
        })
      });
      const data = await response.json();
      setComponents(data);
      setHasMore(data.length >= 12);
    } catch (error) {
      console.error('Error filtering components:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background dark:text-white">
      <ComponentCategoryList />
      <ComponentsHeader onSearch={handleSearch} />

      {/* Breadcrumb */}
      <div className="container max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <a href="#" className="hover:text-gray-900 dark:hover:text-white">
            Components
          </a>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">All</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container max-w-[1200px] mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white max-w-3xl">
          Start your project with the best responsive website Components.
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Create beautiful websites effortlessly with premium Nextjs Components. Explore a curated selection to kickstart your next project.
        </p>
      </div>

      <ComponentsFilters totalComponentss={components.length} onFilterChange={handleFilterChange} />

      {/* Components Grid */}
      <div className="container max-w-[1200px] mx-auto px-4 pb-16">
        <ComponentsGrid components={components} loading={loading} />
        {hasMore && !loading && components.length > 12 && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleLoadMore}
              disabled={loadingMore}
              variant="fancy"
              className="mb-10 group relative inline-flex items-center justify-center font-bold cursor-pointer overflow-hidden rounded-lg px-6 py-2 sm:px-8 sm:py-2.5 md:px-10 md:py-3 text-sm sm:text-base md:text-lg text-white"
            >
              {loadingMore ? (
                'Loading...'
              ) : (
                <>
                  Load More{' '}
                  <ArrowDown className="w-5 h-5 ml-2 transition-transform duration-4000 group-hover:-translate-y-1 animate-bounce" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 