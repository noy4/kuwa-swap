import { SelectTokenModal } from '@/components'
import { Layout } from '@/layout'
import { getTokenAmount } from '@/lib'
import { Token } from '@/types'
import { ArrowDownIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  useERC20Balances,
  useNativeBalance,
  useOneInchQuote,
} from 'react-moralis'
import useFetch from 'use-http'

const tokenListUrl = 'https://unpkg.com/quickswap-default-token-list'

const Home: NextPage = () => {
  const fromTokenModal = useDisclosure()
  const toTokenModal = useDisclosure()
  const { data: notNativeTokens } = useERC20Balances()
  const { data: nativeTokenBalance } = useNativeBalance()
  const { data: tokenListRes } = useFetch(tokenListUrl, [])
  const tokenList: Token[] = tokenListRes?.tokens
  const [fromToken, setFromToken] = useState<Token>()
  const [toToken, setToToken] = useState<Token>()
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
    ?.map(addTokenBalance)
    .filter((t) => t.chainId === 137)
    .sort((a, b) => getTokenAmount(b) - getTokenAmount(a))
  // Maticからのスワップができない（アドレスが違う？）
  // tokens = [nativeToken, ...(tokens ?? [])]

  const { register, handleSubmit, setValue, watch } = useForm()
  const { fromAmount, toAmount } = watch()

  const { data: quote, getQuote } = useOneInchQuote({
    chain: 'polygon',
    fromToken: {
      address: fromToken?.address ?? '',
      decimals: fromToken?.decimals ?? 0,
    },
    toToken: {
      address: toToken?.address ?? '',
      decimals: toToken?.decimals ?? 0,
    },
    fromAmount: fromAmount || 0,
  })
  console.log('quote:', quote)

  const onSubmit = handleSubmit((values) => {
    console.log('values:', values)
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

  return (
    <Layout>
      <SelectTokenModal
        isOpen={fromTokenModal.isOpen}
        onClose={fromTokenModal.onClose}
        tokens={tokens}
        currentToken={fromToken}
        setToken={setFromToken}
      />
      <SelectTokenModal
        isOpen={toTokenModal.isOpen}
        onClose={toTokenModal.onClose}
        tokens={tokens}
        currentToken={toToken}
        setToken={setToToken}
      />

      <Container maxW='md'>
        <chakra.form
          bg='base.dark'
          mt='24'
          p='4'
          rounded='3xl'
          onSubmit={onSubmit}
        >
          <Box border='1px' borderColor='#2D2F36' rounded='2xl' px='4' py='2'>
            <Flex color='gray.400' fontSize='sm'>
              <Box>From</Box>
              <Spacer />
              <Box>Balance: {getFromTokenAmount()}</Box>
            </Flex>

            <HStack align='center' mt='2'>
              <Input
                {...register('fromAmount')}
                variant='unstyled'
                color='white'
                fontSize='3xl'
                placeholder='0.0'
                _placeholder={{ color: 'gray.600' }}
              />
              <Spacer />
              <Button
                size='sm'
                bg='blackAlpha.50'
                color='blue.500'
                variant='outline'
                colorScheme='whiteAlpha'
                onClick={() => setValue('fromAmount', getFromTokenAmount())}
              >
                Max
              </Button>
              <Button
                variant='ghost'
                color='white'
                colorScheme='whiteAlpha'
                fontSize='xl'
                px='8'
                onClick={fromTokenModal.onOpen}
              >
                {fromToken?.symbol}
                <ChevronDownIcon boxSize='6' ml='2' />
              </Button>
            </HStack>
          </Box>

          <Center py='2'>
            <IconButton
              aria-label='switch'
              icon={<ArrowDownIcon />}
              variant='ghost'
              isRound
              color='blue.500'
              colorScheme='whiteAlpha'
            />
          </Center>

          <Box border='1px' borderColor='#2D2F36' rounded='2xl' px='4' py='2'>
            <Flex color='gray.400' fontSize='sm'>
              <Box>To</Box>
              <Spacer />
              <Box>Balance: {getTokenAmount(toToken)}</Box>
            </Flex>

            <HStack align='center' mt='2'>
              <Input
                {...register('toAmount')}
                variant='unstyled'
                color='white'
                fontSize='3xl'
                placeholder='0.0'
                _placeholder={{ color: 'gray.600' }}
              />
              <Spacer />
              <Button
                variant='ghost'
                color='white'
                colorScheme='whiteAlpha'
                fontSize='xl'
                px='8'
                onClick={toTokenModal.onOpen}
              >
                {toToken?.symbol}
                <ChevronDownIcon boxSize='6' ml='2' />
              </Button>
            </HStack>
          </Box>

          <Button
            type='submit'
            w='full'
            mt='4'
            h='16'
            rounded='2xl'
            colorScheme='blue'
            fontSize='xl'
          >
            Swap
          </Button>
        </chakra.form>
      </Container>
    </Layout>
  )
}

export default Home
