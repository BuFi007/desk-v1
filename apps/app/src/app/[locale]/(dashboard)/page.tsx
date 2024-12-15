import { getUser } from "@bu/supabase/queries";
import { InvoiceContainer } from "@/components/peanut-zk-invoices/invoice-container";
import { CreateRegularPaymentSheet } from "@/components/createRegularPayment";
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
      <div className="absolute top-4 right-4 z-10">
        <InvoiceContainer userData={userData} />
      </div>
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <CreateRegularPaymentSheet />
        </div>
      </div>
    </div>
  );
}
