"use server";

import { LogEvents } from "@bu/events/events";
import { switchPrimaryTeam } from "@bu/supabase/mutations";
import { createClient } from "@bu/supabase/server";
import { revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { switchTeamSchema } from "./schema";

export const switchTeamAction = authActionClient
  .schema(switchTeamSchema)
  .metadata({
    name: "switch-primary-team",
    track: {
      event: LogEvents.SwitchTeam.name,
      channel: LogEvents.SwitchTeam.channel,
    },
  })
  .action(async ({ parsedInput: { teamId }, ctx: { user } }) => {
    const supabase = await createClient();

    const result = await switchPrimaryTeam(supabase, {
      userId: user.id,
      teamId,
    });

    if (!result?.data) {
      return {
        success: false,
        error: "Failed to switch team",
      };
    }

    revalidateTag(`user_${user.id}`);
    revalidateTag(`team_${teamId}`);
    revalidateTag(`team_user_${user.id}`);

    return {
      success: true,
      data: result.data,
    };
  });
