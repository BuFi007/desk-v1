import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
  Map,
  PieChart,
  Send,
  SquareTerminal,
  Users,
} from "lucide-react";

  // TODO: replace icons with https://icons.pqoqubbw.dev/

export const sidebarItems = {
  navMain: [
    {
      title: "My Account",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "General Balance",
          url: "#",
        },
        {
          title: "Credit Card",
          url: "#",
        },
      ],
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
      title: "Customers",
      url: "/customers",
      icon: PieChart,
      items: [
        {
          title: "Customer History",
          url: "#",
        },

      ],
    },
    {
      title: "Teams",
      url: "/teams",
      icon: Users,
         items: [
        {
          title: "Members & Roles",
          url: "#",
        },

      ],
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: PieChart,
      items: [
        {
          title: "Transaction History",
          url: "#",
        },
      ],
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