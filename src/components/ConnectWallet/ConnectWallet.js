import { ConnectButton } from '@rainbow-me/rainbowkit'

import { useWeb3 } from 'hooks'

const ConnectWallet = () => {
  const { isSupported } = useWeb3()
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, openConnectModal, openChainModal }) => {
        const connected = mounted && account && chain

        return (
          <>
            {!connected ? (
              <button
                className="font-bold text-[10px] leading-3 text-center tracking-[2px] bg-amber-500 hover:bg-opacity-80 rounded-2xl py-2 px-3 mx-auto mt-5"
                onClick={openConnectModal}
              >
                CONNECT YOUR WALLET
              </button>
            ) : !isSupported ? (
              <div
                className="font-bold text-[10px] leading-3 text-center tracking-[2px] bg-gray-100 rounded-2xl py-2 px-3 cursor-pointer mx-auto mt-5"
                onClick={openChainModal}
              >
                SWITCH NETWORK
              </div>
            ) : (
              <></>
            )}
          </>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectWallet
