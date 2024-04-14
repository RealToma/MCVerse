import React from 'react'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import './Login.css'

import grantsSocialDiscord from 'assets/image/social-discord.png'
import grantsSocialInstagram from 'assets/image/social-instagram.png'
import grantsSocialTwitter from 'assets/image/social-twitter.png'
import { useWeb3 } from 'hooks'
import * as Images from 'utils/helper/image.helper'

const Login = () => {
  const { isSupported } = useWeb3()
  return (
    <>
      <div className="hidden py-32 main md:block">
        <img src={Images.logoMCV} alt="logo" className="absolute top-[0.5vw] left-[0.5vw] w-24 lg:w-28 xl:w-32 2xl:w-auto" />
        <div className="absolute md:top-[3.5vh] lg:top-[5vh] left-1/2 -translate-x-1/2 flex items-center gap-2">
          {/* <img src={headerTitleL} alt="title" /> */}
          <div
            className="md:text-base lg:text-[20px] font-semibold text-cyan-600  uppercase tracking-widest"
            style={{ textShadow: '0px 0px 5px rgba(0, 128, 255, 0.98)' }}
          >
            welcome to mcverse
          </div>
          {/* <img src={headerTitleR} alt="title" /> */}
        </div>
        <div className="flex items-center justify-center w-full h-[calc(100vh-16rem)]">
          <div className="connect-wallet  text-center uppercase w-[600px]">
            <div className="text-cyan-650 font-semibold text-2xl tracking-[2.7px] pt-14 pb-8" style={{ textShadow: '0px 0p 5px #FFFFFF' }}>
              please connect your wallet
            </div>
            <div className="w-1/2 h-px border-t border-dashed border-cyan-650 mx-auto"></div>
            <ConnectButton.Custom>
              {({ account, chain, mounted, openConnectModal, openChainModal }) => {
                const connected = mounted && account && chain

                return (
                  <>
                    {!connected ? (
                      <div
                        className="w-fit text-amber-400 font-bold text-2xl tracking-[1px] border border-solid hover:bg-yellow-400 hover:bg-opacity-20 border-amber-400 rounded-tr-[10px] rounded-bl-[10px] cursor-pointer py-6 px-9 my-9 mx-auto"
                        style={{ textShadow: '0px 0px 5px #0080FF' }}
                        onClick={openConnectModal}
                      >
                        connect wallet
                      </div>
                    ) : !isSupported ? (
                      <div
                        className="flex items-center justify-center border border-solid border-white rounded-tr-[10px] rounded-bl-[10px] h-[72px] px-6 [text-shadow:0px_0px_5px_#072637] cursor-pointer"
                        onClick={openChainModal}
                      >
                        {'Switch Network'}
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )
              }}
            </ConnectButton.Custom>

            <div className="w-3/5 text-sm text-cyan-650 tracking-[1.5px] mx-auto mb-10">
              make sure you connect your metamask to the avalanche network
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="absolute left-1/2 bottom-[1vh] w-3/5 -translate-x-1/2 flex items-center">
          <a
            href="https://avalanchehills.com"
            target={'_blank'}
            rel="noreferrer"
            className="text-[10px] text-cyan-100  tracking-[2px] uppercase text-shadow-blue"
          >
            mcverse.app
          </a>
          <div className="grow border border-t border-gray mx-2 shadow-[0_0_3px_#0080FF]"></div>
          <div className="flex items-center gap-1">
            <a href="https://discord.gg/nvHbwmMVUs" target={'_blank'} rel="noreferrer">
              <img src={grantsSocialDiscord} alt="discord" className="w-6" />
            </a>
            <a href="https://twitter.com/TheMCVerse" target={'_blank'} rel="noreferrer">
              <img src={grantsSocialTwitter} alt="twitter" className="w-6" />
            </a>
            <a href="https://www.instagram.com/the_mcverse/" target={'_blank'} rel="noreferrer">
              <img src={grantsSocialInstagram} alt="instagram" className="w-6" />
            </a>
          </div>
        </div>
      </div>
      {/* mobile view */}
      <div className="main-mobile md:hidden h-[100vh]" style={{ height: 'unset' }}>
        <div className="w-full h-[100vh] flex items-center justify-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center w-[90vw] h-10 text-center">
            <div
              className="text-sm font-semibold text-amber-400  uppercase tracking-widest w-full"
              style={{ textShadow: '0px 0px 5px rgba(0, 128, 255, 0.98)' }}
            >
              welcome to mcverse
            </div>
          </div>
          <div className="connect-wallet  text-center uppercase w-[90vw]">
            {/* <div className="connect-wallet-border"></div> */}
            <div className="text-cyan-500 font-semibold text-xl tracking-[2.7px] pt-14 pb-8" style={{ textShadow: '0px 0p 5px #FFFFFF' }}>
              please connect your wallet
            </div>
            <div className="w-1/2 h-px border-t border-dashed border-[#0080FF] mx-auto"></div>
            <ConnectButton.Custom>
              {({ account, chain, mounted, openConnectModal, openChainModal }) => {
                const connected = mounted && account && chain

                return (
                  <>
                    {!connected ? (
                      <div
                        className="w-fit text-white font-bold text-xl tracking-[1px] border border-solid hover:bg-cyan-500 hover:bg-opacity-50 border-white rounded-tr-[10px] rounded-bl-[10px] cursor-pointer py-6 px-9 my-9 mx-auto"
                        style={{ textShadow: '0px 0px 5px #0080FF' }}
                        onClick={openConnectModal}
                      >
                        connect wallet
                      </div>
                    ) : chain.unsupported ? (
                      <div
                        className="flex items-center justify-center border border-solid border-white rounded-tr-[10px] rounded-bl-[10px] h-[72px] px-6 [text-shadow:0px_0px_5px_#072637] cursor-pointer"
                        onClick={openChainModal}
                      >
                        {'SWITCH NETWORK'}
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )
              }}
            </ConnectButton.Custom>

            <div className="w-3/5 min-w-[250px] text-sm text-cyan-500 tracking-[1.5px] mx-auto mb-10">
              make sure you connect your metamask to the avalanche network
            </div>
          </div>
        </div>
        <div className="w-full px-4 bg-gradient-to-b from-cyan-900 via-black to-black md:hidden">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-32 transform -translate-y-1/4">
              <img src={Images.logoMCV} alt="logo" />
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <a href="https://discord.gg/nvHbwmMVUs" target="_blank" className="w-7 mx-0.5" rel="noreferrer">
                <img src={grantsSocialDiscord} alt="discord" />
              </a>
              <a href="https://twitter.com/TheMCVerse" target="_blank" className="w-7 mx-0.5" rel="noreferrer">
                <img src={grantsSocialTwitter} alt="twitter" />
              </a>
              <a href="https://www.instagram.com/the_mcverse/" target="_blank" className="w-7 mx-0.5" rel="noreferrer">
                <img src={grantsSocialInstagram} alt="instagram" />
              </a>
            </div>
            <div className="flex items-center">
              <div
                className="w-4 h-4 bg-gray-400 border border-black rounded-full"
                style={{ boxShadow: '0px 0px 5px rgba(255, 192, 0, 0.74902)' }}
              ></div>
              <div className="ml-1 uppercase ">
                <div className="text-sm text-gray-400">disconnected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
