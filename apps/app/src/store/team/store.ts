import { createContext } from "react";
import { createStore } from "zustand";

export type Team = {
  id: string;
  name: string;
  logo_url?: string;
  email?: string;
  inbox_id?: string;
  inbox_email?: string;
  inbox_forwarding?: boolean;
  created_at: string;
  role?: string;
  is_primary_team?: boolean;
};

export type TeamMembership = {
  id: string;
  role: string;
  is_primary_team: boolean;
  team: Team;
};

export interface TeamProps {
  data: TeamMembership | null;
  teams: TeamMembership[];
}

export interface TeamState extends TeamProps {
  setTeam: (team: TeamMembership) => void;
  setTeams: (teams: TeamMembership[]) => void;
}

export const createTeamStore = (initProps: TeamProps) => {
  return createStore<TeamState>()((set) => ({
    data: initProps?.data,
    teams: initProps?.teams || [],
    setTeam: (team: TeamMembership) => set({ data: team }),
    setTeams: (teams: TeamMembership[]) => set({ teams }),
  }));
};

export type TeamStore = ReturnType<typeof createTeamStore>;
export const TeamContext = createContext<TeamStore | null>(null);
