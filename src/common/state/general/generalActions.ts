export enum GeneralActionTypes {
  LOADING_START = 'LOADING_START',
  LOADING_STOP = 'LOADING_STOP',
  SET_PAGE = 'SET_PAGE',
}

export const StartLoaderAction = () => ({
  type: GeneralActionTypes.LOADING_START,
})

export const StopLoaderAction = () => ({
  type: GeneralActionTypes.LOADING_STOP,
})

export const SetPageAction = (page: number) => ({
  payload: page,
  type: GeneralActionTypes.SET_PAGE,
})
