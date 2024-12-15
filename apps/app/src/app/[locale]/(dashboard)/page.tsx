import { SignOut } from "@/components/sign-out";
import { getUser } from "@bu/supabase/queries";
import { InvoiceContainer } from "@/components/peanut-zk-invoices/invoice-container";

export default async function Page() {
  const { data } = await getUser();

  const userData = {
    data: {
      id: data?.user?.id || "",
      email: data?.user?.email || "",
    },
  };

  return (
    <div className="min-h-screen relative">
      {/* Top right invoice container */}
      <div className="absolute top-4 right-4">
        <InvoiceContainer userData={userData} />
      </div>

      {/* Centered sign out button */}
      <div className="h-screen flex flex-col items-center justify-center">
        <SignOut />
      </div>
    </div>
  );
}
