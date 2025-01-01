"use client";

import { Skeleton } from "@bu/ui/skeleton";

import type * as React from "react";
import { Suspense } from "react";

import { NavUser } from "@/components/nav-user";
import { ThemeSwitcherRadio } from "@/components/styling/theme-switch-radio";
import { TeamSwitcher } from "@/components/team-switcher";
import { BuLogo } from "@bu/ui/bu-logo";
import { NavMain } from "@bu/ui/nav-main";
import SidebarLoanBorrowCta from "@bu/ui/nav-money-market";
import { NavProjects } from "@bu/ui/nav-projects";
import { NavSecondary } from "@bu/ui/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@bu/ui/sidebar";
import { Wallet } from "lucide-react";
import { sidebarItems } from "./sidebar-items";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";
  return (
    <>
      <Sidebar variant="inset" collapsible="icon" {...props}>
        {isExpanded ? (
          <BuLogo logo="/logo.png" text="Bu" width={50} height={50} />
        ) : (
          <BuLogo logo="/logo.png" text="" width={50} height={50} />
        )}
        <SidebarHeader>
          <TeamSwitcher />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={sidebarItems.navMain} />
          <NavProjects projects={sidebarItems.projects} />
          <NavSecondary items={sidebarItems.navSecondary} className="mt-auto" />
          <ThemeSwitcherRadio />
        </SidebarContent>
        <SidebarFooter>
          <SidebarLoanBorrowCta isExpanded={isExpanded} loanIcon={Wallet} />
          <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
            <NavUser onlySignOut={false} />
          </Suspense>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
