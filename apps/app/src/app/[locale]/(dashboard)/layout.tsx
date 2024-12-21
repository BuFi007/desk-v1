import { cookies } from "next/headers"

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/bu/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main>
        <SidebarInset>
          <SidebarTrigger />
          {children}
        </SidebarInset>
      </main>
    </SidebarProvider>
  )
}
