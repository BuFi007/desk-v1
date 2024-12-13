import { TeamDropdown } from "@/components/team-dropdown";
import { getTeams } from "@bu/supabase/cached-queries";
import { getUser } from "@bu/supabase/queries";

export async function TeamMenu() {
  const user = await getUser();
  const teams = await getTeams();

  return (
    <TeamDropdown
      selectedTeamId={user?.data?.team?.id}
      teams={teams?.data}
      key={user?.data?.team?.id}
    />
  );
}
