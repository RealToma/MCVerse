import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import ConnectWallet from 'components/ConnectWallet'
import Spinner from 'components/Spinner'
import { useWeb3 } from 'hooks'

import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
  const { isConnected, isSupported } = useWeb3()
  return (
    <div className="flex flex-col main">
      <Header />
      {isConnected && isSupported ? <Outlet /> : <ConnectWallet />}
      <Sidebar />
      <Footer />
      <Spinner />
      <ToastContainer theme="dark" />
    </div>
  )
}

export default Layout
