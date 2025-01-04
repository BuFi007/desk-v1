"use client";

import { switchTeamAction } from "@/actions/team/change-primary-team";
import { usePrimaryTeam, useUser, useUserTeams } from "@/hooks/use-team";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@bu/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@bu/ui/sidebar";
import { Skeleton } from "@bu/ui/skeleton";
import { isMac } from "@bu/ui/use-is-mac";
import { useToast } from "@bu/ui/use-toast";
import { ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const { toast } = useToast();
  const router = useRouter();
  const [switchingTeamId, setSwitchingTeamId] = React.useState<string | null>(
    null,
  );

  const { data: user, isLoading: isLoadingUser } = useUser();
  const { data: teams, isLoading: isLoadingTeams } = useUserTeams();
  const { data: primaryTeam, isLoading: isLoadingPrimaryTeam } =
    usePrimaryTeam();

  const isLoading = isLoadingUser || isLoadingTeams || isLoadingPrimaryTeam;

  const activeTeamName = primaryTeam?.data?.team?.name;
  const activeTeamLogo = primaryTeam?.data?.team?.logo_url;
  const activeTeamRole = teams?.data?.find(
    (team) => team.id === primaryTeam?.data?.team?.id,
  )?.role;

  const allTeams =
    teams?.data?.map((team) => ({
      id: team.team.id,
      name: team.team.name,
      logo_url: team.team.logo_url,
      role: team.role,
      is_primary_team: team.is_primary_team,
    })) || [];

  const switchActiveTeam = useAction(switchTeamAction, {
    onExecute: ({ input }) => {
      setSwitchingTeamId(input.teamId);
    },
    onSuccess: ({ input }) => {
      const teamName = allTeams.find((team) => team.id === input.teamId)?.name;
      toast({
        duration: 3500,
        variant: "success",
        title: `Team switched successfully to ${teamName}`,
      });
      router.refresh();
      setSwitchingTeamId(null);
    },
    onError: () => {
      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
      setSwitchingTeamId(null);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-2">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeTeamLogo && (
                  <Image
                    src={activeTeamLogo}
                    alt={activeTeamName || ""}
                    width={32}
                    height={32}
                    className="rounded-lg object-cover"
                  />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeamName || "Select Team"}
                </span>
                <span className="truncate text-xs">
                  {activeTeamRole || "No role"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {allTeams?.map((team, index) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => switchActiveTeam.execute({ teamId: team.id })}
                disabled={switchActiveTeam.status === "executing"}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {team.logo_url ? (
                    <Image
                      src={team.logo_url}
                      alt={team.name || ""}
                      width={32}
                      height={32}
                      className="size-4 shrink-0 rounded object-cover"
                    />
                  ) : (
                    <div className="size-4 shrink-0 bg-muted rounded" />
                  )}
                </div>
                <span className="flex-1">{team.name}</span>
                {switchActiveTeam.status === "executing" &&
                  switchingTeamId === team.id && (
                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                  )}
                {team.is_primary_team && (
                  <span className="text-xs text-muted-foreground">Current</span>
                )}
                <DropdownMenuShortcut>
                  {isMac ? "⌘" : "Ctrl"}
                  {index + 1}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
