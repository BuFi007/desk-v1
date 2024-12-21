"use client"

import * as React from "react"
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
} from "lucide-react"

import { NavMain } from "@/bu/ui/sidebar/nav-main"
import { NavProjects } from "@/bu/ui/sidebar/nav-projects"
import { NavSecondary } from "@/bu/ui/sidebar/nav-secondary"
import { NavUser } from "@/bu/ui/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/bu/ui/sidebar"
import { TeamSwitcher } from "@/bu/ui/sidebar/team-switcher"
import { ThemeSwitcher } from "@/bu/ui/theme-switcher"

import { SidebarOptInForm } from "@/bu/ui/sidebar/cta/nav-opt-in"

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
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
       <TeamSwitcher />
       <ThemeSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <SidebarOptInForm />
        </div>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
