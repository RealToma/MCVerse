import { BigNumber } from 'ethers'

export type TViewOption = 'list' | 'grid'
export type TSortOption = 'daily earn' | 'apr' | 'liquidity'

export interface IFarmData {
  id: number
  implementation: `0x${string}`
  depositToken: { implementation: `0x${string}`; name: string; symbol: string }
  lpTokenPair: {
    token0: { name: string; symbol: string; logoURI: string; address: `0x${string}` }
    token1: { name: string; symbol: string; logoURI: string; address: `0x${string}` }
  }
  rewardToken: { implementation: `0x${string}`; name: string; symbol: string; logoURI: string }
  emissionRate: BigNumber
  startDate: number
  totalDeposited: BigNumber
  totalWithdrawn: BigNumber
  totalClaimed: BigNumber
  globalClaimable: BigNumber
  currentlyDeposited: BigNumber
  userClaimable: BigNumber
  userDeposited: BigNumber
  apr: number
}
