import { isProd } from 'config/env'
import { SupportedChainId } from 'config/web3'

const SCAN_PREFIXES: { [chainId in SupportedChainId]: string } = {
  [SupportedChainId.AVALANCHE]: isProd ? '' : 'testnet.',
}

export enum ExplorerDataType {
  TRANSACTION = 'tx',
  TOKEN = 'token',
  ADDRESS = 'address',
  BLOCK = 'block',
}

/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
export const getExplorerLink = (chainId: number, data: string, type: ExplorerDataType): string => {
  const prefix = `https://${SCAN_PREFIXES[chainId] ?? ''}snowtrace.io`

  return `${prefix}/${type}/${data}`
}
