import type { AnyAction, Reducer } from 'redux'

import { isEmpty } from '@/utils/common'

import type { CriteriaActionProps } from './criteriaActions'
import { CriteriaActionTypes } from './criteriaActions'
import type { CriteriaState } from './criteriaState'
import criteriaInitialState from './criteriaState'

const criteriaReducer: Reducer<CriteriaState> = (
  state = criteriaInitialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case `${CriteriaActionTypes.SET_CRITERIA}`:
      // console.log('criteria reducer, set criteria', action.payload)
      const { value, key } = action.payload
      return {
        ...state,
        criteria: {
          ...state.criteria,
          [key]: value,
        },
        enable: {
          ...state.enable,
          [key]:
            key === 'distance' ||
            key === 'distance_unit' ||
            key === 'listing_price_order'
              ? false
              : !isEmpty(value),
        },
      }
    case `${CriteriaActionTypes.SET_CRITERIA_LIST}`:
      const newCriteria: any = {}
      const newEnables: any = {}

      action.payload.forEach((item: CriteriaActionProps) => {
        newCriteria[item.key] = item.value
        newEnables[item.key] = !isEmpty(item.value)
      })

      return {
        ...state,
        criteria: {
          ...state.criteria,
          ...newCriteria,
        },
        enable: {
          ...state.enable,
          ...newEnables,
        },
      }
    case `${CriteriaActionTypes.CLEAR_CRITERIA}`:
      return criteriaInitialState
    default:
      return state
  }
}

export default criteriaReducer
