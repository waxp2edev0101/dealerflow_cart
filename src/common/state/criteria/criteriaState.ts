import type { CriteriaKey } from './criteriaActions'

export type TCriteria = {
  [k in CriteriaKey]?: any
}

export interface CriteriaState {
  criteria: TCriteria
  enable?: {
    [k in CriteriaKey]?: boolean
  }
}

const criteriaInitialState: CriteriaState = {
  criteria: {
    distance: 100,
    distance_unit: 'K',
    listing_mileage: [0, 0],
    listing_price: [0, 0],
    listing_price_order: 1,
    vehicle_drivetrains: [],
    vehicle_engine_cylinders: [],
    vehicle_fuel_types: [],
    vehicle_makes: [],
    vehicle_models: [],
    vehicle_transmission_types: [],
    vehicle_trims: [],
    vehicle_year: [0, 0],
  },
  enable: {
    distance: false,
    distance_unit: false,
    listing_mileage: false,
    listing_price: false,
    listing_price_order: false,
    vehicle_drivetrains: false,
    vehicle_engine_cylinders: false,
    vehicle_fuel_types: false,
    vehicle_makes: false,
    vehicle_models: false,
    vehicle_transmission_types: false,
    vehicle_trims: false,
    vehicle_year: false,
  },
}

export default criteriaInitialState
