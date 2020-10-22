const isLoggingEnabled = () => {
  if (typeof window !== 'undefined') {
    return ['true', '1'].includes(window.localStorage.FA_LOGGER)
  }

  return false
}

const generateTimestamp = () => {
  const date = new Date()

  return `${date.getUTCFullYear()}/${
    date.getUTCMonth() + 1
  }/${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
}

const generateLogHeader = () => `${generateTimestamp()} |frontend-architecture|`

const info = (...msg: string[]) =>
  isLoggingEnabled() ? console.log(generateLogHeader(), ...msg) : undefined

const error = (...msg: string[]) =>
  isLoggingEnabled() ? console.error(generateLogHeader(), ...msg) : undefined

const logger = {
  info,
  error
}

export { logger }
