import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ProfileAvatar } from '../profile-avatar';
import { ActionButton } from '../action-button';
import { cn } from '@/lib/utils';
import {
	LucideCheck,
	LucideBriefcase,
	LucideMapPin,
	LucideLink,
	LucideInstagram,
	LucideTwitter,
	LucideLinkedin,
	LucideGithub,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface SocialLink {
	platform: 'twitter' | 'instagram' | 'linkedin' | 'github';
	username: string;
	url: string;
}

interface SocialMediaCardProps {
	name: string;
	username: string;
	bio?: string;
	avatar: string;
	isVerified?: boolean;
	company?: string;
	location?: string;
	website?: string;
	socialLinks?: SocialLink[];
	followersCount?: number;
	followingCount?: number;
	className?: string;
}

export function Profile09({
	name,
	username,
	bio,
	avatar,
	isVerified = false,
	company,
	location,
	website,
	socialLinks = [],
	followersCount,
	followingCount,
	className,
}: SocialMediaCardProps) {
	const socialIcons = {
		twitter: LucideTwitter,
		instagram: LucideInstagram,
		linkedin: LucideLinkedin,
		github: LucideGithub,
	};

	return (
		<Card
			className={cn(
				'w-full max-w-sm overflow-hidden transition-all duration-300',
				'hover:shadow-md',
				className
			)}
		>
			<div className="h-24 bg-gradient-to-r from-blue-400 to-violet-500" />
			<CardContent className="p-5 pt-0 relative">
				<div className="flex justify-between items-end mb-3">
					<ProfileAvatar
						src={avatar}
						alt={name}
						size="lg"
						className="mt-[-24px] border-4 border-background"
					/>
					<ActionButton size="sm">Follow</ActionButton>
				</div>

				<div className="space-y-1">
					<div className="flex items-center gap-1">
						<h3 className="font-semibold text-lg">{name}</h3>
						{isVerified && (
							<div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
								<LucideCheck className="h-3 w-3 text-white" />
							</div>
						)}
					</div>
					<p className="text-muted-foreground text-sm">@{username}</p>

					{bio && <p className="text-sm mt-2">{bio}</p>}

					<div className="flex flex-col gap-2 mt-3">
						{company && (
							<div className="flex items-center text-sm">
								<LucideBriefcase className="h-4 w-4 mr-2 text-muted-foreground" />
								<span>{company}</span>
							</div>
						)}

						{location && (
							<div className="flex items-center text-sm">
								<LucideMapPin className="h-4 w-4 mr-2 text-muted-foreground" />
								<span>{location}</span>
							</div>
						)}

						{website && (
							<div className="flex items-center text-sm">
								<LucideLink className="h-4 w-4 mr-2 text-muted-foreground" />
								<a
									href={website}
									className="text-blue-600 hover:underline truncate max-w-[200px]"
								>
									{website.replace(/^https?:\/\//, '')}
								</a>
							</div>
						)}
					</div>
				</div>

				{(followersCount !== undefined || followingCount !== undefined) && (
					<div className="flex gap-4 mt-4 text-sm">
						{followersCount !== undefined && (
							<div>
								<span className="font-semibold">{followersCount}</span>
								<span className="text-muted-foreground ml-1">Followers</span>
							</div>
						)}

						{followingCount !== undefined && (
							<div>
								<span className="font-semibold">{followingCount}</span>
								<span className="text-muted-foreground ml-1">Following</span>
							</div>
						)}
					</div>
				)}
			</CardContent>

			{socialLinks.length > 0 && (
				<>
					<Separator />
					<CardFooter className="p-4 flex items-center gap-3 justify-center">
						{socialLinks.map((link, index) => {
							const SocialIcon = socialIcons[link.platform];
							return (
								<a
									key={index}
									href={link.url}
									className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
								>
									<SocialIcon className="h-5 w-5" />
								</a>
							);
						})}
					</CardFooter>
				</>
			)}
		</Card>
	);
}
