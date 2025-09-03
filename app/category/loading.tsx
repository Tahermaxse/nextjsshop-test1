import React from 'react';

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-background dark:text-white">
      {/* Category List Skeleton */}
      <div className="border-b">
        <div className="container max-w-[1200px] mx-auto px-4 h-14 flex items-center gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="border-b">
        <div className="container max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Breadcrumb Skeleton */}
      <div className="container max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="container max-w-[1200px] mx-auto px-4 py-12">
        <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
        <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Category Grid Skeleton */}
      <div className="container max-w-[1200px] mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[16/9] bg-gray-200 dark:bg-[#ffffff08] rounded-lg"></div>
              <div className="mt-4 space-y-2">
                <div className="h-6 bg-gray-200 dark:bg-[#ffffff08] rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-[#ffffff08] rounded w-1/2"></div>
                <div className="flex items-center space-x-2 mt-4">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-[#ffffff08] rounded-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-[#ffffff08] rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 