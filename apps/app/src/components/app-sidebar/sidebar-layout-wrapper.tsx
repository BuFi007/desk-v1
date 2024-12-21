"use client";

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/bu/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import useMobile from "@bu/ui/use-mobile";

interface LayoutWrapperProps {
  children: React.ReactNode;
  defaultOpen: boolean;
}

export function LayoutWrapper({ children, defaultOpen }: LayoutWrapperProps) {
  const isMobile = useMobile();

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {!isMobile && <AppSidebar />}
      <main>
        <SidebarInset>
          {!isMobile && <SidebarTrigger />}
          {children}
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
}