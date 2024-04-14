import { useMemo, useState } from 'react'

import { ArrowFillIcon } from 'components/SVGIcons'
import { usePollTokenPrices } from 'hooks'
import { IFarmData } from 'pages/Farms/types'
import { aprCalculator } from 'pages/Farms/utils'
import { convertBigNumToNormal, numberToStringWithSeparator } from 'utils/helper'

import FarmItemDetail from './FarmItemDetail'

const FarmItem = ({ item }: { item: IFarmData }) => {
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false)
  const lptokenPriceUSD = usePollTokenPrices(item.rewardToken.implementation)

  // console.log('item.rewardToken.implementation:', item.rewardToken.implementation)
  // console.log('lptokenPriceUSD:', lptokenPriceUSD)
  // console.log('item.currentlyDeposited:', convertBigNumToNormal(item.currentlyDeposited, false, 18) as number)
  const apr = useMemo(
    () => aprCalculator(item.lpTokenPair, item.rewardToken, item.emissionRate, item.currentlyDeposited),
    [item.currentlyDeposited, item.lpTokenPair, item.rewardToken, item.emissionRate]
  )

  return (
    <>
      <div
        className={`relative flex w-full items-center p-6 border-b border-gray border-dashed flex-row cursor-pointer hover:bg-cyan-900/10`}
        onClick={() => setIsShowDetail(!isShowDetail)}
      >
        {item.id % 2 === 1 && (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-farm-item opacity-[.29] mix-blend-normal transform-[martrix(1, 0, 0, -1, 0, 0)]" />
        )}
        <div className="relative flex items-center w-[28%] pl-2 box-border h-[50px]">
          <img src={item.lpTokenPair.token1.logoURI} alt="token-1" className="absolute -top-2 -left-0 z-0 w-6 h-auto" />
          <img src={item.lpTokenPair.token0.logoURI} alt="token-0" className="z-10 relative w-[2.6vw] h-auto" />
          <span className="font-extrabold text-xl text-cyan-200 md:text-base lg:text-lg xl:text-xl uppercase ml-4 leading-[84%]">
            {`${item.lpTokenPair.token0.symbol} - ${item.lpTokenPair.token1.symbol}`}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center w-[8%] py-2 border-dashed border-l border-gray h-[50px]">
          <span className="text-xs font-semibold leading-[140%] tracking-[1px] mb-[5px]">{'EARN'}</span>
          <img src={item.rewardToken.logoURI} alt="reward-token" width={23} height={23} />
        </div>
        <div className="flex flex-col items-start justify-center w-[15%] pl-[20px] box-border border-dashed border-l border-gray h-[50px]">
          <span className="text-xs font-semibold leading-[140%] tracking-[1px] mb-[5px]">{'EARNED'}</span>
          <div className="flex gap-2 items-center">
            <img src={item.rewardToken.logoURI} alt="reward-token" width={23} height={23} />
            <span className={`font-light font-sans leading-[105%] text-cyan`}>{convertBigNumToNormal(item.userClaimable, true)}</span>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-[19%] pl-[20px] box-border border-dashed border-l border-gray h-[50px]">
          <span className="text-xs font-semibold leading-[140%] tracking-[1px] mb-[5px]">{'APR'}</span>
          <div className="flex gap-2 items-center">
            <span className="font-sans font-light leading-[105%]">{`${item.apr?.toLocaleString()}%`}</span>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-[20%] pl-[20px] box-border border-dashed border-l border-gray h-[50px]">
          {/* <div className="flex flex-col items-start justify-center space-y-2"> */}
          <span className="text-xs font-semibold leading-[140%] tracking-[1px] mb-[5px]">{'LIQUIDITY'}</span>
          <span className="font-sans font-light leading-[105%]">
            <strong>$</strong>
            {`${numberToStringWithSeparator((convertBigNumToNormal(item.currentlyDeposited, false, 18) as number) * lptokenPriceUSD)}`}
          </span>
          {/* </div> */}
          {/* <QuestionCircleIcon className="fill-gray hover:fill-amber-400/70 hover:drop-shadow-[0px_0px_4px_#ffd900] cursor-pointer" /> */}
        </div>
        <div className="relative flex items-center justify-start w-[10%] gap-4 hover:fill-amber-400 hover:drop-shadow-[0px_0px_4px_#ffd900] cursor-pointer pl-[20px] box-border border-dashed border-l border-gray h-[50px]">
          <span className="text-xs font-semibold leading-[140%] text-amber-400">{'Details'}</span>
          <ArrowFillIcon className={`fill-amber-800 ${isShowDetail && 'rotate-180'}`} />
        </div>
      </div>
      {isShowDetail && (
        <div className={`animate-opacity [animation-fill-mode:forwards]`}>
          <FarmItemDetail item={item} />
        </div>
      )}
    </>
  )
}

export default FarmItem
