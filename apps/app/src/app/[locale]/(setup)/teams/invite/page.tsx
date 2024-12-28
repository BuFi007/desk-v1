import { InviteForm } from "@/components/forms/invite-form";
import { UserMenu } from "@/components/user-menu";
import { Icons } from "@bu/ui/icons";
import type { Metadata } from "next";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@bu/ui/card";

export const metadata: Metadata = {
  title: "Invite Team Member | Bu Desk",
};

export default async function InviteMembers() {
  return (
    <>
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-medium">
            Invite team members
          </CardTitle>
          <CardDescription className="text-sm  mb-8">
            Add the email addresses of the people you want on your team and send
            them invites to join.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InviteForm />
        </CardContent>
      </Card>
    </>
  );
}
