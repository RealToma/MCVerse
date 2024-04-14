export const numberToStringWithSeparator = (val: number, digits = 5): string => {
  return val.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(val) && val !== 0 ? 0 : digits,
  })
}

export const numberToString = (val: number, digits = 2): string => {
  return val.toFixed(digits)
}
