import { createClient } from "../clients/server";
import { unstable_cache } from "next/cache";
import { getTeamsByUserIdQuery, getUser } from "./index";
import {
  type GetTeamBankAccountsParams,
  getTeamBankAccountsQuery,
} from "./index";

export const getTeamBankAccounts = async (
  params?: Omit<GetTeamBankAccountsParams, "teamId">,
) => {
  const supabase = createClient();

  const user = await getUser();
  const teamId = user?.data?.team_id;

  if (!teamId) {
    return null;
  }

  return unstable_cache(
    async () => {
      return getTeamBankAccountsQuery(supabase, { ...params, teamId });
    },
    ["bank_accounts", teamId],
    {
      tags: [`bank_accounts_${teamId}`],
      revalidate: 180,
    },
  )(params);
};

export const getTeams = async () => {
  const supabase = createClient();

  const user = await getUser();
  const userId = user?.data?.id;

  if (!userId) {
    return;
  }

  return unstable_cache(
    async () => {
      return getTeamsByUserIdQuery(supabase, userId);
    },
    ["teams", userId],
    {
      tags: [`teams_${userId}`],
      revalidate: 180,
    },
  )();
};

