import { useCallback, useEffect } from 'react'

import { useSwitchNetwork } from 'wagmi'
import { harmonyOne } from 'wagmi/chains'

import { DEFAULT_CHAIN_ID } from 'config/web3'

import { useGetCurrentURLPath } from './useRouter'
import { useWeb3 } from './useWeb3'

export const useCheckIsSupportedNetwork = () => {
  const { isSupported } = useWeb3()
  const { switchNetwork } = useSwitchNetwork()
  const path = useGetCurrentURLPath()

  const handleCheckSupportedNetwork = useCallback(async () => {
    console.log(path)
    if (!switchNetwork) return
    if (!isSupported) switchNetwork(path === 'bridge' ? harmonyOne.id : DEFAULT_CHAIN_ID)

    return
  }, [isSupported, path, switchNetwork])

  useEffect(() => {
    handleCheckSupportedNetwork()
  }, [handleCheckSupportedNetwork])
}
