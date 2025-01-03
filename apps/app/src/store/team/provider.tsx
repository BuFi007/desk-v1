"use client";

import { useEffect } from "react";
import { TeamContext, type TeamProps, createTeamStore } from "./store";

export type TeamProviderProps = React.PropsWithChildren<TeamProps>;

export function TeamProvider({ children, data, teams }: TeamProviderProps) {
  const store = createTeamStore({ data, teams });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    store.setState({ data, teams });
  }, [data, teams]);

  return <TeamContext.Provider value={store}>{children}</TeamContext.Provider>;
}
