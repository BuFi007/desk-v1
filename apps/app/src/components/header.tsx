"use client";

import { AssistantButton } from "@/components/assistant/button";
import { MobileMenu } from "./mobile-menu";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BuLogo } from "@bu/ui/bu-logo";
import { UserMenu } from "@/components/user-menu";
import { Skeleton } from "@bu/ui/skeleton";
import { Suspense } from "react";
import { useMobile } from "@bu/ui/use-mobile";

export function Header() {
  const { isConnected } = useAccount();
  const isMobile = useMobile();

  return (
    <nav className="fixed left-0 top-0 z-20 mx-auto flex h-[88px] w-full items-center border-b-4 border-border dark:border-darkNavBorder bg-white dark:bg-secondaryBlack px-5 m500:h-16 ">
      <div className="container mx-auto grid grid-cols-3 items-center z-100">
        {/* Left section */}
        <div className="flex items-center space-x-2">
          {isMobile && <MobileMenu />}
          <AssistantButton />
          <span className="h-px flex-1 bg-border dark:border-white"></span>
        </div>

        {/* Center section */}
        <div className="flex justify-center">
          <BuLogo logo="/BooFi-icon.png" text="" />
        </div>
        {/* Right section */}
        <div className="flex items-center justify-end">
          <span className="h-px flex-1 bg-border dark:border-white"></span>
          <div className="flex items-center space-x-2">
            {!isConnected && <ConnectButton />}
            <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
              <UserMenu onlySignOut={false} />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
}
