import update from 'immutability-helper'
import { ServiceConfig, ServiceModel, ServiceOperation, ServiceState, ServiceProps } from '../types'

class LasagnaService {
  _name: string
  _models: ServiceModel[]
  _operations: ServiceOperation[]

  constructor(config: ServiceConfig) {
    this._name = config.name || 'unknownService'
    this._models = config.models !== undefined ? config.models : []
    this._operations = config.operations !== undefined ? config.operations : []
  }

  private _prepareOperations(operations: ServiceOperation[]): Record<string, string> {
    if (!Array.isArray(operations)) {
      throw new TypeError(
        `Type '${typeof operations}' provided for parameter 'operations', expected array`
      )
    }
    return operations.reduce((acc, operation) => {
      acc[operation.key] = operation.key
      return acc
    }, {})
  }

  private _prepareModels(models: ServiceModel[]) {
    if (!Array.isArray(models)) {
      throw new TypeError(`Type '${typeof models}' provided for parameter 'models', expected array`)
    }

    return models.reduce((acc, model) => {
      acc[model.key] = model.default || null
      return acc
    }, {})
  }

  getName() {
    return this._name
  }

  getInitialServiceState(): ServiceState {
    return {
      models: this._prepareModels(this._models)
    }
  }

  getServiceProps(
    state: ServiceState,
    stateSetter: (arg: ServiceState | ((state: ServiceState) => ServiceState)) => void
  ): ServiceProps {
    return {
      models: state.models,
      operations: this._prepareOperations(this._operations),
      dispatch: (operationKey, payload) => {
        const operation = this._operations.find((operation) => operation.key === operationKey)
        if (!operation) {
          throw new TypeError(`Unknown operation '${operationKey}'`)
        }

        stateSetter((state) => {
          return update(state, {
            models: {
              [operation.model]: {
                $set: operation.handler(state.models[operation.model], payload)
              }
            }
          })
        })
      }
    }
  }
}

export { LasagnaService }
