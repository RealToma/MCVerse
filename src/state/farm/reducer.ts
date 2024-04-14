import { createSlice } from '@reduxjs/toolkit'

import { IFarmData, TSortOption } from 'pages/Farms/types'

export interface IState {
  isLoading: boolean
  farmDataList: IFarmData[]
  filterAndSortOptions: { isStakedOnly: boolean; sortBy: TSortOption; searchFarm: string }
}

export const initialState: IState = {
  isLoading: false,
  farmDataList: [],
  filterAndSortOptions: { isStakedOnly: false, sortBy: 'daily earn', searchFarm: '' },
}

const farmSlice = createSlice({
  name: 'farm',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setFarmDataList(state, action) {
      state.farmDataList = [...action.payload]
    },
    setFilterSortOptions(state, action) {
      state.filterAndSortOptions = { ...state.filterAndSortOptions, ...action.payload }
    },
  },
})

export const { setIsLoading, setFarmDataList, setFilterSortOptions } = farmSlice.actions
export default farmSlice.reducer
