import axios from 'axios'

export const instance = axios.create()

export const apiGetRequest = async (url: string) => {
  try {
    const response = await instance.get(url)
    if (response.data.error === 'Unauthorized') {
      // store.dispatch(actions.logout());
    } else {
      return response
    }
  } catch (error: any) {
    console.log(error)
    if (error.response?.status === 401) {
      // store.dispatch(actions.logout());
      return error.response
    } else {
      return error.response
    }
  }
}

export const apiPostRequest = async (url: string, data = {}, headers = {}) => {
  try {
    const response = await instance.post(url, data, { headers })
    return response
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 401) {
      // store.dispatch(actions.logout());
      return error.response
    } else {
      return error.response
    }
  }
}

export default function setupAxios(_instance: any, store: any) {
  _instance.interceptors.request.use(
    (config: any) => {
      const {
        app: { location },
      } = store.getState(store)

      // console.log('axios interceptor location', location)

      config.headers = {
        ...config.headers,
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Origin': '*',
        country_code: 'cn',
        withCredentials: false,
      }

      config.mode = 'no-cors'
      config.credentials = 'same-origin'

      if (location) {
        config.headers.country_code = location.country_code
      }
      return config
    },
    (err: any) => Promise.reject(err),
  )
}
