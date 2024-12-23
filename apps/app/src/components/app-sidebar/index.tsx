"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  Send,
  Settings2,
  SquareTerminal,
  Users,
  PieChart,
} from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@bu/ui/skeleton";

import { NavMain } from "@bu/ui/nav-main";
import { NavProjects } from "@bu/ui/nav-projects";
import { NavSecondary } from "@bu/ui/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@bu/ui/sidebar";

import { TeamSwitcher } from "@bu/ui/team-switcher";
import { ThemeSwitcherMultiple } from "@/components/styling/theme-switcher-multiple";
import { BuLogo } from "@bu/ui/bu-logo";

// import { SidebarOptInForm } from "@bu/ui/nav-opt-in";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  // TODO: replace icons with https://icons.pqoqubbw.dev/

  navMain: [
    {
      title: "Home",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Customers",
      url: "/customers",
      icon: PieChart,
    },
    {
      title: "Teams",
      url: "/teams",
      icon: Users,
    },
    {
      title: "Invoices",
      url: "/invoices",
      icon: Bot,
      items: [
        {
          title: "Issued",
          url: "/invoices/issued",
        },
        {
          title: "Pending",
          url: "/invoices/pending",
        },
        {
          title: "Paid",
          url: "/invoices/paid",
        },
      ],
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: PieChart,
    },
    {
      title: "Account",
      url: "/account",
      icon: BookOpen,
      items: [
        {
          title: "General",
          url: "/account/general",
        },
        {
          title: "Settings",
          url: "/account/settings",
        },
        {
          title: "Team",
          url: "/account/team",
        },
        {
          title: "Security",
          url: "/account/security",
        },
        {
          title: "Billing",
          url: "/account/billing",
        },
        {
          title: "Notifications",
          url: "/account/notifications",
        },
        {
          title: "Limits",
          url: "/account/limits",
        },
        {
          title: "Tutorials",
          url: "/account/tutorials",
        },
        {
          title: "Export",
          url: "/account/export",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Documentation",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, isMobile } = useSidebar();
  const isExpanded = state === "expanded";
  return (
    <>
      {" "}
      <Sidebar variant="inset" collapsible="icon" {...props}>
        {isExpanded ? (
          <BuLogo logo="/BooFi-icon.png" text="Bu" width={50} height={50} />
        ) : (
          <BuLogo logo="/BooFi-icon.png" text="" width={50} height={50} />
        )}
        <SidebarHeader>
          <TeamSwitcher teams={[]} />
          <ThemeSwitcherMultiple />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          {/* <div className="p-1">
          <SidebarOptInForm />
        </div> */}
          <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
            <NavUser onlySignOut={false} />
          </Suspense>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
