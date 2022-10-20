import { RecursiveStringObject, Translations } from './types'

class MessageBuilder {
  static recursivelyGetMessage = (
    pathValue: RecursiveStringObject,
    path: string[]
  ): RecursiveStringObject | string => {
    const part = path.shift()

    if (part) {
      const value = pathValue[part]
      return typeof value === 'object' ? MessageBuilder.recursivelyGetMessage(value, path) : value
    }

    return pathValue
  }

  static getMessage<T extends string>(
    msgPath: string,
    translations: Translations<T>,
    language: T,
    variables: Record<string, string> = {}
  ) {
    const dictionary = translations[language]
    const path = msgPath.split('.')
    let text = MessageBuilder.recursivelyGetMessage(dictionary, path)

    for (const [key, value] of Object.entries(variables)) {
      if (typeof text === 'string') {
        text = text.replace(`{${key}}`, value)
      }
    }

    return text
  }
}

export { MessageBuilder }
