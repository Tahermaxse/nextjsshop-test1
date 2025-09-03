'use client';

import * as React from 'react';
import Dropdown07 from './dropdown'; // Updated import

export type ColorPalette = {
	id: string;
	name: string;
	colors: string[];
};

export const colorPalettes: ColorPalette[] = [
	{
		id: 'modern',
		name: 'Modern',
		colors: ['#1a1a1a', '#4a4a4a', '#7a7a7a', '#dadada', '#f5f5f5'],
	},
	{
		id: 'nature',
		name: 'Nature',
		colors: ['#2d5a27', '#5a8f51', '#87c37b', '#b4e6a5', '#e1f7cf'],
	},
	{
		id: 'ocean',
		name: 'Ocean',
		colors: ['#1e3d59', '#3d7ea6', '#5cb3d4', '#7ed4f2', '#a1f5ff'],
	},
	{
		id: 'sunset',
		name: 'Sunset',
		colors: ['#ff4e50', '#fc913a', '#f9d423', '#ede574', '#e1f5c4'],
	},
];

export function Demo07() {
	return (
		<div className="max-w-md w-full mx-auto px-4 py-10">
			<Dropdown07
				onSelectPalette={(palette) => console.log('Selected palette:', palette)}
			/>
		</div>
	);
}
