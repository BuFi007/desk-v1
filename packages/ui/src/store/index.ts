import { create } from "zustand";
import {
  PaymentStore,
  ViewTab,
  MarketStore,
  PaymentTab
} from "./interface";
import { Token, TabState, Chain } from "./types";
import { persist } from "zustand/middleware";

export const usePaymentStore = create<PaymentStore>((set) => ({
  currentPaymentTab: "send",
  setCurrentPaymentTab: (tab: PaymentTab) => set({ currentPaymentTab: tab }),
}));

export const useMarketStore = create<MarketStore>((set) => ({
  currentViewTab: "lend",
  setCurrentViewTab: (tab: ViewTab) => set({ currentViewTab: tab }),

  selectedAsset: null,
  setSelectedAsset: (asset: Token) => set({ selectedAsset: asset }),

  fromChain: undefined as unknown as Chain,
  toChain: undefined as unknown as Chain,
  setFromChain: (chain: Chain) => set({ fromChain: chain }),
  setToChain: (chain: Chain) => set({ toChain: chain }),
}));

export const useTabStore = create<TabState>()(
  persist(
    (set) => ({
      activeTab: "moneyMarket",
      setActiveTab: (tab) => set({ activeTab: tab }),
      resetTab: () => set({ activeTab: "moneyMarket" }),
    }),
    {
      name: 'tab-storage',
      onRehydrateStorage: () => (state) => {
        // Reset state on page load
        if (state) {
          state.resetTab();
        }
      },
    }
  )
);