import { AsyncQueue } from '../src/index'

type MockedTaskOptions = {
  id: string
  shouldReject?: boolean
  timeout?: number
}
const createMockedTask = ({ id, shouldReject = false, timeout }: MockedTaskOptions) => ({
  metadata: {
    id
  },
  promiseFunction: () =>
    new Promise((resolve, reject) =>
      setTimeout(shouldReject ? reject : resolve, timeout ?? Math.random() * 100)
    )
})

describe('Async queue', () => {
  jest.setTimeout(30000)

  test('1. Created task should success', async () => {
    const queue = new AsyncQueue({ name: 'test-queue' })
    queue.add(createMockedTask({ id: 'task-success' }))

    const [taskId] = await Promise.all([
      new Promise((resolve) => {
        queue.addListener('success', ({ metadata }: any) => {
          resolve(metadata.id)
        })
      }),
      new Promise<void>((resolve) => {
        queue.addListener('queue-empty', () => {
          resolve()
        })
      })
    ])

    expect(taskId).toBe('task-success')
  })

  test('2. Created task should fail after n repeats', async () => {
    const maxErrorCount = Math.ceil(Math.random() * 3)
    const queue = new AsyncQueue({
      name: 'test-queue',
      dequeueErrorTimeout: 100,
      dropTaskAfterErrorsCount: maxErrorCount
    })

    queue.add(
      createMockedTask({
        id: 'task-failed',
        shouldReject: true
      })
    )

    const [errorCount] = await Promise.all([
      new Promise((resolve) =>
        queue.addListener('error-count-exceeded', ({ errorCount }: any) => {
          resolve(errorCount)
        })
      ),
      new Promise<void>((resolve) => {
        queue.addListener('queue-empty', () => {
          resolve()
        })
      })
    ])

    expect(errorCount).toBe(maxErrorCount)
  })

  test('3. Multiple created tasks should success', async () => {
    const queue = new AsyncQueue({
      name: 'test-queue'
    })
    const succeededTasks: string[] = []

    queue.add(createMockedTask({ id: 'task-1' }))
    queue.add(createMockedTask({ id: 'task-2' }))
    queue.add(createMockedTask({ id: 'task-3' }))

    queue.addListener('success', ({ metadata }) => succeededTasks.push(metadata.id))

    await new Promise<void>((resolve) =>
      queue.addListener('queue-empty', () => {
        resolve()
      })
    )

    expect(succeededTasks).toMatchObject(['task-1', 'task-2', 'task-3'])
  })

  test('4. Creating queue should fail after not providing "promiseFunction"', async () => {
    expect(() => {
      const queue: any = new AsyncQueue()
      queue.add({
        promiseFunction: null
      })
    }).toThrow("Parameter 'promiseFunction' has to be function")
  })
})
