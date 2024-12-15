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
    <div className="min-h-screen relative p-4">
      {/* Top right invoice container */}
      <div className="absolute top-4 right-4 z-10">
        <InvoiceContainer userData={userData} />
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
