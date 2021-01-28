import React, { useState } from 'react'
import { LasagnaService } from './utils/LasagnaService'

const lasagna = (Component, lasagnaService: LasagnaService) => {
  const ServiceComponent = (componentProps) => {
    const [serviceState, setServiceState] = useState(lasagnaService.getInitialServiceState())
    return (
      <Component
        {...componentProps}
        service={lasagnaService.getServiceProps(serviceState, setServiceState)}
      />
    )
  }

  ServiceComponent.displayName = `${Component.name}:${lasagnaService.getName()}`
  return ServiceComponent
}

export { lasagna, LasagnaService }
