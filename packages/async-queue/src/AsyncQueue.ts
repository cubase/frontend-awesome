import * as EventEmitter from 'eventemitter3'

import { AsyncQueueOptions, AsyncQueueTask, AsyncQueueTaskFunction } from './types'

class AsyncQueue extends EventEmitter {
  name: string
  _queue: AsyncQueueTask[]
  _pendingPromise: boolean
  _dequeueErrorTimeout: number
  _dropTaskAfterErrorsCount: number

  constructor(options: AsyncQueueOptions = {}) {
    super()
    this.name = options.name || 'default'
    this._queue = []
    this._pendingPromise = false
    this._dequeueErrorTimeout = options.dequeueErrorTimeout ?? 0
    this._dropTaskAfterErrorsCount = options.dropTaskAfterErrorsCount ?? Infinity
  }

  add(task: {
    promiseFunction: AsyncQueueTaskFunction
    metadata?: {
      [key: string]: any
    }
  }) {
    if (typeof task.promiseFunction !== 'function') {
      throw new TypeError("Parameter 'promiseFunction' has to be function")
    }
    this.enqueue({
      promiseFunction: task.promiseFunction,
      metadata: task.metadata || {},
      errorCount: 0
    })
  }

  private handleSuccess(metadata: Record<string, any>, promiseData: any) {
    this.emit('success', { metadata, promiseData })
  }

  private handleQueueEmpty() {
    this.emit('queue-empty')
  }

  private handleError(metadata: Record<string, any>, error: Error) {
    this.emit('error', { metadata, error })
  }

  private handleErrorCountExceeded(
    metadata: Record<string, any>,
    errorCount: number,
    error: Error
  ) {
    this.emit('error-count-exceeded', { metadata, error, errorCount })
  }

  private enqueue(task: AsyncQueueTask) {
    this._queue.push(task)
    this.dequeue()
  }

  private dequeue() {
    if (this._pendingPromise) {
      return false
    }

    const task = this._queue.shift()
    if (!task) {
      return this.handleQueueEmpty()
    }

    this._pendingPromise = true

    task
      .promiseFunction()
      .then((promiseData) => {
        this._pendingPromise = false
        this.handleSuccess(task.metadata, promiseData)
        this.dequeue()
      })
      .catch((error) => {
        this._pendingPromise = false

        if (task.errorCount >= this._dropTaskAfterErrorsCount) {
          this.handleErrorCountExceeded(
            task.metadata,
            task.errorCount,
            new Error(`[AsyncQueue] Error count exceeded ${error}`)
          )
          return this.dequeue()
        }

        this.handleError(task.metadata, new Error(`[AsyncQueue] Error: ${error}`))
        this._queue.push({ ...task, errorCount: task.errorCount + 1 })
        setTimeout(() => this.dequeue(), this._dequeueErrorTimeout)
      })
  }
}

export { AsyncQueue }
