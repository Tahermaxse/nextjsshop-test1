import React from 'react';

export default function ComponentLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-background dark:text-white">
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

      {/* Main Content Skeleton */}
      <div className="container max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Component Preview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video bg-gray-200 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
            <div className="h-8 w-3/4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          </div>

          {/* Right Column - Component Info */}
          <div className="space-y-6">
            <div className="h-10 w-full bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            <div className="h-12 w-full bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Stats Section Skeleton */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Comments Section Skeleton */}
        <div className="mt-12">
          <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse mb-6"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-10 w-10 bg-gray-200 dark:bg-zinc-700 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                    <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 