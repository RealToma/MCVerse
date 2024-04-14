import { BridgeIcon } from 'components/Icons'
import { PageMainWrapper } from 'pages/Layout'
import { harmonyLogo, logoAvaxWhite } from 'utils/helper/image.helper'

import BridgeItem from './components/BridgeItem'

const Bridge = () => {
  return (
    <PageMainWrapper>
      <div className="relative pb-4 mb-10 md:pb-40 md:mb-24 2xl:pb-20 2xl:mb-12 callout-bg">
        <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-black border border-cyan-650 shadow-[0_0_9px_rgba(77,201,255,0.9)] hidden md:flex items-center justify-center">
          <BridgeIcon width={40} height={40} />
        </div>
        <div className="hidden ml-1 sm:ml-6 md:ml-20 md:flex md:items-center md:justify-between md:mr-[14vw] h-16">
          <div className="md:flex md:items-center">
            <div
              className="font-bold text-xl text-cyan-100 leading-4 tracking-[2.4px] uppercase"
              style={{ textShadow: '0px 0px 5px rgba(50, 171, 252, 0.98)' }}
            >
              BRIDGE YOUR ASSETS
            </div>
            <div className="w-px border border-r border-dashed border-amber-400 h-6 rotate-[30deg] mx-1 sm:mx-4"></div>
            <div className="text-white text-[10px] font-medium tracking-[2px] text-shadow-blue">
              Send your NFTs from one chain to another
            </div>
          </div>
        </div>
        <div className="grid gap-2 mt-2 xl:pr-4 xl:pl-6 md:grid-cols-2">
          <div>
            <div className="py-2 text-lg font-medium leading-5 text-cyan-50">Bridge from:</div>
            <div className="border bg-gradient-blue border-cyan-50 rounded-2xl p-7">
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center border rounded-full border-cyan-250 py-2.5 px-3 gap-2 w-48">
                  <img src={harmonyLogo} alt="" />
                  <div className="text-xs leading-[120%] text-shadow-blue">Harmony</div>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium text-[10px] leading-3 tracking-[1px] text-cyan text-shadow-blue uppercase">supported</div>
                    <div className="font-medium text-2xl leading-3 tracking-[1px] text-shadow-blue mt-2">11</div>
                  </div>
                  <div>
                    <div className="font-medium text-[10px] leading-3 tracking-[1px] text-shadow-blue uppercase">unsupported</div>
                    <div className="font-medium text-2xl leading-3 tracking-[1px] text-shadow-blue mt-2">5</div>
                  </div>
                </div>
              </div>
              <div className="my-4 border-t border-dashed border-cyan-150"></div>
              <div className="overflow-y-auto h-96">
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-7 md:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-7 ">
                  {[...Array(11)].map((_, index) => (
                    <BridgeItem key={index} isSupported />
                  ))}
                  {[...Array(5)].map((_, index) => (
                    <BridgeItem key={index} isSupported={false} />
                  ))}
                </div>
              </div>
              <div className="my-4 border-t border-dashed border-cyan-150"></div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-[10px] leading-3 tracking-[1px] text-cyan text-shadow-blue uppercase">supported</div>
                  <div className="font-medium text-2xl leading-3 tracking-[1px] text-shadow-blue mt-2">11</div>
                </div>
                <button className="border-2 border-[#00C6FB] rounded-tr-xl rounded-bl-xl p-5 text-center font-bold text-lg leading-3 tracking-[1px] text-cyan-250 uppercase">
                  bridge selected nfts
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="py-2 text-lg font-medium leading-5 text-amber-600">Bridge to:</div>
            <div className="border bg-gradient-blue border-amber-600 rounded-2xl p-7">
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center border rounded-full border-amber-600 py-2.5 px-3 gap-2 w-48">
                  <img src={logoAvaxWhite} alt="" className="w-4 h-4" />
                  <div className="text-xs leading-[120%]" style={{ textShadow: '0px 0px 3px #FFCC0D' }}>
                    Avalanche
                  </div>
                </div>
                <div>
                  <div className="font-medium text-[10px] leading-3 tracking-[1px] text-amber-600 text-shadow-blue uppercase">
                    ready to bridge
                  </div>
                  <div className="font-medium text-2xl leading-3 tracking-[1px] text-shadow-blue mt-2">0</div>
                </div>
              </div>
              <div className="my-4 border-t border-dashed border-cyan-150"></div>
              <div className="overflow-y-auto h-96">
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-7 md:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-7"></div>
              </div>
              <div className="my-4 border-t border-dashed border-cyan-150"></div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-amber-600">
                    Not seeing your bridged assets here? <span className="font-black">Click refresh.</span>{' '}
                  </div>
                </div>
                <button className="border-2 border-amber-600 rounded-tr-xl rounded-bl-xl p-5 text-center font-bold text-lg leading-3 tracking-[1px] text-amber-600 uppercase">
                  refresh
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs leading-5 md:w-1/2 text-amber-600 xl:pl-6">
          If you have assets that are not supported on our bridge, please reach out to our team on Discord for consideration of the
          unsupported project.
        </div>
      </div>
    </PageMainWrapper>
  )
}

export default Bridge
