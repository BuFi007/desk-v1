import { Cookies } from "@/utils/constants";
import { LogEvents } from "@bu/events/events";
import { setupAnalytics } from "@bu/events/server";
import { getSession } from "@bu/supabase/cached-queries";
import { createClient } from "@bu/supabase/server";
import { addYears } from "date-fns";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const preferredRegion = ["fra1", "sfo1", "iad1"];

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");
  const client = requestUrl.searchParams.get("client");
  const returnTo = requestUrl.searchParams.get("return_to");
  const provider = requestUrl.searchParams.get("provider");

  if (client === "desktop") {
    return NextResponse.redirect(`${requestUrl.origin}/verify?code=${code}`);
  }

  if (provider) {
    cookieStore.set(Cookies.PreferredSignInProvider, provider, {
      expires: addYears(new Date(), 1),
    });
  }

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { session },
    } = await getSession();

    if (session) {
      const userId = session.user.id;

      const analytics = await setupAnalytics({
        userId,
        fullName: session.user.user_metadata?.full_name,
      });

      await analytics.track({
        event: LogEvents.SignIn.name,
        channel: LogEvents.SignIn.channel,
      });

      // If user have no teams, redirect to team creation
      const { count } = await supabase
        .from("users_on_team")
        .select("*", { count: "exact" })
        .eq("user_id", userId);

      if (count === 0 && !returnTo?.startsWith("teams/invite/")) {
        return NextResponse.redirect(`${requestUrl.origin}/teams/create`);
      }
    }
  }

  if (returnTo) {
    return NextResponse.redirect(`${requestUrl.origin}/${returnTo}`);
  }

  return NextResponse.redirect(requestUrl.origin);
}
