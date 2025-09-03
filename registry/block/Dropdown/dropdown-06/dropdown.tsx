'use client';

import * as React from 'react';
import { Clock, Search, TrendingUp } from 'lucide-react';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

type SearchItem = {
	id: string;
	label: string;
	timestamp?: string;
	icon?: React.ReactNode;
};

interface SearchDropdownProps {
	placeholder?: string;
	recentSearches?: SearchItem[];
	trendingItems?: SearchItem[];
	onSelect?: (item: SearchItem) => void;
}

export default function Dropdown06({
	placeholder = 'Type to search...',
	recentSearches = [
		{
			id: '1',
			label: 'Project management',
			timestamp: 'about 1 year ago',
			icon: <Clock className="h-4 w-4 text-muted-foreground" />,
		},
		{
			id: '2',
			label: 'Team collaboration',
			timestamp: 'about 1 year ago',
			icon: <Clock className="h-4 w-4 text-muted-foreground" />,
		},
		{
			id: '3',
			label: 'User research',
			timestamp: 'about 1 year ago',
			icon: <Clock className="h-4 w-4 text-muted-foreground" />,
		},
	],
	trendingItems = [
		{
			id: '4',
			label: 'Design systems',
			icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
		},
		{
			id: '5',
			label: 'Accessibility',
			icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
		},
	],
	onSelect,
}: SearchDropdownProps) {
	const [open, setOpen] = React.useState(false);

	const handleSelect = (item: SearchItem) => {
		if (onSelect) {
			onSelect(item);
		}
		setOpen(false);
	};

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<div className="relative w-full max-w-sm">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<input
						type="text"
						placeholder={placeholder}
						className="h-10 w-full rounded-md border border-input dark:hover:bg-zinc-900 bg-background pl-8 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						onClick={() => setOpen(true)}
						readOnly
					/>
				</div>
			</PopoverTrigger>
			<PopoverContent
				className="max-w-md w-full p-0"
				align="start"
			>
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						{recentSearches.length > 0 && (
							<CommandGroup heading="Recent Searches">
								{recentSearches.map((item) => (
									<CommandItem
										key={item.id}
										onSelect={() => handleSelect(item)}
										className="flex items-center justify-between"
									>
										<div className="flex items-center gap-2">
											{item.icon}
											<span>{item.label}</span>
										</div>
										{item.timestamp && (
											<span className="text-xs ml-2 text-muted-foreground">
												{item.timestamp}
											</span>
										)}
									</CommandItem>
								))}
							</CommandGroup>
						)}
						{trendingItems.length > 0 && (
							<CommandGroup heading="Trending">
								{trendingItems.map((item) => (
									<CommandItem
										key={item.id}
										onSelect={() => handleSelect(item)}
										className="flex items-center gap-2"
									>
										{item.icon}
										<span>{item.label}</span>
									</CommandItem>
								))}
							</CommandGroup>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
