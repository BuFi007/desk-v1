"use client";

import { createClient } from "@bu/supabase/client";
import { Button } from "@bu/ui/button";

export function SignOutButton() {
  const supabase = createClient();

  return (
    <Button
      variant="ghost"
      className="w-full"
      onClick={() => supabase.auth.signOut()}
    >
      Log out
    </Button>
  );
}
