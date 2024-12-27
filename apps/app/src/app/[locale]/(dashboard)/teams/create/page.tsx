import { CreateTeamForm } from "@/components/forms/create-team-form";
import { UserMenu } from "@/components/user-menu";
import { Icons } from "@bu/ui/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Team | Bu Desk",
};

export default async function CreateTeam() {
  return (
    <>
      <header className="w-full absolute left-0 right-0 flex justify-between items-center">
        <div className="ml-5 mt-4 md:ml-10 md:mt-10">
          <Link href="/">
            <Icons.Logo />
          </Link>
        </div>

        <div className="mr-5 mt-4 md:mr-10 md:mt-10">
          <Suspense>
            <UserMenu onlySignOut />
          </Suspense>
        </div>
      </header>

      <div className="flex min-h-screen justify-center items-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-[340px] flex-col">
          <div>
            <h1 className="text-2xl font-medium mb-4">
              Welcome to your Bu workspace
            </h1>
            <h2 className="text-xl font-medium mb-8">
              Let&lsquo;s set up your team
            </h2>
          </div>

          <div className="mb-2">
            <h3 className="text-lg font-medium mb-2">
              What&lsquo;s the name of your company or team?
            </h3>
            <p className="text-sm text-muted-foreground">
              Your workspace is where you and your team will collaborate. After
              creating your team, you can invite team members to join you.
            </p>
            <p className="text-sm text-muted-foreground">
              Choose a name that your team will recognize - you can always
              change it later.
            </p>
          </div>

          <CreateTeamForm />
          <p className="mt-4 text-xs text-muted-foreground text-center">
            After setting up your team, you&lsquo;ll be able to invite team
            members to collaborate.
          </p>
        </div>
      </div>
    </>
  );
}
