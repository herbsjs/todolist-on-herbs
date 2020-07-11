import React from 'react'
import { Typography, AppBar, Toolbar } from '@material-ui/core'

import styles from '../Styles/Styles'

function Header() {
  const classes = styles()
  return (
    <AppBar position="fixed" variant="dense" elevation='0' className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" noWrap>
          Todo List on HerbsJS
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
