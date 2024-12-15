import { unstable_cache } from "next/cache";
import { cache } from "react";
import { createClient } from "../clients/server";
import { getUserQuery } from "./index";

export const getSession = cache(async () => {
  const supabase = createClient();
  return (await supabase).auth.getSession();
});
export const getUser = cache(async () => {
  const session = await getSession();

  const userId = session?.data?.session?.user?.id;

  if (!userId) {
    return null;
  }

  const supabase = await createClient();

  return unstable_cache(
    async () => {
      return getUserQuery(await supabase, userId);
    },
    ["user", userId],
    {
      tags: [`user_${userId}`],
      // 30 minutes, jwt expires in 1 hour
      revalidate: 1800,
    }
  )();
});
