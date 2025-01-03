import { CreateRegularPaymentSheet } from "@/components/createRegularPayment";
import { InvoiceContainer } from "@/components/peanut-zk-invoices/invoice-container";
import type { UserProps } from "@/store/user/store";
import { getUser } from "@bu/supabase/queries";
import PageContainer from "@bu/ui/page-container";

export default async function Home() {
  const { data } = await getUser();

  const userData: UserProps = {
    data: {
      id: data?.user?.id || "",
      email: data?.user?.email || "",
      full_name: "",
      locale: "",
      date_format: "",
      timezone: "",
      null: null,
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
