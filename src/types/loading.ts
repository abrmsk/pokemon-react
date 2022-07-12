/* eslint-disable no-unused-vars */
export interface ILoadingState {
  loading: boolean
  error: null | string
  loadDataForFilter: boolean
  loadDataForFilterError: null | string
  loadDataForFilterProgress: number
}

export enum LoadingActionTypes {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  DATA_STAT_LOADING = 'DATA_STAT_LOADING',
  DATA_STAT_SUCCESS = 'DATA_STAT_SUCCESS',
  DATA_STAT_PROGRESS = 'DATA_STAT_PROGRESS',
  SET_ERROR = 'SET_ERROR',
}

interface LoadingAction {
  type: LoadingActionTypes.LOADING
}
interface SuccessAction {
  type: LoadingActionTypes.SUCCESS
}
interface ErrorAction {
  type: LoadingActionTypes.ERROR
  payload: string
}
interface LoadDataForFilterAction {
  type: LoadingActionTypes.DATA_STAT_LOADING
}
interface LoadDataForFilterSuccessAction {
  type: LoadingActionTypes.DATA_STAT_SUCCESS
}
interface LoadDataForFilterProgressAction {
  type: LoadingActionTypes.DATA_STAT_PROGRESS
  payload: number
}
interface SetErrorAction {
  type: LoadingActionTypes.SET_ERROR
  payload: string
}

export type TypeLoadingAction =
  | LoadingAction
  | SuccessAction
  | ErrorAction
  | LoadDataForFilterAction
  | LoadDataForFilterSuccessAction
  | LoadDataForFilterProgressAction
  | SetErrorAction
