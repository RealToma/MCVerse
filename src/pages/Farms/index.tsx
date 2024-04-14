import { PageMainWrapper } from 'pages/Layout'

import { FarmOptionContextProvider } from '../../contexts'

import { FarmsListContainer, OptionContainer } from './components'
import { useFetFarmData } from './hooks'

const Farms = () => {
  useFetFarmData()

  return (
    <PageMainWrapper>
      <FarmOptionContextProvider>
        <OptionContainer />
        <FarmsListContainer />
      </FarmOptionContextProvider>
    </PageMainWrapper>
  )
}

export default Farms
