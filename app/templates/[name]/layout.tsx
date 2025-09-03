'use client';

import { useTheme } from "next-themes"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme(); 
  return (
    <>
      {children}
    </>
  );
}
