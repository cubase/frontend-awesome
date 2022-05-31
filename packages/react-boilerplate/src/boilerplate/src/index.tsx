import React from 'react'
import { createRoot } from 'react-dom/client'

import { AppContainer } from 'containers'
import { StyleguideProvider } from 'core/styleguide'

// -- service worker install

const App = () => (
  <StyleguideProvider>
    <AppContainer />
  </StyleguideProvider>
)

const container = document.getElementById('react-root')

if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
