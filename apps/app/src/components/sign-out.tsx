"use client";

import { createClient } from "@bu/supabase/client";
import { Button } from "@bu/ui/button";
import { Icons } from "@bu/ui/icons";
import { useRouter } from "next/navigation";

export function SignOut() {
  const supabase = createClient();
  const route = useRouter();
  const handleSignOut = () => {
    supabase.auth.signOut();
    route.push("/");
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="font-mono gap-2 flex items-center w-full"
    >
      <Icons.AlertCircle className="size-4" />
      <span>Sign out</span>
    </Button>
  );
}
