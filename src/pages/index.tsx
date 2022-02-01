import { SelectTokenModal } from '@/components'
import { useHome } from '@/hooks/useHome'
import { Layout } from '@/layout'
import { getTokenAmount } from '@/lib'
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

const Home: NextPage = () => {
  const fromTokenModal = useDisclosure()
  const toTokenModal = useDisclosure()
  const {
    tokens,
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    onSubmit,
    register,
    setValue,
  } = useHome()

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
              <Box>Balance: {getTokenAmount(fromToken)}</Box>
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
                onClick={() =>
                  setValue('fromAmount', getTokenAmount(fromToken))
                }
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
