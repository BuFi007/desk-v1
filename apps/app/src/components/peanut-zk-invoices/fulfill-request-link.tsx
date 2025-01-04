"use client";

import { ConnectWalletButton } from "@/components/connectWalletButton";
import { usePeanut } from "@/hooks/usePeanut";
import { Button } from "@bu/ui/button";
import { Input } from "@bu/ui/input";
import { useToast } from "@bu/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function FulfillRequestLink({
  link,
  amount,
  symbol,
}: {
  link: string;
  amount: string;
  symbol: string;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { fulfillRequestLink } = usePeanut();
  const { toast } = useToast();
  const account = useAccount();

  const handlePayment = async () => {
    if (!account.isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to pay for the invoice.",
        variant: "destructive",
      });
      return;
    }
    setIsProcessing(true);
    try {
      await fulfillRequestLink(
        link,
        () => {
          toast({
            title: "Processing Payment",
            description: "Your transaction is being processed...",
          });
        },
        () => {
          toast({
            title: "Payment Successful",
            description: "Your payment has been processed successfully!",
          });
        },
        (error: Error) => {
          toast({
            title: "Payment Failed",
            description: error.message,
            variant: "destructive",
          });
        },
        () => {
          setIsProcessing(false);
        },
      );
    } catch (error) {
      console.error("Payment error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4  justify-center items-center text-center">
      <div className="flex items-center space-x-2">
        {!account.isConnected ? (
          <ConnectWalletButton />
        ) : (
          <div className="flex justify-center w-full">
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="min-w-[120px]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                "Pay Now"
              )}
            </Button>
          </div>
        )}
      </div>
      {!account.isConnected && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Connect your wallet to proceed with the payment.
        </p>
      )}
    </div>
  );
}
