import React from 'react'
import logo from 'assets/logo.png'

import { useStyles } from 'core/styleguide/styleguide'
import { logoStyles } from './styles'

const Logo = () => {
  const { classes } = useStyles(logoStyles)
  return (
    <div className={classes.container}>
      <img className={classes.img} alt="fa-logo" src={logo} />
    </div>
  )
}

export { Logo }
