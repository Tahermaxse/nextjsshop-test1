import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ProfileAvatar } from '../profile-avatar';
import { ActionButton } from '../action-button';
import { cn } from '@/lib/utils';
import {
	LucideGlobe,
	LucideBriefcase,
	LucideMail,
	LucidePlus,
	LucideMessageSquare,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

// Based on Lena Müller example from reference image
interface DetailedContactCardProps {
	name: string;
	title: string;
	company: string;
	avatar: string;
	location?: string;
	specialties?: string[];
	email?: string;
	className?: string;
}

export function Profile02({
	name,
	title,
	company,
	avatar,
	location,
	specialties,
	email,
	className,
}: DetailedContactCardProps) {
	return (
		<Card
			className={cn(
				'w-full max-w-md transition-all duration-300 hover:shadow-md',
				className
			)}
		>
			<CardHeader className="pb-0">
				<div className="flex justify-between items-start">
					<h3 className="text-lg font-medium text-muted-foreground">
						Contact Information
					</h3>
					<Link
						href="#"
						className="text-blue-600 hover:underline text-sm font-medium"
					>
						View Profile
					</Link>
				</div>
			</CardHeader>

			<CardContent className="space-y-4 pt-4">
				<div className="bg-card rounded-lg border border-border p-4">
					<div className="flex gap-4 items-center">
						<ProfileAvatar
							src={avatar}
							alt={name}
							size="md"
						/>
						<div className="flex-1">
							<h3 className="text-lg font-semibold">{name}</h3>
							<p className="text-muted-foreground">
								{title} {company && `@${company}`}
							</p>
						</div>
						<button className="h-8 w-8 rounded-full flex items-center justify-center border border-border hover:bg-secondary">
							<LucidePlus size={18} />
						</button>
					</div>
				</div>

				{location && (
					<div className="flex items-center gap-4">
						<div className="bg-secondary/50 h-10 w-10 rounded-full flex items-center justify-center">
							<LucideGlobe className="h-5 w-5 text-muted-foreground" />
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								LOCATION
							</p>
							<p className="font-medium">{location}</p>
						</div>
					</div>
				)}

				{specialties && specialties.length > 0 && (
					<div className="flex items-center gap-4">
						<div className="bg-secondary/50 h-10 w-10 rounded-full flex items-center justify-center">
							<LucideBriefcase className="h-5 w-5 text-muted-foreground" />
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								SPECIALITY
							</p>
							<p className="font-medium">{specialties.join(', ')}</p>
						</div>
					</div>
				)}

				{email && (
					<div className="flex items-center gap-4">
						<div className="bg-secondary/50 h-10 w-10 rounded-full flex items-center justify-center">
							<LucideMail className="h-5 w-5 text-muted-foreground" />
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								EMAIL ADDRESS
							</p>
							<p className="font-medium">{email}</p>
						</div>
					</div>
				)}

				<Separator className="my-4" />

				<div className="grid grid-cols-2 gap-4">
					<ActionButton variant="add">Add Contact</ActionButton>
					<ActionButton
						variant="message"
						icon={LucideMessageSquare}
					>
						Send Message
					</ActionButton>
				</div>
			</CardContent>
		</Card>
	);
}
