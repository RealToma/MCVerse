import { useCallback, useEffect } from 'react'

import { ethers } from 'ethers'

import { TOKEN_LIST } from 'config/constants'
import { LP_TOKEN_ABI, farmManagerContract, routerContract } from 'config/web3'
import { useGetContract, useWeb3 } from 'hooks'
import { setFarmDataList } from 'state/farm/reducer'
import { useAppDispatch } from 'state/hooks'
import { setIsLoading } from 'state/web3/reducer'
import { executeSingleReadContract, getContractWithSimpleProvider, convertBigNumToNormal } from 'utils/helper'

import { IFarmData } from '../types'

export const useFetFarmData = () => {
  const { address, chainId } = useWeb3()
  const dispatch = useAppDispatch()

  const farmMangerContractInstance = useGetContract(farmManagerContract)
  const routerContractInstance = useGetContract(routerContract)

  const handleFetchFarmData = useCallback(async () => {
    if (!farmMangerContractInstance || !address) return
    if (!routerContractInstance) return
    try {
      dispatch(setIsLoading(true))
      const farmData = await executeSingleReadContract(farmMangerContractInstance, 'getFarmsDataFor', [address])
      if (farmData.length < 1) {
        dispatch(setFarmDataList([]))
        return
      }

      const farmList: IFarmData[] = []
      for (let i = 0; i < farmData.length; i++) {
        const {
          implementation,
          depositToken,
          rewardToken,
          emissionRate,
          startDate,
          totalClaimed,
          totalDeposited,
          totalWithdrawn,
          globalClaimable,
          currentlyDeposited,
          userClaimable,
          userDeposited,
        } = farmData[i]

        const lpTokenContract = getContractWithSimpleProvider(depositToken.implementation, LP_TOKEN_ABI, chainId)
        let token0
        let token1
        let apr
        try {
          token0 = await executeSingleReadContract(lpTokenContract, 'token0', [])
          token1 = await executeSingleReadContract(lpTokenContract, 'token1', [])
        } catch {
          token0 = depositToken.implementation
          token1 = depositToken.implementation
        }
        try {
          const emissionPerYear = emissionRate * 60 * 60 * 24 * 365
          const wavax = await executeSingleReadContract(routerContractInstance, 'WAVAX', [])
          const price = await executeSingleReadContract(routerContractInstance, 'getAmountsOut', [BigInt(1e18), [rewardToken[0], wavax]])
          const valueOfYearlyEmission = (emissionPerYear * price[1]) / 1e18
          // console.log('valueOfYearlyEmission', valueOfYearlyEmission)
          let valueOfDeposited
          if (token0 != token1) {
            const totalLp = await executeSingleReadContract(lpTokenContract, 'totalSupply', [])
            const lpInFarm = await executeSingleReadContract(lpTokenContract, 'balanceOf', [implementation])
            const ratio = lpInFarm / totalLp
            let tokenToFindValue = token0 == wavax ? token1 : token0
            const { reserve0, reserve1 } = await executeSingleReadContract(lpTokenContract, 'getReserves', [])
            const reserves = tokenToFindValue == token0 ? reserve0 : reserve1
            const reservesDeposited = reserves * ratio
            const priceOfToken = await executeSingleReadContract(routerContractInstance, 'getAmountsOut', [
              BigInt(1e18),
              [tokenToFindValue, wavax],
            ])
            valueOfDeposited = (reservesDeposited * priceOfToken[1] * 2) / 1e18
          } else {
            const priceOfToken = await executeSingleReadContract(routerContractInstance, 'getAmountsOut', [BigInt(1e18), [token0, wavax]])
            const balance = await executeSingleReadContract(lpTokenContract, 'balanceOf', [implementation])
            valueOfDeposited = (balance * priceOfToken[1]) / 1e18
          }
          apr = Number(((valueOfYearlyEmission * 100) / valueOfDeposited).toFixed(2))
        } catch (e) {
          // console.log('Failed to get apy: ', e)
          apr = 0
        }
        const farm = {
          id: i,
          implementation,
          depositToken: { implementation: depositToken.implementation, name: depositToken.name, symbol: depositToken.symbol },
          lpTokenPair: { token0: TOKEN_LIST[token0], token1: TOKEN_LIST[token1] },
          rewardToken: {
            implementation: rewardToken.implementation,
            name: rewardToken.name,
            symbol: rewardToken.symbol,
            logoURI: TOKEN_LIST[rewardToken.implementation].logoURI,
          },
          emissionRate,
          startDate,
          totalClaimed,
          totalDeposited,
          totalWithdrawn,
          globalClaimable,
          currentlyDeposited,
          userClaimable,
          userDeposited,
          apr,
        }
        farmList.push(farm)
      }

      dispatch(setFarmDataList(farmList))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }, [address, chainId, dispatch, farmMangerContractInstance, routerContractInstance])

  useEffect(() => {
    handleFetchFarmData()
  }, [handleFetchFarmData])

  return { handleFetchFarmData }
}
