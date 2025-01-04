import { PEANUTAPIKEY } from "@/constants/Env";
import { NATIVE_TOKEN_ADDRESS } from "@/constants/Tokens";
import { useEthersSigner } from "@/constants/wagmi";
import { useTransactionStore } from "@/store";
import type { Token } from "@/types";
import { useToast } from "@bu/ui/use-toast";
import peanut, {
  getRandomString,
  claimLinkGasless,
  claimLinkXChainGasless,
} from "@squirrel-labs/peanut-sdk";
import { BigNumber } from "ethers";
import { useCallback, useState } from "react";
import { useAccount, useChainId } from "wagmi";
// import { playAudio, saveCreatedLinkToLocalStorage } from "@/utils";

export const usePeanut = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  const { setLoading, setError } = useTransactionStore();
  const { toast } = useToast();
  const chainId = useChainId();
  const signer = useEthersSigner({ chainId });

  const generatePassword = async () => {
    try {
      return await getRandomString(16);
    } catch (error) {
      console.error("Error generating password:", error);
      throw new Error("Error generating the password.");
    }
  };

  const getTokenDetails = useCallback((tokenAddress: string) => {
    if (tokenAddress === NATIVE_TOKEN_ADDRESS) {
      return { tokenType: 0, tokenDecimals: 18 };
    } else {
      return { tokenType: 1, tokenDecimals: 6 };
    }
  }, []);

  const generateLinkDetails = useCallback(
    ({
      tokenValue,
      tokenAddress,
    }: {
      tokenValue: string;
      tokenAddress: string;
    }) => {
      try {
        const tokenDetails = getTokenDetails(tokenAddress);
        const baseUrl = `${window.location.origin}/claim`;

        return {
          chainId: chainId.toString(),
          tokenAmount: Number.parseFloat(
            Number(tokenValue).toFixed(tokenDetails.tokenDecimals),
          ),
          tokenType: tokenDetails.tokenType,
          tokenAddress: tokenAddress,
          tokenDecimals: tokenDetails.tokenDecimals,
          baseUrl: baseUrl,
          trackId: "ui",
        };
      } catch (error) {
        console.error("Error generating link details:", error);
        throw new Error("Error getting the linkDetails.");
      }
    },
    [getTokenDetails, chainId],
  );

  const createPayLink = async (
    amount: string,
    tokenAddress: Token | string,
    onInProgress?: () => void,
    onSuccess?: () => void,
    onFailed?: (error: Error) => void,
    onFinished?: () => void,
  ) => {
    setIsLoading(true);
    setLoading(true);

    try {
      if (!address || !signer) {
        throw new Error("Wallet not connected or signer unavailable");
      }

      const actualTokenAddress =
        typeof tokenAddress === "string" ? tokenAddress : tokenAddress.address;

      const linkDetails = generateLinkDetails({
        tokenValue: amount,
        tokenAddress: actualTokenAddress,
      });

      const password = await generatePassword();

      // First prepare the transactions which includes approval tx
      const preparedTransactions = await peanut.prepareTxs({
        address: address as `0x${string}`,
        linkDetails: linkDetails,
        passwords: [password],
      });

      // Handle ERC20 approval if needed
      if (actualTokenAddress !== NATIVE_TOKEN_ADDRESS) {
        try {
          // Execute approval transaction first
          for (const unsignedTx of preparedTransactions.unsignedTxs) {
            if (unsignedTx.data?.includes("approve")) {
              const txHash = await signer.sendTransaction({
                to: unsignedTx.to,
                data: unsignedTx.data,
                value: unsignedTx.value
                  ? BigInt(unsignedTx.value.toString())
                  : BigInt(0),
              });
              onInProgress?.();

              // Wait for approval transaction to be mined
              await txHash.wait();
            }
          }
        } catch (error: any) {
          if (
            error.code === "ACTION_REJECTED" ||
            error.message.includes("user rejected")
          ) {
            onFinished?.();
            return null;
          }
          throw error;
        }
      }

      const { link, txHash } = await peanut.createLink({
        structSigner: {
          signer: signer,
        },
        linkDetails: linkDetails,
        password: password,
      });
      const getLinksFromTxResponse = await peanut.getLinksFromTx({
        linkDetails,
        txHash: txHash,
        passwords: [password],
      });
      const links: string[] = getLinksFromTxResponse.links;

      toast({
        title: "Link created successfully",
        description: "Your payment link has been created.",
      });

      //   saveCreatedLinkToLocalStorage({
      //     address: primaryWallet.address as string,
      //     data: {
      //       link: links[0],
      //       depositDate: new Date().toISOString(),
      //       txHash: txHash,
      //       ...linkDetails,
      //     },
      //   });

      onSuccess?.();
      return { transactionHash: txHash, paymentLink: link };
    } catch (error: any) {
      console.error("Error creating pay link:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      // Handle user rejection separately
      if (
        error.code === "ACTION_REJECTED" ||
        errorMessage.includes("user rejected")
      ) {
        onFinished?.();
        return null;
      }

      setError(errorMessage);
      toast({
        title: "Error creating link",
        description: errorMessage,
        variant: "destructive",
      });
      onFailed?.(error);
      throw error;
    } finally {
      setIsLoading(false);
      setLoading(false);
      onFinished?.();
    }
  };

  const claimPayLink = async (
    link: string,
    onInProgress?: () => void,
    onSuccess?: () => void,
    onFailed?: (error: Error) => void,
    onFinished?: () => void,
  ) => {
    setIsLoading(true);
    setLoading(true);
    setError(null);

    try {
      if (!address) {
        throw new Error("Wallet not connected");
      }
      console.log("this is the link 2", link);

      const claimedLinkResponse = await claimLinkGasless({
        link,
        APIKey: PEANUTAPIKEY!,
        recipientAddress: address as `0x${string}`,
        baseUrl: `https://api.peanut.to/claim-v2`,
      });

      //   saveCreatedLinkToLocalStorage({
      //     address: address as string,
      //     data: {
      //       link: claimedLinkResponse.link,
      //       depositDate: new Date().toISOString(),
      //       txHash: claimedLinkResponse.txHash,
      //       ...claimedLinkResponse,
      //     },
      //   });
      toast({
        title: "Transaction sent",
        description: `Transaction hash: ${claimedLinkResponse.txHash}. Waiting for confirmation...`,
      });

      onInProgress?.();
      onSuccess?.();
      return claimedLinkResponse.txHash;
    } catch (error: any) {
      console.error("Error claiming paylink:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      toast({
        title: "Error claiming link",
        description: errorMessage,
        variant: "destructive",
      });
      onFailed?.(error);
      throw error;
    } finally {
      setIsLoading(false);
      setLoading(false);
      onFinished?.();
    }
  };

  const claimPayLinkXChain = async (
    link: string,
    destinationChainId: string,
    destinationToken: string,
    onInProgress?: () => void,
    onSuccess?: () => void,
    onFailed?: (error: Error) => void,
    onFinished?: () => void,
    isMainnet?: boolean,
  ) => {
    setIsLoading(true);
    setLoading(true);
    setError(null);

    try {
      if (!address) {
        throw new Error("Wallet not connected");
      }

      const claimedLinkResponse = await claimLinkXChainGasless({
        link,
        recipientAddress: address as `0x${string}`,
        destinationChainId: Number(destinationChainId).toString(),
        destinationToken: destinationToken,
        APIKey: PEANUTAPIKEY!,
        isMainnet: isMainnet || false,
        slippage: 10,
      });

      //   saveCreatedLinkToLocalStorage({
      //     address: primaryWallet.address as string,
      //     data: {
      //       link: link,
      //       depositDate: new Date().toISOString(),
      //       ...claimedLinkResponse,
      //     },
      //   });
      toast({
        title: "Cross-chain transaction sent",
        description: `Transaction hash: ${claimedLinkResponse.txHash}. This may take a few minutes.`,
      });

      onInProgress?.();
      onSuccess?.();
      return claimedLinkResponse.txHash;
    } catch (error: any) {
      console.error("Error claiming cross-chain paylink:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      toast({
        title: "Error claiming cross-chain link",
        description: errorMessage,
        variant: "destructive",
      });
      onFailed?.(error);
      throw error;
    } finally {
      setIsLoading(false);
      setLoading(false);
      onFinished?.();
    }
  };

  const copyToClipboard = (link: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast({
          title: "Link copied",
          description: "The link has been copied to your clipboard.",
        });
        // playAudio("/audio/click-coin.mp3");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        toast({
          title: "Failed to copy",
          description: "An error occurred while copying the link.",
          variant: "destructive",
        });
      });
  };

  const createRequestLink = async (
    chainId: number,
    tokenAddress: Token | string,
    amount: string,
    recipientAddress: string,
    onInProgress?: () => void,
    onSuccess?: () => void,
    onFailed?: (error: Error) => void,
    onFinished?: () => void,
  ) => {
    setIsLoading(true);
    setLoading(true);
    setError(null);

    console.log(
      "Sending request with tokenAddress for peanut inside hook:",
      tokenAddress,
    );
    console.log("Sending request with amount for peanut inside hook:", amount);
    console.log(
      "Sending request with recipientAddress for peanut inside hook:",
      recipientAddress,
    );
    console.log(
      "Sending request with chainId for peanut inside hook:",
      chainId,
    );

    if (!address) {
      throw new Error("Wallet not connected");
    }

    try {
      onInProgress?.();
      const { link } = await peanut.createRequestLink({
        chainId: chainId.toString(),
        tokenAddress: tokenAddress as `0x${string}`,
        tokenAmount: amount,
        tokenType: peanut.interfaces.EPeanutLinkType.erc20,
        tokenDecimals: "6",
        recipientAddress: recipientAddress as `0x${string}`,
        baseUrl: `${window.location.origin}/invoice/id`,
        APIKey: PEANUTAPIKEY!,
      });
      console.log("this is the link for peanut payment requests", link);

      toast({
        title: "Request link created",
        description: "Your payment request link has been created.",
      });

      onSuccess?.();
      return { requestLink: link };
    } catch (error: any) {
      console.error("Error creating request link:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      toast({
        title: "Error creating request link",
        description: errorMessage,
        variant: "destructive",
      });
      onFailed?.(error);
      throw error;
    } finally {
      setIsLoading(false);
      setLoading(false);
      onFinished?.();
    }
  };

  // Al crear un request link, se debe crear un link de pago con el mismo token y cantidad

  const fulfillRequestLink = async (
    link: string,
    onInProgress?: () => void,
    onSuccess?: () => void,
    onFailed?: (error: Error) => void,
    onFinished?: () => void,
  ) => {
    setIsLoading(true);
    setLoading(true);
    setError(null);

    try {
      if (!address || !signer) {
        throw new Error("Wallet not connected or signer unavailable");
      }

      // Get the details of the request link
      const linkDetails = await peanut.getRequestLinkDetails({
        link,
        APIKey: PEANUTAPIKEY!,
      });

      // Prepare the unsigned transaction
      const { unsignedTx } = peanut.prepareRequestLinkFulfillmentTransaction({
        recipientAddress: linkDetails.recipientAddress!,
        tokenAddress: linkDetails.tokenAddress,
        tokenAmount: linkDetails.tokenAmount,
        tokenDecimals: linkDetails.tokenDecimals,
        tokenType: peanut.interfaces.EPeanutLinkType.erc20,
      });

      // Sign and submit the transaction
      const { tx, txHash } = await peanut.signAndSubmitTx({
        unsignedTx,
        structSigner: {
          signer,
          gasLimit: BigNumber.from(2000000),
        },
      });

      onInProgress?.();

      // Wait for transaction confirmation
      await tx.wait();

      // Submit the fulfillment
      await peanut.submitRequestLinkFulfillment({
        chainId: linkDetails.chainId,
        hash: txHash,
        payerAddress: address,
        link,
        amountUsd: "",
      });

      toast({
        title: "Request fulfilled",
        description: `Transaction hash: ${txHash}. Payment completed!`,
      });

      onSuccess?.();
      return txHash;
    } catch (error: any) {
      console.error("Error fulfilling request:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      toast({
        title: "Error fulfilling request",
        description: errorMessage,
        variant: "destructive",
      });
      onFailed?.(error);
      throw error;
    } finally {
      setIsLoading(false);
      setLoading(false);
      onFinished?.();
    }
  };

  const fulfillRequestLinkXChain = async (
    link: string,
    fromToken: string,
    fromChainId: string,
    tokenDecimals: number,
    onInProgress?: () => void,
    onSuccess?: () => void,
    onFailed?: (error: Error) => void,
    onFinished?: () => void,
    isMainnet?: boolean,
  ) => {
    setIsLoading(true);
    setLoading(true);
    setError(null);

    try {
      if (!address || !signer) {
        throw new Error("Wallet not connected or signer unavailable");
      }

      // Get the details of the request link
      const linkDetails = await peanut.getRequestLinkDetails({
        link,
        APIKey: PEANUTAPIKEY!,
      });

      // Prepare the cross-chain transaction
      const xchainUnsignedTxs =
        await peanut.prepareXchainRequestFulfillmentTransaction({
          fromChainId,
          senderAddress: address as `0x${string}`,
          fromToken,
          squidRouterUrl: peanut.getSquidRouterUrl(isMainnet || false, false),
          provider: signer.provider!,
          fromTokenDecimals: tokenDecimals,
          tokenType: peanut.interfaces.EPeanutLinkType.erc20,
          linkDetails,
        });

      let lastHash = "";
      for (const unsignedTx of xchainUnsignedTxs.unsignedTxs) {
        const { tx, txHash } = await peanut.signAndSubmitTx({
          unsignedTx,
          structSigner: {
            signer,
            gasLimit: BigNumber.from(2000000),
          },
        });

        lastHash = txHash;
        onInProgress?.();

        await tx.wait();
      }

      // Submit the fulfillment
      await peanut.submitRequestLinkFulfillment({
        chainId: linkDetails.chainId,
        hash: lastHash,
        payerAddress: address,
        link,
        amountUsd: "",
      });

      toast({
        title: "Cross-chain request fulfilled",
        description: `Transaction hash: ${lastHash}. This may take a few minutes to complete.`,
      });

      onSuccess?.();
      return lastHash;
    } catch (error: any) {
      console.error("Error fulfilling cross-chain request:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      toast({
        title: "Error fulfilling cross-chain request",
        description: errorMessage,
        variant: "destructive",
      });
      onFailed?.(error);
      throw error;
    } finally {
      setIsLoading(false);
      setLoading(false);
      onFinished?.();
    }
  };

  return {
    isLoading,
    address: address || null,
    chainId,
    createPayLink,
    claimPayLink,
    claimPayLinkXChain,
    copyToClipboard,
    createRequestLink,
    fulfillRequestLink,
    fulfillRequestLinkXChain,
  };
};
