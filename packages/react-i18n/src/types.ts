export interface RecursiveStringObject {
  [key: string]: RecursiveStringObject | string
}

export type Translations<T extends string> = Record<T, RecursiveStringObject>

export interface I18nContextState<T extends string> {
  language: T
  setLanguage: (lang: T) => void
  getMessage: (path: string) => RecursiveStringObject | string
}

export interface I18nContextProviderProps<Language extends string> {
  translations: Translations<Language>
  children: React.ReactNode
  cache?: {
    save: (language: Language) => void
    load: () => Language
  }
}
