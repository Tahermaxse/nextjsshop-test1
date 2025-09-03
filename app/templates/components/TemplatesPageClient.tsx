'use client';

import React, { useState, useCallback } from 'react';
import { type Template } from '@/lib/types';
import { TemplateHeader } from './TemplateHeader';
import { TemplateFilters } from './TemplateFilters';
import { TemplateGrid } from './TemplateGrid';
import { CategoryList } from '@/components/CategoryList';
import { debounce } from 'lodash';
import { Button } from '@/components/ui/button';

interface TemplatesPageClientProps {
  initialTemplates: Template[];
}

export default function TemplatesPageClient({ initialTemplates }: TemplatesPageClientProps) {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(initialTemplates.length >= 12);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search: searchQuery,
          skip: templates.length,
          take: 12,
          filterType
        })
      });
      const data = await response.json();
      if (data.length < 12) {
        setHasMore(false);
      }
      setTemplates([...templates, ...data]);
    } catch (error) {
      console.error('Error loading more templates:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Debounced handler for search input
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      try {
        const response = await fetch('/api/templates', {
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
        setTemplates(data);
        setHasMore(data.length >= 12);
      } catch (error) {
        console.error('Error searching templates:', error);
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

  const handleFilterChange = async (type: string) => {
    setFilterType(type);
    setLoading(true);
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search: searchQuery,
          skip: 0,
          take: 12,
          filterType: type
        })
      });
      const data = await response.json();
      setTemplates(data);
      setHasMore(data.length >= 12);
    } catch (error) {
      console.error('Error filtering templates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background dark:text-white">
      <CategoryList />
      <TemplateHeader onSearch={handleSearch} />

      {/* Breadcrumb */}
      <div className="container max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <a href="#" className="hover:text-gray-900 dark:hover:text-white">
            Templates
          </a>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">All</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container max-w-[1200px] mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white max-w-3xl">
          Start your project with the best responsive website templates.
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Create beautiful websites effortlessly with premium Nextjs templates. Explore a curated selection to kickstart your next project.
        </p>
      </div>

      <TemplateFilters totalTemplates={templates.length} onFilterChange={handleFilterChange} />

      {/* Template Grid */}
      <div className="container max-w-[1200px] mx-auto px-4 pb-16">
        <TemplateGrid templates={templates} loading={loading} />
        {hasMore && !loading && templates.length > 12 && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleLoadMore}
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
      </div>
    </div>
  );
} 