import React from 'react'
import { CustomError } from 'utils/customError'

import { ContextProviderProps, Reducer, ReducerAction } from './types'

const createContext = <ContextInitialState, ContextAction extends ReducerAction>(
  initialState: ContextInitialState,
  reducer: Reducer<ContextInitialState, ContextAction>
) => {
  const Context = React.createContext<ContextInitialState>(initialState)
  const DispatchContext = React.createContext<(action: ContextAction) => void>(() => {})

  const ContextProvider = ({ children }: ContextProviderProps) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
      <Context.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
      </Context.Provider>
    )
  }

  const useContext = () => {
    const context = React.useContext(Context)

    if (context === null) {
      throw new CustomError('useContext has to be used within ContextProvider')
    }

    return context
  }

  const useDispatch = () => {
    const dispatch = React.useContext(DispatchContext)

    if (dispatch === null) {
      throw new CustomError('useDispatch has to be used within ContextProvider')
    }

    return dispatch
  }

  return {
    ContextProvider,
    useContext,
    useDispatch
  }
}

export { createContext }
