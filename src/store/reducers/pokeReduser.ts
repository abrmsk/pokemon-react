import { TypePokeAction, IPokeState, PokeActionTypes, storageKeys } from '../../types/poke'

const initialState: IPokeState = {
  pokes: [],
  stats: [],
  types: [],
  favorites: [],
  filter: [],
  params: {
    stat: { name: '', value: { min: 0, max: 0 } },
    type: [],
    name: '',
    sort: '',
    perPage: 20,
  },
  dataStats: { pokemonStats: {}, statsValueMinMax: {}, listIndexedPokemons: [] },
}

export const pokeReducer = (state = initialState, action: TypePokeAction): IPokeState => {
  let favorites: string[]

  switch (action.type) {
    case PokeActionTypes.FETCH_POKES:
      return { ...state, pokes: action.payload }
    case PokeActionTypes.FETCH_STATS:
      return { ...state, stats: action.payload }
    case PokeActionTypes.FETCH_TYPES:
      return { ...state, types: action.payload }

    case PokeActionTypes.SET_PARAMS_NAME:
      return { ...state, params: { ...state.params, name: action.payload } }
    case PokeActionTypes.SET_PARAMS_STAT:
      return { ...state, params: { ...state.params, stat: action.payload } }
    case PokeActionTypes.SET_PARAMS_TYPE:
      return { ...state, params: { ...state.params, type: action.payload } }
    case PokeActionTypes.SET_PARAMS_PERPAGE:
      return { ...state, params: { ...state.params, perPage: action.payload } }
    case PokeActionTypes.SET_PARAMS_SORT:
      return { ...state, params: { ...state.params, sort: action.payload } }

    case PokeActionTypes.FAVORITE_ADD_LIST: {
      return { ...state, favorites: action.payload }
    }
    case PokeActionTypes.FAVORITE_ADD: {
      favorites = [...state.favorites, action.payload]
      localStorage.setItem(storageKeys.FAVORITES, JSON.stringify(favorites))
      return { ...state, favorites }
    }
    case PokeActionTypes.FAVORITE_REMOVE: {
      favorites = state.favorites.filter((name) => name !== action.payload)
      localStorage.setItem(storageKeys.FAVORITES, JSON.stringify(favorites))
      return { ...state, favorites }
    }

    case PokeActionTypes.FILTER_FILL:
      return { ...state, filter: action.payload }
    case PokeActionTypes.FILTER_CLEAR:
      return { ...state, filter: [] }

    case PokeActionTypes.DATA_STATS: {
      return { ...state, dataStats: action.payload }
    }

    default:
      return state
  }
}
