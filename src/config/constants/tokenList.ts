export interface ITokenInfo {
  chainId: number
  address: `0x${string}`
  decimals: number
  name: string
  symbol: string
  logoURI: string
}

export const TOKEN_LIST: { [address: `0x${string}`]: ITokenInfo } = {
  '0xd00ae08403B9bbb9124bB305C09058E32C39A48c': {
    chainId: 43113,
    address: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
    decimals: 18,
    name: 'Wrapped AVAX',
    symbol: 'WAVAX',
    logoURI: 'https://raw.githubusercontent.com/ClusterH/web3-tokenlist/main/logos/0xd00ae08403B9bbb9124bB305C09058E32C39A48c/logo.png',
  },
  '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7': {
    chainId: 43114,
    address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    decimals: 18,
    name: 'Wrapped AVAX',
    symbol: 'WAVAX',
    logoURI: 'https://raw.githubusercontent.com/ClusterH/web3-tokenlist/main/logos/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
  },
  '0x5138f9fDAFdDb313Fff6FdDbAf86FB61734C1ce9': {
    chainId: 43113,
    address: '0x5138f9fDAFdDb313Fff6FdDbAf86FB61734C1ce9',
    decimals: 18,
    name: 'MCVERSE',
    symbol: 'MCV',
    logoURI: 'https://raw.githubusercontent.com/ClusterH/web3-tokenlist/main/logos/0x5138f9fDAFdDb313Fff6FdDbAf86FB61734C1ce9/logo.webp',
  },
  '0x916aBa115F5162960E48a2675Ad4d8cBD09CE8E4': {
    chainId: 43114,
    address: '0x916aBa115F5162960E48a2675Ad4d8cBD09CE8E4',
    decimals: 18,
    name: 'MCVERSE',
    symbol: 'MCV',
    logoURI: 'https://raw.githubusercontent.com/ClusterH/web3-tokenlist/main/logos/0x916aBa115F5162960E48a2675Ad4d8cBD09CE8E4/logo.webp',
  },
  '0xB6076C93701D6a07266c31066B298AeC6dd65c2d': {
    chainId: 43113,
    address: '0xB6076C93701D6a07266c31066B298AeC6dd65c2d',
    decimals: 18,
    name: 'USD Coin',
    symbol: 'USDC',
    logoURI: 'https://raw.githubusercontent.com/ClusterH/web3-tokenlist/main/logos/0xB6076C93701D6a07266c31066B298AeC6dd65c2d/logo.png',
  },
  '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E': {
    chainId: 43114,
    address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    decimals: 18,
    name: 'USD Coin',
    symbol: 'USDC',
    logoURI: 'https://raw.githubusercontent.com/ClusterH/web3-tokenlist/main/logos/0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E/logo.png',
  },
} as const
