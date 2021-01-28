import React from 'react'

import { lasagna, ServiceProps } from './lasagna'
import { appService } from './app.service'

const AppContainer = ({ service }) => {
  const { models, operations, dispatch } = service as ServiceProps
  const { todos } = models

  return (
    <div
      style={{
        padding: '2rem'
      }}
    >
      <h1>Todo</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.name} onClick={() => dispatch(operations.RENAME_TODO, todo.name)}>
            {todo.name}
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(operations.ADD_TODO, { name: `bazerant-${Date.now()}` })}>
        Pridat todo
      </button>
    </div>
  )
}

export default lasagna(AppContainer, appService)
