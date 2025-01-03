"use server";

import { LogEvents } from "@bu/events/events";
import { getCurrency } from "@bu/location";
import { createTeam } from "@bu/supabase/mutations";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "../safe-action";
import { createTeamSchema } from "./schema";

export const createTeamAction = authActionClient
  .schema(createTeamSchema)
  .metadata({
    name: "create-team",
    track: {
      event: LogEvents.CreateTeam.name,
      channel: LogEvents.CreateTeam.channel,
    },
  })
  .action(
    async ({
      parsedInput: { name, logo_url, redirectTo },
      ctx: { supabase },
    }) => {
      try {
        const resolvedSupabase = await supabase;
        const currency = await getCurrency();

        // Get user session
        const {
          data: { session },
        } = await resolvedSupabase.auth.getSession();
        if (!session?.user?.id) throw new Error("No session found");

        const team_id = await createTeam(resolvedSupabase, {
          name,
          currency,
          logo_url,
        });

        // Revalidate tags using session user id
        revalidateTag(`teams_${session.user.id}`);

        if (redirectTo) {
          redirect(redirectTo);
        }

        return team_id;
      } catch (error) {
        console.error("Error creating team:", error);
        throw error;
      }
    },
  );
