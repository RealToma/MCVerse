import { AppState } from 'state'
import { useAppSelector } from 'state/hooks'

import { IState } from './reducer'

export const useGetWeb3ReducerValues = <T extends keyof IState>(variable: T): IState[T] => {
  return useAppSelector((state: AppState) => state.web3Reducer[variable])
}
