export interface GeneralState {
  loading?: boolean
  page?: number
}

const generalInitialState = {
  loading: false,
  page: 0,
}

export default generalInitialState
