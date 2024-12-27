import { unstable_cache } from "next/cache";
import { cache } from "react";
import { createClient } from "../client/server";
import { getUserQuery, getTeamNameQuery } from "./index";

// Cache per request
export const getSession = cache(async () => {
  const supabase = createClient();

  const client = await supabase;
  return client.auth.getSession();
});

// Cache per request and revalidate every 30 minutes
export const getUser = cache(async () => {
  const {
    data: { session },
  } = await getSession();

  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const supabase = createClient();

  return unstable_cache(
    async () => {
      const resolvedSupabase = await supabase;
      return getUserQuery(resolvedSupabase, userId);
    },
    ["user", userId],
    {
      tags: [`user_${userId}`],
      // 30 minutes, jwt expires in 1 hour
      revalidate: 1800,
    }
  )();
});

// export const getTeamUser = async () => {
//   const supabase = createClient();
//   const { data } = await getUser();

//   return unstable_cache(
//     async () => {
//       return getTeamUserQuery(supabase, {
//         userId: data.id,
//         teamId: data.team_id,
//       });
//     },
//     ["team", "user", data.id],
//     {
//       tags: [`team_user_${data.id}`],
//       revalidate: 1800,
//     },
//   )(data.id);
// };

export const getTeamName = cache(async (teamId: string) => {
  if (!teamId) return null;

  const supabase = await createClient();

  return unstable_cache(
    async () => {
      return getTeamNameQuery(await supabase, teamId);
    },
    ["team_name", teamId],
    {
      tags: [`team_${teamId}`],
      revalidate: 1800,
    }
  )();
});
