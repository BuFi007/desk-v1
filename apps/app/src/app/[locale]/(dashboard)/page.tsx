import { SignOut } from "@/components/sign-out";
import { getI18n } from "@/locales/server";
import { getUser } from "@bu/supabase/queries";
import { InvoiceContainer } from "@/components/peanut-zk-invoices/invoice-container";
import { Suspense } from "react";
import { LoanCTA } from "@/components/loan-cta";
import { LoanCTASkeleton } from "@/components/loan-cta/skeleton";
import ScratchCard from "@/components/scratch-card";

export default async function Page() {
  const { data } = await getUser();

  const userData = {
    data: {
      id: data?.user?.id || "",
      email: data?.user?.email || "",
    },
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <p>{t("welcome", { name: data?.user?.email })}</p>

        <SignOut />
      </div>
      {/* Main content grid */}
      {/* <div className="h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-1 flex items-center justify-center">
              <ScratchCard />
            </div>
            <div className="lg:col-span-2">
              <Suspense fallback={<LoanCTASkeleton />}>
                <LoanCTA />
              </Suspense>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
