"use client";

import { useInvoiceParams } from "@/hooks/useInvoiceParams";
import { Button } from "@bu/ui/button";
import { Icons } from "@bu/ui/icons";

export function OpenInvoiceSheet() {
  const { setParams } = useInvoiceParams();

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setParams({ type: "create" })}
      >
        <Icons.Add />
      </Button>
    </div>
  );
}