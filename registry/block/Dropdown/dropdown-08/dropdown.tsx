import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
	User,
	Grid3X3,
	Settings,
	FileText,
	MessageSquareText,
	LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dropdown08() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						'rounded-full bg-zinc-50 dark:bg-zinc-950',
						'border-zinc-200 dark:border-zinc-800'
					)}
				>
					Open
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80 p-0 rounded-xl bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
				<div className="p-4 flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800">
					<Avatar className="h-12 w-12">
						<AvatarImage
							src="/placeholder.svg"
							alt="User"
						/>
						<AvatarFallback>EW</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="font-medium text-base text-zinc-900 dark:text-zinc-100">
								Emma Wright
							</span>
							<Badge className="bg-pink-100 text-pink-600 hover:bg-pink-100 rounded-full text-xs font-medium dark:bg-pink-900 dark:text-pink-200 dark:hover:bg-pink-900">
								PRO
							</Badge>
						</div>
						<p className="text-sm text-zinc-500 dark:text-zinc-400">
							emma@alignui.com
						</p>
					</div>
				</div>

				<DropdownMenuGroup className="p-2">
					<DropdownMenuItem className="py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
						<User className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
						<span className="text-zinc-800 dark:text-zinc-200">
							Account Settings
						</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
						<Grid3X3 className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
						<span className="text-zinc-800 dark:text-zinc-200">
							Integrations
						</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
						<Settings className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
						<span className="text-zinc-800 dark:text-zinc-200">Settings</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />

				<DropdownMenuLabel className="px-4 py-2 text-xs font-normal text-zinc-500 dark:text-zinc-400">
					SUPPORT
				</DropdownMenuLabel>

				<DropdownMenuGroup className="p-2">
					<DropdownMenuItem className="py-2.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
						<FileText className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
						<span className="text-zinc-800 dark:text-zinc-200">Guide</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="py-2.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
						<MessageSquareText className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
						<span className="text-zinc-800 dark:text-zinc-200">
							Help Center
						</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />

				<div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
					<div>
						<p className="font-medium text-zinc-800 dark:text-zinc-200">
							Free Plan
						</p>
						<p className="text-sm text-zinc-500 dark:text-zinc-400">
							12,000 views
						</p>
					</div>
					<Button
						variant="outline"
						className="bg-blue-50 text-blue-600 border-0 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
					>
						Upgrade
					</Button>
				</div>

				<DropdownMenuItem className="p-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
					<LogOut className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
					<span className="text-zinc-800 dark:text-zinc-200">Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
