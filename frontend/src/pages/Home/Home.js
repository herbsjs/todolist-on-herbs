import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import style from '../../components/Styles/Styles'

function Home() {
  const classes = style()
  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1>Welcome!</h1>
        <p>
          This is a To Do List application with the purpose of demonstrate the use of Herbs and some important glues (GraphQL, REST, repository, etc)
        </p>
      </main>
    </>
  )
}

export default Home
