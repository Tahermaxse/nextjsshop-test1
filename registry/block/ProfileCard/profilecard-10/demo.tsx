import Profile10 from './profilecard';

export default function Demo10() {
	const profileData = {
		name: 'Sarah Anderson',
		role: 'Senior Product Designer',
		location: 'San Francisco, CA',
		avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah',
		bio: 'Passionate about creating intuitive and beautiful user experiences. Specialized in design systems and user research with 5+ years of experience in tech.',
		skills: [
			'UI/UX',
			'Design Systems',
			'User Research',
			'Figma',
			'Prototyping',
		],
		website: 'www.sarahanderson.design',
		email: 'sarah@example.com',
		phone: '+1 (555) 123-4567',
	};

	return <Profile10 {...profileData} />;
}
