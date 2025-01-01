"use client";

import { CustomerDetails } from "@/components/invoice/customer-details";
import { EditBlock } from "@/components/invoice/edit-block";
import { FromDetails } from "@/components/invoice/from-details";
import { LineItems } from "@/components/invoice/line-items";
import { Meta } from "@/components/invoice/meta";
import { NoteDetails } from "@/components/invoice/note-details";
import { PaymentDetails } from "@/components/invoice/payment-details";
import { Summary } from "@/components/invoice/summary";
import { OpenURL } from "@/components/open-url";
import { useChain } from "@/hooks/useChain";
import { usePeanut } from "@/hooks/usePeanut";
import { useGetTokensOrChain } from "@/hooks/useTokensOrChain";
import type { Token, TransactionDetails } from "@/types";
import { Button } from "@bu/ui/button";
import { ScrollArea } from "@bu/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@bu/ui/sheet";
import ShinyButton from "@bu/ui/shiny-button";
import { useToast } from "@bu/ui/use-toast";
import { PlusCircle } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";

function InvoiceSheetHeader() {
  return (
    <SheetHeader className="mb-6 flex flex-col">
      <SheetTitle className="text-xl">New Invoice</SheetTitle>
      <SheetDescription className="text-sm">
        Use this form to create a ghostly invoice to get spooky paid
      </SheetDescription>
    </SheetHeader>
  );
}

function InvoiceContent() {
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastEditedText, setLastEditedText] = useState<string>("");
  const { watch, handleSubmit } = useFormContext();
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const {
    createRequestLink,
    isLoading: isPeanutLoading,
    copyToClipboard,
  } = usePeanut();
  const [currentText, setCurrentText] = useState<string>("");
  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetails | null>(null);

  const { getValues } = useFormContext();
  const amount = getValues("amount");
  const recipientAddress = address as `0x${string}`;
  const chain = useChain();
  const chainId = chain?.chainId;

  const availableTokens = useGetTokensOrChain(chainId ?? 0, "tokens") as Token[];

  const usdc = availableTokens?.find((token) => token.symbol === "USDC");
  const tokenAddress = usdc?.address;

  useEffect(() => {
    const savedDraft = localStorage.getItem(`invoice_draft_${address}`);
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      setLastEditedText(
        `Last edited ${new Date(draft.lastEdited).toLocaleString()}`
      );
    }
  }, [address]);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const saveDraft = (values: any) => {
    setIsDraftSaving(true);
    const draft = {
      values,
      lastEdited: new Date().toISOString(),
    };

    localStorage.setItem(`invoice_draft_${address}`, JSON.stringify(draft));
    setLastEditedText(
      `Last edited ${new Date(draft.lastEdited).toLocaleString()}`
    );

    setTimeout(() => {
      setIsDraftSaving(false);
    }, 500);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const subscription = watch((formData) => {
      if (formData) {
        saveDraft(formData);
      }
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, address]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  
  const handleCreateLinkRequest = async () => {
    setCurrentText("Beginning invoice request");
    try {
      console.log("Sending request with tokenAddress:", tokenAddress);
      console.log("Sending request with amount:", amount.toString());
      console.log("Sending request with recipientAddress:", recipientAddress);
      
      if (!chainId) throw new Error("Chain ID is required");
      const linkResponse = await createRequestLink(
        chainId,
        tokenAddress as `0x${string}`, 
        amount.toString(),
        recipientAddress as `0x${string}`,
        () => setCurrentText("In Progress"),
        () => setCurrentText("Success"),
        (error: Error) => setCurrentText(`Error: ${error.message}`),
        () => setCurrentText("Complete")
      );

      console.log("Link Response in try:", linkResponse);

      if (linkResponse) {
        setTransactionDetails(linkResponse as unknown as TransactionDetails);
        console.log("Payment link created successfully:", linkResponse);
      } else {
        setCurrentText("Error creating pay link");
        console.log("Link Response in else:", linkResponse);
      }
    } catch (error) {
      console.error("Error creating pay link:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setCurrentText("Finished Invoice Request");
    }
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    if (isDraftSaving) {
      toast({
        variant: "destructive",
        title: "Cannot submit",
        description: "Please wait for the draft to finish saving",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with your actual submission logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form Data to be sent:", {
        ...data,
        timestamp: new Date().toISOString(),
        walletAddress: address,
      });
      await handleCreateLinkRequest();
      toast({
        title: "Success",
        description: `Invoice submitted successfully ${transactionDetails?.transactionHash}`,
      });
      console.log("Transaction Details:", transactionDetails);
      localStorage.removeItem(`invoice_draft_${address}`);
      setLastEditedText("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit invoice. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="relative h-full"
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit((data) => {
        console.log("Form submission initiated with data:", data);
        onSubmit(data);
      })}
    >
      <ScrollArea className="h-[calc(100vh-200px)] bg-background" hideScrollbar>
        <div className="p-8 pb-4 h-full flex flex-col">
          <div className="flex justify-between">
            <Meta />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 mb-4">
            <div>
              <FromDetails />
            </div>
            <div>
              <CustomerDetails
                id={""}
                name={""}
                email={""}
                address={address as `0x${string}`}
              />
            </div>
          </div>

          <EditBlock name="top_block" />

          <div className="mt-4">
            <LineItems />
          </div>

          <div className="mt-12 flex justify-end mb-8">
            <Summary />
          </div>

          <div className="flex flex-col mt-auto">
            <div className="grid grid-cols-2 gap-6 mb-4 overflow-hidden">
              <PaymentDetails />
              <NoteDetails />
            </div>

            <EditBlock name="bottom_block" />
          </div>
        </div>
      </ScrollArea>

      <div className="absolute bottom-14 w-full h-9">
        <div className="flex justify-between items-center mt-auto">
          <div className="flex space-x-2 items-center text-xs text-[#808080]">
            {(isDraftSaving || lastEditedText) && (
              <span>{isDraftSaving ? "Saving draft..." : lastEditedText}</span>
            )}
          </div>
        </div>
      </div>

      <SheetFooter className="flex gap-2">
        <ShinyButton>
          <Button
            variant="ghost"
            type="submit"
            disabled={isDraftSaving || isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Submitting</span>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
              </>
            ) : (
              "Submit Invoice"
            )}
          </Button>
        </ShinyButton>
      </SheetFooter>
    </form>
  );
}

function InvoiceSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="brutalism" className="flex items-center gap-2 mr-12">
          Create <PlusCircle className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <InvoiceSheetHeader />
        <InvoiceContent />
      </SheetContent>
    </Sheet>
  );
}

