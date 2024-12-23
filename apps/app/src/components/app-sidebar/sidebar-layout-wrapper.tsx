"use client";

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@bu/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useMobile } from "@bu/ui/use-mobile";
import { Header } from "@/components/header";
import { Separator } from "@bu/ui/separator";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb"; // Add this import

interface LayoutWrapperProps {
  children: React.ReactNode;
  defaultOpen: boolean;
}
export function LayoutWrapper({ children, defaultOpen }: LayoutWrapperProps) {
  const isMobile = useMobile();

  return (
    <div className="relative flex flex-1">
      <SidebarProvider defaultOpen={defaultOpen}>
        {!isMobile && <AppSidebar />}
        <main className="flex-1">
          <SidebarInset>
            <header className="sticky top-16 z-40 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
              <div className="flex items-center gap-2 px-4 flex-1">
                {!isMobile && <SidebarTrigger className="-ml-1" />}
                <Separator orientation="vertical" className="mr-2 h-4" />
                <DynamicBreadcrumb />
              </div>
            </header>
            <div className="relative flex-1 flex-col gap-4 p-4 pt-0 bg-bg dark:bg-darkBg">
              {children}
            </div>
          </SidebarInset>
        </main>
      </SidebarProvider>
    </div>
  );
}
