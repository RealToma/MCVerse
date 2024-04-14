import { useCallback, useEffect, useState } from 'react'

import { Zero } from '@ethersproject/constants'
import { BigNumber } from 'ethers'

import { useGetFarmReducerValues } from 'state/farm/hooks'

import { IFarmData } from '../types'
import { aprCalculator } from '../utils'

export const useFilterOrSortFarmList = () => {
  const originFarmList = useGetFarmReducerValues('farmDataList')
  const filterAndSortOptions = useGetFarmReducerValues('filterAndSortOptions')

  const [farmList, setFarmList] = useState<IFarmData[]>([])

  const updateFilterOrSortList = useCallback(() => {
    const farmFilterOrSOrtedList = () => {
      if (!originFarmList || originFarmList.length < 1 || Object.keys(originFarmList[0]).length === 0) return []
      const filteredListByStakedOnly = filterAndSortOptions?.isStakedOnly
        ? originFarmList.filter((farm) => Object.keys(farm).length > 0 && BigNumber.from(farm.userDeposited).gt(Zero))
        : [...originFarmList]

      if (!filteredListByStakedOnly || filteredListByStakedOnly.length < 1) return []

      const filteredListBySearchInput = filteredListByStakedOnly.filter((farm) =>
        `${farm.lpTokenPair.token0.symbol}-${farm.lpTokenPair.token1.symbol}`
          .toLowerCase()
          .includes(filterAndSortOptions?.searchFarm.toLowerCase())
      )

      if (!filteredListBySearchInput || filteredListBySearchInput.length < 1) return []

      const sortedList = filteredListBySearchInput.sort((a, b) => {
        if (Object.keys(a).length === 0) return -1
        if (Object.keys(b).length === 0) return 1
        if (filterAndSortOptions?.sortBy === 'daily earn') return BigNumber.from(a.userClaimable).gte(b.userClaimable) ? -1 : 1
        else if (filterAndSortOptions?.sortBy === 'apr') return a.apr - b.apr >= 0 ? -1 : 1
        else return BigNumber.from(a.currentlyDeposited).gte(b.currentlyDeposited) ? -1 : 1
      })

      return sortedList
    }

    setFarmList(farmFilterOrSOrtedList())
  }, [filterAndSortOptions?.isStakedOnly, filterAndSortOptions?.searchFarm, filterAndSortOptions?.sortBy, originFarmList])

  useEffect(() => {
    updateFilterOrSortList()
  }, [updateFilterOrSortList])

  return farmList
}
