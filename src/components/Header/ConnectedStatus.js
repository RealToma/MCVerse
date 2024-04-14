import { useDisconnect } from 'wagmi'

import { useCopyToClipboard, useWeb3 } from 'hooks'
import { useGetWeb3ReducerValues } from 'state/web3/hooks'
import { shortenAddress } from 'utils/helper'
import * as Images from 'utils/helper/image.helper'

import { CheckIcon, CopyIcon, DisconnectIcon } from './Icons'

const ConnectedStatus = () => {
  const { address, chainId } = useWeb3()
  const { isCopied, handleCopy } = useCopyToClipboard()
  const { disconnect } = useDisconnect()
  const { avaxBalance } = useGetWeb3ReducerValues('walletBalance')

  if (!address || !chainId) return null

  return (
    <div className="absolute z-30 top-6 lg:top-12 right-0 flex flex-col items-start w-max gap-4 px-3 py-6 bg-[#000F44] bg-opacity-90 border-[0.5px] border-cyan-50 rounded-md text-white">
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm opacity-70">{'Balance'}</span>
        <div className="flex items-center justify-start gap-2 w-full font-bold text-lg">
          <img src={Images.logoAvaxWhite} alt={address} />
          {`${avaxBalance ? (+avaxBalance).toLocaleString() : '---'} AVAX`}
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm opacity-70">{'Wallet'}</span>
        <div className="flex items-center justify-between gap-32 w-full text-sm">
          <span className="font-bold text-lg">{shortenAddress(address, false)}</span>
          {isCopied ? (
            <CheckIcon className="w-4 h-4 fill-cyan-600" />
          ) : (
            <CopyIcon
              className="w-4 h-4 fill-white hover:fill-cyan-600 transition-colors duration-200 cursor-pointer"
              onClick={async () => await handleCopy(address)}
            />
          )}
        </div>
      </div>

      <div className="w-full h-px my-1 border-t border-gray-600 border-dashed" />
      <div className="flex items-center gap-4 group cursor-pointer" onClick={() => disconnect()}>
        <DisconnectIcon className="w-5 h-5 fill-white group-hover:fill-cyan-600" />
        <span className="text-sm-bold group-hover:text-cyan-600">{'Log out'}</span>
      </div>
    </div>
  )
}

export default ConnectedStatus
