export interface ICoordinate {
  latitude?: number
  longitude?: number
}
export interface LocationState {
  latitude?: number
  longitude?: number
  city?: string
  country?: string
  postal?: string
  country_code?: string
  region?: string
  region_code?: string
  ip?: string
}

const locationInitialState = {
  city: '',
  country: '',
  country_code: '',
  ip: '',
  latitude: 0.0,
  longitude: 0.0,
  postal: '',
  region: '',
  region_code: '',
}

export default locationInitialState
