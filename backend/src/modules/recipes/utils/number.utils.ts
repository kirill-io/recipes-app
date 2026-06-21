export const toNullableNumber = (value: string | null): number | null => {
  if (value === null) {
    return null
  }

  return Number(value)
}

export const roundMacro = (value: number): number => {
  return Number(value.toFixed(1))
}
