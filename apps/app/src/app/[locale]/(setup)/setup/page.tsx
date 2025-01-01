import { SetupForm } from "@/components/setup-account/setup-form";
import { getSession, getUser } from "@bu/supabase/cached-queries";
import { Icons } from "@bu/ui/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SetupPageProps, SupabaseUser } from "@/types";

export const metadata: Metadata = {
  title: "Setup your account | Bu Desk",
};

export default async function Setup(props: SetupPageProps) {
  const response = await getUser();
  const data = response?.data;

  if (!data?.id) {
    return redirect("/");
  }

  return (
    <div>
      <div className="absolute left-5 top-4 md:left-10 md:top-10">
        <Link href="/">
          <Icons.Logo />
        </Link>
      </div>

      <div className="flex min-h-screen justify-center items-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-[380px] flex-col">
          <h1 className="text-2xl font-medium pb-4">Update your account</h1>
          <p className="text-sm text-[#878787] mb-8">
            Add your name and an optional avatar.
          </p>

          <SetupForm
            userId={data.id}
            avatarUrl={data.avatar_url ?? undefined}
            fullName={data.full_name ?? undefined}
          />
        </div>
      </div>
    </div>
  );
}
