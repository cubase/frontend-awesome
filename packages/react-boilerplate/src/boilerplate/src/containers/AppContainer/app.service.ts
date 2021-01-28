import { LasagnaService } from './lasagna'

const todoApi = new LasagnaApi({
  metaKey: 'todoApi',
  config: {
    baseURL: 'http://ohivuervuiegryuvg.com',
    headers: {
      'Content-Type': '...'
    }
  },
  //   defaultFetch: async (fetch) => {
  //     const data1 = await fetch('/new-todos')
  //     const data2 = await fetch('/old-todos')
  //     return { ...data1, ...data2 }
  //   }

  methods: {
    get: (fetch) => {
        return fetch(....)
    },
    add: (fetch) => {},
    delete: (fetch, payload) => {
        await fetch({url: "/todos", method: 'DELETE', data: {payload}})
    }
  }
})

/**
 * NOTES
 * 1. operations mutate only single one state
 * 2. models should contain LasagnaApi service
 */

const appService = new LasagnaService({
  name: 'appService',
  models: [{ key: 'todos', default: [], api: todoApi },{ key: 'pauseList', default: [], api: todoApi }],
  operations: [
    {
      key: 'addTodo',
      model: 'todos',
      handler: async (get, todo, api) => {
        
      }
    },
    {
      key: 'removeTodo',
      model: 'todos',
      handler: (state, name, api) => {
        await api.todos.delete(name)
        const actualTodos = await api.todos.get()
        return actualTodos
      }
    },
  ]
})

export { appService }
