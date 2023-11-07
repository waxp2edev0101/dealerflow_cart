import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import type { Store } from 'redux'
import thunk from 'redux-thunk'

import App from './App'
import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { RootState } from './common/models'
import rootReducer from './common/reducers'
import initiateServices from './common/services/initiate'
import setupAxios, { instance } from './utils/apiRequests'

const root = ReactDOM.createRoot(document.getElementById('root')!)

const store: Store<RootState> = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
  reducer: rootReducer,
})
const services = initiateServices(store)
setupAxios(instance, store)
// Setup MSW mock server in development
if (process.env.NODE_ENV === 'development') {
  // Certify MSW's Service Worker is available before start React app.
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.stop()
    }) // Run <App /> when Service Worker is ready to intercept requests.
    .then(() => {
      root.render(<App store={store} services={services} />)
    })
  // Never setup MSW mock server in production
} else if (process.env.NODE_ENV === 'production') {
  root.render(<App store={store} services={services} />)
}
