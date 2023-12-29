import { Outlet } from 'react-router-dom'

import Header from './components/Header'
import { useScrollToAnchor } from './hooks/useScrollToAnchor'

const Layout = () => {
  useScrollToAnchor()

  return (
    <>
      <Header />
      <main className='main'>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
