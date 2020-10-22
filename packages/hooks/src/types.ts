export type ConcernSeparationHook<
  O extends Record<string, unknown>,
  M extends Record<string, unknown>,
  T = void
> = (
  options: T
) => {
  operations: O
  models: M
}

export type ServiceError = {
  message: string
  statusCode?: string
}

export type ServiceMetadata = {
  loading: boolean
  error: ServiceError
}

export type Service<Q, C> = [
  {
    queries: Q
    commands: C
    meta: ServiceMetadata
  }
]

export type ServiceHook<Q, C> = () => Service<Q, C>
