import { CreateTeamForm } from "@/components/forms/create-team-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Team | Bu Desk",
};

export default async function CreateTeam() {
  return <CreateTeamForm />;
}
