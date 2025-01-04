import { SetupForm } from "@/components/setup-account/setup-form";
import { getUser } from "@bu/supabase/cached-queries";
import { Icons } from "@bu/ui/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@bu/ui/card";

export const metadata: Metadata = {
  title: "Setup your account | Bu Desk",
};

export default async function Setup() {
  const response = await getUser();
  const data = response?.data;

  if (!data?.id) {
    return redirect("/");
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold">
Update your account        </CardTitle>
        <CardDescription>
                    Add your name and an optional avatar.

        </CardDescription>
      </CardHeader>
      <CardContent>
  

            <SetupForm
              userId={data.id}
              avatarUrl={data.avatar_url ?? undefined}
              fullName={data.full_name ?? undefined}
            />
    
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground text-center w-full">
          Here you can update your account information.
        </p>
      </CardFooter>
    </Card>
  );
}
