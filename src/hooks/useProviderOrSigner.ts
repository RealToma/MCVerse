import { useMemo } from 'react'

import { useProvider, useSigner } from 'wagmi'

import { useWeb3 } from './useWeb3'

export const useProviderOrSigner = (withSignerIfPossible = true) => {
  const { chainId, address, isConnected } = useWeb3()
  const provider = useProvider({ chainId })
  const { data: signer } = useSigner()

  return useMemo(
    () => (withSignerIfPossible && address && isConnected && signer ? signer : provider),
    [address, isConnected, provider, signer, withSignerIfPossible]
  )
}
