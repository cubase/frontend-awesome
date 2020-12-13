export type AsyncQueueOptions = {
  name?: string
  dequeueErrorTimeout?: number
  dropTaskAfterErrorsCount?: number
}

export type AsyncQueueTaskFunction = () => Promise<any>

export type AsyncQueueTask = {
  promiseFunction: AsyncQueueTaskFunction
  metadata: Record<string, any>
  errorCount: number
}
