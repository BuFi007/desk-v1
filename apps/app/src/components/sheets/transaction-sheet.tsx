import type { UpdateTransactionValues } from "@/actions/schema";
import { Drawer, DrawerContent } from "@bu/ui/drawer";
import React from "react";
import { TransactionDetails } from "@/components/transaction-details";

type Props = {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  data: any;
  ids?: string[];
  updateTransaction: (
    values: UpdateTransactionValues,
    optimisticData: any,
  ) => void;
};

export function TransactionSheet({
  setOpen,
  isOpen,
  data,
  ids,
  updateTransaction,
}: Props) {

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) {
          setOpen(false);
        }
      }}
    >
      <DrawerContent className="p-6">
        <TransactionDetails
          data={data}
          ids={ids}
          updateTransaction={updateTransaction}
        />
      </DrawerContent>
    </Drawer>
  );
}
