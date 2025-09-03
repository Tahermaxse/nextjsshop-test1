import React from 'react';
import { Profile09 } from './profilecard';

export default function Demo09() {
	return (
		<Profile09
			name="Emma Roberts"
			username="emma_design"
			bio="Digital product designer focused on creating beautiful and functional interfaces for web and mobile applications."
			avatar="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300"
			isVerified={true}
			company="DesignLabs Inc."
			location="San Francisco, CA"
			website="https://emmadesign.co"
			followersCount={1243}
			followingCount={452}
			socialLinks={[
				{ platform: 'twitter', username: 'emma_design', url: '#' },
				{ platform: 'instagram', username: 'emma_design', url: '#' },
				{ platform: 'linkedin', username: 'emmaroberts', url: '#' },
				{ platform: 'github', username: 'emmaroberts', url: '#' },
			]}
		/>
	);
}
