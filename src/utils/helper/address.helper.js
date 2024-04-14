import { getAddress } from '@ethersproject/address'

export function shortenString(str, extraShort = true) {
  return `${str.substring(0, extraShort ? 4 : 6)}...${str.substring(str.length - (extraShort ? 3 : 4))}`
}

export function shortenAddress(address, extraShort = true) {
  try {
    const formattedAddress = getAddress(address)
    return shortenString(formattedAddress, extraShort)
  } catch {
    return address
  }
}

export function shortenIfAddress(address, extraShort) {
  if (typeof address === 'string' && address.length > 0) {
    return shortenAddress(address, extraShort)
  }
  return address || ''
}
