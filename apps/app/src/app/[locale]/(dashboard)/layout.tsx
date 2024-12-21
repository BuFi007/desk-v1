// Layout.tsx (Server Component)
import { cookies } from "next/headers";
import { LayoutWrapper } from "@/components/app-sidebar/sidebar-layout-wrapper";

export async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return <LayoutWrapper defaultOpen={defaultOpen}>{children}</LayoutWrapper>;
}