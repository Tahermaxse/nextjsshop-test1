import React from 'react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
	ChevronDown,
	Settings,
	User,
	Zap,
	Download,
	LogOut,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function Dropdown10() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="w-24 flex items-center justify-between"
				>
					Open
					<ChevronDown className="h-4 w-4 ml-2" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-72">
				<div className="flex items-center gap-3 p-4">
					<Avatar>
						<AvatarImage src="/lovable-uploads/8cd31507-059e-4987-8941-9a0ec20a3939.png" />
						<AvatarFallback>JB</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<h4 className="text-sm font-semibold">James Brown</h4>
							<Badge
								variant="outline"
								className="bg-green-100 text-green-700 border-0"
							>
								PRO
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">james@alignui.com</p>
					</div>
				</div>

				<div className="px-4 py-2">
					<div className="flex justify-between items-center">
						<h5 className="text-sm font-medium">Account Storage</h5>
						<Button
							variant="outline"
							size="sm"
							className="h-8"
						>
							Manage
						</Button>
					</div>
					<p className="text-sm text-muted-foreground mt-1">
						Your account has 2GB storage
					</p>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem className="gap-2 p-3">
					<Settings className="h-4 w-4" />
					Settings
				</DropdownMenuItem>

				<DropdownMenuItem className="gap-2 p-3">
					<User className="h-4 w-4" />
					Manage Account
				</DropdownMenuItem>

				<DropdownMenuItem className="gap-2 p-3">
					<Zap className="h-4 w-4" />
					Automations
				</DropdownMenuItem>

				<DropdownMenuItem className="gap-2 p-3">
					<Download className="h-4 w-4" />
					Install Dropbox App
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem className="gap-2 p-3 text-red-600 focus:text-red-600">
					<LogOut className="h-4 w-4" />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
