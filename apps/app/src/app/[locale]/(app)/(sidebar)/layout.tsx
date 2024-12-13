import { AI } from "@/actions/ai/chat";
import { Header } from "@/components/header";
import { GlobalSheets } from "@/components/sheets/global-sheets";
import { Sidebar } from "@/components/sidebar";
import { UserProvider } from "@/store/user/provider";
import { getCountryCode, getCurrency } from "@bu/location";
import { uniqueCurrencies } from "@bu/location/currencies";
import { getUser } from "@bu/supabase/queries";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { AssistantModal } from "@/components/assistant/assistant-modal";
import { SelectBankAccountsModal } from "@/components/modals/select-bank-accounts";
import { ImportModal } from "@/components/modals/import-modal";
import { ConnectTransactionsModal } from "@/components/modals/connect-transactions-modal";
import { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const countryCode = getCountryCode();
  const currency = getCurrency();

  if (!user?.data?.team) {
    redirect("/teams");
  }

  return (
    <UserProvider data={user.data}>
      <div className="relative">
        <AI
          initialAIState={{ user: user.data, messages: [], chatId: nanoid() }}
        >
          <Sidebar />

          <div className="mx-4 md:ml-[95px] md:mr-10 pb-8">
            <Header />
            {children}
          </div>

          {/* This is used to make the header draggable on macOS */}
          <div className="hidden todesktop:block todesktop:[-webkit-app-region:drag] fixed top-0 w-full h-4 pointer-events-none" />

          <AssistantModal />
          <ConnectTransactionsModal countryCode={countryCode} />
          <SelectBankAccountsModal />
          <ImportModal
            currencies={uniqueCurrencies}
            defaultCurrency={currency}
          />

          <Suspense>
            <GlobalSheets defaultCurrency={currency} />
          </Suspense>

        </AI>
      </div>
    </UserProvider>
  );
}
