"use server";

import { resend } from "@/utils/resend";
import InviteEmail from "@bu/email/emails/invite";
import { getI18n } from "@bu/email/locales";
import { LogEvents } from "@bu/events/events";
import { render } from "@react-email/render";
import { nanoid } from "nanoid";
import { revalidatePath as revalidatePathFunc } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authActionClient } from "../safe-action";
import { inviteTeamMembersSchema } from "./schema";

export const inviteTeamMembersAction = authActionClient
  .schema(inviteTeamMembersSchema)
  .metadata({
    name: "invite-team-members",
    track: {
      event: LogEvents.InviteTeamMembers.name,
      channel: LogEvents.InviteTeamMembers.channel,
    },
  })
  .action(
    async ({
      parsedInput: { invites, redirectTo, revalidatePath },
      ctx: { user, supabase },
    }) => {
      const { t } = getI18n({ locale: user.locale });

      const headersData = await headers();
      const location = headersData.get("x-vercel-ip-city") ?? "Unknown";
      const ip = headersData.get("x-forwarded-for") ?? "127.0.0.1";

      const data = invites?.map((invite) => ({
        ...invite,
        team_id: user.team_id,
        invited_by: user.id,
      }));

      const { data: invitesData } = await supabase
        .from("user_invites")
        .upsert(data, {
          onConflict: "email, team_id",
          ignoreDuplicates: false,
        })
        .select("email, code, user:invited_by(*), team:team_id(*)");

      const emails = invitesData?.map(
        async (invites: {
          email: string;
          user: { full_name: string; email: string; locale: string };
          team: { name: string };
          code: any;
        }) => ({
          from: "Bu <bubot@bu.finance>",
          to: [invites.email],
          subject: t("invite.subject", {
            invitedByName: invites.user.full_name,
            teamName: invites.team.name,
          }),
          headers: {
            "X-Entity-Ref-ID": nanoid(),
          },
          html: await render(
            InviteEmail({
              invitedByEmail: invites.user.email,
              invitedByName: invites.user.full_name,
              email: invites.email,
              teamName: invites.team.name,
              inviteCode: invites.code,
              ip,
              location,
              locale: invites.user.locale,
            })
          ),
        })
      );

      const htmlEmails = await Promise.all(emails);

      await resend.batch.send(htmlEmails);

      if (revalidatePath) {
        revalidatePathFunc(revalidatePath);
      }

      if (redirectTo) {
        redirect(redirectTo);
      }
    }
  );
