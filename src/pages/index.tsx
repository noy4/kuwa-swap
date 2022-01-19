import { Layout } from '@/layout'
import { ArrowDownIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  Spacer,
} from '@chakra-ui/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Layout>
      <Container maxW='md'>
        <Box bg='base.dark' mt='24' p='4' rounded='3xl'>
          <Box border='1px' borderColor='#2D2F36' rounded='2xl' px='4' py='2'>
            <Flex color='gray.400' fontSize='sm'>
              <Box>From</Box>
              <Spacer />
              <Box>Balance: 2222</Box>
            </Flex>

            <HStack align='center' mt='2'>
              <Input
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
              >
                Max
              </Button>
              <Button
                variant='ghost'
                color='white'
                colorScheme='whiteAlpha'
                fontSize='xl'
                px='8'
              >
                MATIC
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
              <Box>Balance: 2222</Box>
            </Flex>

            <HStack align='center' mt='2'>
              <Input
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
              >
                MATIC
                <ChevronDownIcon boxSize='6' ml='2' />
              </Button>
            </HStack>
          </Box>

          <Button
            w='full'
            mt='4'
            h='16'
            rounded='2xl'
            colorScheme='blue'
            fontSize='xl'
          >
            Swap
          </Button>
        </Box>
      </Container>
    </Layout>
  )
}

export default Home
