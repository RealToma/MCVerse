import { SupportedChainId } from '../web3Config'

export interface IContractInfo {
  addressMap: string | { [chainId in ValueOf<typeof SupportedChainId>]: string }
  abi: any
}
