class CustomError extends Error {
  constructor(message: string) {
    super(`[frontend-architecture] ${message}`)
  }
}

export { CustomError }
