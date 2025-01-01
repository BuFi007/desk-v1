"use client";

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@bu/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@bu/ui/separator";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import GridPattern from "@bu/ui/grid-pattern";
import { Header } from "@/components/header";
import { cn } from "@bu/ui/cn";

interface LayoutWrapperProps {
  children: React.ReactNode;
  defaultOpen: boolean;
}
export function LayoutWrapper({ children, defaultOpen }: LayoutWrapperProps) {
  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="flex-1">
          <Header />
          <SidebarInset>
            <header className="top-12 z-40 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear bg-transparent">
              <GridPattern
                width={20}
                height={20}
                x={-1}
                y={-1}
                className={cn(
                  "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
                )}
              />
              <div className="flex items-center gap-2 px-4 flex-1">
                <SidebarTrigger className="-ml-1" />
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
    </>
  );
}
