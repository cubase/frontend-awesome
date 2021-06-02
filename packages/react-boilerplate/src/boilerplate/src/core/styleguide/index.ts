import { createStyleguideContext } from './context'
import { injectGlobal } from '@emotion/css'

const theme = {
  colors: {
    red: 'red'
  }
}

const { createUseStyles, StyleguideProvider } = createStyleguideContext(theme)
const useGlobalStyles = createUseStyles(() => ({
  global: String(injectGlobal`
    * {
        margin: 0;
        padding: 0;
        box-sizing: 'border-box';
    }
    html {
        font-size: 12px;
    }
    body {
        font-family: 'sans-serif'
    }
  `)
}))

export { createUseStyles, useGlobalStyles, StyleguideProvider }
