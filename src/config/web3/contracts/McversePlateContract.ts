import { isProd } from 'config/env'

import { SupportedChainId } from '../web3Config'

import { IContractInfo } from './types'

export const plateNFTContract: IContractInfo = {
  addressMap: {
    [SupportedChainId.AVALANCHE]: isProd ? '' : '0x49e4ae359C1Fa63D812d83Cd706A698C9c752571',
  },
  abi: [
    {
      inputs: [
        { internalType: 'contract Nfvs', name: 'nfvs', type: 'address' },
        { internalType: 'uint256', name: 'mintPrice_', type: 'uint256' },
        { internalType: 'uint256', name: 'maxMinted_', type: 'uint256' },
        { internalType: 'contract IERC20', name: 'token_', type: 'address' },
        {
          components: [
            { internalType: 'address', name: 'addr', type: 'address' },
            { internalType: 'uint256', name: 'weighting', type: 'uint256' },
          ],
          internalType: 'struct ERC20Payments.Payee[]',
          name: 'payees',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
        { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    { inputs: [], name: 'end', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    { inputs: [], name: 'ended', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
    {
      inputs: [],
      name: 'maxMinted',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'numberOf', type: 'uint256' }],
      name: 'mint',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'mintPrice',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [],
      name: 'token',
      outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalMinted',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ] as const,
}

export const contractPlate: IContractInfo = {
  addressMap: {
    [SupportedChainId.AVALANCHE]: isProd ? '' : '0x319078f749ECd445376Fd8e9cd25A5d058FE676E',
  },
  abi: [] as const,
}

export const contractMetadata: IContractInfo = {
  addressMap: {
    [SupportedChainId.AVALANCHE]: isProd ? '' : '0x53049c1701A2f9964bd54A3F805F75D0b6F204e4',
  },
  abi: [] as const,
}

export const contractRegister: IContractInfo = {
  addressMap: {
    [SupportedChainId.AVALANCHE]: isProd ? '' : '0x0bfdA805926404A5863F144f9188E9A9B05C21D8',
  },
  abi: [] as const,
}

export const contractMint: IContractInfo = {
  addressMap: {
    [SupportedChainId.AVALANCHE]: isProd ? '' : '0xfB6AFbA76219228b3F4114997A00ffCf57ea2743',
  },
  abi: [] as const,
}
