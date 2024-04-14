import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero } from '@ethersproject/constants'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { Provider, Signer } from '@wagmi/core'
import { Contract } from 'ethers'

import { DEFAULT_CHAIN_ID, rpcUrlMap } from 'config/web3'

// returns the checksummed address if the address is valid, otherwise returns false
export const isAddress = (value: any): string | false => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export const getSimpleRPCProvider = (chainId: number | undefined) => {
  return new StaticJsonRpcProvider(rpcUrlMap[chainId || DEFAULT_CHAIN_ID])
}

export const getContractWithSimpleProvider = (address: string, ABI: any, chainId: number) => {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  const provider = getSimpleRPCProvider(chainId)
  if (!provider) {
    throw Error('Cant Get Provider Correctly, Please check your Network status')
  }

  return new Contract(address, ABI, provider)
}

export const getContract = (address: string, ABI: any, signer?: Signer | Provider): Contract => {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, signer)
}

/**
 * Estimate the gas needed to call a function, and add a 10% margin
 * @param contract Used to perform the call
 * @param methodName The name of the methode called
 * @param gasMarginPer10000 The gasMargin per 10000 (i.e. 10% -> 1000)
 * @param args An array of arguments to pass to the method
 * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
 */
export const estimateGas = async (contract: Contract, methodName: string, methodArgs: any[], gasMarginPer10000 = 1000) => {
  if (!contract[methodName]) {
    throw new Error(`Method ${methodName} doesn't exist on ${contract.address}`)
  }
  const rawGasEstimation = await contract.estimateGas[methodName](...methodArgs)
  // By convention, ethers.BigNumber values are multiplied by 1000 to avoid dealing with real numbers
  const gasEstimation = rawGasEstimation.mul(BigNumber.from(10000).add(BigNumber.from(gasMarginPer10000))).div(BigNumber.from(10000))
  return gasEstimation
}
