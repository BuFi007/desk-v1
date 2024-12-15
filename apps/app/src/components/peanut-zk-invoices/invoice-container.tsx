"use client";

import { type UserProps } from "@/store/user/store";
import { UserProvider } from "@/components/providers";
import { InvoiceSheetWrapper } from "@/components/peanut-zk-invoices";

interface InvoiceContainerProps {
  userData: UserProps;
}

export function InvoiceContainer({ userData }: InvoiceContainerProps) {
  return (
    <UserProvider initData={userData}>
      <InvoiceSheetWrapper />
    </UserProvider>
  );
}
