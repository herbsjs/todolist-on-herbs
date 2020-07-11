import React from 'react'
import NavDrawer from '../components/NavDrawer/NavDrawer'
import style  from '../components/Styles/Styles'

export default function DefaultLayout({ children }) {
  const classes = style()
  return (
    <div className={classes.root}>
      <NavDrawer />
      {children}
    </div>
  )
}
