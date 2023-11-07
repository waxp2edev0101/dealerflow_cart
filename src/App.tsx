import mapboxgl from 'mapbox-gl'
import React from 'react'
import { Provider } from 'react-redux'
import type { Store, AnyAction } from 'redux'

import { ServicesContext } from './common/contexts'
import type { RootState } from './common/models'
import type { IServices } from './common/services/initiate'
import Root from './common/state/routes'
import ErrorBoundary from './components/ErrorBoundary'
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY!

declare global {
  interface Window {}
}
// window.global ||= window;

const App: React.FC<{
  store: Store<RootState, AnyAction>
  services: IServices
}> = ({ store, services }) => {
  return (
    <Provider store={store}>
      <ServicesContext.Provider value={services}>
        <ErrorBoundary>
          <Root />
        </ErrorBoundary>
      </ServicesContext.Provider>
    </Provider>
  )
}

export default App
