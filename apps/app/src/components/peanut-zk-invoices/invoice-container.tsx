"use client";

import { InvoiceSheetWrapper } from "@/components/peanut-zk-invoices";
import { UserProvider } from "@/components/providers";
import type { UserProps } from "@/store/user/store";
import { useAccount, useChainId } from "wagmi";

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
