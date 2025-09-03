import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserRound, MapPin, Link, Mail, Phone } from 'lucide-react';

interface ProfileCardProps {
	name: string;
	role: string;
	location: string;
	avatar?: string;
	bio: string;
	skills: string[];
	website?: string;
	email: string;
	phone: string;
}

export default function Profile10({
	name,
	role,
	location,
	avatar,
	bio,
	skills,
	website,
	email,
	phone,
}: ProfileCardProps) {
	return (
		<Card className="w-full max-w-md p-4 sm:p-6 bg-white dark:bg-zinc-950 hover:shadow-md relative overflow-hidden animate-fade-in border dark:border-zinc-800">
			{/* Background Pattern */}
			<div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-zinc-100 dark:bg-zinc-800 rounded-full -translate-y-1/2 translate-x-1/2" />

			<div className="relative z-10 space-y-4 sm:space-y-6">
				{/* Header Section */}
				<div className="flex flex-col sm:flex-row items-start gap-4">
					<Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-white dark:border-zinc-900 shadow-lg">
						<AvatarImage src={avatar} />
						<AvatarFallback>
							<UserRound className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-600 dark:text-zinc-400" />
						</AvatarFallback>
					</Avatar>

					<div className="flex-1 space-y-1 sm:space-y-2">
						<div>
							<h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
								{name}
							</h2>
							<p className="text-zinc-600 dark:text-zinc-400 font-medium">
								{role}
							</p>
						</div>
						<div className="flex items-center text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm">
							<MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
							{location}
						</div>
					</div>
				</div>

				{/* Bio Section */}
				<p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
					{bio}
				</p>

				{/* Skills Section */}
				<div className="flex flex-wrap gap-2">
					{skills.map((skill) => (
						<Badge
							key={skill}
							variant="secondary"
							className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
						>
							{skill}
						</Badge>
					))}
				</div>

				{/* Contact Section */}
				<div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-zinc-100 dark:border-zinc-800">
					{website && (
						<Button
							variant="outline"
							className="w-full justify-start text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-600 text-xs sm:text-sm"
						>
							<Link className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
							{website}
						</Button>
					)}
					<Button
						variant="outline"
						className="w-full justify-start text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-600 text-xs sm:text-sm"
					>
						<Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
						{email}
					</Button>
					<Button
						variant="outline"
						className="w-full justify-start text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-600 text-xs sm:text-sm"
					>
						<Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
						{phone}
					</Button>
				</div>
			</div>
		</Card>
	);
}
