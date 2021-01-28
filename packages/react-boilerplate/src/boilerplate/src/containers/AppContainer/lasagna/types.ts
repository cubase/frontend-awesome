export type ServiceModelPlugin = {
  api: {}
}

export type ServiceState = {
  models: Record<string, any>
}

export type ServiceProps = {
  models: Record<string, any>
  operations: Record<string, string>
  dispatch: (operation: string, payload: any) => void
}

export namespace Lasagna {
  export type Plugin = {
    type: string
    // TODO: add configuration types
    configuration: {}
  }

  export type ServiceModel<T> = {
    key: string
    default?: T
    plugins?: Lasagna.Plugin[]
  }

  export type ServiceOperation = {
    key: string
    model: string
    handler: (state: any, payload: any) => any
  }

  export type ServiceConfig<T> = {
    name?: string
    models?: ServiceModel<T>[]
    operations?: ServiceOperation[]
  }
}

export abstract class LasagnaServiceInterface<GenericModel> {
  private readonly name: string
  private readonly models: Lasagna.ServiceModel<GenericModel>[]
  private readonly operations: Lasagna.ServiceOperation[]

  constructor(config: Lasagna.ServiceConfig<GenericModel>) {}
}
