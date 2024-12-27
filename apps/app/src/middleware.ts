import { updateSession } from "@bu/supabase/middleware";
import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@bu/supabase/client";
import { getUser, getTeamName } from "@bu/supabase/cached-queries";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(
    request,
    I18nMiddleware(request)
  );

  const supabase = createClient();

  const url = new URL("/", request.url);
  const nextUrl = request.nextUrl;
  const pathnameLocale = nextUrl.pathname.split("/", 2)?.[1];

  // Remove the locale from the pathname
  const pathnameWithoutLocale = pathnameLocale
    ? nextUrl.pathname.slice(pathnameLocale.length + 1)
    : nextUrl.pathname;

  const newUrl = new URL(pathnameWithoutLocale || "/", request.url);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userData = await getUser();

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

  if (!userData && newUrl.pathname !== "/login") {
    const encodedSearchParams = `${newUrl.pathname.substring(1)}${newUrl.search}`;
    const url = new URL("/login", request.url);
    if (encodedSearchParams) {
      url.searchParams.append("return_to", encodedSearchParams);
    }
    return NextResponse.redirect(url);
  }

  // If authenticated but no team name redirect to user setup page
  if (userData) {
    const teamId = userData?.data?.team_id;
    // Check if user's team has a name using cached query
    const teamData = teamId ? await getTeamName(teamId) : null;
    const hasTeamName = teamData?.data?.name;

    // Redirect to team creation if no team name and not already on setup pages
    if (
      !hasTeamName &&
      !newUrl.pathname.startsWith("/setup") &&
      !newUrl.pathname.startsWith("/teams/create") &&
      !newUrl.pathname.startsWith("/teams/invite/")
    ) {
      return NextResponse.redirect(`${url.origin}/teams/create`);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
