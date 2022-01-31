import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Box,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { VFC } from 'react'
import { Token } from '@/types'
import { getTokenAmount } from '@/lib'

type Props = {
  isOpen: boolean
  onClose: () => void
  tokens: Token[]
  currentToken?: Token
  setToken: (t: Token) => void
}

export const SelectTokenModal: VFC<Props> = ({
  isOpen,
  onClose,
  tokens,
  currentToken,
  setToken,
}) => {
  const onSelectToken = (t: Token) => {
    setToken(t)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg='base.dark' color='white' rounded='2xl'>
        <ModalHeader>Select a token</ModalHeader>
        <Box px='6' py='4' borderBottom='1px' borderColor='base.light'>
          Token Name
        </Box>
        <Box maxH='96' overflow='scroll'>
          {tokens?.map((t, index) => {
            const isFromToken = t.symbol === currentToken?.symbol
            return (
              <Flex
                key={index}
                px='6'
                py='4'
                color={isFromToken ? 'base.lighter' : 'inherit'}
                _hover={{
                  bg: isFromToken ? 'inherit' : 'base.light',
                  cursor: isFromToken ? 'normal' : 'pointer',
                }}
                onClick={() => onSelectToken(t)}
              >
                <Box>{t.symbol}</Box>
                <Spacer />
                <Box>{getTokenAmount(t)}</Box>
              </Flex>
            )
          })}
        </Box>
      </ModalContent>
    </Modal>
  )
}
