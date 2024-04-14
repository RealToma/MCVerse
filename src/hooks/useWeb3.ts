import { useAccount, useNetwork } from 'wagmi'
import { harmonyOne } from 'wagmi/chains'

import { DEFAULT_CHAIN_ID, SupportedChainId } from 'config/web3'

import { useGetCurrentURLPath } from './useRouter'

export const useWeb3 = () => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const path = useGetCurrentURLPath()

  return {
    address,
    chainId: chain && chain.id in SupportedChainId ? chain.id : DEFAULT_CHAIN_ID,
    isConnected,
    isSupported: chain && chain.id in SupportedChainId && (path === 'bridge' ? chain.id === harmonyOne.id : chain.id !== harmonyOne.id),
  }
}
