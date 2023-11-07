import { combineReducers } from 'redux'

import criteria from './state/criteria/criteriaReducer'
import type { CriteriaState } from './state/criteria/criteriaState'
import general from './state/general/generalReducer'
import type { GeneralState } from './state/general/generalState'
import location from './state/location/locationReducer'
import type { LocationState } from './state/location/locationState'
import product from './state/product/productReducer'
import type { ProductState } from './state/product/productState'

export interface AppState {
  product: ProductState
  criteria: CriteriaState
  location: LocationState
}

export interface ViewState {
  general: GeneralState
}

export interface RootState {
  app: AppState
  view: ViewState
}

const rootReducer = combineReducers<RootState>({
  app: combineReducers({
    criteria,
    location,
    product,
  }),
  view: combineReducers({
    general,
  }),
})

export default rootReducer
