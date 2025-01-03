"use client";

import { Chain } from "@/components/blockchain/chain";
import { WalletSwitcherModal } from "@/components/blockchain/chainSwitch/modal";
import { SignOut } from "@/components/sign-out";
import { createClient } from "@/utils/client";
import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Network,
  Sparkles,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { truncateAddress } from "@/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarImageNext,
} from "@bu/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@bu/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@bu/ui/sidebar";
import { SignOutButton } from "./sign-out-button";
export function NavUser({ onlySignOut }: { onlySignOut: boolean }) {
  const supabase = createClient();
  const [userData, setUserData] = useState<{
    user_metadata?: { avatar_url?: string; full_name?: string; email?: string };
  } | null>(null);
  const { address } = useAccount();
  const { isMobile } = useSidebar();

  const fetchUserData = useMemo(
    () => async () => {
      const { data } = await supabase.auth.getUser();
      setUserData(data?.user);
    },
    [supabase],
  );

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-main data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg bg-main">
                {userData?.user_metadata?.avatar_url && (
                  <AvatarImageNext
                    src={userData?.user_metadata?.avatar_url}
                    alt={userData?.user_metadata?.full_name ?? "User"}
                    width={32}
                    height={32}
                    quality={100}
                  />
                )}
                <AvatarFallback className="rounded-lg bg-main">
                  {userData?.user_metadata?.full_name
                    ?.charAt(0)
                    ?.toUpperCase() ?? ""}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="truncate font-semibold">
                  {userData?.user_metadata?.full_name ?? "—"}
                </span>
                <span className="truncate text-xs">
                  {userData?.user_metadata?.email ?? "—"}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto h-4 w-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* If onlySignOut=false, show the usual user details & account links */}
            {!onlySignOut && (
              <>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      {userData?.user_metadata?.avatar_url && (
                        <AvatarImageNext
                          src={userData?.user_metadata?.avatar_url}
                          alt={
                            userData?.user_metadata?.full_name ?? "User avatar"
                          }
                          width={32}
                          height={32}
                          quality={100}
                        />
                      )}
                      <AvatarFallback className="rounded-lg">
                        {userData?.user_metadata?.full_name
                          ?.charAt(0)
                          ?.toUpperCase() ?? ""}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {userData?.user_metadata?.full_name ?? "—"}
                      </span>
                      <span className="truncate text-xs">
                        {userData?.user_metadata?.email ?? "—"}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <Link prefetch href="/account">
                    <DropdownMenuItem>
                      <Sparkles />
                      Account
                    </DropdownMenuItem>
                  </Link>

                  {/* Show address + chain if connected */}
                  {address ? (
                    <Link prefetch href="/account/teams">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <BadgeCheck />

                        <Chain />
                        {truncateAddress(address)}
                      </DropdownMenuItem>
                    </Link>
                  ) : (
                    <DropdownMenuItem>
                      {" "}
                      <BadgeCheck />
                      Not connected
                    </DropdownMenuItem>
                  )}

                  <Link prefetch href="/account/billing">
                    <DropdownMenuItem>
                      {" "}
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                  </Link>

                  <Link prefetch href="/account/teams">
                    <DropdownMenuItem>
                      <UserCog />
                      Teams
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                {/* Wallet switcher for changing blockchain networks */}
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Network />
                    <WalletSwitcherModal />
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
