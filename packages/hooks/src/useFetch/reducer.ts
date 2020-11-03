import { FetchReducer } from './types'

const reducer: FetchReducer = (state, action) => {
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
        data: null,
        error: action.payload,
        loading: false
      }
  }
}

export { reducer }
