import type { ICoordinate, LocationState } from './locationState'

export enum LocationActionTypes {
  SET_COORDINATE = 'SET_COORDINATE',
  SET_LOCATION = 'SET_LOCATION',
}

export const SetCoordinateAction = (coordinate: ICoordinate) => ({
  payload: coordinate,
  type: LocationActionTypes.SET_COORDINATE,
})

export const SetLocationAction = (location: LocationState) => ({
  payload: location,
  type: LocationActionTypes.SET_LOCATION,
})
