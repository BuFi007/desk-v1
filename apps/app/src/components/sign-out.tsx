"use client";

import { createCircleUser } from "@/axios/circle";
import Circle from "@/context/Circle";
import { createClient } from "@bu/supabase/client";
import { Button } from "@bu/ui/button";
import { Icons } from "@bu/ui/icons";
import { useEffect } from "react";

export function SignOut() {
  const supabase = createClient();

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  useEffect(() => {
    // supabase.auth.onAuthStateChange((event, session) => {
    //   console.log(event, session, "daiskdkjdkjkajskjdaskjsdres");
    // });

    async function fetchData() {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Circle />
      <Button
        onClick={handleSignOut}
        variant="outline"
        className="font-mono gap-2 flex items-center"
      >
        <Icons.SignOut className="size-4" />
        <span>Sign out</span>
      </Button>
    </>
  );
}
