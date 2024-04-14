import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { load, save } from 'redux-localstorage-simple'

import farmReducer from 'state/farm/reducer'
import tagForgeReducer from 'state/tagForge/reducer'
import web3Reducer from 'state/web3/reducer'

import { updateVersion } from './global/actions'

const PERSISTED_KEYS: string[] = ['tagForge']

const store = configureStore({
  devTools: process.env.REACT_APP_ENVIRONMENT !== 'prod',
  reducer: { web3Reducer, farmReducer, tagForgeReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }).concat(save({ states: PERSISTED_KEYS, debounce: 500 })),
  preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: true }),
})

store.dispatch(updateVersion())
setupListeners(store.dispatch)

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
