import React from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'containers'
import { StyleguideProvider } from 'core/styleguide'

// -- service worker install

const App = () => (
  <StyleguideProvider>
    <AppContainer />
  </StyleguideProvider>
)

ReactDOM.render(<App />, document.getElementById('react-root'))
