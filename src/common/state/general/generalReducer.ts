import type { AnyAction, Reducer } from 'redux'

import { GeneralActionTypes } from './generalActions'
import type { GeneralState } from './generalState'
import generalInitialState from './generalState'

const generalReducer: Reducer<GeneralState> = (
  state = generalInitialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case `${GeneralActionTypes.LOADING_START}`:
      return { ...state, loading: true }

    case `${GeneralActionTypes.LOADING_STOP}`:
      return { ...state, loading: false }

    case `${GeneralActionTypes.SET_PAGE}`:
      return { ...state, page: action.payload }

    default:
      return state
  }
}

export default generalReducer
