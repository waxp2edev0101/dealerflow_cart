import type { Endpoint } from '../models'

class HttpService {
  fetch(options: Endpoint) {
    const { url, method, body } = options
    const headers = new Headers()

    if (options.contentType) {
      headers.append('Content-Type', options.contentType)
    }

    return fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      body,
      credentials: 'same-origin',
      headers,
      method,
    }).then((res) => {
      const isJson = HttpService.isJson(res)

      if (res.ok) {
        if (isJson) {
          return res.json()
        }
        return res.text()
      }

      if (isJson) {
        return res.json().then((data) => {
          throw data
        })
      }
      return res.text().then((data) => {
        throw new Error(data)
      })
    })
  }

  static isJson(res: Response) {
    const contentType = res.headers.get('content-type')
    return contentType && contentType.indexOf('application/json') !== -1
  }
}

export default new HttpService()
