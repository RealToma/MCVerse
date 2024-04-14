import { useCallback, useState } from 'react'

import { useGetFarmReducerValues } from 'state/farm/hooks'
import { setFilterSortOptions } from 'state/farm/reducer'
import { useAppDispatch } from 'state/hooks'

const SearchInput = () => {
  const dispatch = useAppDispatch()
  const { searchFarm } = useGetFarmReducerValues('filterAndSortOptions')

  const handleSearch = useCallback(
    (searchFarm: string) => {
      dispatch(setFilterSortOptions({ searchFarm }))
    },
    [dispatch]
  )

  return (
    <input
      className="border border-amber rounded-2xl bg-amber-400/10 px-[15px] w-full min-w-[123px] h-[30px] text-[10px] leading-[144%] tracking-[0.5px] transition ease-in-out focus:outline-none focus:border-transparent [text-shadow:0px_0px_3px_#ffcc0d]"
      placeholder="SEARCH FARM"
      value={searchFarm}
      onChange={(e) => handleSearch(e.target.value)}
    />
  )
}

export default SearchInput
