'use server';

import { logger } from "@bu/logger";
import { createClient } from "@bu/supabase/server";
import { UTCDate } from "@date-fns/utc";
import type { Client } from "../types";

export async function getUser() {
  const supabase = await createClient();

  try {
    const result = await supabase.auth.getUser();

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

export async function getPosts() {
  const supabase = await createClient();

  try {
    const result = await supabase.from("posts").select("*");

    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function getUserQuery(supabase: Client, userId: string) {
  return supabase
    .from("users")
    .select(
      `
      *,
      users_on_team!inner (
        team:team_id (
          id,
          name,
          email,
          inbox_id,
          logo_url,
          created_at,
          inbox_email,
          inbox_forwarding
        )
      )
    `
    )
    .eq("id", userId)
    .single()
    .throwOnError();
}
export async function getCurrentUserTeamQuery(supabase: Client) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return;
  }

  return getUserQuery(supabase, session.user?.id);
}

type GetUserInviteQueryParams = {
  code: string;
  email: string;
};

export async function getUserInviteQuery(
  supabase: Client,
  params: GetUserInviteQueryParams
) {
  return supabase
    .from("user_invites")
    .select("*")
    .eq("code", params.code)
    .eq("email", params.email)
    .single();
}

export async function getTeamMembersQuery(supabase: Client, teamId: string) {
  const { data } = await supabase
    .from("users_on_team")
    .select(
      `
      id,
      role,
      team_id,
      user:users(id, full_name, avatar_url, email)
    `
    )
    .eq("team_id", teamId)
    .order("created_at")
    .throwOnError();

  return {
    data,
  };
}

type GetTeamUserParams = {
  teamId: string;
  userId: string;
};

export async function getTeamUserQuery(
  supabase: Client,
  params: GetTeamUserParams
) {
  const { data } = await supabase
    .from("users_on_team")
    .select(
      `
      id,
      role,
      team_id,
      user:users(id, full_name, avatar_url, email)
    `
    )
    .eq("team_id", params.teamId)
    .eq("user_id", params.userId)
    .throwOnError()
    .single();

  return {
    data,
  };
}
export async function getTeamsByUserIdQuery(supabase: Client, userId: string) {
  return supabase
    .from("users_on_team")
    .select(
      `
      id,
      role,
      team:team_id(*)`
    )
    .eq("user_id", userId)
    .throwOnError();
}

export async function getTeamInvitesQuery(supabase: Client, teamId: string) {
  return supabase
    .from("user_invites")
    .select("id, email, code, role, user:invited_by(*), team:team_id(*)")
    .eq("team_id", teamId)
    .throwOnError();
}

export async function getUserInvitesQuery(supabase: Client, email: string) {
  return supabase
    .from("user_invites")
    .select("id, email, code, role, user:invited_by(*), team:team_id(*)")
    .eq("email", email)
    .throwOnError();
}

export async function getTeamNameQuery(supabase: Client, teamId: string) {
  const { data } = await supabase
    .from("teams")
    .select("name")
    .eq("id", teamId)
    .single()
    .throwOnError();

  return {
    data,
  };
}

export async function getUserTeamsQuery(supabase: Client, userId: string) {
  return supabase
    .from("users_on_team")
    .select(`
      id,
      role,
      is_primary_team,
      team:team_id (
        id,
        name,
        logo_url,
        email,
        inbox_id,
        created_at,
        inbox_email,
        inbox_forwarding
      )
    `)
    .eq("user_id", userId)
    .order("created_at")
    .throwOnError();
}

export async function getPrimaryTeamQuery(supabase: Client, userId: string) {
  return supabase
    .from("users_on_team")
    .select(`
      id,
      role,
      team:team_id (
        id,
        name,
        logo_url,
        email,
        inbox_id,
        created_at,
        inbox_email,
        inbox_forwarding
      )
    `)
    .eq("user_id", userId)
    .eq("is_primary_team", true)
    .single()
    .throwOnError();
}