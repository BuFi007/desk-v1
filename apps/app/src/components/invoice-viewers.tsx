"use client";

import { formatRelativeTime } from "@/utils/format";
import { createClient } from "@bu/supabase/client";
import { AnimatedSizeContainer } from "@bu/ui/animated-size-container";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarImageNext,
} from "@bu/ui/avatar";
import { Separator } from "@bu/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@bu/ui/tooltip";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Customer } from "./invoice-toolbar";

interface User {
  id: string;
  avatar_url: string | null;
  full_name: string | null;
}

type Props = {
  customer: Customer;
  viewedAt: string;
};

export function InvoiceViewers({ customer, viewedAt }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCurrentUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser({
          id: user.id,
          avatar_url: user.user_metadata.avatar_url,
          full_name: user.user_metadata.full_name,
        });
      }
    }

    fetchCurrentUser();
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <AnimatedSizeContainer width>
      <motion.div
        className="flex items-center"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "auto", opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.5 }}
      >
        <Separator orientation="vertical" className="mr-3 ml-2 h-4" />
      </motion.div>
    </AnimatedSizeContainer>
  );
}
