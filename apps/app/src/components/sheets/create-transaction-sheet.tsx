"use client";

import { CreateTransactionForm } from "@/components/forms/create-transaction-form";
import { Drawer, DrawerContent } from "@bu/ui/drawer";
import { useQueryState } from "nuqs";
import React from "react";

export function CreateTransactionSheet({
  categories,
  userId,
  accountId,
  currency,
}: {
  categories: any;
  userId: string;
  accountId: string;
  currency: string;
}) {
  const [open, setOpen] = useQueryState("create-transaction");

  const isOpen = Boolean(open);

  const handleOpenChange = (open: boolean) => {
    setOpen(open ? "true" : null);
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerContent className="p-6">
        <CreateTransactionForm
          categories={categories}
          userId={userId}
          accountId={accountId}
          currency={currency}
          onCreate={() => setOpen(null)}
        />
      </DrawerContent>
    </Drawer>
  );
}
