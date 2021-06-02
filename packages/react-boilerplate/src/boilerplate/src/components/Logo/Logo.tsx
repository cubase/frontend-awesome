import React from 'react'
import logo from 'assets/logo.png'

import { useLogoStyles } from './styles'

const Logo = () => {
  const { classes } = useLogoStyles()
  return (
    <div className={classes.logo}>
      <img alt="fa-logo" className={classes.logoImg} src={logo} />
    </div>
  )
}

export { Logo }
