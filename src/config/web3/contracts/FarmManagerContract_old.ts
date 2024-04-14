import { isProd } from 'config/env'

import { SupportedChainId } from '../web3Config'

import { IContractInfo } from './types'

export const farmManagerContract: IContractInfo = {
  addressMap: {
    [SupportedChainId.AVALANCHE]: isProd ? '0x48e3b013F4016070EBe836050A9e13fa29E370d7' : '0x034fcBa5D88188268d7d36b44A3664A815d76f2A',
  },
  abi: [
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
        { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      inputs: [{ internalType: 'uint256[]', name: 'farmIndexes', type: 'uint256[]' }],
      name: 'claim',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    { inputs: [], name: 'claimAll', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [
        { internalType: 'contract IERC20', name: 'depositToken', type: 'address' },
        { internalType: 'contract Vault', name: 'vault', type: 'address' },
        { internalType: 'contract IERC20', name: 'rewardToken', type: 'address' },
        { internalType: 'contract IFarmWatcher', name: 'farmWatcher', type: 'address' },
        { internalType: 'uint256', name: 'emissionRate', type: 'uint256' },
        { internalType: 'uint256', name: 'startDate', type: 'uint256' },
      ],
      name: 'createFarm',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'uint256', name: 'farmIndex', type: 'uint256' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
          ],
          internalType: 'struct FarmManager.DepositInput[]',
          name: 'inputs',
          type: 'tuple[]',
        },
      ],
      name: 'deposit',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
      name: 'getFarmsDataFor',
      outputs: [
        {
          components: [
            { internalType: 'contract Farm', name: 'implementation', type: 'address' },
            {
              components: [
                { internalType: 'contract IERC20', name: 'implementation', type: 'address' },
                { internalType: 'string', name: 'name', type: 'string' },
                { internalType: 'string', name: 'symbol', type: 'string' },
              ],
              internalType: 'struct FarmManager.TokenInfo',
              name: 'depositToken',
              type: 'tuple',
            },
            {
              components: [
                { internalType: 'contract IERC20', name: 'implementation', type: 'address' },
                { internalType: 'string', name: 'name', type: 'string' },
                { internalType: 'string', name: 'symbol', type: 'string' },
              ],
              internalType: 'struct FarmManager.TokenInfo',
              name: 'rewardToken',
              type: 'tuple',
            },
            { internalType: 'contract Vault', name: 'vault', type: 'address' },
            { internalType: 'contract IFarmWatcher', name: 'farmWatcher', type: 'address' },
            { internalType: 'uint256', name: 'emissionRate', type: 'uint256' },
            { internalType: 'uint256', name: 'startDate', type: 'uint256' },
            { internalType: 'uint256', name: 'totalDeposited', type: 'uint256' },
            { internalType: 'uint256', name: 'totalWithdrawn', type: 'uint256' },
            { internalType: 'uint256', name: 'totalClaimed', type: 'uint256' },
            { internalType: 'uint256', name: 'globalClaimable', type: 'uint256' },
            { internalType: 'uint256', name: 'currentlyDeposited', type: 'uint256' },
            { internalType: 'uint256', name: 'userDeposited', type: 'uint256' },
            { internalType: 'uint256', name: 'userClaimable', type: 'uint256' },
          ],
          internalType: 'struct FarmManager.FarmData[]',
          name: '',
          type: 'tuple[]',
        },
      ],
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
    {
      inputs: [{ internalType: 'uint256', name: 'i', type: 'uint256' }],
      name: 'removeFarm',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [
        { internalType: 'uint256', name: 'i', type: 'uint256' },
        { internalType: 'uint256', name: 'newEmissionRate', type: 'uint256' },
      ],
      name: 'setFarmEmissionRate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'i', type: 'uint256' },
        { internalType: 'uint256', name: 'newStartDate', type: 'uint256' },
      ],
      name: 'setFarmStartDate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'i', type: 'uint256' },
        { internalType: 'contract IFarmWatcher', name: 'newFarmWatcher', type: 'address' },
      ],
      name: 'setFarmWatcher',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'uint256', name: 'farmIndex', type: 'uint256' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
          ],
          internalType: 'struct FarmManager.WithdrawInput[]',
          name: 'inputs',
          type: 'tuple[]',
        },
      ],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    { inputs: [], name: 'withdrawAll', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  ] as const,
}
