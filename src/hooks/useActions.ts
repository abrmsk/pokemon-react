import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PokeActionCreators from '../store/action-create/poke'

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(PokeActionCreators, dispatch)
}
