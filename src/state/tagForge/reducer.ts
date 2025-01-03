import { createSlice } from '@reduxjs/toolkit'

import { IForgeStep, ILicensePlate, IMintRule } from 'pages/TagForge/types'
import { initialStepList } from 'pages/TagForge/utils'

export interface IState {
  isLoading: boolean
  licensePlate: ILicensePlate
  currentStepId: number
  forgeStepList: IForgeStep[]
  imgBlob: Blob | undefined
  mintPrice: BigInt
  mintRule: IMintRule
}

export const initialState: IState = {
  isLoading: false,
  licensePlate: {
    backgroundImgId: 1,
    backgroundCountry: '',
    tagText: '',
    fontStyleId: 1,
    color: { textColor: '#FFFFFF', borderColor: '#FFCE0D' },
  },
  currentStepId: 1,
  forgeStepList: initialStepList,
  imgBlob: undefined,
  mintPrice: 1000000000000000n,
  mintRule: { minCharacters: 0, maxCharacters: 0, allowedCharacters: '', backgrounds: [''] },
}

const tagForgeSlice = createSlice({
  name: 'tagForge',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setLicensePlate(state, action) {
      state.licensePlate = { ...state.licensePlate, ...action.payload }
    },
    setCurrentStepId(state, action) {
      state.currentStepId = action.payload
    },
    setForgeStepStatus(state, action) {
      state.forgeStepList[action.payload - 2].status = true
    },
    setForgeInitialize(state) {
      state.licensePlate = {
        backgroundImgId: 1,
        backgroundCountry: '',
        tagText: '',
        fontStyleId: 1,
        color: { textColor: '', borderColor: '' },
      }
      state.forgeStepList = initialStepList
      state.currentStepId = 1
    },
    setScreenShot(state, action) {
      state.imgBlob = action.payload
    },
    setMintPrice(state, action) {
      state.mintPrice = action.payload
    },
    setMintRule(state, action) {
      state.mintRule = { ...state.mintRule, ...action.payload }
    },
  },
})

export const {
  setIsLoading,
  setLicensePlate,
  setCurrentStepId,
  setForgeStepStatus,
  setForgeInitialize,
  setScreenShot,
  setMintPrice,
  setMintRule,
} = tagForgeSlice.actions
export default tagForgeSlice.reducer
