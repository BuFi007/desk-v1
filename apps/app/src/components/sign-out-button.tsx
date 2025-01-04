"use client";

import { createClient } from "@bu/supabase/client";
import { Button } from "@bu/ui/button";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="w-full"
      onClick={() => {
        supabase.auth.signOut();
        router.push("/");
      }}
    >
      Log out
    </Button>
  );
}
