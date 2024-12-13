"use server";

import { getI18n } from "@/locales/server";
import { getUser } from "@bu/supabase/queries";
import { ChartSelectors } from "@/components/charts/chart-selectors";
import { Charts } from "@/components/charts/charts";
import { EmptyState } from "@/components/charts/empty-state";
import { OverviewModal } from "@/components/modals/overview-modal";
import { Widgets } from "@/components/widgets";
import { Cookies, defaultValue } from "@/utils/constants";
import { getTeamBankAccounts } from "@bu/supabase/cached-queries";
import { cn } from "@bu/ui/cn";
import { startOfYear } from "date-fns";
import { cookies } from "next/headers";

export default async function Overview({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { data } = await getUser();
  const t = await getI18n();
  const accounts = await getTeamBankAccounts();
  const cookieStore = await cookies();
  
  const chartType = cookieStore.get(Cookies.ChartType)?.value ?? "profit";
  const hideConnectFlow = cookieStore.has(Cookies.HideConnectFlow);
  
  const initialPeriod = cookieStore.has(Cookies.SpendingPeriod)
    ? JSON.parse(cookieStore.get(Cookies.SpendingPeriod)!.value)
    : {
        id: "this_year",
        from: startOfYear(new Date()).toISOString(),
        to: new Date().toISOString(),
      };

  const value = {
    ...(searchParams.from && { from: searchParams.from }),
    ...(searchParams.to && { to: searchParams.to }),
  };

  const isEmpty = !accounts?.data?.length;

  return (
    <>
      <div>
        <div className="h-[530px] mb-4">
          <ChartSelectors defaultValue={JSON.stringify(defaultValue)} />

          <div className="mt-8 relative">
            {isEmpty && <EmptyState />}

            <div className={cn(isEmpty && "blur-[8px] opacity-20")}>
              <Charts
                value={value}
                defaultValue={defaultValue}
                disabled={isEmpty}
                type={chartType}
                currency={searchParams.currency?.toString()}
              />
            </div>
          </div>
        </div>

        <Widgets
          initialPeriod={initialPeriod}
          disabled={isEmpty}
          searchParams={searchParams}
        />
      </div>

      <OverviewModal defaultOpen={isEmpty && !hideConnectFlow} />
    </>
  );
}