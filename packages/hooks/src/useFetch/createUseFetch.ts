import { useState, useEffect, useReducer } from 'react'

import { createAbortableFetch } from './createAbortableFetch'
import { createFetchReducer } from './reducer'
import { FetchHookInput, FetchState, RefetchFunction } from './types'

const createUseFetch = (instanceOptions?: RequestInit) => {
  function useFetch<T>(
    fetchHookInput?: FetchHookInput,
    defaultValue?: T
  ): [FetchState<T>, RefetchFunction] {
    const reducer = createFetchReducer<T>()
    const [state, dispatch] = useReducer(reducer, {
      data: (defaultValue || null) as T,
      error: null,
      loading: false
    })
    const [fetchState, setRefetchState] = useState<FetchHookInput | undefined>(
      typeof fetchHookInput === 'function' ? () => fetchHookInput : fetchHookInput
    )

    const refetch: RefetchFunction = (refetchInput) => {
      const newFetchInput = refetchInput === undefined ? fetchState : refetchInput

      if (newFetchInput === undefined) {
        return
      }

      setRefetchState(
        typeof newFetchInput === 'function' ? () => newFetchInput.bind(null) : { ...newFetchInput }
      )
    }

    useEffect(() => {
      const abortController = new AbortController()
      const makeRequest = async (fetchHookInput: FetchHookInput) => {
        dispatch({
          type: 'FETCHING'
        })

        try {
          const abortableFetch = createAbortableFetch(abortController, instanceOptions)
          const data =
            typeof fetchHookInput === 'function'
              ? await fetchHookInput(abortableFetch)
              : await abortableFetch(fetchHookInput)

          dispatch({
            type: 'FETCHED',
            payload: data
          })
        } catch (error) {
          dispatch({
            type: 'ERROR',
            payload: {
              message: error.message || `Internal server error occured: ${error}`,
              statusCode: error.statusCode || 500
            }
          })
        }
      }

      if (fetchState !== undefined) {
        makeRequest(fetchState)
      }

      return function abortFetch() {
        abortController.abort()
      }
    }, [fetchState])

    return [state, refetch]
  }

  return useFetch
}

export { createUseFetch }
