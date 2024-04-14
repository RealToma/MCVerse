import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { Chain, configureChains, createClient } from 'wagmi'
import { avalanche, avalancheFuji } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

import { isProd } from 'config/env'

export enum SupportedChainId {
  AVALANCHE = isProd ? avalanche.id : avalancheFuji.id,
  // Extend to add more chain id
}

export const DEFAULT_CHAIN_ID = isProd ? avalanche.id : avalancheFuji.id

export const ConnectorNames = {
  Metamask: 'metaMask',
  WalletConnect: 'walletConnect',
} as const

export const rpcUrlMap: { [chainId in SupportedChainId]: string } = {
  [SupportedChainId.AVALANCHE]: isProd ? `${avalanche.rpcUrls.default.http}` : `${avalancheFuji.rpcUrls.default.http}`,
}

const supportedChains: Chain[] = isProd ? [avalanche] : [avalancheFuji]

export const { chains, provider } = configureChains(supportedChains, [
  jsonRpcProvider({
    rpc: (chain) => ({
      http: rpcUrlMap[chain.id as SupportedChainId],
    }),
  }),
  publicProvider(),
])

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [injectedWallet({ chains }), metaMaskWallet({ chains })],
  },
  {
    groupName: 'Others',
    wallets: [
      walletConnectWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
      coinbaseWallet({ chains, appName: 'MCVerse Farming' }),
    ],
  },
])

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})
