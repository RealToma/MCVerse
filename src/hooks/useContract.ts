import { useMemo } from 'react'

import { Contract } from '@ethersproject/contracts'
import { useProvider } from 'wagmi'

import { DEFAULT_CHAIN_ID } from 'config/web3'
import { IContractInfo } from 'config/web3/contracts/types'
import { getContract, getContractWithSimpleProvider } from 'utils/helper'

import { useProviderOrSigner } from './useProviderOrSigner'
import { useWeb3 } from './useWeb3'

export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSimpleProvider = true,
  withSignerIfPossible = true
): T | null {
  const { chainId, isSupported } = useWeb3()
  const provider = useProvider({ chainId })

  const providerOrSigner = useProviderOrSigner(withSignerIfPossible) ?? provider

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI) return null

    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]

    try {
      if (withSimpleProvider) {
        return getContractWithSimpleProvider(address, ABI, chainId)
      }

      if (!providerOrSigner || !isSupported) return null
      return getContract(address!, ABI, providerOrSigner)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, providerOrSigner, isSupported, chainId, withSimpleProvider]) as T
}

export const useGetContract = (contract: IContractInfo, withSigner = false, withSimpleProvider = true) => {
  return useContract(contract.addressMap, contract.abi, withSimpleProvider, withSigner)
}
