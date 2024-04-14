import { useMemo, useState } from 'react'

import Button from 'components/Button'
import { ArrowFillIcon, ExternalLinkIcon, LoadingIcon } from 'components/SVGIcons'
import { TRADE_JOE_POOL_URL } from 'config/baseURLs'
import { useHandleExternalLink, usePollTokenPrices, useWeb3 } from 'hooks'
import { useFarmHarvest } from 'pages/Farms/hooks'
import { IFarmData } from 'pages/Farms/types'
import { aprCalculator } from 'pages/Farms/utils'
import { ExplorerDataType, convertBigNumToNormal, getExplorerLink, numberToStringWithSeparator } from 'utils/helper'

import FarmStaking from './FarmStaking'

const Divider = ({ isShowDetail }: { isShowDetail?: boolean }) => {
  return <div className={`relative w-full h-px my-8 md:my-4 border-t ${isShowDetail && 'blur-md'} border-gray border-dashed`} />
}

const FarmItemGrid = ({ item }: { item: IFarmData }) => {
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false)
  const { isLoading, handleHarvest } = useFarmHarvest()
  const { handleOpenExternalLink } = useHandleExternalLink()
  const lptokenPriceUSD = usePollTokenPrices(item.rewardToken.implementation)

  const { chainId } = useWeb3()

  const termWrapperClassNames = useMemo(
    () => `relative flex items-center justify-between w-full transition-[filter] duration-300 ${isShowDetail && 'blur-md'}`,
    [isShowDetail]
  )

  // const apr = useMemo(
  //   () => aprCalculator(item.lpTokenPair, item.rewardToken, item.emissionRate, item.currentlyDeposited),
  //   [item.lpTokenPair, item.rewardToken, item.emissionRate, item.currentlyDeposited]
  // )

  const isDisabled = useMemo(() => (convertBigNumToNormal(item.userClaimable, false, 0) as number) === 0, [item])

  return (
    <div className={`relative flex flex-col items-center px-6 bg-gradient-farm-item-grid border border-solid border-amber-400 mb-[30px]`}>
      <div className={'relative flex items-center w-full pt-10 md:pt-6 pl-2'}>
        <img src={item.lpTokenPair.token1.logoURI} alt="token-1" className="absolute top-8 md:top-4 left-0 md:left-0 z-0 w-6 h-auto" />
        <img src={item.lpTokenPair.token0.logoURI} alt="token-0" className="z-10 relative  w-[10%] md:w-[13.72%] h-auto" />
        <span className="font-extrabold text-xl text-cyan-200 uppercase ml-4 leading-[84%] tracking-[1px]">{`${item.lpTokenPair.token0.symbol} - ${item.lpTokenPair.token1.symbol}`}</span>
      </div>
      <Divider />
      <div className={termWrapperClassNames}>
        <div className="flex flex-col items-start justify-center w-fit space-y-2">
          <span className="font-semibold text-xs leading-[140%] tracking-[1px]">{'APR'}</span>
          <div className="flex gap-2 items-center">
            <span className="font-sans font-light leading-[105%]">{`${item.apr.toLocaleString()}%`}</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-0.5">
          <span className="font-semibold text-xs leading-[140%] tracking-[1px]">{'EARN'}</span>
          <img src={item.rewardToken.logoURI} alt="reward-token-logo" width={23} height={23} />
        </div>
      </div>
      <Divider isShowDetail={isShowDetail} />
      <div className={termWrapperClassNames}>
        <div className="flex flex-col items-start justify-center w-[12%] space-y-2">
          <span className="font-semibold text-xs leading-[140%] tracking-[1px]">{'EARNED'}</span>
          <div className="flex gap-2 items-center">
            <img src={item.rewardToken.logoURI} alt="reward-token-logo" className="w-[17px] h-[17px]" />
            <span className={`font-sans font-light leading-[105%] text-cyan`}>{convertBigNumToNormal(item.userClaimable, true)}</span>
          </div>
        </div>
        <Button
          width="w-1/2 2xl:w-3/5"
          color={'amber'}
          isTransparent
          border="border border-amber"
          isDisabled={isDisabled || isLoading}
          className={`leading-[120%] font-bold font-sans text-sm max-w-[153px]`}
          onClick={() => {
            if (isDisabled) {
              return
            }
            if (isLoading) {
              return
            }
            handleHarvest(item.id)
          }}
        >
          {'HARVEST'}
          {isLoading && <LoadingIcon />}
        </Button>
      </div>
      <Divider isShowDetail={isShowDetail} />
      <div className={termWrapperClassNames}>
        <FarmStaking item={item} />
      </div>
      <Divider isShowDetail={isShowDetail} />
      <div
        className={`${termWrapperClassNames} !justify-center gap-4 mb-4 hover:fill-amber-400 hover:drop-shadow-[0px_0px_4px_#ffd900] cursor-pointer`}
        onClick={() => setIsShowDetail(!isShowDetail)}
      >
        <span className="font-semibold text-xs leading-[140%] text-amber-400">{'Details'}</span>
        <ArrowFillIcon className="fill-amber-800 rotate-180" />
      </div>
      {isShowDetail && (
        <div
          className={`flex flex-col w-full bg-gradient-farm-detail absolute bottom-0 animate-opacity [animation-fill-mode:forwards] px-6 py-4`}
        >
          <div
            className="relative flex items-center justify-center gap-4 mb-4 hover:fill-amber-400 hover:drop-shadow-[0px_0px_4px_#ffd900] cursor-pointer"
            onClick={() => setIsShowDetail(!isShowDetail)}
          >
            <span className="font-semibold text-xs leading-[140%] text-amber-400">{'Hide'}</span>
            <ArrowFillIcon className="fill-amber-800" />
          </div>
          <div className="flex items-start justify-between">
            <span className="font-semibold text-xs leading-[140%] tracking-[1px]">{'TOTAL LIQUIDITY'}</span>
            <span className="font-sans font-light leading-[105%]">
              <strong>$</strong>
              {`${numberToStringWithSeparator((convertBigNumToNormal(item.currentlyDeposited, false, 18) as number) * lptokenPriceUSD)}`}
            </span>
          </div>
          <Divider />
          <div className="relative flex flex-col items-start justify-center space-y-1">
            <div
              className="flex items-center justify-start gap-1 hover:fill-amber-400 hover:drop-shadow-[0px_0px_4px_#ffd900] cursor-pointer"
              onClick={() =>
                handleOpenExternalLink(`${TRADE_JOE_POOL_URL}${item.lpTokenPair.token0.address}/${item.lpTokenPair.token1.address}`)
              }
            >
              <span className="font-semibold text-sm leading-[200%] text-amber-400">{`Get ${item.depositToken.name}`}</span>
              <ExternalLinkIcon className="fill-amber" />
            </div>
            <div
              className="flex items-center justify-start gap-1 hover:fill-amber-400 hover:drop-shadow-[0px_0px_4px_#ffd900] cursor-pointer"
              onClick={() => handleOpenExternalLink(getExplorerLink(chainId, item.depositToken.implementation, ExplorerDataType.ADDRESS))}
            >
              <span className="font-semibold text-sm leading-[200%] text-amber-400">{'View Contract'}</span>
              <ExternalLinkIcon className="fill-amber" />
            </div>
            <div
              className="flex items-center justify-start gap-1 hover:fill-amber-400 hover:drop-shadow-[0px_0px_4px_#ffd900] cursor-pointer"
              onClick={() =>
                handleOpenExternalLink(`${TRADE_JOE_POOL_URL}${item.lpTokenPair.token0.address}/${item.lpTokenPair.token1.address}`)
              }
            >
              <span className="font-semibold text-sm leading-[200%] text-amber-400">{'See Pair Info'}</span>
              <ExternalLinkIcon className="fill-amber" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FarmItemGrid
