import { useState } from 'react'

import axios from 'axios'
import useSWR from 'swr'

import { COIN_GECKO_API_BASE_URL } from 'config/baseURLs'
import { isProd } from 'config/env'
import { SupportedChainId, mcvContract } from 'config/web3'

import { useWeb3 } from './useWeb3'

export const usePollTokenPrices = (tokenAddress: `0x${string}`) => {
  const { chainId } = useWeb3()
  const [tokenPrice, setTokenPrice] = useState<number>(0)

  const { data } = useSWR(
    ['tokenPrice'],
    async () => {
      try {
        const mcvContractAddress = '0x916aBa115F5162960E48a2675Ad4d8cBD09CE8E4' // Hard-coded for testnet token price since does not have certain oracle to get prices
        // const coingeckoAPI_URL = `${COIN_GECKO_API_BASE_URL}/token_price/avalanche?contract_addresses=`
        // const {
        //   data: { [isProd ? tokenAddress : mcvContractAddress.toLowerCase()]: tokenPrice },
        // } = await axios.get(`${coingeckoAPI_URL}${isProd ? tokenAddress : mcvContractAddress}&vs_currencies=usd`)

        const data = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${isProd ? tokenAddress : mcvContractAddress}`)
        // console.log('data:', data.data.pairs[2].priceUsd)
        setTokenPrice(data.data.pairs[2].priceUsd)
      } catch (error) {
        console.log(error)
      }

      return
    },
    { refreshInterval: 60000, revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }
  )
  // console.log('tokenPrice:', tokenPrice)
  return tokenPrice
}
