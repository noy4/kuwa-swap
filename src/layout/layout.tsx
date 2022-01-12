import { MyLink } from '@/components'
import { Box, chakra, Spacer } from '@chakra-ui/react'
import Head from 'next/head'
import { ReactNode, VFC } from 'react'

type Props = {
  children: ReactNode
}

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Kuwa Swap</title>
      </Head>

      <chakra.header
        display='flex'
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
      </chakra.header>

      <main>{children}</main>
    </>
  )
}
