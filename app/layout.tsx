"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useTheme } from "next-themes";
import CookieConsent from "@/components/CookieConsentBanner";
import AnnouncementBanner from "@/components/announcement-banner";
import { structuredData } from "@/config/site";
import Script from "next/script";

// Dynamically import components that aren't needed immediately
const Navbar = dynamic(() => import("@/components/navigation/Navbar"), {
  loading: () => <div className="h-16" />,
  ssr: false,
});

const Footer1 = dynamic(() => import("@/components/sections/Footer1"), {
  loading: () => <div className="h-16" />,
  ssr: false,
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { theme } = useTheme();

  // Define routes where the navbar should not be shown
  const noNavbarRoutes = [
    "/login",
    "/signup",
    "/reset-password",
    "/forgot-password",
  ];
  const isChatRoute = pathname.startsWith("/chat");
  const isAdminRoute = pathname.startsWith("/admin");
  const isPreviewRoute =
    pathname.startsWith("/templates/") && pathname.includes("/preview");
  const isexample = pathname.startsWith("/exc");
  const isHomePage = pathname === "/";

  // Determine whether to show the Navbar
  const showNavbar =
    !noNavbarRoutes.includes(pathname) &&
    !isAdminRoute &&
    !isexample &&
    !isChatRoute &&
    !isPreviewRoute;

  return (
    <html lang="en">
      <body className="font-sans dark:bg-[#09090b] dark:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <ReactQueryProvider>
              {/* Conditionally render Navbar */}
              {isHomePage && <AnnouncementBanner />}
              {showNavbar && <Navbar />}
              <CookieConsent />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(structuredData),
                }}
              />
              <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-MPS7L8N7TL"
              ></Script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MPS7L8N7TL');
    `,
                }}
              />
              {children}
              <Toaster />
              {showNavbar && <Footer1 />}
            </ReactQueryProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
