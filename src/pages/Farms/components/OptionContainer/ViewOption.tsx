import { useEffect, useState } from 'react'

import { GridIcon, ListIcon } from 'components/SVGIcons'
import { useFarmOptionContext, useScreenSizeContext } from 'contexts'
import { screens } from 'theme/utils'

const ViewOption = () => {
  const { isListView, setIsListView } = useFarmOptionContext()
  const { screenWidth } = useScreenSizeContext()
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(() => screenWidth < screens.lg)

  const getClassNames = (isActive: boolean) =>
    isActive
      ? 'fill-amber'
      : 'fill-gray-100 transition duration-300 ease-in-out hover:fill-amber-400/70 hover:drop-shadow-[0px_0px_4px_#ffd900] cursor-pointer'

  useEffect(() => {
    if (screenWidth < screens.lg) {
      setIsListView('grid')
    }
    setIsSmallScreen(screenWidth < screens.lg)
  }, [isSmallScreen, screenWidth, setIsListView])

  return (
    <div className="flex gap-2 items-center justify-end">
      <div onClick={() => setIsListView('grid')}>
        <GridIcon className={getClassNames(isListView === 'grid')} />
      </div>
      {isSmallScreen === false && (
        <div onClick={() => setIsListView('list')}>
          <ListIcon className={getClassNames(isListView === 'list')} />
        </div>
      )}
    </div>
  )
}

export default ViewOption
