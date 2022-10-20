import * as React from 'react'
import { useState, useMemo, useContext } from 'react'

import { MessageBuilder } from './MessageBuilder'
import { I18nContextProviderProps, I18nContextState } from './types'

const getFirstProperty = (obj: Record<string, any>) => Object.keys(obj)[0]

const I18nContext = React.createContext<I18nContextState<string>>({} as I18nContextState<string>)

const I18nContextProvider = <Language extends string>({
  translations,
  children,
  cache
}: I18nContextProviderProps<Language>) => {
  const [state, setState] = useState({
    language: cache ? cache.load() : (getFirstProperty(translations) as Language)
  })

  const setLanguage = (language: Language) => {
    if (language in translations) {
      setState({ language })

      if (cache) {
        cache.save(language)
      }
    }
  }

  const getMessage = (msgPath: string, variables?: Record<string, string>) =>
    MessageBuilder.getMessage(msgPath, translations, state.language, variables)

  const value = useMemo(() => ({ language: state.language, setLanguage, getMessage }), [
    state.language
  ])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

const useI18n = () => {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('[I18nContext] useI18n must be used within I18nContextProvider')
  }

  return {
    msg: context.getMessage,
    currentLanguage: context.language,
    setLanguage: context.setLanguage
  }
}

export { useI18n, I18nContextProvider }
