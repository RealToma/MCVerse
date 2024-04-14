import { AppState } from 'state'
import { useAppSelector } from 'state/hooks'

import { IState } from './reducer'

export const useGetFarmReducerValues = <T extends keyof IState>(variable: T): IState[T] => {
  return useAppSelector((state: AppState) => state.farmReducer[variable])
}
