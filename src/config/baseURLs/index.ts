import { isProd } from 'config/env'

export const TOKEN_LIST_URL = 'https://raw.githubusercontent.com/ClusterH/web3-tokenlist/main/tokenlist.json'
export const COIN_GECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3/simple'
export const TRADE_JOE_POOL_URL = `https://traderjoexyz.com/${isProd ? 'avalanche' : 'fuji'}/pool/v1/`
