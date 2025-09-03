import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

interface ComponentsFiltersProps {
	totalComponentss: number;
	onFilterChange: (value: string) => void;
}

export function ComponentsFilters({
	totalComponentss,
	onFilterChange,
}: ComponentsFiltersProps) {
	return (
		<div className="container max-w-[1200px] mx-auto px-4 pb-8">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<Tabs
						defaultValue="all"
						className=""
						onValueChange={onFilterChange}
					>
						<TabsList className="dark:bg-[#ffffff08]">
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="recent">Recent</TabsTrigger>
							<TabsTrigger value="most-used">Trending</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
				<div className="text-sm text-[#8f8f99] hidden md:block">
					{totalComponentss}+ Components
				</div>
			</div>
		</div>
	);
}
