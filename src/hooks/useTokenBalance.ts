import { useCallback, useEffect, useMemo } from 'react'

import { useBalance } from 'wagmi'
import { harmonyOne } from 'wagmi/chains'

import { DEFAULT_CHAIN_ID, mcvContract } from 'config/web3'
import { useAppDispatch } from 'state/hooks'
import { setWalletBalance } from 'state/web3/reducer'

import { useWeb3 } from './useWeb3'

export const useTokenBalance = () => {
  const { address, chainId, isSupported } = useWeb3()
  const dispatch = useAppDispatch()
  const supportedChainID = useMemo(() => (!isSupported || chainId === harmonyOne.id ? DEFAULT_CHAIN_ID : chainId), [chainId, isSupported])

  const { data: avaxBalance, isSuccess } = useBalance({
    address,
    chainId: supportedChainID,
    watch: true,
    cacheTime: 2_000,
  })
  const { data: mcvBalance, isSuccess: isTokenBalanceSuccess } = useBalance({
    address,
    token: mcvContract.addressMap[supportedChainID] as `0x${string}`,
    chainId: supportedChainID,
    watch: true,
    cacheTime: 2_000,
  })

  const handleBalance = useCallback(() => {
    if (isSuccess && isTokenBalanceSuccess && avaxBalance && mcvBalance)
      dispatch(setWalletBalance({ avaxBalance: avaxBalance.formatted, mcvBalance: mcvBalance.formatted }))
  }, [avaxBalance, dispatch, isSuccess, isTokenBalanceSuccess, mcvBalance])

  useEffect(() => {
    handleBalance()
  }, [handleBalance])
}
