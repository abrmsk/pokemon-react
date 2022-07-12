/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable valid-jsdoc */

import { NamedAPIResource } from 'pokenode-ts'

/**
 * Проверяет содержит ли данный массив ВСЕ данные другого массива
 * @param array where Где искать
 * @param array what Что искать
 * @return boolean найдено или нет
 */
export function containsAllElements<T>(where: T[], what: T[]): boolean {
  for (let i = 0; i < what.length; i++) {
    if (where.indexOf(what[i]) == -1) return false
  }
  return true
}

/**
 * Находит все элементы массивов которые есть в обеих массивах
 * @param array1 первый масив для поиска
 * @param array2 второй массив для поиска
 * @returns возвращает новый массив с элементами найденными в обеих исходных массивах
 */
export function intersect<T>(array1: T[], array2: T[]): T[] | undefined {
  return array1.filter(function (n) {
    return array2.indexOf(n) !== -1
  })
}

/**
 * Сортирует массив по направлению указанному в параметрах
 * Используется метод sort() "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"
 * @param arr сортируемый массив
 * @param direct "1" от А до Я, "-1" от Я до А
 * @param sortField имя поля по которому нужно сортировать массив объектов
 * @returns возвращается новый массив
 */
export function sortingObjects(arr: NamedAPIResource[], direct: number): NamedAPIResource[] {
  if (direct === 0) return [...arr]

  const newArray = arr.sort((a, b) => {
    if (a.name > b.name) return direct
    if (a.name < b.name) return -direct
    return 0
  })

  return [...newArray]
}
export function sortingArrayString(arr: string[], direct: number): string[] {
  if (direct === 0) return [...arr]

  const newArray = arr.sort((a, b) => {
    if (a > b) return direct
    if (a < b) return -direct
    return 0
  })

  return [...newArray]
}

/**
 * Проверяет массив и находит дубликаты объектов по значениям и удаляет их
 * @param arr массив с объектами
 * @returns новый массив без дубликатов
 */
export function removeDuplicates(arr: any[]) {
  const result: any[] = []
  const duplicatesIndices: any[] = []

  // Перебираем каждый элемент в исходном массиве
  arr.forEach((current: { [x: string]: any }, index: number) => {
    if (duplicatesIndices.includes(index)) return

    result.push(current)

    // Сравниваем каждый элемент в массиве после текущего
    for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {
      const comparison = arr[comparisonIndex]
      const currentKeys = Object.keys(current)
      const comparisonKeys = Object.keys(comparison)

      // Проверяем длину массивов
      if (currentKeys.length !== comparisonKeys.length) continue

      // Проверяем значение ключей
      const currentKeysString = currentKeys.sort().join('').toLowerCase()
      const comparisonKeysString = comparisonKeys.sort().join('').toLowerCase()
      if (currentKeysString !== comparisonKeysString) continue

      // Проверяем индексы ключей
      let valuesEqual = true
      for (let i = 0; i < currentKeys.length; i++) {
        const key = currentKeys[i]
        if (current[key] !== comparison[key]) {
          valuesEqual = false
          break
        }
      }
      if (valuesEqual) duplicatesIndices.push(comparisonIndex)
    } // Конец цикла
  })
  return result
}

/**
 * Получить массив смещений от 0 до конца массива значений
 * для отображения количества на странице
 * в зависимости от лимита
 * @returns массив индексов со смещениями
 */
export const getArrayOffsets = (src: any[] | number, perPage: number): number[] => {
  const arr: number[] = []

  if (typeof src === 'number') {
    Array(src)
      .fill(0)
      .forEach((_, i) => (i % perPage === 0 ? arr.push(i) : null))
    return arr
  }

  src.forEach((_, i) => (i % perPage === 0 ? arr.push(i) : null))
  return arr
}

/**
 * Filter Pagination
 */
export const filterPagination = (
  array: number[],
  indexPage: number
): { index: number; value: number }[] => {
  const result: { index: number; value: number }[] = array
    .map((_, i) => ({ index: i, value: i }))
    .filter((elem, _, arr) => {
      const lBoard = indexPage - 2
      const rBoard = indexPage + 2
      if (elem.index === 0 || elem.index === arr.length - 1) return true
      if (elem.index >= lBoard && elem.index <= rBoard) {
        return true
      }
    })

  if (result.length >= 2) {
    if (+result[0].value + 1 !== result[1].value) {
      result.splice(1, 0, { index: -1, value: -1 })
    }
    if (+result[result.length - 2].value + 1 !== result[result.length - 1].value) {
      result.splice(result.length - 1, 0, { index: -1, value: -1 })
    }
  }

  return result
}

/**
 * Получить массив смещений от 0 до конца массива значений
 * для отображения количества на странице
 * в зависимости от лимита
 * @returns массив индексов со смещениями
 */
export const arraysIsEqual = (arr1: string[], arr2: string[]): boolean => {
  if (arr1.length !== arr2.length) return false

  for (let i = 0; i < arr1.length; i++) {
    const value = arr1[i]
    if (!arr2.includes(value)) return false
  }

  return true
}
