import { useEffect, useRef } from 'react'
import isEqual from 'lodash.isequal'

export type useObserverOptions<T> = {
  observe: T
  action: (currentValue: T, previousValue: T) => void
  dependable?: boolean
}

const useObserver = <T>(options: useObserverOptions<T>) => {
  const { observe, action, dependable } = options
  const previous = useRef(observe)

  useEffect(() => {
    if (dependable || dependable === undefined) {
      if (!isEqual(previous.current, observe)) {
        action(observe, previous.current)
      }
      previous.current = observe
    }
  }, [observe])
}

export { useObserver }
