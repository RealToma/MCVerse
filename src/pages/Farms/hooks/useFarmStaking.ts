import { useCallback, useState } from 'react'

import { Zero } from '@ethersproject/constants'
import { BigNumber } from 'ethers'
import { useBalance } from 'wagmi'

import { notifyToast } from 'config/toast'
import { farmManagerContract, LP_TOKEN_ABI } from 'config/web3'
import { useGetContract, useWeb3 } from 'hooks'
import { convertBigNumToNormal, convertToBigNumber, executeSingleReadContract, executeSingleWriteContract } from 'utils/helper'

import { useFetFarmData } from './useFarmData'

export const useFarmStaking = (depositTokenAddr: `0x${string}`) => {
  const [stakingAmount, setStakingAmount] = useState<string>('')
  const [isApproved, setIsApproved] = useState<boolean>(false)
  const [isDepositOrWithdraw, setIsDepositOrWithdraw] = useState<'deposit' | 'withdraw' | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { address, chainId } = useWeb3()
  const { handleFetchFarmData } = useFetFarmData()

  const contract = useGetContract(farmManagerContract, true, false)
  const lpContract = useGetContract({ addressMap: depositTokenAddr, abi: LP_TOKEN_ABI }, true, false)

  const { data: lpTokenBalance, isSuccess } = useBalance({
    address,
    token: depositTokenAddr,
    chainId,
  })

  const handleApprove = useCallback(
    async (farmContractAddr: `0x${string}`) => {
      if (!lpContract) return

      try {
        const allowance = await executeSingleReadContract(lpContract, 'allowance', [address, farmContractAddr])

        if (BigNumber.from(allowance).gte(convertToBigNumber(stakingAmount.toString()))) {
          setIsApproved(true)
          return
        }

        setIsLoading(true)
        const { status } = await executeSingleWriteContract(lpContract, 'approve', [
          farmContractAddr,
          convertToBigNumber(stakingAmount.toString()),
        ])

        setIsApproved(status)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    },
    [address, lpContract, stakingAmount]
  )

  const handleStake = useCallback(
    async (farmIndex: number) => {
      if (!contract || isDepositOrWithdraw !== 'deposit') return

      try {
        setIsLoading(true)
        const { status } = await executeSingleWriteContract(contract, 'deposit', [
          [{ amount: convertToBigNumber(stakingAmount.toString()), farmIndex }],
        ])

        if (status) {
          notifyToast({ id: 'deposit', type: 'success', content: 'Successfully staked!' })
          setStakingAmount('')
          setIsDepositOrWithdraw(undefined)
          handleFetchFarmData()
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    },
    [contract, handleFetchFarmData, isDepositOrWithdraw, stakingAmount]
  )

  const handleWithdraw = useCallback(
    async (farmIndex: number) => {
      if (!contract || isDepositOrWithdraw !== 'withdraw') return

      try {
        setIsLoading(true)
        const { status } = await executeSingleWriteContract(contract, 'withdraw', [
          [{ amount: convertToBigNumber(stakingAmount.toString()), farmIndex }],
        ])

        if (status) {
          notifyToast({ id: 'withdraw', type: 'success', content: 'Successfully withdrawed!' })
          setStakingAmount('')
          setIsDepositOrWithdraw(undefined)
          handleFetchFarmData()
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    },
    [contract, handleFetchFarmData, isDepositOrWithdraw, stakingAmount]
  )

  const handleToDepositOrWithdraw = useCallback((isDeposit: boolean, stakedAmount?: BigNumber) => {
    if (isDeposit) {
      setIsDepositOrWithdraw('deposit')
      return
    }

    if (BigNumber.from(stakedAmount).lte(Zero)) return
    setIsDepositOrWithdraw('withdraw')

    return
  }, [])

  const handleStakingAmount = useCallback(
    (value: string, stakedAmount?: BigNumber, isMax?: boolean) => {
      const balance = lpTokenBalance ? lpTokenBalance.formatted : ''

      if (isMax) {
        if (isDepositOrWithdraw === 'deposit') setStakingAmount(balance)
        else setStakingAmount(stakedAmount ? (convertBigNumToNormal(stakedAmount, false, 18) as number).toString() : '')
        return
      }

      if (value === '') {
        setStakingAmount(value)
        return
      }
      const reg = /^(\d)*(\.)?(\d)*$/
      if (!reg.test(value) || isNaN(parseFloat(value)) || isDepositOrWithdraw === undefined) return
      if (isDepositOrWithdraw === 'deposit') {
        setStakingAmount(+value > +balance ? balance : value)
      } else {
        if (!stakedAmount || BigNumber.from(stakedAmount).lte(Zero)) return
        setStakingAmount(
          BigNumber.from(convertToBigNumber(value)).gt(stakedAmount)
            ? (convertBigNumToNormal(stakedAmount, false, 18) as number).toString()
            : value
        )
      }
    },
    [isDepositOrWithdraw, lpTokenBalance]
  )

  return {
    isDepositOrWithdraw,
    stakingAmount,
    isApproved,
    isLoading,
    lpTokenBalance,
    handleToDepositOrWithdraw,
    handleApprove,
    handleStake,
    handleWithdraw,
    handleStakingAmount,
  }
}
