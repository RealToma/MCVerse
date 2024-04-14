import { useGetLicensePlateReducerValues } from 'state/tagForge/hooks'

import { useCreatePlate, useForgeStep } from '../hooks'
import { initialStepList } from '../utils'

const StepButtonContainer = ({ handleScreenShot }: { handleScreenShot: () => Promise<void> }) => {
  const currentStepId = useGetLicensePlateReducerValues('currentStepId')
  const { handleForgeStep } = useForgeStep()
  const { handleCreatePlate } = useCreatePlate()
  const handleRegister = () => {}

  return (
    <div className="w-full flex justify-center">
      <div
        className="w-fit h-[52px] px-8 rounded-bl-lg rounded-tr-lg flex items-center justify-center border-2 border-solid border-cyan-570 cursor-pointer hover:bg-cyan"
        onClick={async () => {
          if (currentStepId === 2) {
            // handleRegister()
            return alert(123)
          }
          if (currentStepId === 3) {
            await handleScreenShot()
          }

          currentStepId < 4 ? handleForgeStep(currentStepId + 1) : handleCreatePlate()
        }}
      >
        {`next step: `}
        <span>{initialStepList[currentStepId - 1].btnText}</span>
      </div>
    </div>
  )
}

export default StepButtonContainer
