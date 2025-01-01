import { CreateRegularPaymentSheet } from "@/components/createRegularPayment";
import { InvoiceContainer } from "@/components/peanut-zk-invoices/invoice-container";
import { getUser } from "@bu/supabase/queries";
import { Card, CardContent, CardDescription, CardHeader } from "@bu/ui/card";
import PageContainer from "@bu/ui/page-container";

export default async function Home() {
  const { data } = await getUser();

  const userData = {
    data: {
      id: data?.user?.id || "",
      email: data?.user?.email || "",
    },
  };

  return (
    <PageContainer>
      <div className="flex justify-center w-full">
        <InvoiceContainer userData={userData} />
        <CreateRegularPaymentSheet />
      </div>
    </PageContainer>
  );
}
