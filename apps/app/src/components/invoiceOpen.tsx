// import { getInvoiceSummary } from "@bu/supabase/cached-queries";
import Link from "next/link";
import { InvoiceSummary } from "./invoicesSummary";

type Props = {
  defaultCurrency: string;
};

export async function InvoicesOpen({ defaultCurrency }: Props) {
  const data = [
    {
      currency: defaultCurrency,
      total_amount: 0,
      invoice_count: 0,
    },
  ];
  const totalInvoiceCount = data?.reduce(
    (acc, curr) => acc + (curr.invoice_count ?? 0),
    0,
  );

  return (
    <Link
      href="/invoices?statuses=draft,overdue,unpaid"
      className="hidden sm:block"
    >
      <InvoiceSummary
        data={data || []}
        totalInvoiceCount={totalInvoiceCount}
        defaultCurrency={defaultCurrency}
        title="Open"
      />
    </Link>
  );
}
