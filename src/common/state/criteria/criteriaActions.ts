export enum CriteriaActionTypes {
  SET_CRITERIA = 'SET_CRITERIA',
  SET_CRITERIA_LIST = 'SET_CRITERIA_LIST',
  CLEAR_CRITERIA = 'CLEAR_CRITERIA',
}

export type CriteriaKey =
  | 'vehicle_makes'
  | 'listing_mileage'
  | 'vehicle_fuel_types'
  | 'vehicle_engine_cylinders'
  | 'vehicle_year'
  | 'listing_price'
  | 'vehicle_transmission_types'
  | 'vehicle_drivetrains'
  | 'listing_price_order'
  | 'location'
  | 'distance'
  | 'distance_unit'
  | 'page'
  | 'vehicle_models'
  | 'vehicle_trims'
  | 'country_code'

export interface CriteriaActionProps {
  key: CriteriaKey
  value: string | number | any[]
}

export const SetCriteriaAction = (criteria: CriteriaActionProps) => ({
  payload: criteria,
  type: CriteriaActionTypes.SET_CRITERIA,
})

export const SetCriteriaListAction = (list: CriteriaActionProps[]) => ({
  payload: list,
  type: CriteriaActionTypes.SET_CRITERIA_LIST,
})

export const ClearCriteriaAction = () => ({
  type: CriteriaActionTypes.CLEAR_CRITERIA,
})