function InvoiceNotVisible() {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 rounded-lg border border-dashed">
      <span className="text-muted-foreground">
        Please connect your wallet to create invoices
      </span>
    </div>
  );
}

export function InvoiceSheetWrapper() {
  const { address, isConnected } = useAccount();

  const methods = useForm({
    defaultValues: {
      customer_details: null,
      customer_wallet_address: null,
      from_details: null,
      line_items: [],
      payment_details: null,
      note_details: null,
      top_block: null,
      bottom_block: null,
      customer_name: "",
      customer_id: "",
      from_details_label: "From",
      customer_details_label: "To",
      customer_wallet_address_label: "Customer Wallet Address 0x...",
      description_label: "Items",
      price_label: "Price",
      quantity_label: "#",
      total_label: "Total",
      payment_details_label: "Payment",
      subtotal_label: "Subtotal",
      discount_label: "Discount",
      vat_label: "VAT",
      tax_label: "Tax",
      total_summary_label: "Total",
      bottom_block_label: "Bottom",
      note_label: "Notes",
    },
  });

  if (!isConnected) {
    return <InvoiceNotVisible />;
  }

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center p-4 space-y-4 rounded-lg border border-dashed">
        <span className="text-muted-foreground">Wallet address not found</span>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center justify-center p-4 space-y-4 rounded-lg border border-dashed">
        <h2 className="text-2xl font-bold">Create a Billable Invoice</h2>        
        <p className="text-sm text-gray-500">
          Fill out the form below to generate a new invoice that you can bill to your account.
        </p>
        <InvoiceSheet />
      </div>
    </FormProvider>
  );
}

export default InvoiceSheetWrapper;
