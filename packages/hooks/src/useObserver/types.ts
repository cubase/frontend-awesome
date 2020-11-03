export type ObserverOptions<T> = {
  observe: T
  action: (currentValue: T, previousValue: T) => void
  dependable?: boolean
}
