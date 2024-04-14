import { createContext, useContext, useState } from 'react'

interface IScreenSizeContext {
  screenWidth: number
  setScreenWidth: (width: number) => void
}

const initialState = { screenWidth: window.innerWidth, setScreenWidth: () => null }
const ScreenSizeContext = createContext<IScreenSizeContext>(initialState)
export const useScreenSizeContext = () => useContext(ScreenSizeContext)

export const ScreenSizeContextProvider: React.FC<any> = ({ children }) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

  return <ScreenSizeContext.Provider value={{ screenWidth, setScreenWidth }}>{children}</ScreenSizeContext.Provider>
}
