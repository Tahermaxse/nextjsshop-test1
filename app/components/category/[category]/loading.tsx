import React from 'react';

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-background dark:text-white">
      {/* Category List Skeleton */}
      <div className="border-b">
        <div className="container max-w-[1200px] mx-auto px-4 h-14 flex items-center gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-6 w-20 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="border-b">
        <div className="container max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-96 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Breadcrumb Skeleton */}
      <div className="container max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="container max-w-[1200px] mx-auto px-4 py-12">
        <div className="h-12 w-3/4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse mb-4"></div>
        <div className="h-6 w-1/2 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
      </div>

      {/* Filters Skeleton */}
      <div className="container max-w-[1200px] mx-auto px-4 pb-8">
        <div className="flex items-center justify-between">
          <div className="h-10 w-48 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Components Grid Skeleton */}
      <div className="container max-w-[1200px] mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/3] bg-gray-200 dark:bg-zinc-700 rounded-lg"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 