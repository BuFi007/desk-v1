import { CreateTeamForm } from "@/components/forms/create-team-form";
import { UserMenu } from "@/components/user-menu";
import { Icons } from "@bu/ui/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@bu/ui/card";

export const metadata: Metadata = {
  title: "Create Team | Bu Desk",
};

export default async function CreateTeam() {
  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

      <main className="relative z-10 flex min-h-screen justify-center items-center p-6">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">
              Welcome to your Bu workspace
            </CardTitle>
            <CardDescription>
              Create a workspace for your team to collaborate on projects, share
              files, and communicate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Icons.People className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Let&apos;s set up your team
                </h2>
                <p className="text-sm text-muted-foreground">
                  It only takes a minute to get started
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                What&apos;s the name of your company or team?
              </h3>
              <p className="text-sm text-muted-foreground">
                Your workspace is where you and your team will collaborate.
                Choose a name that your team will recognize - you can always
                change it later.
              </p>
            </div>
            <CreateTeamForm />
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
              After setting up your team, you&apos;l be able to invite team
              members to collaborate.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
