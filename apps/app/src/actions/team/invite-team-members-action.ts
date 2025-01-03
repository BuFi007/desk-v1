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

type InviteData = {
  email: string | null;
  code: string | null;
  user: {
    full_name: string | null;
    email: string | null;
    locale: string | null;
  } | null;
  team: {
    name: string | null;
  } | null;
};

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
      console.log("Starting invite process with data:", { invites, user });

      // Get team ID from the first team in users_on_team
      const teamId = user.users_on_team?.[0]?.team?.id;
      if (!teamId) {
        console.error("No team found in user data:", user);
        throw new Error("User does not belong to any team");
      }

      console.log("Using team ID:", teamId);

      const { t } = getI18n({ locale: user.locale as string });

      const headersData = await headers();
      const location = headersData.get("x-vercel-ip-city") ?? "Unknown";
      const ip = headersData.get("x-forwarded-for") ?? "127.0.0.1";

      const data = invites?.map((invite) => ({
        ...invite,
        team_id: teamId,
        invited_by: user.id,
      }));

      console.log("Prepared data for Supabase:", data);

      const supabaseClient = await supabase;

      const { data: invitesData, error: inviteError } = await supabaseClient
        .from("user_invites")
        .upsert(data, {
          onConflict: "email, team_id",
          ignoreDuplicates: false,
        })
        .select(`
          email,
          code,
          user:invited_by(
            full_name,
            email,
            locale
          ),
          team:team_id(
            name
          )
        `);

      if (inviteError) {
        console.error("Error creating invites:", inviteError);
        throw inviteError;
      }

      console.log("Received invites data from Supabase:", invitesData);

      const emails = invitesData?.map(async (invite: InviteData) => {
        console.log("Processing invite:", invite);

        if (
          !invite.email ||
          !invite.user?.full_name ||
          !invite.user?.email ||
          !invite.user?.locale ||
          !invite.team?.name ||
          !invite.code
        ) {
          console.error("Missing required fields:", { invite });
          throw new Error("Missing required fields for email invitation");
        }

        const subject = t("invite.subject", {
          invitedByName: user.full_name,
          teamName: invite.team.name,
        });

        console.log("Generated email subject:", subject);

        return {
          from: "Bu <bubot@bu.finance>",
          to: [invite.email],
          subject,
          headers: {
            "X-Entity-Ref-ID": nanoid(),
          },
          react: InviteEmail({
            invitedByEmail: user.email as string,
            invitedByName: user.full_name as string,
            email: invite.email,
            teamName: invite.team.name,
            inviteCode: invite.code,
            ip,
            location,
            locale: user.locale as string,
          }),
        };
      });

      const htmlEmails = emails ? await Promise.all(emails) : [];
      console.log("Prepared emails for sending:", htmlEmails);

      try {
        const result = await resend.batch.send(htmlEmails as any);
        console.log("Email sending result:", result);
      } catch (emailError) {
        console.error("Failed to send emails:", emailError);
        throw emailError;
      }

      if (revalidatePath) {
        revalidatePathFunc(revalidatePath);
      }

      if (redirectTo) {
        redirect(redirectTo);
      }
    },
  );
