import React from 'react';
import { Profile02 } from './profilecard';

export default function Demo02() {
	return (
		<Profile02
			name="Donna Scott"
			title="Marketing Manager"
			company="catalyst"
			avatar="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300"
			location="Manhattan, New York"
			specialties={['Marketing', 'SEO', 'Team Leader']}
			email="donna@mintlifyuii.com"
		/>
	);
}
