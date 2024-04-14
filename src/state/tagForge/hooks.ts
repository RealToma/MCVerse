import { AppState } from 'state'
import { useAppSelector } from 'state/hooks'

import { IState } from './reducer'

export const useGetLicensePlateReducerValues = <T extends keyof IState>(variable: T): IState[T] => {
  return useAppSelector((state: AppState) => state.tagForgeReducer[variable])
}
