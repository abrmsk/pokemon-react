import { NamedAPIResource } from 'pokenode-ts'
import { Dispatch } from 'redux'
import { pokeApi } from '../../api'
import { sortingObjects, arraysIsEqual } from '../../common/functions/arrays'
import { LoadingActionTypes, TypeLoadingAction } from '../../types/loading'
import {
  TypePokeAction,
  IPokeState,
  PokeActionTypes,
  storageKeys,
  TypeSort,
  IDataStats,
} from '../../types/poke'

const maxNum = 2000

/**
 * Start Data Actions
 */
// Start Data
export const fetchStartData = () => {
  return async function (dispatch: Dispatch<TypePokeAction | TypeLoadingAction>) {
    try {
      // Favorite data
      addFavoriteList(dispatch)
      getStatData(dispatch)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      dispatch({ type: LoadingActionTypes.ERROR, payload: 'Error loading' })
    }
  }
}

// Get stat data
const getStatData = async (dispatch: Dispatch) => {
  try {
    /** START DATA LOADING */
    dispatch({ type: LoadingActionTypes.LOADING })
    const listPokes = (await pokeApi.pokemon.listPokemons(0, maxNum)).results as NamedAPIResource[]
    const listTypes = (await pokeApi.pokemon.listTypes(0, maxNum)).results as NamedAPIResource[]
    const listStats = (await pokeApi.pokemon.listStats(0, maxNum)).results as NamedAPIResource[]
    dispatch({ type: PokeActionTypes.FETCH_POKES, payload: sortingObjects(listPokes, 1) })
    dispatch({ type: PokeActionTypes.FETCH_TYPES, payload: sortingObjects(listTypes, 1) })
    dispatch({ type: PokeActionTypes.FETCH_STATS, payload: sortingObjects(listStats, 1) })
    dispatch({ type: LoadingActionTypes.SUCCESS })
    /** END LOADING START DATA */

    // ************************************* //

    /** LOADING POKEMON STATS DATA */
    // dispatch({ type: LoadingActionTypes.DATA_STAT_LOADING })

    // Storage (Храним в сторе проиндексированные данные о состоянии)
    let dataStats: IDataStats = { pokemonStats: {}, statsValueMinMax: {}, listIndexedPokemons: [] }
    let prevProgress = 0

    const ls = localStorage.getItem(storageKeys.DATA_STATS)

    if (ls) {
      dataStats = JSON.parse(ls) as IDataStats
    } else {
      listStats
        .map((s) => s.name)
        .forEach((s) => {
          dataStats.pokemonStats[s] = []
          dataStats.statsValueMinMax[s] = { min: 0, max: 0 }
        })
    }

    // eslint-disable-next-line prettier/prettier
    const isEqual = arraysIsEqual(dataStats.listIndexedPokemons, listPokes.map((p) => p.name))
    if (isEqual) {
      // do nothing
      dispatch({ type: PokeActionTypes.DATA_STATS, payload: dataStats })
      dispatch({ type: LoadingActionTypes.DATA_STAT_SUCCESS })
    } else {
      try {
        for (let i = 0; i < listPokes.length; i++) {
          const pokeName = listPokes[i].name
          const isDataPokemon = dataStats.listIndexedPokemons.includes(pokeName)

          if (!isDataPokemon) {
            const response = await pokeApi.pokemon.getPokemonByName(pokeName)

            response.stats.forEach((stat) => {
              dataStats.pokemonStats[stat.stat.name].push({
                name: pokeName,
                effort: stat.effort,
                base_stat: stat.base_stat,
              })
            })
            dataStats.listIndexedPokemons.push(pokeName)
          }

          localStorage.setItem(storageKeys.DATA_STATS, JSON.stringify(dataStats))

          const progress = Math.trunc((i * 100) / listPokes.length + 0.1)
          if (progress > prevProgress) {
            dispatch({ type: LoadingActionTypes.DATA_STAT_PROGRESS, payload: progress })
            prevProgress = progress
          }
        } // end loop

        const pokemonStatsKeys = Object.keys(dataStats.pokemonStats)
        pokemonStatsKeys.forEach((key) => {
          const sort = dataStats.pokemonStats[key].sort((a, b) => a.base_stat - b.base_stat)
          if (sort.length > 0) {
            const min = sort[0].base_stat
            const max = sort[sort.length - 1].base_stat
            dataStats.statsValueMinMax[key] = { min, max }
          }
        })

        localStorage.setItem(storageKeys.DATA_STATS, JSON.stringify(dataStats))

        dispatch({ type: PokeActionTypes.DATA_STATS, payload: dataStats })
        dispatch({ type: LoadingActionTypes.DATA_STAT_SUCCESS })
        /** END - LOADING POKEMON STATS DATA */
      } catch ({ message }: any) {
        // eslint-disable-next-line no-console
        console.error()
        dispatch({
          type: LoadingActionTypes.ERROR, // @ts-ignore
          payload: `${message}; Error index data stat`,
        })
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error start', e)
    dispatch({ type: LoadingActionTypes.ERROR, payload: 'Error loading start data' })
  }
}

/**
 * Set Parametres Actions
 */
// Set Parametres Name
export const setParamName = (name: string) => {
  return async function (dispatch: Dispatch<TypePokeAction>) {
    dispatch({
      type: PokeActionTypes.SET_PARAMS_NAME,
      payload: name,
    })
  }
}
// Set Parametres Number Per Page
export const setParamPerPage = (perPage: number) => {
  return async function (dispatch: Dispatch<TypePokeAction>) {
    dispatch({
      type: PokeActionTypes.SET_PARAMS_PERPAGE,
      payload: perPage,
    })
  }
}
// Set Parametres Sort
export const setParamSort = (typeSort: TypeSort) => {
  return async function (dispatch: Dispatch<TypePokeAction>) {
    dispatch({
      type: PokeActionTypes.SET_PARAMS_SORT,
      payload: typeSort,
    })
  }
}
// Set Parametres Stat
export const setParamStat = (name: string, min: number, max: number) => {
  return async function (dispatch: Dispatch<TypePokeAction>) {
    dispatch({
      type: PokeActionTypes.SET_PARAMS_STAT,
      payload: { name, value: { min, max } },
    })
  }
}
// Set Parametres Type
export const setParamType = (types: NamedAPIResource[]) => {
  return async function (dispatch: Dispatch<TypePokeAction>) {
    dispatch({
      type: PokeActionTypes.SET_PARAMS_TYPE,
      payload: types,
    })
  }
}

/**
 * FAVORITE Actions
 */
// Add Favorite
export const addFavoriteList = (dispatch: Dispatch) => {
  const string = localStorage.getItem(storageKeys.FAVORITES)

  if (string) {
    dispatch({
      type: PokeActionTypes.FAVORITE_ADD_LIST,
      payload: JSON.parse(string) as string[],
    })
  }
}
// Add Favorite
export const addFavorite = (name: string) => {
  return function (dispatch: Dispatch<TypePokeAction>) {
    dispatch({
      type: PokeActionTypes.FAVORITE_ADD,
      payload: name,
    })
  }
}
// Remove Favorite
export const removeFavorite = (name: string) => {
  return function (dispatch: Dispatch<TypePokeAction>) {
    dispatch({
      type: PokeActionTypes.FAVORITE_REMOVE,
      payload: name,
    })
  }
}

/**
 * Filter Actions
 */
// Filter Actions
export const filterFill = (data: IPokeState) => {
  return async function (dispatch: Dispatch<TypePokeAction | TypeLoadingAction>) {
    const {
      pokes,
      dataStats: { pokemonStats },
      params: { name, stat, type, sort },
    } = data

    if (name === '' && stat.name === '' && type.length === 0 && sort === '') {
      dispatch({
        type: PokeActionTypes.FILTER_FILL,
        payload: pokes.map((elem) => elem.name),
      })
      return
    }

    dispatch({ type: LoadingActionTypes.LOADING })

    try {
      // Fill all elements
      let resultList: string[] = pokes.map((elem) => elem.name)

      // -1- Filter NAME
      resultList = resultList.filter((elem) => elem.includes(name))

      // -2- Filter TYPE
      for (let i = 0; i < type.length; i++) {
        const tp = type[i]
        const response = (await pokeApi.pokemon.getTypeByName(tp.name)).pokemon
        const list = response.map((e) => e.pokemon.name)
        resultList = resultList.filter((n) => list.includes(n))
      }

      // -3- Filter STAT
      if (stat.name !== '') {
        resultList = pokemonStats[stat.name]
          .filter((p) => {
            const min = stat.value.min
            const max = stat.value.max
            return resultList.includes(p.name) && min <= p.base_stat && p.base_stat <= max
          })
          .map((p) => p.name)
      }

      // -4- SORTING
      if (sort !== '') {
        resultList = resultList.sort((a, b) => {
          const direction = 'A - z' ? 1 : -1
          if (a > b) return direction
          if (a < b) return -direction
          return 0
        })
      }

      dispatch({
        type: PokeActionTypes.FILTER_FILL,
        payload: resultList,
      })
      dispatch({ type: LoadingActionTypes.SUCCESS })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      dispatch({ type: LoadingActionTypes.ERROR, payload: 'Error in filter' })
    }
  }
}

/**
 * Set Error Actions
 */
// Set Parametres Name
export const setError = (error: string) => {
  return async function (dispatch: Dispatch<TypeLoadingAction>) {
    dispatch({
      type: LoadingActionTypes.SET_ERROR,
      payload: error,
    })
  }
}
