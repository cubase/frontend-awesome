import React from 'react'
import ReactDOM from 'react-dom'

import { normalize } from 'core/styleguide/normalize'
import { AppContainer } from 'containers'

// -- global css init
normalize()

// -- service worker install

ReactDOM.render(<AppContainer />, document.getElementById('react-root'))
