type ServiceHook<O extends Record<string, unknown>, M extends Record<string, unknown>, T = void> = (
  options?: T
) => {
  operations: O
  models: M
}

export { ServiceHook }
