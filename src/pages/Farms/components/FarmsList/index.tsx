import { useMemo } from 'react'

import { TOKEN_LIST } from 'config/constants'
import { useFarmOptionContext } from 'contexts'
import { useFilterOrSortFarmList } from 'pages/Farms/hooks'

import FarmItem from './FarmItem'
import FarmItemGrid from './FarmItemGrid'

const FarmsListContainer = () => {
  const { isListView } = useFarmOptionContext()
  const getClassName = useMemo(
    () => (isListView === 'list' ? `` : 'grid gap-x-8 lg:max-xl:gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'),
    [isListView]
  )
  const farmList = useFilterOrSortFarmList()
  if (farmList.length === 0)
    return (
      <div className="flex justify-center text-lg text-white/70 w-full mt-20">
        <span>{'Farms does not exist'}</span>
      </div>
    )

  return (
    <div
      className={`relative mt-8 mr-4 pt-px overflow-hidden max-md:mr-0 ${
        isListView === 'list' && 'border border-solid border-amber-400  bg-gradient-farm-list'
      }`}
    >
      <div className={`${getClassName} md:max-h-[58vh] md:overflow-y-auto`}>
        {farmList.map((item) =>
          isListView === 'list' ? <FarmItem key={item.id} item={item} /> : <FarmItemGrid key={item.id} item={item} />
        )}
      </div>
    </div>
  )
}

export default FarmsListContainer
