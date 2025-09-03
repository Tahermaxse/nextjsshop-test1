'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PaginationProps } from '@/types/blog';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return pages;
    }

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    return pages.slice(start - 1, end);
  };

  const handlePageChange = (page: number) => {
    router.push(`/resources/blog?page=${page}`);
  };

  return (
    <div className="max-w-content w-full mx-auto py-8 px-6 lg:px-16 flex justify-between items-center gap-6">
      <div className="gap-2 items-center hidden md:flex">
        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`rounded-full flex items-center justify-center py-1 border transition-all whitespace-nowrap px-3 !text-compact-small-plus w-[39px] h-[32px] md:hover:bg-ui-bg-base dark:md:hover:bg-zinc-800 ${
              currentPage === page
                ? 'border-ui-bg-base shadow-elevation-card-rest bg-ui-bg-base text-ui-fg-base dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'
                : 'border-transparent text-ui-fg-muted dark:text-zinc-500'
            }`}
          >
            {page.toString().padStart(2, '0')}
          </button>
        ))}
        {totalPages > maxVisiblePages && currentPage < totalPages - 2 && (
          <p className="text-ui-fg-disabled dark:text-zinc-600 ml-1">...</p>
        )}
      </div>
      <div className="flex gap-6">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`text-compact-small-plus ${
            currentPage === 1 ? '!text-ui-fg-disabled dark:!text-zinc-600 pointer-events-none' : '!text-ui-fg-subtle dark:!text-zinc-400'
          }`}
        >
          Prev
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`text-compact-small-plus ${
            currentPage === totalPages ? '!text-ui-fg-disabled dark:!text-zinc-600 pointer-events-none' : '!text-ui-fg-subtle dark:!text-zinc-400'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination; 