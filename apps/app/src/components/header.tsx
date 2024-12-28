"use client";

import { AssistantButton } from "@/components/assistant/button";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  const { isConnected } = useAccount();

  return (
    <header className="relative m-4 md:m-0 z-10 px-4 border-b-4 border-border dark:border-darkNavBorder bg-white dark:bg-secondaryBlack">
      <div className="container mx-auto grid grid-cols-2 items-center z-50">
        {/* Left section */}
        <div className="flex items-center space-x-2">
          <AssistantButton />
          <span className="h-px flex-1 bg-border"></span>
        </div>

        {/* Right section */}
        <div className="flex items-center justify-end">
          <span className="h-px flex-1 bg-border"></span>
          <div className="flex items-center space-x-2">
            {!isConnected && <ConnectButton />}
          </div>
        </div>
      </div>
    </header>
  );
}
