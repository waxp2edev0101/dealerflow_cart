import type { Dispatch, AnyAction } from 'redux'
import type { StateType } from 'typesafe-actions'

import type rootReducer from './reducers'

export type RootState = StateType<typeof rootReducer>

export interface Endpoint {
  url: string
  method?: string
  contentType?: string
  body?: any
}

export type ThunkAction = (
  params?: any,
) => (dispatch: Dispatch<any>, getState: () => RootState) => void

export type AsyncAction = (
  type: string,
  fn: (params?: any) => Promise<any>,
) => any

export type ActionCreator = (
  args?: any,
) => (dispatch: Dispatch<AnyAction>, getState: () => RootState) => any
