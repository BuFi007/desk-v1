import { PaymentPanel } from "@/components/peanut-zk-invoices/request-component/payment-panel";

export default function InvoiceRequestPage() {
  return (
    <>
      <div className="flex w-full min-h-screen flex-col md:flex-row justify-center items-center text-center">
        {/* // TODO: RENDER THE INVOICE AS NON EDITABLE FIELDS */}
        {/* <div className="hidden md:flex md:relative items-center justify-center min-h-screen w-2/3 border-2 border-black bg-blue-200/30">
          <InvoicePanel />
        </div> */}

        {/* Right panel */}
        {/* <div className="flex items-center justify-center w-1/3 min-h-[450px] border-2 border-black bg-yellow-200/30 md:min-h-[calc(100dvh-80px)]">
          <div className="flex w-full flex-col md:flex-row items-center justify-center text-center bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
            <PaymentPanel />
          </div>
        </div> */}

        <div className="flex items-center justify-center w-full min-h-[450px] border-2 border-black bg-yellow-200/30 md:min-h-[calc(100dvh-80px)]">
          <div className="flex w-full flex-col md:flex-row items-center justify-center text-center bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
            <PaymentPanel />
          </div>
        </div>
        
      </div>
    </>
  );
}
