import React, { Suspense, lazy } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const Layout = lazy(() => import('./pages/Layout'))
const Bank = lazy(() => import('./pages/Bank'))
const Swap = lazy(() => import('./pages/Swap'))
const Farms = lazy(() => import('./pages/Farms'))
const Garage = lazy(() => import('./pages/Garage'))
const Dealership = lazy(() => import('./pages/Dealership'))
const Speedshop = lazy(() => import('./pages/Speedshop'))
const Bridge = lazy(() => import('./pages/Bridge'))
const Mission = lazy(() => import('./pages/Missions'))
const Shop = lazy(() => import('./pages/TicketShop'))
const Inventory = lazy(() => import('./pages/Inventory'))
const Mint = lazy(() => import('./pages/Mint'))
const SoldOut = lazy(() => import('./pages/Mint/SoldOut'))
const TagForge = lazy(() => import('./pages/TagForge'))

const Loader = ({ component }) => {
  const Component = component
  return (
    <Suspense fallback={<></>}>
      <Component />
    </Suspense>
  )
}

const App = () => {
  return (
    <Routes>
      <Route element={<Loader component={Layout} />}>
        <Route path="dealership" element={<Loader component={SoldOut} />} />
        <Route path="garage" element={<Loader component={Garage} />} />
        <Route path="bank" element={<Loader component={Bank} />} />
        <Route path="speedshop" element={<Loader component={Speedshop} />} />
        <Route path="trade">
          <Route index element={<Navigate to="migrate" replace />} />
          <Route path="migrate" element={<Loader component={Swap} />} />
          <Route path="farms" element={<Loader component={Farms} />} />
          <Route path="tagforge" element={<Loader component={TagForge} />} />
          <Route path="tagforge" element={<Loader component={TagForge} />} />

          {/* <Route path="pools" element={<></>} /> */}
        </Route>
        <Route path="bridge" element={<Loader component={Bridge} />} />
        <Route path="shop" element={<Loader component={Shop} />} />
        <Route path="mission" element={<Loader component={Mission} />} />
        <Route path="inventory" element={<Loader component={Inventory} />} />
        <Route path="*" element={<Navigate to={'dealership'} replace />} />
      </Route>
    </Routes>
  )
}

export default App
