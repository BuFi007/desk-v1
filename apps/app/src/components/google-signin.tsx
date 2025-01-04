"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@bu/supabase/client";
import { Button } from "@bu/ui/button";

export function GoogleSignin() {
  const supabase = createClient();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("return_to");

  const handleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);

      const redirectTo = new URL(
        "/api/auth/bu/callback",
        window.location.origin,
      );
      if (returnTo) {
        redirectTo.searchParams.append("return_to", returnTo);
      }

      const { data, error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectTo.toString(),
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (signInError) {
        console.error("Sign-in error:", signInError);
        setError(signInError.message);
        return;
      }

      if (!data) {
        setError("No response received from authentication provider");
        return;
      }
    } catch (err) {
      console.error("Unexpected error during sign-in:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleSignIn}
        variant="outline"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <FcGoogle className="mr-2 size-5" />
            Sign in with Google
          </>
        )}
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
