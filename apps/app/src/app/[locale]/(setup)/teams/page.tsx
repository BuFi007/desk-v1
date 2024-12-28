import { SelectTeamTable } from "@/components/tables/select-team/table";
import { UserMenu } from "@/components/user-menu";
import { getUser } from "@bu/supabase/cached-queries";
import { getTeamsByUserIdQuery } from "@bu/supabase/queries";
import { createClient } from "@bu/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@bu/ui/card";

export const metadata: Metadata = {
  title: "Teams | Bu Desk",
};

export default async function Teams() {
  const supabase = await createClient();
  const user = await getUser();

  const userId = user?.data?.id;
  if (!userId) {
    redirect("/teams/create");
    return;
  }
  const teams = await getTeamsByUserIdQuery(supabase, userId);

  if (!teams?.data?.length) {
    redirect("/teams/create");
  }

  return (
    <>
      <Card className="w-full max-w-2xl shadow-lg">
        <div className="flex min-h-screen justify-center items-center overflow-hidden p-6 md:p-0">
          <div className="relative z-20 m-auto flex w-full max-w-[480px] flex-col">
            <div>
              <h1 className="text-2xl font-medium pb-4">Welcome back</h1>
              <p className="text-sm text-[#878787] mb-8">
                Select team or create a new one.
              </p>
            </div>

            <SelectTeamTable data={teams.data} />

            <div className="text-center mt-8 border-t-[1px] border-border pt-6">
              <Link href="/teams/create" className="text-sm">
                Create team
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
