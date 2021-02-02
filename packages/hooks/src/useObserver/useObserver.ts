import { useEffect, useRef } from 'react'
import isEqual from 'lodash.isequal'

import { ObserverOptions } from './types'

const useObserver = <T>(options: ObserverOptions<T>) => {
  const { observe: currentValue, action, dependable } = options
  const previous = useRef(currentValue)
  const callback = useRef(action)

  useEffect(() => {
    callback.current = action
  })

  useEffect(() => {
    if (dependable || dependable === undefined) {
      if (!isEqual(previous.current, currentValue)) {
        callback.current(currentValue, previous.current)
      }
      previous.current = currentValue
    }
  })
}

export { useObserver }
