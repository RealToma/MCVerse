import { useState, useRef, useEffect, useCallback } from 'react'

import { ArrowIcon } from 'components/SVGIcons'
import { TSortOption } from 'pages/Farms/types'
import { useGetFarmReducerValues } from 'state/farm/hooks'
import { setFilterSortOptions } from 'state/farm/reducer'
import { useAppDispatch } from 'state/hooks'

const sortOptions = ['daily earn', 'apr', 'liquidity'] as const

const SortDropDown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const { sortBy } = useGetFarmReducerValues('filterAndSortOptions')

  const dispatch = useAppDispatch()

  const handleSetSortOption = useCallback(
    (option: TSortOption) => {
      if (sortBy === option) return

      dispatch(setFilterSortOptions({ sortBy: option }))
    },
    [dispatch, sortBy]
  )

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const dropDownEl = dropDownRef.current
      if (!dropDownEl || dropDownEl.contains(event.target as Node)) {
        return
      }
      if (isOpen) {
        setIsOpen(false)
      }
    },
    [isOpen]
  )

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <div className="flex items-center" ref={dropDownRef}>
      <span className="font-medium text-[10px]">{'SORT:'}</span>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex justify-between items-center bg-amber hover:bg-amber-800 ml-[9px] px-[15px] min-w-[123px] h-[30px] rounded-2xl font-extrabold text-[10px] text-black tracking-[0.5px] uppercase cursor-pointer"
      >
        {sortBy}
        <ArrowIcon className={`fill-black transition duration-300 ease-in-out ${isOpen && 'rotate-180'}`} />

        <div
          className={`absolute left-0 top-8 flex-col items-start w-full z-30 overflow-hidden bg-amber-600 rounded-md shadow-lg transition-[max_height] duration-200 ease-in-out transform h-auto ${
            isOpen ? 'max-h-60 p-1 mt-1' : 'max-h-0'
          } `}
        >
          {sortOptions.map((option) => (
            <div
              key={option}
              className={`w-full p-2 transition-all duration-300 ease-in-out cursor-pointer hover:bg-amber-400/30 hover:rounded-md leading-[144%] tracking-[0.5px] text-black text-[10px] text-start ${
                sortBy === option ? 'font-bold [text-shadow:0px_0px_3px_#ffcc0d]' : 'font-normal'
              }`}
              onClick={() => handleSetSortOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SortDropDown
