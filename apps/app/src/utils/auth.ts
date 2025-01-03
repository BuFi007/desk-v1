import { getCurrentUserTeamQuery } from "@bu/supabase/queries";
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from "next/server";

interface RedirectOptions {
  origin: string;
  pathname: string;
  searchParams?: URLSearchParams;
}

export const createRedirectResponse = ({ origin, pathname, searchParams }: RedirectOptions) => {
  const url = new URL(pathname, origin);
  if (searchParams) {
    url.search = searchParams.toString();
  }
  return NextResponse.redirect(url);
};

export const checkUserTeam = async (supabase: SupabaseClient) => {
  try {
    const userTeam = await getCurrentUserTeamQuery(supabase);
    return userTeam?.data?.users_on_team?.[0] ?? null;
  } catch (error) {
    return null;
  }
};

export const handleAuthRedirect = async (
  request: NextRequest,
  session: Session | null,
  pathname: string
) => {
  if (!session && pathname !== "/login") {
    const params = new URLSearchParams();
    const returnPath = `${pathname.substring(1)}${request.nextUrl.search}`;
    if (returnPath) {
      params.append("return_to", returnPath);
    }
    return createRedirectResponse({ 
      origin: request.url, 
      pathname: "/login",
      searchParams: params
    });
  }
  return null;
};

export const handleUserSetup = (
  pathname: string,
  session: Session | null,
  origin: string
) => {
  const needsSetup = !session?.user?.user_metadata?.full_name;
  const isSetupRoute = pathname === "/setup" || pathname === "/teams/create";
  const isInviteRoute = pathname.startsWith("/teams/invite/");

  if (needsSetup && !isSetupRoute) {
    if (isInviteRoute) {
      return createRedirectResponse({ origin, pathname });
    }
    return createRedirectResponse({ origin, pathname: "/setup" });
  }
  return null;
};