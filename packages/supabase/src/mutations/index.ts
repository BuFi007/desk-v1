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
    .eq("id", userData.team_id)
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
