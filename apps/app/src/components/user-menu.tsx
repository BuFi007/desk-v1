"use client";

import { createClient } from "../utils/client";
import { Chain } from "./blockchain/chain";
import { WalletSwitcherModal } from "./blockchain/chainSwitch/modal";
import { SignOut } from "./sign-out";
import { truncateAddress } from "@/utils";
import { Avatar, AvatarFallback, AvatarImageNext } from "@bu/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@bu/ui/dropdown-menu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function UserMenu({ onlySignOut }: { onlySignOut: boolean }) {
  const supabase = createClient();
  const [userData, setUserData] = useState<any>(null);
  const { address } = useAccount();
  async function fetchUserData() {
    const { data } = await supabase.auth.getUser();
    setUserData(data?.user);
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-full w-8 h-8 cursor-pointer">
          {userData?.user_metadata?.avatar_url && (
            <AvatarImageNext
              src={userData?.user_metadata?.avatar_url}
              alt={userData?.user_metadata?.full_name!}
              width={32}
              height={32}
              quality={100}
            />
          )}
          <AvatarFallback>
            <span className="text-xs">
              {userData?.user_metadata?.full_name?.charAt(0)?.toUpperCase()}
            </span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" sideOffset={10} align="end">
        {!onlySignOut && (
          <>
            <DropdownMenuLabel>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="truncate line-clamp-1 max-w-[155px] block">
                    {userData?.user_metadata?.full_name}
                  </span>
                  <span className="truncate text-xs text-[#606060] font-normal">
                    {userData?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link prefetch href="/account">
                <DropdownMenuItem>
                  Account
                  {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </Link>
              {address ? (
                <Link prefetch href="/account/teams">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Chain />
                    {truncateAddress(address)}
                  </DropdownMenuItem>
                </Link>
              ) : (
                <DropdownMenuItem>Not connected</DropdownMenuItem>
              )}

              <Link prefetch href="/account/support">
                <DropdownMenuItem>Support</DropdownMenuItem>
              </Link>

              <Link prefetch href="/account/teams">
                <DropdownMenuItem>
                  Teams
                  {/* <DropdownMenuShortcut>⌘E</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <WalletSwitcherModal />

            <DropdownMenuSeparator />
          </>
        )}

        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
