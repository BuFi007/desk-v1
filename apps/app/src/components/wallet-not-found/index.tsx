"use server";

import { getI18n } from "@/locales/server";
import { getUser } from "@bu/supabase/queries";
import { SignOut } from "@/components/sign-out";

export const metadata = {
  title: "Wallet not found",
};

export default async function WalletNotFound() {
  const { data } = await getUser();
  const t = await getI18n();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <p>{t("welcome", { name: data?.user?.email })}</p>
        <p>{t("walletNotFound")}</p>
        <SignOut />
      </div>
    </div>
  );
}