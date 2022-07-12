/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
const url = 'https//pokeapi.co/api/v2/pokemon?offset=213&limit=54365'

function getParameterFromHTTPString(url) {
  const offset = url.indexOf('offset=')
  const limit = url.indexOf('limit=')

  return {
    offset: offset >= 0 ? getNumberFromString(url, offset + 7) : -1,
    limit: limit >= 0 ? getNumberFromString(url, limit + 6) : -1,
  }
}

function getNumberFromString(url, start) {
  let res = ''
  for (let i = start; i < url.length; i++) {
    if (isNaN(-url[i])) break
    res += url[i]
  }
  return +res
}

/**
 * offset
 */

const favorites = [
  { name: 'n1', url: '' },
  { name: 'n2', url: '' },
  { name: 'n3', url: '' },
  { name: 'n4', url: '' },
]

const perPage = 3

const setOffset = () =>
  favorites
    .reduce(
      (value, _, i) => (value = i % perPage === 0 ? (value += (i === 0 ? '' : ',') + i) : value),
      ''
    )
    .split(',')
    .map((a) => +a)

const getArrayOffsets11 = () => {
  const arr = []
  favorites.forEach((_, i) => (i % perPage === 0 ? arr.push(i) : null))
  return arr
}

/**
 * Paginate
 */

const filterPagination = (array, indexPage) => {
  const result = array
    .map((_, i) => i)
    .filter((elem, _, arr) => {
      const lBoard = indexPage - 2
      const rBoard = indexPage + 2
      if (elem === 0 || elem === arr.length - 1) return true
      if (elem >= lBoard && elem <= rBoard) {
        return true
      }
    })

  if (result[0] + 1 !== result[1]) {
    result.splice(1, 0, '...')
  }
  if (result[result.length - 2] + 1 !== result[result.length - 1]) {
    result.splice(result.length - 1, 0, '...')
  }

  return result
}

/**
 * equal arrays
 */
// adfadsfasdfdsafsadf
const arraysIsEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false

  for (let i = 0; i < arr1.length; i++) {
    const value = arr1[i]
    if (!arr2.includes(value)) return false
  }

  return true
}

const arr1 = ['abc', 'dca', 'afds', '123', 'eee', 'ttt', 'Aafadsf', '5tgDD']
const arr2 = ['abc', 'dca', 'afds', '123', 'eee', 'ttt', 'Aafadsf', '5tgDD']

/**
 * adfka;dslkjf;aldskjf;asdjf;safd
 */
// adsf

const baseUrl = 'https://pokeapi.co/api/v2/'
const listPokesUrl = baseUrl + 'pokemon?limit=10000&offset=0'
const listStatsUrl = baseUrl + 'stat?limit=10000&offset=0'

const getStatData = async () => {
  try {
    /** START DATA LOADING */

    const responseListPokes = await fetch(listPokesUrl)
    const listPokes = (await responseListPokes.json()).results
    const responseListStats = await fetch(listStatsUrl)
    const listStats = (await responseListStats.json()).results
    console.log('l: ', listPokes, listStats)
    /** END LOADING START DATA */

    // ************************************* //

    /** LOADING POKEMON STATS DATA */
    // Storage (Храним в сторе проиндексированные данные о состоянии)
    let dataStats = { data: {}, listPokemons: [] }
    const ls = localStorage.getItem('storageKeys.DATA_STATS')

    if (ls) {
      dataStats = JSON.parse(ls)
    } else {
      listStats
        .map((s) => s.name)
        .forEach((s) => {
          dataStats.data[s] = []
        })
    }

    const listPokemons = listPokes.map((p) => p.name)

    if (arraysIsEqual(dataStats.listPokemons, listPokemons)) {
      console.log('h.6. equal')
    } else {
      try {
        for (let i = 0; i < listPokes.length; i++) {
          const pokeName = listPokes[i].name
          const isDataPokemon = dataStats.listPokemons.includes(pokeName)

          console.log('h.2')

          
          if (!isDataPokemon) {
            const response = await fetch(baseUrl + 'pokemon/' + pokeName)
            const result = await response.json()

            console.log('h.3', result)
            result.stats.forEach((stat) => {
              dataStats.data[stat.stat.name].push({
                name: pokeName,
                effort: stat.effort,
                base_stat: stat.base_stat,
              })
            })
            dataStats.listPokemons.push(pokeName)
          }


          
          console.log('h.4')
          localStorage.setItem('storageKeys.DATA_STATS', JSON.stringify(dataStats))

          const progress = Math.trunc((i * 100) / listPokes.length + 0.1)
          const root = document.getElementById('exit')
          root.innerText = progress
        }
        /** END - LOADING POKEMON STATS DATA */
      } catch (e) {
        console.error(e)
      }
    }
  } catch (e) {
    console.error(e)
  }
}


/**
 * DELATY
 */
//
const delay = ms => new Promise(r => setTimeout(() => r(), ms))



validateEmail = (email) => {
  console.log(email);
  const pattern = /^[\w\-.]+@[\w-]+\.[a-z]{2,4}$/i;

  if (!pattern.test(email)) {
    // this.setState({ emailOk: false });
    return 'false';
  }

  return 'true';
};


const lists = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['2', '4', '7', '9', '6', '8', '0'],
  ['1', '2', '5', '0'],
]
const fetchPok = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0').then(r => r.json())
  // let resultList = res.results.map(n => n.name)
  let resultList = ['1','2','3','4','5','6','7','8','9','0']

  const types = ['bug', 'dark', 'fire', 'ice']

  for (let i = 0; i < lists.length; i++) {
    // const type = types[i]
    // const resp = await fetch(`https://pokeapi.co/api/v2/type/${type}`).then(r => r.json())
    // const result = resp.pokemon.map(p => p.pokemon.name)
    const list = lists[i]
    resultList = resultList.filter(x => list.includes(x));
    console.log('t: ', resultList)
    // if (i === 1) break
  }

}

fetchPok()


// console.log(list)
