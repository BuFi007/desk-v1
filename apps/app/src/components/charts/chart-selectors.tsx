import { ChartMore } from "@/components/charts/chart-more";
import { ChartPeriod } from "@/components/charts/chart-period";
import { ChartType } from "@/components/charts/chart-type";
import { Cookies } from "@/utils/constants";
import { cookies } from "next/headers";
import { ChartFiltersServer } from "@/components/charts/chart-filters.server";

export async function ChartSelectors({ defaultValue }: { defaultValue: string }) {
  const chartType = (await cookies()).get(Cookies.ChartType)?.value ?? "profit";

  return (
    <div className="flex justify-between mt-6 space-x-2">
      <div className="flex space-x-2">
        <ChartType initialValue={chartType} />
      </div>

      <div className="flex space-x-2">
        <ChartPeriod defaultValue={{ from: defaultValue as string, to: defaultValue as string }} />
        <ChartFiltersServer />
        <ChartMore defaultValue={{ from: defaultValue as string, to: defaultValue as string, type: chartType as "profit" | "revenue" }} type={"profit"} />
      </div>
    </div>
  );
}
