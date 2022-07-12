import { combineReducers } from 'redux'
import { loadingReducer } from './loadingReducer'
import { pokeReducer } from './pokeReduser'

export const rootReducer = combineReducers({
  loading: loadingReducer,
  poke: pokeReducer,
})

export type RootState = ReturnType<typeof rootReducer>
