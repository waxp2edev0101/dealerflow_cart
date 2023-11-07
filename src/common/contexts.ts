import React from 'react'

import type { IServices } from './services/initiate'

export const servicesInitialState = {
  loading: false,
}

export const ServicesContext = React.createContext<IServices | undefined>(
  undefined,
)

export const VehicleContext = React.createContext<any>(undefined)
