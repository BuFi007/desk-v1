import { useInvoiceParams } from "@/hooks/useInvoiceParams";
import { Drawer, DrawerContent } from "@bu/ui/drawer";
import { Sheet, SheetContent } from "@bu/ui/sheet";
import React from "react";
import { InvoiceDetails } from "@/components/invoiceDetails";
import type { Invoice } from "@/components/tables/invoices/columns";

type Props = {
  setOpen: (id?: string) => void;
  isOpen: boolean;
  data?: Invoice;
  locale: string;
};

export function InvoiceDetailsSheet({ setOpen, isOpen, data, locale }: Props) {
  const { invoiceId } = useInvoiceParams();

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) {
          setOpen(undefined);
        }
      }}
    >
      <DrawerContent className="p-6">
        <InvoiceDetails id={invoiceId} data={data} />
      </DrawerContent>
    </Drawer>
  );
}
