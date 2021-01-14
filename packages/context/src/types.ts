export type ContextProviderProps = {
  children: React.ReactNode
}

export type ReducerAction = {
  type: string
  payload?: any
}

export type Reducer<State, Action> = (state: State, action: Action) => State
