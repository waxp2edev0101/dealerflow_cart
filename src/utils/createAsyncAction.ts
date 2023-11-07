import type { AnyAction, Dispatch } from 'redux'

import {
  STARTED_SUFFIX,
  SUCCESS_SUFFIX,
  FAILED_SUFFIX,
} from '../common/constants'
import type { AsyncAction, RootState } from '../common/models'

interface Args {
  id: string
}

const createAsyncAction: AsyncAction = (
  type: string,
  fn: (args: Args, getState: () => RootState) => Promise<AnyAction>,
  catchError = true,
) => {
  return (args: Args) =>
    async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
      // dispatch starting action
      dispatch({
        payload: args,
        type: `${type}${STARTED_SUFFIX}`,
      })
      let result
      try {
        // activate promise call back
        result = await fn(args, getState)
      } catch (error: unknown) {
        // dispatch fail action
        dispatch({
          error: true,
          payload: error,
          type: `${type}${FAILED_SUFFIX}`,
        })
        if (catchError) {
          // console.log(JSON.parse((error as Error).message).message)
          console.log(error)
        }
        throw error
      }
      // dispatch success action
      dispatch({
        payload: result,
        type: `${type}${SUCCESS_SUFFIX}`,
      })

      return result
    }
}

export default createAsyncAction
