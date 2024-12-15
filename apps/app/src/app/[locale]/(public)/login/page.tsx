import { GoogleSignin } from "@/components/google-signin";
import { CreateRegularPaymentSheet } from "@/components/createRegularPayment";
import Image from "next/image";
import { AutomaticPayments, MyCustomL2Token } from "@/constants/Contracts";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center size-96">
        <Image src="/logo.png" alt="logo" width={350} height={350} />
        <CreateRegularPaymentSheet />
        <GoogleSignin />
      </div>
    </div>
  );
}
