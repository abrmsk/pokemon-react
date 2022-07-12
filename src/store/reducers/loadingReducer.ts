import { ILoadingState, LoadingActionTypes, TypeLoadingAction } from '../../types/loading'

const initialState: ILoadingState = {
  loading: false,
  error: null,
  loadDataForFilter: false,
  loadDataForFilterError: null,
  loadDataForFilterProgress: 0,
}

export const loadingReducer = (state = initialState, action: TypeLoadingAction): ILoadingState => {
  switch (action.type) {
    case LoadingActionTypes.LOADING:
      return { ...state, loading: true, error: null }
    case LoadingActionTypes.SUCCESS:
      return { ...state, loading: false, error: null }

    case LoadingActionTypes.ERROR:
      return { ...state, loading: false, error: action.payload }
    case LoadingActionTypes.SET_ERROR:
      return { ...state, error: action.payload }

    case LoadingActionTypes.DATA_STAT_LOADING:
      return { ...state, loadDataForFilter: true, error: null }
    case LoadingActionTypes.DATA_STAT_PROGRESS:
      return { ...state, loadDataForFilter: true, loadDataForFilterProgress: action.payload }
    case LoadingActionTypes.DATA_STAT_SUCCESS:
      return { ...state, loadDataForFilter: false, error: null }

    default:
      return state
  }
}
