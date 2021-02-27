import { FetchState, FetchAction } from './types'

const createFetchReducer = <T>() => (state: FetchState<T>, action: FetchAction<T>) => {
  switch (action.type) {
    case 'FETCHING':
      return {
        ...state,
        error: null,
        loading: true
      }
    case 'FETCHED':
      return {
        data: action.payload,
        error: null,
        loading: false
      }
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      }
  }
}

export { createFetchReducer }
