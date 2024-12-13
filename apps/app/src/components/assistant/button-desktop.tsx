"use client";

import { useAssistantStore } from "@/store/assistant";
import { Button } from "@bu/ui/button";
import { Icons } from "@bu/ui/icons";

export function DesktopAssistantButton() {
  const { setOpen } = useAssistantStore();

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full w-8 h-8 flex items-center invisible todesktop:visible"
      onClick={() => setOpen()}
    >
      <Icons.Search size={18} />
    </Button>
  );
}
