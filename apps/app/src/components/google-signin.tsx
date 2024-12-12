"use client";

import Circle from "@/context/Circle";
import { getSession } from "@/utils/supabase/session";
import { createClient } from "@bu/supabase/client";
import { Button } from "@bu/ui/button";
export function GoogleSignin() {
  const supabase = createClient();
  const session = getSession();
  const handleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={handleSignin} variant="outline" className="font-mono">
        Sign in with Google
      </Button>

      <Circle />
    </>
  );
}
