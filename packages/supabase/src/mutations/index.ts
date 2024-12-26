import { logger } from "@bu/logger";
import { createClient } from "@bu/supabase/server";
import type { Client } from "../types";
import { getCurrentUserTeamQuery, getUserInviteQuery } from "../queries";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

import type { Database, Tables, TablesUpdate } from "../types";

export async function updateUser(
  userId: string,
  data: TablesUpdate<"users">
): Promise<PostgrestSingleResponse<{ id: string }>> {
  const supabase = await createClient();

  try {
    const result = await supabase
      .from("users")
      .update(data)
      .eq("id", userId)
      .select("id")
      .single();

    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function addUserToTeam(
  userId: string,
  teamId: string,
  role: "owner" | "member" = "member"
): Promise<PostgrestSingleResponse<{ user_id: string; team_id: string }>> {
  const supabase = await createClient();

  try {
    const result = await supabase
      .from("users_on_team")
      .insert({
        user_id: userId,
        team_id: teamId,
        role: role,
      })
      .select("user_id, team_id")
      .single();

    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function deleteUser(supabase: Client) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }

  await Promise.all([
    supabase.auth.admin.deleteUser(session.user.id),
    supabase.from("users").delete().eq("id", session.user.id),
    supabase.auth.signOut(),
  ]);

  return session.user.id;
}

export async function updateTeam(supabase: Client, data: any) {
  const response = await getCurrentUserTeamQuery(supabase);
  const userData = response?.data;

  if (!userData) {
    throw new Error("User data not found");
  }

  return supabase
    .from("teams")
    .update(data)
    .eq("id", userData?.team_id as string)
    .select("*")
    .maybeSingle();
}

type UpdateUserTeamRoleParams = {
  role: "owner" | "member";
  userId: string;
  teamId: string;
};

export async function updateUserTeamRole(
  supabase: Client,
  params: UpdateUserTeamRoleParams
) {
  const { role, userId, teamId } = params;

  return supabase
    .from("users_on_team")
    .update({
      role,
    })
    .eq("user_id", userId)
    .eq("team_id", teamId)
    .select()
    .single();
}

type DeleteTeamMemberParams = {
  userId: string;
  teamId: string;
};

export async function deleteTeamMember(
  supabase: Client,
  params: DeleteTeamMemberParams
) {
  return supabase
    .from("users_on_team")
    .delete()
    .eq("user_id", params.userId)
    .eq("team_id", params.teamId)
    .select()
    .single();
}

type CreateTeamParams = {
  name: string;
  currency?: string;
};

export async function createTeam(supabase: Client, params: CreateTeamParams) {
  const { data } = await supabase.rpc("create_team_v2", {
    name: params.name,
    currency: params.currency,
  });

  return data;
}

type LeaveTeamParams = {
  userId: string;
  teamId: string;
};

export async function leaveTeam(supabase: Client, params: LeaveTeamParams) {
  await supabase
    .from("users")
    .update({
      team_id: null,
    })
    .eq("id", params.userId)
    .eq("team_id", params.teamId);

  return supabase
    .from("users_on_team")
    .delete()
    .eq("team_id", params.teamId)
    .eq("user_id", params.userId)
    .select()
    .single();
}

export async function joinTeamByInviteCode(supabase: Client, code: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user.email) {
    return;
  }

  const { data: inviteData } = await getUserInviteQuery(supabase, {
    code,
    email: session.user.email,
  });

  if (inviteData && inviteData.team_id) {
    // Add user team
    await supabase.from("users_on_team").insert({
      user_id: session.user.id,
      team_id: inviteData.team_id,
      role: inviteData.role,
    });

    // Set current team
    const { data } = await supabase
      .from("users")
      .update({
        team_id: inviteData?.team_id,
      })
      .eq("id", session.user.id)
      .select()
      .single();

    // remove invite
    await supabase.from("user_invites").delete().eq("code", code);

    return data;
  }

  return null;
}
