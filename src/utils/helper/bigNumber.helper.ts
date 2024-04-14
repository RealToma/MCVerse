import { formatUnits, parseUnits } from '@ethersproject/units'
import { BigNumber } from 'ethers'

import { numberToStringWithSeparator } from './number.helper'

export const convertBigNumToNormal = (bigNumber: BigNumber, isBalance = false, decimals = 18, displayDecimals = 4) => {
  const formattedString = formatUnits(bigNumber, decimals)
  return isBalance ? numberToStringWithSeparator(+formattedString, displayDecimals) : +formattedString
}

export const convertToBigNumber = (val: string, decimals = 18) => {
  return parseUnits(val, decimals)
}

export const caluMultipleForBigNumber = (bigNum1: BigNumber, bigNum2: BigNumber, decimals = 18) => {
  const mul = bigNum1.mul(bigNum2)
  return formatUnits(mul, decimals)
}
