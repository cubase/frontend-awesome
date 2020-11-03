import { FetchError, FetchInput } from './types'

const createFetchError = (message: string, statusCode: number): FetchError => ({
  message,
  statusCode
})

const createAbortableFetch = (
  abortController: AbortController,
  instanceOptions: RequestInit = {}
) => {
  return ({ url, ...options }: FetchInput) =>
    fetch(url, {
      ...options,
      ...instanceOptions,
      signal: abortController.signal
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw createFetchError(response.statusText, response.status)
    })
}

export { createAbortableFetch }
