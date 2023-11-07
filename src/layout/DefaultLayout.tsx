import type { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'

interface DefaultLayoutProps {
  children: ReactNode
  logo: boolean
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  return (
    <div id="wrapper" className="bg-background min-h-screen">
      <Header logo={props.logo} />
      <div className="main-content">
        <main className="flex py-[32px]">{props.children}</main>
      </div>
      <Footer />
    </div>
  )
}
export default DefaultLayout
