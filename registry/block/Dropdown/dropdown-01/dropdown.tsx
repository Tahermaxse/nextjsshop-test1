'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
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
import { cn } from '@/lib/utils';

type Company = {
	id: string;
	name: string;
};

const companies: Company[] = [
	{ id: '1', name: 'Pixsellz Studio' },
	{ id: '2', name: 'Apple Inc.' },
	{ id: '3', name: 'Tewavoy Corp.' },
	{ id: '4', name: 'Global Innovative Solutions' },
];

export default function Dropdown01() {
	const [open, setOpen] = React.useState(false);
	const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(
		null
	);
	const [searchValue, setSearchValue] = React.useState('');

	const filteredCompanies = React.useMemo(() => {
		if (!searchValue) return companies;
		return companies.filter((company) =>
			company.name.toLowerCase().includes(searchValue.toLowerCase())
		);
	}, [searchValue]);

	return (
		<div className="max-w-md w-full bg-card shadow-md rounded-lg p-6">
			<h2 className="text-lg font-semibold mb-4">Dropdown with search</h2>
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<button
						aria-expanded={open}
						className={cn(
							'flex h-12 w-full items-center justify-between rounded-lg px-4 py-2 text-left',
							'bg-zinc-50 hover:bg-zinc-100 text-zinc-800',
							'dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200',
							'border border-zinc-200 dark:border-zinc-700',
							'focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600',
							'transition-colors duration-200'
						)}
					>
						<span className="truncate">
							{selectedCompany ? selectedCompany.name : 'Choose company'}
						</span>
						<ChevronDown
							className={cn(
								'ml-2 h-4 w-4 shrink-0 transition-transform duration-200',
								open ? 'rotate-180' : 'rotate-0',
								'text-zinc-500 dark:text-zinc-400'
							)}
						/>
					</button>
				</PopoverTrigger>
				<PopoverContent
					className="w-[var(--radix-popover-trigger-width)] p-0 shadow-lg"
					align="start"
					sideOffset={4}
				>
					<Command
						className="rounded-lg border"
						shouldFilter={false}
					>
						<div
							className={cn(
								'flex items-center border-b px-3',
								'bg-zinc-50 border-zinc-200',
								'dark:bg-zinc-800 dark:border-zinc-700'
							)}
						>
							<CommandInput
								placeholder="Search"
								value={searchValue}
								onValueChange={setSearchValue}
								className={cn(
									'h-11 border-none focus:ring-0',
									'bg-transparent text-zinc-800 placeholder-zinc-500',
									'dark:text-zinc-200 dark:placeholder-zinc-400'
								)}
							/>
						</div>
						<CommandList
							className={cn(
								'max-h-[200px] overflow-auto',
								'bg-zinc-50 dark:bg-zinc-800 scrollbar-thin'
							)}
						>
							<CommandEmpty
								className={cn(
									'py-3 text-center text-sm',
									'text-zinc-500 dark:text-zinc-400'
								)}
							>
								No company found.
							</CommandEmpty>
							<CommandGroup>
								{filteredCompanies.map((company) => (
									<CommandItem
										key={company.id}
										value={company.name}
										onSelect={() => {
											setSelectedCompany(company);
											setOpen(false);
											setSearchValue('');
										}}
										className={cn(
											'px-4 py-3 my-2 text-sm',
											'text-zinc-800 hover:bg-zinc-100',
											'dark:text-zinc-200 dark:hover:bg-zinc-700',
											selectedCompany?.id === company.id &&
												cn('bg-zinc-100 font-medium', 'dark:bg-zinc-700/50')
										)}
									>
										<span className="truncate">{company.name}</span>
										<Check
											className={cn(
												'ml-auto h-4 w-4',
												selectedCompany?.id === company.id
													? 'opacity-100'
													: 'opacity-0',
												'text-zinc-700 dark:text-zinc-300'
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
