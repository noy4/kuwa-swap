import { getTokenAmount } from '@/lib'
import { Token } from '@/types'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  useERC20Balances,
  useNativeBalance,
  useOneInchQuote,
  useOneInchSwap,
} from 'react-moralis'
import useFetch from 'use-http'

const tokenListUrl = 'https://unpkg.com/quickswap-default-token-list'

export const useHome = () => {
  const { data: notNativeTokens } = useERC20Balances()
  const { data: nativeTokenBalance } = useNativeBalance()
  const { data: tokenListRes } = useFetch(tokenListUrl, [])
  const tokenList: Token[] = tokenListRes?.tokens ?? []
  const [fromToken, setFromToken] = useState<Token>()
  const [toToken, setToToken] = useState<Token>()
  const { register, handleSubmit, setValue, watch } = useForm()
  const { fromAmount, toAmount } = watch()

  const nativeToken: Token = {
    address: '0x0000000000000000000000000000000000001010', // アドレスが違う？
    chainId: 137,
    logoURI: '',
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
    balance: nativeTokenBalance.balance ?? '',
  }
  const getFromTokenAmount = () => {
    return getTokenAmount(fromToken)
  }
  const addTokenBalance = (t: Token) => {
    const tokenInWallet = notNativeTokens?.find(
      (nnt) => nnt.symbol === t.symbol
    )
    const mappedToken: Token = {
      ...t,
      balance: tokenInWallet?.balance ?? '0',
    }
    return mappedToken
  }
  let tokens = tokenList
    .map(addTokenBalance)
    .filter((t) => t.chainId === 137)
    .sort((a, b) => getTokenAmount(b) - getTokenAmount(a))
  // Maticからのスワップができない（アドレスが違う？）
  // tokens = [nativeToken, ...(tokens ?? [])]

  const oneInchParams = {
    chain: 'polygon',
    fromToken: {
      address: fromToken?.address ?? '',
      decimals: fromToken?.decimals ?? 1,
    },
    toToken: {
      address: toToken?.address ?? '',
      decimals: toToken?.decimals ?? 1,
    },
    fromAmount: fromAmount || 0,
  }
  const { data: quote, getQuote } = useOneInchQuote(oneInchParams)

  const { swap, data, error } = useOneInchSwap(oneInchParams)
  console.log('data:', data)
  console.log('error:', error)

  const onSubmit = handleSubmit(async (values) => {
    console.log('values:', values)
    console.log('oneInchParams:', oneInchParams)
    const receipt = await swap()
    console.log('receipt:', receipt)
  })

  useEffect(() => {
    const quoteFrom = (quote as any)?.fromTokenAmount
    const quoteTo = (quote as any)?.toTokenAmount
    if (quoteFrom && fromAmount !== quoteFrom)
      setValue('fromAmount', getTokenAmount(fromToken, quoteFrom))
    if (quoteTo && toAmount !== quoteTo)
      setValue('toAmount', getTokenAmount(toToken, quoteTo))
  }, [quote])

  useEffect(() => {
    const timer = setTimeout(() => {
      getQuote()
    }, 500)
    return () => clearTimeout(timer)
  }, [fromToken, toToken, fromAmount, toAmount])

  return {
    tokens,
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    onSubmit,
    register,
    setValue,
  }
}
