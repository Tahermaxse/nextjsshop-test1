import React from 'react';
import { Profile01 } from './profilecard';

export default function Demo01() {
	return (
		<Profile01
			name="Ryan Cooper"
			role="Project Manager"
			avatar="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300"
			projectName="Website Redesign"
			projectStatus="In Progress"
			dueDate="Jun 30, 2025"
			teamSize={5}
			members={[
				{
					name: 'Team Member 1',
					avatar:
						'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
				},
				{
					name: 'Team Member 2',
					avatar:
						'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=300',
				},
			]}
			projectUrl="#"
		/>
	);
}
