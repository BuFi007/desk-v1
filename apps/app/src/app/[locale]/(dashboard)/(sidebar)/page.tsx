import { getUser } from "@bu/supabase/queries";
import { InvoiceContainer } from "@/components/peanut-zk-invoices/invoice-container";
import { CreateRegularPaymentSheet } from "@/components/createRegularPayment";
import PageContainer from "@bu/ui/page-container";

export default async function Page() {
  const { data } = await getUser();

  const userData = {
    data: {
      id: data?.user?.id || "",
      email: data?.user?.email || "",
    },
  };

  return (
    <PageContainer>
      <InvoiceContainer userData={userData} />
      <CreateRegularPaymentSheet />
    </PageContainer>
  );
}
