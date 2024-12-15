"use client";

import { AssistantButton } from "@/components/assistant/button";
import { MobileMenu } from "./mobile-menu";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BuLogo } from "@bu/ui/bu-logo";
import { UserMenu } from "@/components/user-menu";
import { Skeleton } from "@bu/ui/skeleton";
import { Suspense } from "react";

export function Header() {
  const { isConnected } = useAccount();

  return (
    <header className="-ml-4 -mr-4 md:m-0 z-10 px-4 md:px-0 md:border-b-[1px] todesktop:sticky todesktop:top-0 todesktop:bg-background todesktop:border-none sticky md:static top-0 backdrop-filter backdrop-blur-xl md:backdrop-filter md:backdrop-blur-none dark:bg-[#121212] bg-[#fff] bg-opacity-70">
      <div className="container mx-auto grid grid-cols-3 items-center z-100">
        {/* Left section */}
        <div className="flex items-center space-x-2">
          <MobileMenu />
          <AssistantButton />
          <span className="h-px flex-1 bg-border"></span>
        </div>

        {/* Center section */}
        <div className="flex justify-center">
          <BuLogo logo="/BooFi-icon.png" text="" />
        </div>

        {/* Right section */}
        <div className="flex items-center justify-end">
          <span className="h-px flex-1 bg-border"></span>
          <div className="flex items-center space-x-2">
            {!isConnected && <ConnectButton />}
            <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
              <UserMenu onlySignOut={false} />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
