/* eslint-disable no-unused-vars */

import { NamedAPIResource, Pokemon, PokemonStat } from 'pokenode-ts'

export enum PokeActionTypes {
  FETCH_POKES = 'FETCH_POKES',
  FETCH_STATS = 'FETCH_STATS',
  FETCH_TYPES = 'FETCH_TYPES',
  SET_PARAMS_NAME = 'SET_PARAMS_NAME',
  SET_PARAMS_STAT = 'SET_PARAMS_STAT',
  SET_PARAMS_TYPE = 'SET_PARAMS_TYPE',
  SET_PARAMS_SORT = 'SET_PARAMS_SORT',
  SET_PARAMS_PERPAGE = 'SET_PARAMS_PERPAGE',
  FAVORITE_ADD_LIST = 'FAVORITE_ADD_LIST',
  FAVORITE_ADD = 'FAVORITE_ADD',
  FAVORITE_REMOVE = 'FAVORITE_REMOVE',
  FILTER_FILL = 'FILTER_FILL',
  FILTER_CLEAR = 'FILTER_CLEAR',
  DATA_STATS = 'DATA_STAT',
}

export enum storageKeys {
  FAVORITES = 'favorites-data',
  DATA_STATS = 'data-pokemon-stats',
}

export const numberPerPage = [10, 20, 50]
export type TypeNumberPerPage = typeof numberPerPage[0]

export type TypeSort = '' | 'A - z' | 'Z - a'
export const SortOrder = ['', 'A - z', 'Z - a'] as TypeSort[]

interface IMinMaxValue {
  min: number
  max: number
}
interface IStatParam {
  name: string
  value: IMinMaxValue
}

export interface IParams {
  stat: IStatParam
  type: NamedAPIResource[]
  name: string
  sort: TypeSort
  perPage: number
}

export interface IDataStats {
  pokemonStats: {
    [id: string]: IStatNamePokemon[]
  }
  statsValueMinMax: {
    [id: string]: IMinMaxValue
  }
  // Список объектков данные о которых находятся в этих даных
  listIndexedPokemons: string[]
}
export interface IStatNamePokemon {
  name: string
  effort: number
  base_stat: number
}
export interface IPokeState {
  /** All list pokemons */
  pokes: NamedAPIResource[]
  /** All list Stats */
  stats: NamedAPIResource[]
  /** All list Types */
  types: NamedAPIResource[]
  /** Result Search */
  filter: string[]
  /** favorite  */
  favorites: string[]
  /** Parametres for search */
  params: IParams
  /** For filter data */
  dataStats: IDataStats
}

interface FetchAction {
  type: PokeActionTypes.FETCH_POKES | PokeActionTypes.FETCH_STATS | PokeActionTypes.FETCH_TYPES
  payload: NamedAPIResource[]
}
interface ParamNameAction {
  type: PokeActionTypes.SET_PARAMS_NAME
  payload: string
}
interface ParamTypeAction {
  type: PokeActionTypes.SET_PARAMS_TYPE
  payload: NamedAPIResource[]
}
interface ParamStatAction {
  type: PokeActionTypes.SET_PARAMS_STAT
  payload: IStatParam
}
interface ParamPerPageAction {
  type: PokeActionTypes.SET_PARAMS_PERPAGE
  payload: number
}
interface ParamSortAction {
  type: PokeActionTypes.SET_PARAMS_SORT
  payload: TypeSort
}
interface FavoriteAddListAction {
  type: PokeActionTypes.FAVORITE_ADD_LIST
  payload: string[]
}
interface FavoriteAddAction {
  type: PokeActionTypes.FAVORITE_ADD
  payload: string
}
interface FavoriteRemoveAction {
  type: PokeActionTypes.FAVORITE_REMOVE
  payload: string
}
interface FilterrFillAction {
  type: PokeActionTypes.FILTER_FILL
  payload: string[]
}
interface FilterrClearAction {
  type: PokeActionTypes.FILTER_CLEAR
}
interface LoadDataForFilterAction {
  type: PokeActionTypes.DATA_STATS
  payload: IDataStats
}

export type TypePokeAction =
  | FetchAction
  | ParamNameAction
  | ParamTypeAction
  | ParamStatAction
  | ParamPerPageAction
  | ParamSortAction
  | FavoriteAddListAction
  | FavoriteAddAction
  | FavoriteRemoveAction
  | FilterrFillAction
  | FilterrClearAction
  | LoadDataForFilterAction

export interface IBackendData {
  count: number
  previous: string | null
  next: string | null
  results: NamedAPIResource[]
}
