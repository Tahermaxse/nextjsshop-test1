import React from 'react';
import { Profile05 } from './profilecard';

export default function Demo05() {
	return (
		<Profile05
			name="Sarah Johnson"
			title="Design Lead"
			avatar="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300"
			achievements={[
				{ icon: 'trophy', label: 'Top Designer' },
				{ icon: 'star', label: '5 Years' },
				{ icon: 'award', label: '20+ Projects' },
			]}
			level="Master"
			score={865}
		/>
	);
}
