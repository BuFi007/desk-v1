"use client";

import { I18nProviderClient } from "@/locales/client";
import type { ReactNode } from "react";
import { Web3Provider } from "@/context/Web3";

type ProviderProps = {
  locale: string;
  children: ReactNode;
};

export function Providers({ locale, children }: ProviderProps) {
  return (
    <I18nProviderClient locale={locale}>
      <Web3Provider>{children}</Web3Provider>
    </I18nProviderClient>
  );
}
