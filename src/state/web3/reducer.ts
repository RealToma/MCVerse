import { createSlice } from '@reduxjs/toolkit'

export interface IState {
  isLoading: boolean
  avaxPriceUSD: number
  mcvPriceUSD: number
  walletBalance: { avaxBalance: string; mcvBalance: string }
}

export const initialState: IState = {
  isLoading: false,
  avaxPriceUSD: 0,
  mcvPriceUSD: 0,
  walletBalance: { avaxBalance: '0.000', mcvBalance: '0.000' },
}

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setAvaxPriceUSD(state, action) {
      state.avaxPriceUSD = action.payload
    },
    setMCVPriceUSD(state, action) {
      state.mcvPriceUSD = action.payload
    },
    setWalletBalance: (state, action) => {
      state.walletBalance = { ...state.walletBalance, ...action.payload }
    },
  },
})

export const { setIsLoading, setAvaxPriceUSD, setMCVPriceUSD, setWalletBalance } = web3Slice.actions
export default web3Slice.reducer
