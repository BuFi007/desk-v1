"use client";

import { switchTeamAction } from "@/actions/team/change-primary-team";
import { useTeamContext } from "@/store/team/hook";
import type { TeamMembership } from "@/store/team/store";
import { isMac } from "@bu/ui/use-is-mac";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../sidebar";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const currentTeam = useTeamContext((state) => state.data);
  const teams = useTeamContext((state) => state.teams);

  const handleTeamSwitch = (team: TeamMembership) => {
    startTransition(async () => {
      await switchTeamAction({
        parsedInput: {
          teamId: team.team.id,
        },
        ctx: {
          user: {
            id: currentTeam?.id || "",
          },
        },
      });
      router.refresh();
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              disabled={isPending}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {currentTeam?.team.logo_url && (
                  <img 
                    src={currentTeam.team.logo_url} 
                    alt={currentTeam.team.name}
                    className="size-4 object-contain" 
                  />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentTeam?.team.name || "Select Team"}
                </span>
                <span className="truncate text-xs">
                  {currentTeam ? `Role: ${currentTeam.role}` : "No team selected"}
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
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.team.id}
                onClick={() => handleTeamSwitch(team)}
                className="gap-2 p-2"
                disabled={isPending}
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {team.team.logo_url ? (
                    <img 
                      src={team.team.logo_url} 
                      alt={team.team.name}
                      className="size-4 shrink-0" 
                    />
                  ) : (
                    <div className="size-4 shrink-0 bg-muted" />
                  )}
                </div>
                {team.team.name}
                {team.is_primary_team && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    Current
                  </span>
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