import type { AnyAction, Reducer } from 'redux'

import { LocationActionTypes } from './locationActions'
import type { LocationState } from './locationState'
import locationInitialState from './locationState'

const locationReducer: Reducer<LocationState> = (
  state = locationInitialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case `${LocationActionTypes.SET_COORDINATE}`:
      return { ...state, coordinate: action.payload }
    case `${LocationActionTypes.SET_LOCATION}`:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default locationReducer
