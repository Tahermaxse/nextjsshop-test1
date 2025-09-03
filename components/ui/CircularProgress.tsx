import React from 'react';
import { useTheme } from 'next-themes';

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0-100
  color?: string;
  bgColor?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 32,
  strokeWidth = 4,
  progress,
  color = '#16A34A',
  bgColor = '#d1d5db',
}) => {
  const { theme } = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Use a lighter background color in dark mode
  const finalBgColor = theme === 'dark' ? '#27272a' : bgColor; 

  return (
    <svg width={size} height={size}>
      <circle
        stroke={finalBgColor}
        fill="none"
        strokeWidth={strokeWidth}
        cx={size / 2}
        cy={size / 2}
        r={radius}
      />
      <circle
        stroke={color}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.3s' }}
      />
    </svg>
  );
}; 