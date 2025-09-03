'use client';

import * as React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe, Search, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export type Language = {
	name: string;
	code: string;
	flag: string;
	currency: string;
};

interface LanguageSelectorProps {
	languages: Language[];
	defaultLanguage?: string;
}

export const languages: Language[] = [
	{
		name: 'English (US)',
		code: 'en-US',
		flag: 'https://images.pexels.com/photos/1202723/pexels-photo-1202723.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
		currency: 'USD ($)',
	},
	{
		name: 'English (UK)',
		code: 'en-GB',
		flag: 'https://images.pexels.com/photos/1550343/pexels-photo-1550343.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
		currency: 'GBP (£)',
	},
	{
		name: 'Español',
		code: 'es',
		flag: 'https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
		currency: 'EUR (€)',
	},
	{
		name: 'Français',
		code: 'fr',
		flag: 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
		currency: 'EUR (€)',
	},
	{
		name: 'Deutsch',
		code: 'de',
		flag: 'https://images.pexels.com/photos/1521318/pexels-photo-1521318.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
		currency: 'EUR (€)',
	},
	{
		name: '日本語',
		code: 'ja',
		flag: 'https://images.pexels.com/photos/2187603/pexels-photo-2187603.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
		currency: 'JPY (¥)',
	},
	{
		name: '中文',
		code: 'zh',
		flag: 'https://images.pexels.com/photos/2846037/pexels-photo-2846037.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1',
		currency: 'CNY (¥)',
	},
];

export default function Dropdown04({
	defaultLanguage = 'en-US',
}: Pick<LanguageSelectorProps, 'defaultLanguage'>) {
	const [selectedLanguage, setSelectedLanguage] = React.useState(
		languages.find((lang) => lang.code === defaultLanguage) || languages[0]
	);

	const [searchQuery, setSearchQuery] = React.useState('');
	const [isOpen, setIsOpen] = React.useState(false);

	const filteredLanguages = React.useMemo(() => {
		if (!searchQuery) return languages;

		return languages.filter(
			(lang) =>
				lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				lang.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
				lang.currency.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [languages, searchQuery]);

	return (
		<div className="bg-card p-6 max-w-md w-full rounded-md shadow-md">
			<div className="flex justify-start mb-4">
				<h3 className="text-sm font-medium text-muted-foreground">
					Choose your language
				</h3>
			</div>
			<div className="flex justify-center w-full">
				<DropdownMenu
					open={isOpen}
					onOpenChange={setIsOpen}
				>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							className="flex items-center justify-center shadow-sm px-6 gap-2 transition-all hover:bg-accent hover:text-accent-foreground"
						>
							<img
								src={selectedLanguage.flag}
								alt={selectedLanguage.name}
								className="h-4 w-4 rounded-full object-cover"
							/>
							<span>{selectedLanguage.name}</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[280px]"
						align="start"
						sideOffset={4}
					>
						<div className="p-2">
							<div className="flex items-center gap-2 rounded-md border px-3 py-2">
								<Search className="h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search languages..."
									className="border-0 p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>
						<DropdownMenuSeparator />
						<ScrollArea className="h-[300px] p-1">
							{filteredLanguages.length === 0 ? (
								<div className="py-6 text-center text-sm text-muted-foreground">
									No languages found
								</div>
							) : (
								filteredLanguages.map((language) => (
									<DropdownMenuItem
										key={language.code}
										className={cn(
											'flex cursor-pointer items-center justify-between p-2',
											selectedLanguage.code === language.code && 'bg-accent'
										)}
										onClick={() => {
											setSelectedLanguage(language);
											setIsOpen(false);
										}}
									>
										<div className="flex items-center gap-2">
											<img
												src={language.flag}
												alt={language.name}
												className="h-5 w-5 rounded-full object-cover shadow-sm"
											/>
											<div className="flex flex-col">
												<span className="text-sm font-medium">
													{language.name}
												</span>
												<span className="text-xs text-muted-foreground">
													{language.currency}
												</span>
											</div>
										</div>
										{selectedLanguage.code === language.code && (
											<Check className="h-4 w-4 text-primary" />
										)}
									</DropdownMenuItem>
								))
							)}
						</ScrollArea>
						<DropdownMenuSeparator />
						<div className="p-2">
							<Button
								variant="secondary"
								className="w-full justify-start"
								size="sm"
							>
								<Globe className="mr-2 h-4 w-4" />
								<span>Manage language settings</span>
							</Button>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
