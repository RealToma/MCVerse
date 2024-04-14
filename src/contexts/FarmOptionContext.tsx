import { createContext, useContext, useState } from 'react'

import { TViewOption } from 'pages/Farms/types'

interface IFarmOptionContext {
  isListView: TViewOption
  setIsListView: (type: TViewOption) => void
}

const initialState = { isListView: 'list' as TViewOption, setIsListView: () => null }
const FarmOptionContext = createContext<IFarmOptionContext>(initialState)
export const useFarmOptionContext = () => useContext(FarmOptionContext)

export const FarmOptionContextProvider: React.FC<any> = ({ children }) => {
  const [isListView, setIsListView] = useState<TViewOption>('list')

  return <FarmOptionContext.Provider value={{ isListView, setIsListView }}>{children}</FarmOptionContext.Provider>
}
