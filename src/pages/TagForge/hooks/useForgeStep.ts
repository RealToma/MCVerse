import { useCallback } from 'react'

import { useAppDispatch } from 'state/hooks'
import { useGetLicensePlateReducerValues } from 'state/tagForge/hooks'
import { setCurrentStepId, setForgeInitialize, setForgeStepStatus } from 'state/tagForge/reducer'

export const useForgeStep = () => {
  const dispatch = useAppDispatch()
  const forgeStepList = useGetLicensePlateReducerValues('forgeStepList')
  const currentStepId = useGetLicensePlateReducerValues('currentStepId')

  const handleForgeStep = useCallback(
    (stepId: number) => {
      if (stepId > forgeStepList.length) {
        dispatch(setForgeInitialize())
        return
      }
      if (currentStepId === stepId - 1) dispatch(setForgeStepStatus(stepId))
      dispatch(setCurrentStepId(stepId))
    },
    [currentStepId, dispatch, forgeStepList.length]
  )

  return { handleForgeStep }
}
