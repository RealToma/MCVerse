import { useMemo } from 'react'

import Button from 'components/Button'
import { ExternalLinkIcon, LoadingIcon } from 'components/SVGIcons'
import { TRADE_JOE_POOL_URL } from 'config/baseURLs'
import { useHandleExternalLink, usePollTokenPrices, useWeb3 } from 'hooks'
import { useFarmHarvest } from 'pages/Farms/hooks'
import { IFarmData } from 'pages/Farms/types'
import { ExplorerDataType, convertBigNumToNormal, getExplorerLink, numberToStringWithSeparator } from 'utils/helper'

import FarmStaking from './FarmStaking'

const FarmItemDetail = ({ item }: { item: IFarmData }) => {
  const tokenPrice = usePollTokenPrices(item.rewardToken.implementation)
  const { isLoading, handleHarvest } = useFarmHarvest()
  const { handleOpenExternalLink } = useHandleExternalLink()
  const { chainId } = useWeb3()
  const isDisabled = useMemo(() => (convertBigNumToNormal(item.userClaimable, false, 0) as number) === 0, [item])

  return (
    <div className={`relative flex items-center py-4 px-[18px] border-b border-gray border-dashed flex-row`}>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-farm-detail mix-blend-normal transform-[martrix(1, 0, 0, -1, 0, 0)]" />
      <div className="relative flex flex-col items-start justify-center w-[28%] pl-2 space-y-1">
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
      <div className="relative flex flex-col items-start justify-center gap-1 w-[32%] px-2">
        <div className="flex items-center gap-1 text-xs leading-[140%] text-cyan-200 uppercase mb-3">
          {item.rewardToken.symbol}
          <span className="text-white">{'earned'}</span>
        </div>
        <div className="flex items-end justify-between w-full pr-4">
          <div className="flex flex-col items-start gap-1">
            <span className="font-bold text-lg leading-[93%] text-start">
              {numberToStringWithSeparator(convertBigNumToNormal(item.userClaimable, true, 18) as number)}
            </span>
            <span className="font-light text-sm leading-[120%]">{`~${numberToStringWithSeparator(
              (convertBigNumToNormal(item.userClaimable, false, 18) as number) * tokenPrice
            )}USD`}</span>
          </div>
          <Button
            width="w-3/5"
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
      </div>
      <FarmStaking item={item} />
    </div>
  )
}

export default FarmItemDetail
