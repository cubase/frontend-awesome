export type FetchError = {
  message: string
  statusCode: number
}

export type FetchState<T> = {
  data: T
  error: FetchError | null
  loading: boolean
}

export type FetchAction<T> =
  | { type: 'FETCHING' }
  | { type: 'FETCHED'; payload: T }
  | { type: 'ERROR'; payload: FetchError }

export type FetchInput = { url: string } & RequestInit

export type FetchInputFunction = (
  fetch: (fetchInput: FetchInput) => Promise<any>
) => Promise<any> | any

export type FetchHookInput = FetchInput | FetchInputFunction

export type RefetchFunction = (refetchInput?: FetchHookInput) => void
