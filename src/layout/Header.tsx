import { MyLink } from '@/components'
import { shortenAddress } from '@/lib'
import {
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import { VFC } from 'react'
import { useMoralis, useNativeBalance } from 'react-moralis'

export const Header: VFC = () => {
  const { authenticate, isAuthenticated, account, logout } = useMoralis()
  const { data: balance } = useNativeBalance()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const onDisconnect = () => {
    logout()
    onClose()
  }

  return (
    <chakra.header
      display='flex'
      gridGap='4'
      alignItems='center'
      shadow='base'
      color='white'
      px='4'
      h='24'
    >
      <MyLink
        href='/'
        fontWeight='bold'
        fontSize='20'
        _hover={{ textDecoration: 'none' }}
      >
        Kuwa Swap
      </MyLink>
      <Spacer />
      <Box mr='4'>Polygon</Box>

      {!isAuthenticated && (
        <Button color='black' onClick={() => authenticate()}>
          Connect
        </Button>
      )}
      {isAuthenticated && (
        <Flex bg='whiteAlpha.200' p='1px' rounded='xl'>
          <Box p='2' fontWeight='semibold'>
            {balance.formatted}
          </Box>
          <Button
            variant='ghost'
            colorScheme='blackAlpha'
            bg='bg'
            color='white'
            rounded='xl'
            onClick={onOpen}
          >
            {shortenAddress(account)}
          </Button>
        </Flex>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg='base.dark'
          color='white'
          rounded='2xl'
          overflow='hidden'
        >
          <ModalHeader>Account</ModalHeader>
          <Box px='6'>
            <Box p='4' border='1px' borderColor='base.light' rounded='2xl'>
              <Box color='base.lighter' fontSize='sm'>
                Connected with MetaMask
              </Box>
              <HStack>
                <Box bg='white' boxSize='5' rounded='full' />
                <Box fontSize='2xl'>{shortenAddress(account)}</Box>
              </HStack>
            </Box>
            <Button
              w='full'
              colorScheme='blue'
              rounded='lg'
              mt='4'
              mb='4'
              onClick={onDisconnect}
            >
              Disconnect
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </chakra.header>
  )
}
