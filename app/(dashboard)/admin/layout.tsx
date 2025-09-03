"use client";

import React from "react";
import { usePathname } from "next/navigation"; // Import Next.js hook
import { AppSidebar } from "@/components/Admin/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserDropdown from "@/components/Admin/user-dropdown";
import { RiHomeLine } from "@remixicon/react"; // Home icon

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname(); // Get current route

  // Convert path to breadcrumb items
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment); // Remove empty parts

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger className="-ms-4" />
              <Separator orientation="vertical" className="mr-2 h-4" />

              {/* Breadcrumb */}
              <Breadcrumb>
                <BreadcrumbList>
                  {/* Home Link */}
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                      <RiHomeLine size={22} aria-hidden="true" />
                      <span className="sr-only">Home</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  {/* Dynamic Breadcrumbs */}
                  {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathSegments.length - 1;
                    const label =
                      segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize

                    return (
                      <React.Fragment key={href}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage>{label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex">
              <UserDropdown />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
