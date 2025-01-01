"use client";

import { useInvoice } from "@/store/invoice-request/index";

export function InvoicePanel() {
  const { linkDetails, isLoading, error } = useInvoice();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!linkDetails) return null;

  return (
    <div className="p-10">
      <h2>Invoice Details</h2>
      here is
    </div>
  );
}


