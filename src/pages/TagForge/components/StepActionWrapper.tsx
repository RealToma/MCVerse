import { useGetLicensePlateReducerValues } from 'state/tagForge/hooks'

import BackgroundSelector from './BGSelector'
import FontColorSelector from './Font&ColorSelector'
import GradientDivider from './GradientDivider'
import TagTextCreator from './TagTextCreator'

const StepActionsWrapper = ({ region }: any) => {
  const currentStepId = useGetLicensePlateReducerValues('currentStepId')
  return (
    <div className="flex flex-col items-center py-6 z-10">
      {currentStepId === 1 ? (
        <BackgroundSelector region={region} />
      ) : currentStepId === 2 ? (
        <TagTextCreator />
      ) : currentStepId === 3 ? (
        <FontColorSelector />
      ) : (
        <></>
      )}
      <GradientDivider />
    </div>
  )
}

export default StepActionsWrapper
