import { checkUserTeam, createRedirectResponse, handleAuthRedirect, handleUserSetup } from "@/utils/auth";
import { updateSession } from "@bu/supabase/middleware";
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
  const nextUrl = request.nextUrl;

  const pathnameLocale = nextUrl.pathname.split("/", 2)?.[1];
  const pathnameWithoutLocale = pathnameLocale
    ? nextUrl.pathname.slice(pathnameLocale.length + 1)
    : nextUrl.pathname;
  const newUrl = new URL(pathnameWithoutLocale || "/", request.url);

  const { data: { session } } = await supabase.auth.getSession();

  // Handle authentication redirect
  const authRedirect = await handleAuthRedirect(request, session, newUrl.pathname);
  if (authRedirect) return authRedirect;

  // Handle user setup redirect
  const setupRedirect = handleUserSetup(newUrl.pathname, session, request.url);
  if (setupRedirect) return setupRedirect;

  // Handle team check
  if (session?.user?.user_metadata?.full_name && 
      newUrl.pathname !== "/teams/create" && 
      !newUrl.pathname.startsWith("/teams/invite/")) {
    const teamName = await checkUserTeam(supabase);
    if (!teamName) {
      return createRedirectResponse({ 
        origin: request.url, 
        pathname: "/teams/create" 
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|monitoring|images|logo.png|.*\\.png$).*)',
  ],
};