"use client";

import { Button } from "@bu/ui/button";
import { Input } from "@bu/ui/input";
import { usePeanut } from "@/hooks/usePeanut";
import { useState } from "react";
import { useToast } from "@bu/ui/use-toast";
import { Loader2 } from "lucide-react";

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

  const handlePayment = async () => {
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
        }
      );
    } catch (error) {
      console.error("Payment error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 bg-background border-t p-4 shadow-lg">
      <div className="max-w-xl mx-auto flex gap-4 items-center">
        <Input
          value={`${amount} ${symbol}`}
          disabled
          className="font-mono text-right"
        />
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="min-w-[120px]"
          variant="destructive"
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
    </div>
  );
}
