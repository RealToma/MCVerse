import { useMemo } from 'react'

import { Zero } from '@ethersproject/constants'
import { BigNumber } from 'ethers'

import Button from 'components/Button'
import { LoadingIcon } from 'components/SVGIcons'
import { useFarmOptionContext } from 'contexts'
import { usePollTokenPrices } from 'hooks'
import { useFarmStaking } from 'pages/Farms/hooks'
import { IFarmData } from 'pages/Farms/types'
import { convertBigNumToNormal, numberToStringWithSeparator } from 'utils/helper'

const FarmStaking = ({ item }: { item: IFarmData }) => {
  const tokenPrice = usePollTokenPrices(item.depositToken.implementation)
  const {
    isDepositOrWithdraw,
    stakingAmount,
    isApproved,
    isLoading,
    lpTokenBalance,
    handleToDepositOrWithdraw,
    handleStake,
    handleApprove,
    handleWithdraw,
    handleStakingAmount,
  } = useFarmStaking(item.depositToken.implementation)
  const { isListView } = useFarmOptionContext()
  const isGrid = useMemo(() => isListView === 'grid', [isListView])
  const buttonClassName = useMemo(() => `leading-[120%] font-bold font-sans text-sm ${isGrid === false && 'max-w-[153px]'}`, [isGrid])

  return (
    <div className={`relative flex flex-col items-start justify-center gap-1 ${isGrid ? 'w-full' : 'w-[40%]'}`}>
      <div className="flex gap-1 items-center text-xs leading-[140%] uppercase mb-3">
        {'staked / Available'}
        <span className="text-xs text-cyan-200">{item.depositToken.symbol}</span>
      </div>
      <div className={`flex w-full gap-4 ${isGrid ? 'items-center justify-between' : 'items-end justify-between'}`}>
        <div className="flex flex-col items-start gap-1">
          <span className="font-bold text-lg leading-[93%] text-start">{`${convertBigNumToNormal(item.userDeposited, true)} / ${
            lpTokenBalance ? numberToStringWithSeparator(+lpTokenBalance.formatted) : '---'
          }`}</span>
          <span className="font-light text-sm leading-[120%]">{`~${numberToStringWithSeparator(
            +convertBigNumToNormal(item.userDeposited, false, 18) * tokenPrice
          )}USD`}</span>
        </div>
        {isDepositOrWithdraw === undefined ? (
          <div className="flex gap-4">
            <Button
              width="w-[72px]"
              color={'amber'}
              isTransparent
              border="border border-amber"
              isDisabled={BigNumber.from(item.userDeposited).lte(Zero)}
              className={buttonClassName}
              onClick={() => handleToDepositOrWithdraw(false, item.userDeposited)}
            >
              {'REMOVE'}
            </Button>
            <Button
              width="w-[70px]"
              color={'amber'}
              isTransparent
              border="border border-amber"
              isDisabled={!lpTokenBalance || +lpTokenBalance.formatted === 0}
              className={buttonClassName}
              onClick={() => handleToDepositOrWithdraw(true)}
            >
              {'ADD'}
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-end w-3/5 bg-cyan-600 bg-opacity-10 border border-solid border-amber rounded-lg">
            <input
              className="py-1 px-2 xl:py-1.5 xl:px-3 min-w-[30px] w-full bg-transparent text-xs text-white text-shadow-blue  placeholder-[#B3DAE0]/60 tracking-[2px] focus:outline-none"
              placeholder={isDepositOrWithdraw === 'deposit' ? 'Stake' : 'Withdraw'}
              value={stakingAmount}
              onChange={(e) => handleStakingAmount(e.target.value, item.userDeposited)}
            />
            <div
              className="text-sm font-medium text-amber px-2 cursor-pointer hover:text-amber-600"
              onClick={() => handleStakingAmount('', item.userDeposited, true)}
            >
              {'Max'}
            </div>
            <Button
              width={isListView === 'list' ? 'w-[112px] min-w-[112px]' : 'w-full'}
              color={'black'}
              className={buttonClassName}
              isDisabled={isLoading || stakingAmount === ''}
              isTransparent={isLoading || stakingAmount === ''}
              onClick={() => {
                isDepositOrWithdraw === 'withdraw'
                  ? handleWithdraw(item.id)
                  : isApproved
                  ? handleStake(item.id)
                  : handleApprove(item.implementation)
              }}
            >
              {isDepositOrWithdraw === 'withdraw' ? 'Withdraw' : isApproved ? 'STAKE LP' : 'Approve'}
              {isLoading && <LoadingIcon />}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FarmStaking
