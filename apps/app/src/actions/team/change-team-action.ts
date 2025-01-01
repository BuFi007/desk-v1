"use server";

import { LogEvents } from "@bu/events/events";
import { addUserToTeam } from "@bu/supabase/mutations";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "../safe-action";
import { changeTeamSchema } from "./schema";

export const changeTeamAction = authActionClient
  .schema(changeTeamSchema)
  .metadata({
    name: "change-team",
    track: {
      event: LogEvents.ChangeTeam.name,
      channel: LogEvents.ChangeTeam.channel,
    },
  })
  .action(async ({ parsedInput: { teamId, redirectTo }, ctx: { user } }) => {
    const result = await addUserToTeam(user.id, teamId);

    if (!result?.data) {
      return;
    }

    revalidateTag(`user_${user.id}`);
    revalidateTag(`team_${teamId}`);

    redirect(redirectTo);
  });
