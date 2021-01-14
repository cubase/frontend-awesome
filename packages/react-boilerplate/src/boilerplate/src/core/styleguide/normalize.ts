import { injectGlobal } from '@emotion/css'

const normalize = () => injectGlobal`
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

`

export { normalize }
