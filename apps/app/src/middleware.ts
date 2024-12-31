import { updateSession } from "@bu/supabase/middleware";
import { getCurrentUserTeamQuery } from "@bu/supabase/queries";
import { createClient } from "@bu/supabase/server";
import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export async function middleware(request: NextRequest) {
  const response = await updateSession(request, I18nMiddleware(request));
  const supabase = await createClient();
  const url = new URL("/", request.url);
  const nextUrl = request.nextUrl;

  const pathnameLocale = nextUrl.pathname.split("/", 2)?.[1];

  // Remove the locale from the pathname
  const pathnameWithoutLocale = pathnameLocale
    ? nextUrl.pathname.slice(pathnameLocale.length + 1)
    : nextUrl.pathname;

  // Create a new URL without the locale in the pathname
  const newUrl = new URL(pathnameWithoutLocale || "/", request.url);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Not authenticated
  if (!session && newUrl.pathname !== "/login") {
    const encodedSearchParams = `${newUrl.pathname.substring(1)}${
      newUrl.search
    }`;

    const url = new URL("/login", request.url);

    if (encodedSearchParams) {
      url.searchParams.append("return_to", encodedSearchParams);
    }

    return NextResponse.redirect(url);
  }

  // If authenticated but no full_name redirect to user setup page
  if (
    newUrl.pathname !== "/setup" &&
    newUrl.pathname !== "/teams/create" &&
    session &&
    !session?.user?.user_metadata?.full_name
  ) {
    // Check if the URL contains an invite code
    const inviteCodeMatch = newUrl.pathname.startsWith("/teams/invite/");

    if (inviteCodeMatch) {
      return NextResponse.redirect(`${url.origin}${newUrl.pathname}`);
    }

    return NextResponse.redirect(`${url.origin}/setup`);
  }
  // If authenticated but no team, redirect to teams/create
  if (
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    session &&
    session?.user?.user_metadata?.full_name &&
    newUrl.pathname !== "/teams/create" &&
    !newUrl.pathname.startsWith("/teams/invite/")
  ) {
    try {
      const userTeam = await getCurrentUserTeamQuery(supabase);
      const teamName = userTeam?.data?.users_on_team?.[0]?.team?.name;

      console.log("userTeam", userTeam);

      if (!teamName || teamName === null) {
        return NextResponse.redirect(`${url.origin}/teams/create`);
      }
    } catch (error) {
      // If there's an error fetching the team, we should still redirect to teams/create
      return NextResponse.redirect(`${url.origin}/teams/create`);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|monitoring|images|logo.png|.*\\.png$).*)',
  ],
};