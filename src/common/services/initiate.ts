import type { Store } from 'redux'

import LoadingService from './loadingService'

export interface IServices {
  loading: LoadingService
}

const initiateServices: (arg0: Store) => IServices = (store) => ({
  loading: new LoadingService(store),
})

export default initiateServices
