import { css, keyframes } from '@emotion/css'
import { createUseStyles } from 'core/styleguide'

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

const useLogoStyles = createUseStyles((theme) => ({
  logo: css`
    height: 150px;
  `,
  logoImg: css`
    height: 100%;
    width: auto;
    animation: ${pulse} 2.5s infinite ease-in-out;
  `
}))

export { useLogoStyles }
