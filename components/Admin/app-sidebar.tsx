"use client";

import { usePathname } from "next/navigation"; // Import Next.js hook
import * as React from "react";
import { SearchForm } from "@/components/Admin/search-form";
import { TeamSwitcher } from "@/components/Admin/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  RiScanLine,
  RiBardLine,
  RiUserFollowLine,
  RiSettings3Line,
  RiLeafLine,
  RiLogoutBoxLine,
} from "@remixicon/react";

// Sample sidebar data
const data = {
  teams: [
    {
      name: "Nextjsshop",
      logo: "/images/logo.svg",
    },
  ],
  navMain: [
    {
      title: "Sections",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: RiScanLine,
        },
        {
          title: "Quote Request",
          url: "/admin/quoterequest",
          icon: RiBardLine,
        },
        {
          title: "Reports",
          url: "/admin/reports",
          icon: RiBardLine,
        },
        {
          title: "Users",
          url: "/admin",
          icon: RiUserFollowLine,
          isActive: true,
        },
        // {
        //   title: "Tools",
        //   url: "#",
        //   icon: RiCodeSSlashLine,
        // },
        // {
        //   title: "Integration",
        //   url: "#",
        //   icon: RiLoginCircleLine,
        // },
        // {
        //   title: "Layouts",
        //   url: "#",
        //   icon: RiLayoutLeftLine,
        // },
        // {
        //   title: "Reports",
        //   url: "#",
        //   icon: RiLeafLine,
        // },
      ],
    },
    {
      title: "Add",
      url: "#",
      items: [
        {
          title: "Template",
          url: "/admin/addtemplate",
          icon: RiSettings3Line,
        },
        {
          title: "Component",
          url: "/admin/addcomponent",
          icon: RiLeafLine,
        },
      ],
    },
    {
      title: "Edit",
      url: "#",
      items: [
        {
          title: "Template",
          url: "/admin/edittemplate",
          icon: RiSettings3Line,
        },
        {
          title: "Component",
          url: "/admin/editcomponent",
          icon: RiLeafLine,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname(); // Get current route

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <hr className="border-t border-border mx-2 -mt-px" />
        <SearchForm className="mt-3" />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="uppercase text-muted-foreground/60">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url; // Check if current route matches

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`group/menu-button font-medium gap-3 h-9 rounded-lg bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 
                          ${isActive ? "from-primary/20 to-primary/5 text-primary" : ""}`}
                        data-active={isActive}
                      >
                        <a href={item.url}>
                          {item.icon && (
                            <item.icon
                              className={`text-muted-foreground/60 ${isActive ? "text-primary" : ""}`}
                              size={22}
                              aria-hidden="true"
                            />
                          )}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <hr className="border-t border-border mx-2 -mt-px" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="font-medium gap-3 h-9 rounded-lg bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40">
              <RiLogoutBoxLine className="text-muted-foreground/60" size={22} aria-hidden="true" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
