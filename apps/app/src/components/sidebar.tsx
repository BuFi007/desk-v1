import { Cookies } from "@/utils/constants";
import { Icons } from "@bu/ui/icons";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { MainMenu } from "./main-menu";
import { TeamMenu } from "./team-menu";

export async function Sidebar() {
  const cookieStore = await cookies();
  const initialItems = cookieStore.has(Cookies.MenuConfig)
    ? JSON.parse(cookieStore.get(Cookies.MenuConfig)!.value)
    : null;

  return (
    <aside className="h-screen flex-shrink-0 flex-col justify-between fixed top-0 ml-4 pb-4 items-center hidden md:flex">
      <div className="flex flex-col items-center justify-center">
        <div className="mt-6 todesktop:mt-[35px]">
          <Link href="/">
            <Icons.LogoSmall />
          </Link>
        </div>
        <MainMenu initialItems={initialItems} />
      </div>

      <Suspense>
        <TeamMenu />
      </Suspense>
    </aside>
  );
}