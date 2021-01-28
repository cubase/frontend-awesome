import { css, keyframes } from '@emotion/css'

import { StyleguideContextFunction } from 'core/styleguide/styleguide.types'

const pulse = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
`

const logoStyles: StyleguideContextFunction = (context) => ({
  container: css`
    color: ${context.theme.colors.red100};
    height: 150px;
  `,
  img: css`
    height: 100%;
    width: auto;
    animation: ${pulse} 2.5s infinite ease-in-out;
  `
})

export { logoStyles }
