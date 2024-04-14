import { BigNumber, ethers } from 'ethers'

import { routerContract } from 'config/web3/contracts/Router'
import { useGetContract } from 'hooks'
import { convertBigNumToNormal, executeSingleReadContract, getContractWithSimpleProvider } from 'utils/helper'

import { SupportedChainId } from '../../../config/web3/web3Config'
import { IFarmData } from '../types'

export const aprCalculator = (
  lpTokenPair: IFarmData['lpTokenPair'],
  rewardToken: IFarmData['rewardToken'],
  emissionRate: IFarmData['emissionRate'],
  currentlyDeposited: BigNumber
) => {
  try {
    if (BigNumber.from(currentlyDeposited).eq(ethers.constants.Zero)) return 0
    const emissionPerYear = (convertBigNumToNormal(emissionRate, false, 0) as number) * 60 * 60 * 24 * 365
    const router = getContractWithSimpleProvider(
      routerContract.addressMap[SupportedChainId.AVALANCHE],
      routerContract.abi,
      SupportedChainId.AVALANCHE
    )
    const { token0, token1 } = lpTokenPair
    return 4
  } catch (e) {
    console.log('Failed to get apy: ', e)
    return 0
  }
}
