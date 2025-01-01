import MarqueeY from "@/components/marquee";
import { InvoicePanel } from "@/components/peanut-zk-invoices/request-component/invoice-panel";
import { PaymentPanel } from "@/components/peanut-zk-invoices/request-component/payment-panel";
import SigninPage from "@/components/sign-in";
import Image from "next/image";

import { InvoiceProvider } from "@/store/invoice-request/index";

export const metadata = {
  title: "Invoice Request | Bu Desk 👻 ",
};

export default function InvoiceRequestLayout({ children }: { children: React.ReactNode }) {
  return (
    <InvoiceProvider>
      {children}
    </InvoiceProvider>
  );
}
