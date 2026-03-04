"use client";

import React from "react";
import {
  RainbowKitProvider,
  getDefaultConfig,
  Chain,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonAmoy,
  sepolia,
} from "wagmi/chains";

const localhostTesnet = {
  id: 31337,
  name: "Merlin Testnet",
  iconUrl: "https://testnet-scan.merlinchain.io/svgs/logo/merlin.png",
  iconBackground: "#fff",
  nativeCurrency: { name: "BTC", symbol: "BTC", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
  },
  blockExplorers: {
    default: { name: "Localhost", url: "/" },
  },
  testnet: true,
};

const config = getDefaultConfig({
  appName: "Nft Mint",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    polygonAmoy,
    sepolia,
    localhostTesnet,
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export function RainbowKitWrapper({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
