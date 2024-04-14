import React from 'react'

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { Provider } from 'react-redux'
import { WagmiConfig } from 'wagmi'

import { chains, wagmiClient } from 'config/web3'
import store from 'state'

// All Global Provides that needed to wrap the App in here.
export const Providers: React.FC<any> = ({ children }) => {
  return (
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: '#00e0ff',
            accentColorForeground: '#072637',
            fontStack: 'system',
          })}
        >
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  )
}
