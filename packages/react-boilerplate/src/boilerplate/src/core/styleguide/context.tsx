import React, { useContext } from 'react'

export type DeepMap<T> = {
  [key: string]: T | DeepMap<T>
}

interface StyleguideProviderProps {
  children: React.ReactNode
}

const createStyleguideContext = <Theme extends DeepMap<string | number>>(theme: Theme) => {
  const StyleguideContext = React.createContext<Theme>(theme)
  const StyleguideProvider = ({ children }: StyleguideProviderProps) => {
    return <StyleguideContext.Provider value={theme}>{children}</StyleguideContext.Provider>
  }

  const createUseStyles = <Option extends string, Classname extends string>(
    styleFunction: (theme: Theme, options?: Record<Option, string>) => Record<Classname, string>
  ) => {
    return function useStyles(options?: Record<Option, string>) {
      const theme = useContext(StyleguideContext)
      return {
        classes: styleFunction(theme, options)
      }
    }
  }

  return { StyleguideProvider, createUseStyles } as const
}

export { createStyleguideContext, StyleguideProviderProps }
