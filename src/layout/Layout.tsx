import Head from 'next/head'
import { ReactNode, VFC } from 'react'
import { Header } from './Header'

type Props = {
  children: ReactNode
}

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Kuwa Swap</title>
      </Head>

      <Header />
      <main>{children}</main>
    </>
  )
}
