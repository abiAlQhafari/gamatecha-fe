"use client";

import * as React from "react";
import {
  Command,
  History,
  Home,
  Pen,
  SquareTerminal,
  User,
} from "lucide-react";

import logo from "../../public/assets/images/Horizontal Putih Merah 0-2.png";

import { NavMain } from "@/src/components/nav-main";
import { NavUtils } from "@/src/components/nav-projects";
import { NavUser } from "@/src/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import { NavDashboard } from "./nav-dashboard";
import Image from "next/image";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://i.pravatar.cc/300",
  },
  dashboard: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
  ],
  navMain: [
    {
      title: "Menu Utama",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Artikel",
          url: "/dashboard/articles",
          icon: Pen,
        },
        {
          title: "Kategori",
          url: "/dashboard/categories",
          icon: Command,
        },
        {
          title: "User",
          url: "/dashboard/users",
          icon: User,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Riwayat Scraping",
      url: "/dashboard/riwayat-scraping",
      icon: History,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <Image src={logo} alt="Logo" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavDashboard items={data.dashboard} />
        <NavMain items={data.navMain} />
        <NavUtils projects={data.projects} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
