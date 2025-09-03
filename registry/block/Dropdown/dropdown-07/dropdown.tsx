'use client';

import * as React from 'react';
import { ChevronDown, Paintbrush } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ColorSwatch = string;
type ColorPalette = {
	name: string;
	colors: ColorSwatch[];
};
type ColorPaletteGroup = {
	name: string;
	palettes: ColorPalette[];
};

const colorPaletteGroups: ColorPaletteGroup[] = [
	{
		name: 'Modern',
		palettes: [
			{
				name: 'Modern',
				colors: ['#111111', '#333333', '#666666', '#DDDDDD', '#F5F5F5'],
			},
		],
	},
	{
		name: 'Nature',
		palettes: [
			{
				name: 'Nature',
				colors: ['#1B4332', '#2D6A4F', '#40916C', '#95D5B2', '#D8F3DC'],
			},
		],
	},
	{
		name: 'Ocean',
		palettes: [
			{
				name: 'Ocean',
				colors: ['#03045E', '#0077B6', '#00B4D8', '#90E0EF', '#CAF0F8'],
			},
		],
	},
];

interface ColorPaletteDropdownProps {
	onSelectPalette?: (palette: ColorPalette) => void;
}

export default function Dropdown07({
	onSelectPalette,
}: ColorPaletteDropdownProps) {
	const [selectedPalette, setSelectedPalette] =
		React.useState<ColorPalette | null>(null);
	const [open, setOpen] = React.useState(false);
	const [customColor, setCustomColor] = React.useState('#000000');

	const handleSelectPalette = (palette: ColorPalette) => {
		setSelectedPalette(palette);
		onSelectPalette?.(palette);
		setOpen(false);
	};

	const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomColor(e.target.value);
	};

	return (
		<div className="max-w-sm w-full bg-card p-6 shadow-md rounded-md">
			<h3 className="text-muted-foreground mb-4">Pick colors as you like</h3>
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={cn(
							'w-full justify-between border-zinc-300 bg-white hover:bg-zinc-50',
							'dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700/50'
						)}
					>
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2">
								<div
									className={cn(
										'h-5 w-5 rounded-full border-2',
										'border-zinc-200 dark:border-zinc-600'
									)}
									style={{
										backgroundColor: selectedPalette?.colors[0] || customColor,
									}}
								/>
								<Paintbrush className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
							</div>
							<span className="font-medium text-zinc-800 dark:text-zinc-200">
								{selectedPalette?.name || 'Color Picker'}
							</span>
						</div>
						<ChevronDown className="ml-2 h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className={cn(
						'w-[300px] p-0 rounded-lg',
						'border-zinc-200 bg-white shadow-lg',
						'dark:border-zinc-700 dark:bg-zinc-800'
					)}
					align="start"
				>
					<Tabs defaultValue="palettes">
						<TabsList
							className={cn(
								'grid w-full grid-cols-2 rounded-t-lg',
								'bg-zinc-100 dark:bg-zinc-700/30'
							)}
						>
							<TabsTrigger
								value="palettes"
								className={cn(
									'text-xs font-medium text-zinc-800',
									'dark:text-zinc-200'
								)}
							>
								Color Palettes
							</TabsTrigger>
							<TabsTrigger
								value="custom"
								className={cn(
									'text-xs font-medium text-zinc-800',
									'dark:text-zinc-200'
								)}
							>
								Custom Color
							</TabsTrigger>
						</TabsList>
						<TabsContent
							value="palettes"
							className="p-4"
						>
							<div className="space-y-4">
								{colorPaletteGroups.map((group) => (
									<div
										key={group.name}
										className="space-y-3"
									>
										<h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
											{group.name}
										</h3>
										<div className="space-y-2">
											{group.palettes.map((palette) => (
												<div
													key={palette.name}
													className={cn(
														'flex cursor-pointer items-center gap-3 rounded-md p-2',
														'hover:bg-zinc-100 dark:hover:bg-zinc-700/50',
														selectedPalette?.name === palette.name &&
															'bg-zinc-100 dark:bg-zinc-700/30'
													)}
													onClick={() => handleSelectPalette(palette)}
												>
													<div className="flex gap-1">
														{palette.colors.map((color, index) => (
															<div
																key={index}
																className={cn(
																	'h-6 w-6 rounded-sm',
																	'border border-zinc-200 dark:border-zinc-600'
																)}
																style={{ backgroundColor: color }}
															/>
														))}
													</div>
													<span className="text-sm text-zinc-700 dark:text-zinc-300">
														{palette.name}
													</span>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</TabsContent>
						<TabsContent
							value="custom"
							className="p-4"
						>
							<div className="space-y-4">
								<div className="grid gap-3">
									<div className="grid grid-cols-5 gap-2">
										{[
											'#F44336',
											'#E91E63',
											'#9C27B0',
											'#673AB7',
											'#3F51B5',
										].map((color) => (
											<div
												key={color}
												className={cn(
													'h-8 w-full cursor-pointer rounded-sm',
													'border border-zinc-200 dark:border-zinc-600',
													'hover:ring-2 hover:ring-zinc-400 dark:hover:ring-zinc-500'
												)}
												style={{ backgroundColor: color }}
												onClick={() => setCustomColor(color)}
											/>
										))}
									</div>
									<div className="grid grid-cols-5 gap-2">
										{[
											'#2196F3',
											'#03A9F4',
											'#00BCD4',
											'#009688',
											'#4CAF50',
										].map((color) => (
											<div
												key={color}
												className={cn(
													'h-8 w-full cursor-pointer rounded-sm',
													'border border-zinc-200 dark:border-zinc-600',
													'hover:ring-2 hover:ring-zinc-400 dark:hover:ring-zinc-500'
												)}
												style={{ backgroundColor: color }}
												onClick={() => setCustomColor(color)}
											/>
										))}
									</div>
									<div className="grid grid-cols-5 gap-2">
										{[
											'#8BC34A',
											'#CDDC39',
											'#FFEB3B',
											'#FFC107',
											'#FF9800',
										].map((color) => (
											<div
												key={color}
												className={cn(
													'h-8 w-full cursor-pointer rounded-sm',
													'border border-zinc-200 dark:border-zinc-600',
													'hover:ring-2 hover:ring-zinc-400 dark:hover:ring-zinc-500'
												)}
												style={{ backgroundColor: color }}
												onClick={() => setCustomColor(color)}
											/>
										))}
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div
										className={cn(
											'h-10 w-10 rounded-md',
											'border border-zinc-200 dark:border-zinc-600'
										)}
										style={{ backgroundColor: customColor }}
									/>
									<div className="flex-1">
										<input
											type="text"
											value={customColor}
											onChange={handleCustomColorChange}
											className={cn(
												'w-full rounded-md border px-3 py-2 text-sm',
												'border-zinc-300 bg-white text-zinc-800',
												'dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200',
												'focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2',
												'dark:focus:ring-zinc-500 dark:focus:ring-offset-zinc-900'
											)}
										/>
									</div>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</PopoverContent>
			</Popover>
		</div>
	);
}
