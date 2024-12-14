import { getI18n } from "@/locales/server";
import { Card, CardContent, CardHeader, CardTitle } from "@bu/ui/card";
import { Skeleton } from "@bu/ui/skeleton";
import { PaymentScoreVisualizer } from "@/components/paymentScoreVisualizer";

export function InvoicePaymentScoreSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row justify-between">
        <CardTitle>
          <Skeleton className="h-8 w-32" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export async function InvoicePaymentScore() {
  const t = await getI18n();
  const paymentStatus = "good";
  const score = 10;

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-col xl:flex-row justify-between">
        <CardTitle className="font-mono font-medium text-2xl">
          Payment status: {paymentStatus}
        </CardTitle>

        <PaymentScoreVisualizer score={score} paymentStatus={paymentStatus} />
      </CardHeader>

      <CardContent className="sm:hidden xl:flex">
        <div className="flex flex-col gap-2">
          <div>Payment score</div>
          <div className="text-sm text-muted-foreground">
            Your payment status is {paymentStatus}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
