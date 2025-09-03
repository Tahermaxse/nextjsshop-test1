"use client";

import { Toaster as HotToaster } from 'react-hot-toast';
import { useTheme } from 'next-themes';

export function Toaster() {
  const { theme } = useTheme();

  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: theme === 'dark' ? '#27272a' : '#ffffff',
          color: theme === 'dark' ? '#fafafa' : '#18181b',
          border: theme === 'dark' ? '1px solid #3f3f46' : '1px solid #e4e4e7',
          boxShadow: theme === 'dark' 
            ? 'inset 0 1px 3px 0 rgba(255,255,255,0.1), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' 
            : '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          transition: 'filter 200ms',
          filter: 'brightness(1)',
          borderBottomWidth: '2px',
          outline: '1px solid rgba(255, 255, 255, 0.25)',
          outlineOffset: 'inset',
        },
        success: {
          style: {
            background: 'linear-gradient(to top, #059669, #10b981)',
            color: '#ffffff',
            borderColor: 'rgba(6, 78, 59, 0.4)',
            boxShadow: '0 4px 6px -1px rgba(6, 78, 59, 0.2)',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#059669',
          },
        },
        error: {
          style: {
            background: 'linear-gradient(to top, #dc2626, #ef4444)',
            color: '#ffffff',
            borderColor: 'rgba(127, 29, 29, 0.4)',
            boxShadow: '0 4px 6px -1px rgba(127, 29, 29, 0.2)',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#dc2626',
          },
        },
        loading: {
          style: {
            background: theme === 'dark' 
              ? 'linear-gradient(to top, #3f3f46, #52525b)' 
              : 'linear-gradient(to top, #059669, #10b981)',
            color: theme === 'dark' ? '#fafafa' : '#ffffff',
            borderColor: theme === 'dark' ? '#3f3f46' : 'rgba(127, 29, 29, 0.4)',
            boxShadow: theme === 'dark'
              ? '0 4px 6px -1px rgba(24, 24, 27, 0.2)'
              : '0 4px 6px -1px rgba(6, 78, 59, 0.2)',
          },
          iconTheme: {
            primary: theme === 'dark' ? '#fafafa' : '#18181b',
            secondary: theme === 'dark' ? '#27272a' : '#ffffff',
          },
        },
      }}
    />
  );
}
