import { InvoiceSearchFilter } from "@/components/invoiceSearchFilter";
// import { getCustomers } from "@bu/supabase/cached-queries";
import { OpenInvoiceSheet } from "./openInvoiceSheet";

export async function InvoiceHeader() {
  //   const customers = await getCustomers();
  const data = {
    data: [
      {
        id: "1",
        name: "Juampi",
      },
    ],
  };
  const customers = data ?? [];

  return (
    <div className="flex items-center justify-between">
      <InvoiceSearchFilter customers={customers?.data ?? []} />

      <div className="hidden sm:block">
        <OpenInvoiceSheet />
      </div>
    </div>
  );
}
