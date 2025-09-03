"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/Svgs";
import { Components } from "@/lib/types";
import { useCurrency } from "@/hooks/useCurrency";

interface ComponentsGridProps {
  components: Components[];
  loading?: boolean;
}

export function ComponentsGrid({ components, loading }: ComponentsGridProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const { formatPrice } = useCurrency();
  
  // Sort components by createdAt descending (most recent first)
  const sortedComponents = [...components].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const newComponentIds = React.useMemo(() => {
    return [...components]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3)
      .map(c => c.id);
  }, [components]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="animate-pulse">
            <div className="aspect-[4/3] bg-gray-200 dark:bg-zinc-700 rounded-lg"></div>
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (components.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="mx-auto h-25 w-20 text-gray-400 mb-4">
          <EmptyState />
        </div>
        <p className="text-lg text-gray-600 dark:text-white font-mono">
          No components matched your query.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Please search for something else.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {components.map((component) => (
        <Link href={`/components/${component.name}`} key={component.id}>
          <div className="group relative">
            <div className="aspect-[4/3] overflow-hidden rounded-lg border bg-gray-100 transition-transform hover:scale-[1.02]">
              <Image
                src={component.image}
                alt={component.name}
                width={100}
                height={100}
                loading="lazy"
                className={`w-full h-full object-cover object-center transition-all duration-500 ease-in-out ${isLoading ? "blur-lg scale-105" : "blur-0 scale-100"
                  }`}
                onLoadingComplete={() => setIsLoading(false)}
              />
            </div>
            <div className="mt-4 flex flex-row items-center justify-between">
              {/* Left side: text info */}
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {component.name}
                  </h3>
                </div>
                <div className="mt-1 flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-zinc-400">
                    {component.price === 0 ? "Free" : formatPrice(component.price)}
                  </span>
                  <span className="text-gray-400">·</span>
                  <span className="text-sm text-gray-600 dark:text-zinc-400">
                    {component.author}
                  </span>
                </div>
              </div>
              {/* Right side: image only for the 3 most recently updated components */}
              {newComponentIds.includes(component.id) && (
                <div className="ml-4 flex-shrink-0 relative group">
                  <img
                    src={"/svgs/new.svg"}
                    alt="New Component"
                    className="rounded object-cover w-[20px] h-[20px] md:w-[20px] md:h-[20px] sm:w-[16px] sm:h-[16px]"
                  />
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
