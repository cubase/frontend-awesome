import React from 'react'

import { Logo } from 'components'

const AppContainer = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '5rem'
      }}
    >
      <Logo />
      <p
        style={{
          color: '#e6e6e6',
          letterSpacing: '-2px',
          margin: '3rem 0',
          fontSize: '3rem'
        }}
      >
        Excited to build some interesting stuff!
      </p>
    </div>
  )
}

export { AppContainer }
