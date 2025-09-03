import React from 'react';
import { Profile04 } from './profilecard';

export default function Demo04() {
	return (
		<Profile04
			name="Daniel Kim"
			title="Senior Developer"
			avatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300"
			skills={[
				{ name: 'JavaScript', level: 95 },
				{ name: 'React', level: 90 },
				{ name: 'Node.js', level: 85 },
				{ name: 'UI Design', level: 75 },
			]}
		/>
	);
}
