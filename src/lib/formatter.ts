import { Token } from '@/types'

/**
 * Returns a string of form "abc...xyz"
 * @param str string to string
 * @param front number of chars to keep at front
 * @param end number of chars to keep at end
 * @returns ellipsed string
 */
export const shortenAddress = (str: string | null, front = 6, end = 4) => {
  if (str) {
    return `${str.slice(0, front)}...${str.slice(str.length - end)}`
  }
  return ''
}

export const getTokenAmount = (token?: Token, balance?: string | number) => {
  if (!token) return 0
  const tokenAmount =
    Number(balance ?? token.balance) / 10 ** Number(token.decimals)
  return tokenAmount
}
