import { BigNumber, Contract } from 'ethers'

export const executeSingleReadContract = async (contract: Contract, methodName: string, methodArgs: any[]) => {
  if (!contract[methodName]) {
    throw new Error(`Method ${methodName} doesn't exist on ${contract.address}`)
  }

  const res = await contract[methodName](...methodArgs)
  return res
}

export const executeSingleWriteContract = async (contract: Contract, methodName: string, methodArgs: any[]) => {
  const txHash = await contract[methodName](...methodArgs)
  const { status, transactionHash } = await txHash.wait()
  return { status, transactionHash }
}
