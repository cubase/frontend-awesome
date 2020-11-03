export type FetchError = {
  message: string
  statusCode: number
}

export type FetchState = {
  data: any | null
  error: FetchError | null
  loading: boolean
}

export type FetchAction =
  | { type: 'FETCHING' }
  | { type: 'FETCHED'; payload: any }
  | { type: 'ERROR'; payload: FetchError }

export type FetchReducer = (state: FetchState, action: FetchAction) => FetchState

export type FetchInput = { url: string } & RequestInit

export type FetchInputFunction = (
  fetch: (fetchInput: FetchInput) => Promise<any>
) => Promise<any> | any

export type FetchHookInput = FetchInput | FetchInputFunction

export type RefetchFunction = (refetchInput?: FetchHookInput) => void
