import { Token, Chain } from "./types";

type ViewTab = "lend" | "withdraw" | "borrow" | "repay";

type PaymentTab = "send" | "receive";

interface PaymentStore {
  currentPaymentTab: PaymentTab;
  setCurrentPaymentTab: (tab: PaymentTab) => void;
}

interface MarketStore {
  currentViewTab: ViewTab;
  setCurrentViewTab: (tab: ViewTab) => void;
  selectedAsset: Token | null;
  setSelectedAsset: (asset: Token) => void;
  fromChain: Chain;
  toChain: Chain;
  setFromChain: (Chain: Chain) => void;
  setToChain: (Chain: Chain) => void;
}

export type {
  PaymentStore,
  ViewTab,
  MarketStore,
  PaymentTab
};
