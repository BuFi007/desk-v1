import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
import { cn } from "../utils";
import { Button } from "./button";
import { Icons } from "./icons";
import React from "react";

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A navigation menu component with dropdowns and animations.",
      },
    },
  },
};

export default meta;

// ListItem component for reuse
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export const Default: StoryObj<typeof NavigationMenu> = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[400px]">
              <ListItem title="Introduction" href="#">
                A quick overview of the platform and its features.
              </ListItem>
              <ListItem title="Installation" href="#">
                Step-by-step guide to installing and setting up.
              </ListItem>
              <ListItem title="Documentation" href="#">
                Detailed documentation and API references.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[400px]">
              <ListItem title="Analytics" href="#">
                Powerful analytics and reporting tools.
              </ListItem>
              <ListItem title="Security" href="#">
                Advanced security features and compliance.
              </ListItem>
              <ListItem title="Integrations" href="#">
                Connect with your favorite tools and services.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithIcons: StoryObj<typeof NavigationMenu> = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Icons.Settings className="mr-2 h-4 w-4" />
            Settings
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[300px]">
              <ListItem 
                title="Profile"
                href="#"
                className="flex items-center"
              >
                <Icons.Person className="mr-2 h-4 w-4" />
                Manage your account settings
              </ListItem>
              <ListItem
                title="Preferences"
                href="#"
                className="flex items-center"
              >
                <Icons.Settings className="mr-2 h-4 w-4" />
                Customize your experience
              </ListItem>
              <ListItem
                title="Security"
                href="#"
                className="flex items-center"
              >
                <Icons.Security className="mr-2 h-4 w-4" />
                Security and privacy settings
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const GridLayout: StoryObj<typeof NavigationMenu> = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-2 gap-3 p-4 w-[500px]">
              {[
                {
                  title: "Analytics",
                  description: "Powerful analytics platform",
                  icon: <Icons.ChartGantt className="h-6 w-6" />,
                },
                {
                  title: "Security",
                  description: "Advanced security features",
                  icon: <Icons.Security className="h-6 w-6" />,
                },
                {
                  title: "Automation",
                  description: "Workflow automation tools",
                  icon: <Icons.Apple className="h-6 w-6" />,
                },
                {
                  title: "Integrations",
                  description: "Connect your tools",
                  icon: <Icons.Apps className="h-6 w-6" />,
                },
              ].map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink asChild>
                    <a className="flex select-none flex-col gap-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-muted-foreground">
                        {item.icon}
                      </div>
                      <div className="text-sm font-medium leading-none">
                        {item.title}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithViewport: StoryObj<typeof NavigationMenu> = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {solutions.map((solution) => (
                <ListItem
                  key={solution.title}
                  title={solution.title}
                  href="#"
                >
                  {solution.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// Example data
const solutions = [
  {
    title: "Enterprise",
    description: "Enterprise-grade security and features for large teams.",
  },
  {
    title: "Small Business",
    description: "Perfect for small to medium-sized businesses.",
  },
  {
    title: "Startups",
    description: "Flexible solutions for growing startups.",
  },
  {
    title: "Personal",
    description: "Individual plans for personal projects.",
  },
];