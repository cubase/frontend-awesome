import { useEffect, useRef } from 'react'
import isEqual from 'lodash.isequal'

import { ObserverOptions } from './types'

const useObserver = <T>(options: ObserverOptions<T>) => {
  const { observe, action, dependable } = options
  const previous = useRef(observe)

  useEffect(() => {
    if (dependable || dependable === undefined) {
      if (!isEqual(previous.current, observe)) {
        action(observe, previous.current)
      }
      previous.current = observe
    }
  })
}

export default useObserver
