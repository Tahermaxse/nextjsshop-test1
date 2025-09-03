import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TemplateFiltersProps {
	totalTemplates: number;
	onFilterChange: (type: string) => void;
}

export function TemplateFilters({ totalTemplates, onFilterChange }: TemplateFiltersProps) {
	return (
		<div className="container max-w-[1200px] mx-auto px-4 pb-8 ">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<Tabs
						defaultValue="all"
						className="w-full"
						onValueChange={onFilterChange}
					>
						<TabsList className="dark:bg-[#ffffff08]">
							<TabsTrigger value='all'>All</TabsTrigger>
							<TabsTrigger value="most-used">Trending</TabsTrigger>
							<TabsTrigger value="recent">Recent</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
				<div className="text-sm text-[#8f8f99] hidden md:block">
					{totalTemplates}+ Templates
				</div>
			</div>
		</div>
	);
}
