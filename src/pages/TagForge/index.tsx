import { useState } from 'react'

import { Helmet, HelmetProvider } from 'react-helmet-async'

import { PageMainWrapper } from 'pages/Layout'
import { useGetLicensePlateReducerValues } from 'state/tagForge/hooks'

import { LicensePlateContainer, TitleContainer, StepListContainer, StepButtonContainer, StepActionWrapper } from './components'
import { usePlateScreenshot } from './hooks'
import { PLATE_FONT_LIST, sortRegionOptions } from './utils'

const TagForge = () => {
  const { fontStyleId } = useGetLicensePlateReducerValues('licensePlate')
  const currentStepId = useGetLicensePlateReducerValues('currentStepId')
  const { ref, handleScreenShot } = usePlateScreenshot()
  const [region, setRegion] = useState(sortRegionOptions[0])

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" type="text/css" crossOrigin="anonymous" href={PLATE_FONT_LIST[fontStyleId - 1 || 0].url} />
      </Helmet>
      <PageMainWrapper>
        <TitleContainer />
        <LicensePlateContainer blobRef={ref} region={region} setRegion={setRegion} sortRegionOptions={sortRegionOptions} />
        <StepListContainer />
        <StepActionWrapper region={region} />
        <StepButtonContainer handleScreenShot={handleScreenShot} />
      </PageMainWrapper>
    </HelmetProvider>
  )
}

export default TagForge
