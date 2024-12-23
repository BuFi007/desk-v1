"use client";
import { FcGoogle } from "react-icons/fc";

import { createClient } from "@bu/supabase/client";
import { Button } from "@bu/ui/button";

export function GoogleSignin() {
  const supabase = createClient();

  const handleSignin = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <Button onClick={handleSignin} variant="outline" className="w-full">
      <FcGoogle className="mr-2 size-5" />
      Sign in with Google
    </Button>
  );
}
