import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ProfileAvatar } from '../profile-avatar';
import { Separator } from '@/components/ui/separator';
import { LucideUsers, LucidePlus } from 'lucide-react';
import { cn } from '@/lib/utils';

// Based on Arthur Taylor example from reference image
interface BasicProfileCardProps {
	name: string;
	title: string;
	company: string;
	avatar: string;
	statusColor?: 'green' | 'yellow' | 'gray' | 'blue' | 'purple' | 'none';
	className?: string;
}

export function Profile08({
	name,
	title,
	company,
	avatar,
	statusColor = 'blue',
	className,
}: BasicProfileCardProps) {
	return (
		<Card
			className={cn(
				'w-full max-w-xs overflow-hidden transition-all duration-300 hover:shadow-md',
				className
			)}
		>
			<CardContent className="p-0">
				<div className="flex flex-col items-center text-center p-6">
					<ProfileAvatar
						src={avatar}
						alt={name}
						size="lg"
						statusColor={statusColor}
						className="mb-4"
					/>
					<h3 className="text-xl font-semibold">{name}</h3>
					<p className="text-muted-foreground mt-1">
						{title} {company && `at ${company}`}
					</p>
				</div>

				<Separator />

				<div className="px-6 py-4">
					<h4 className="text-sm font-medium text-muted-foreground mb-2">
						Contacts
					</h4>
					<p className="text-base font-semibold flex items-center justify-between">
						Expand Your Network
						<LucideUsers
							size={18}
							className="text-muted-foreground"
						/>
					</p>
				</div>

				<Separator />

				<div className="px-6 py-4">
					<h4 className="text-sm font-medium text-muted-foreground mb-2">
						Premium Features
					</h4>
					<a
						href="#"
						className="text-base font-semibold hover:underline text-primary inline-block"
					>
						Get "Profile Highlighting" feature.
					</a>
				</div>

				<div className="p-3">
					<button className="w-full border border-input rounded-md py-2 text-center flex items-center justify-center hover:bg-secondary transition-colors duration-200">
						<LucidePlus className="mr-2 h-4 w-4" />
						Create a group
					</button>
				</div>
			</CardContent>
		</Card>
	);
}
