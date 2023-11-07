export const truncate = (str: string) => {
  if (str.length > 10) return str.substring(0, 10)
}

export interface ICoordinate {
  latitude?: number
  longitude?: number
}
export const getCoordinates: () => Promise<
  ICoordinate | undefined
> = async () => {
  const geolocationAPI = navigator.geolocation

  if (!geolocationAPI) {
    console.log('Geolocation API is not available in your browser!')
  } else {
    return new Promise<ICoordinate>((resolve) => {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { coords } = position
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          } as ICoordinate)
        },
        (error: any) => {
          console.log(
            'Something went wrong getting your position!',
            error.message,
          )
          resolve({ latitude: 0, longitude: 0 })
        },
      )
    })
  }
}
/**
 *
 * @returns
 * city
 * region
 * region_code
 * country
 * country_name
 * country_code
 * country_capital
 * postal
 * latitude
 * longitude
 * timezone
 * asn
 */
export const getGeoInfo: () => Promise<any> = () =>
  new Promise(async (resolve) => {
    fetch('https://ipapi.co/json/')
      .then(function (response) {
        response.json().then((jsonData) => {
          resolve(jsonData)
        })
      })
      .catch(function (error) {
        // console.log(error)
        resolve(error)
      })
  })

export const checkArrayEmpty = (arr: any[] | undefined): boolean => {
  if (arr === undefined) return true
  const length = arr.length

  for (let i = 0; i < length; i++) {
    const item = arr[i]

    if (typeof item === 'string' && item.length > 0) return false
    else if (typeof item === 'number' && item > 0) return false
    else if (
      typeof item === 'object' &&
      Array.isArray(item) &&
      item.length > 0
    ) {
      item.forEach((value) => {
        if (typeof value === 'string' && value.length > 0) return false
        else if (typeof value === 'number' && value > 0) return false
        else return true
      })
    } else return true
  }
  return true
}

export const isEmpty = (value: any | undefined) => {
  if (value === undefined) return true
  if (typeof value === 'number') {
    if (value > 0) return false
    else return true
  } else if (typeof value === 'string') {
    if (value.length > 0) return false
    else return true
  } else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        const length = value.length
        for (let i = 0; i < length; i++) {
          if (!isEmpty(value[i])) return false
        }
        return true
      } else return true
    } else return true
  } else {
    return true
  }
}
