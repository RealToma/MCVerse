import { useCallback } from 'react'

import { useGetFarmReducerValues } from 'state/farm/hooks'
import { setFilterSortOptions } from 'state/farm/reducer'
import { useAppDispatch } from 'state/hooks'

const StakedToggle = () => {
  const { isStakedOnly } = useGetFarmReducerValues('filterAndSortOptions')

  const dispatch = useAppDispatch()

  const handleIsStakedOnly = useCallback(() => {
    dispatch(setFilterSortOptions({ isStakedOnly: !isStakedOnly }))
  }, [dispatch, isStakedOnly])

  return (
    <div className="flex h-full items-center gap-3">
      <div className={`relative w-[30px] h-[5px] rounded-[20px] ${isStakedOnly ? 'bg-[#ffcc0d3d]' : 'bg-[#ffffff36]'}`}>
        <div
          className={`w-[17px] h-[17px] rounded-full absolute top-[50%] -translate-y-1/2 cursor-pointer transition-all duration-300 transform ease-in-out ${
            isStakedOnly ? 'bg-amber-400 right-0' : 'bg-gray-200 left-0'
          }`}
          onClick={() => handleIsStakedOnly()}
        />
      </div>
      <span
        className={`font-700 text-[10px] leading-[144%] [text-shadow:0px_0px_3px_#ffcc0d99] whitespace-nowrap transition duration-300 ease-in-out ${
          isStakedOnly ? 'text-amber' : 'text-white'
        }`}
      >
        {'STAKED ONLY'}
      </span>
    </div>
  )
}

export default StakedToggle
