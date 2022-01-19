import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/layout'
import { MoralisProvider } from 'react-moralis'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID ?? ''}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL ?? ''}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  )
}

export default App
